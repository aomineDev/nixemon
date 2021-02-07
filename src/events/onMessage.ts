import { Message } from 'discord.js'
import Command from '../interfaces/Command'
import { Commands } from '../commands/index'

export default function onMessage (
  prefix: string,
  message: Message,
  commands: Commands
): void {
  if (!message.content.startsWith(prefix) || message.author.bot) return

  const args: string[] = message.content.slice(prefix.length).split(/ +/)
  const commandName: string | undefined = args.shift()?.toLowerCase()

  if (commandName === undefined || commandName === '') {
    void message.channel.send('no command has been entered!')
    return
  }

  let command: Command | undefined = commands.get(commandName)

  commands.forEach((value: Command): void => {
    if (value.aliases !== undefined) {
      if (value.aliases.includes(commandName)) {
        command = value
      }
    }
  })

  if (command === undefined) {
    void message.channel.send('no command has been found!')
    return
  }

  if (Boolean(command.args) && args.length === 0) {
    let reply = 'You didn\'t provide any argmuents'

    if (command.usage !== undefined) {
      reply += `\nThe correct usage would be: \`${prefix}${command.name} ${command.usage}\``
    }

    void message.reply(reply)
    return
  }

  if (Boolean(command.guildOnly) && message.channel.type === 'dm') {
    void message.reply('I can\'t execute that command inside DMs!')
    return
  }

  if (command.permissions !== undefined) {
    if (message.member?.hasPermission(command.permissions) === false) {
      void message.reply('You can\'t do ')
      return
    }
  }

  try {
    command.execute(message, args)
  } catch (err) {
    console.error(err)
    void message.reply('There was an error trying to execute that command!')
  }
}
