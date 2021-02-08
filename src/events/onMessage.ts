import { Message } from 'discord.js'

import findCommandALias from '../utils/findCommandAlias'
import { Commands } from '../commands/index'
import Command from '../interfaces/Command'

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

  const command: Command | undefined = commands.get(commandName) ?? findCommandALias(commandName, commands)

  if (command === undefined) {
    void message.channel.send('no command has been found!')
    return
  }

  if (command.args === true && args.length === 0) {
    let reply = 'You didn\'t provide any argmuents'

    if (command.usage !== undefined) {
      reply += `\nThe correct usage would be: \`${prefix}${command.name} ${command.usage}\``
    }

    void message.reply(reply)
    return
  }

  if (command.guildOnly === true && message.channel.type === 'dm') {
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
