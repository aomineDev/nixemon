import { Client, Message } from 'discord.js'

import commands, { Commands } from './commands/index'

import onAnyMessage from './events/onAnyMessage'
import onMessage from './events/onMessage'

export default class Bot {
  private readonly client: Client
  private readonly commands: Commands
  private readonly prefix: string
  private readonly token: string

  constructor (prefix: string, token: string) {
    this.client = new Client()
    this.commands = commands
    this.prefix = prefix
    this.token = token
  }

  public start (): void {
    this.client.on('ready', (): void => console.log('nixemon is ready!'))

    this.client.on('message', (message: Message): void => onMessage(this.prefix, message, this.commands))

    this.client.on('message', (message: Message): void => void onAnyMessage(message))

    void this.client.login(this.token)
  }
}
