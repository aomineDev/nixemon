import { Client, Message } from 'discord.js'

import Command from './interfaces/Command'
import commands from './commands/index'

export default class Bot {
  private readonly client: Client
  private readonly prefix: string
  private readonly token: string
  private readonly commands: Map<string, Command>

  constructor (prefix: string, token: string) {
    this.client = new Client()
    this.prefix = prefix
    this.token = token
    this.commands = commands
  }

  public start (): void {
    this.client.on('ready', () => {
      console.log('nixemon is ready!')
    })

    this.client.on('message', (message: Message) => this.commandHandler(message))

    void this.client.login(this.token)
  }

  public commandHandler (message: Message): void {
    if (!message.content.startsWith(this.prefix) || message.author.bot) return

    const args: string[] = message.content.slice(this.prefix.length).split(/ +/)
    const commandName: string | undefined = args.shift()?.toLowerCase()

    if (commandName === undefined || commandName === '') {
      void message.channel.send('no command has been entered!')
      return
    }

    let command: Command | undefined = this.commands.get(commandName)

    this.commands.forEach((value: Command): void => {
      if (value.aliases !== undefined) {
        if (value.aliases?.includes(commandName) !== undefined) {
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

      if (typeof command.usage === 'string') {
        reply += `\nThe correct usage would be: \`${this.prefix}${command.name} ${command.usage}\``
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
        void message.reply('You can\'t do this!')
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
}
