import { Client, Message } from 'discord.js'

import commands, { Commands } from './commands/index'

import onAnyMessage from './events/onAnyMessage'
import onMessage from './events/onMessage'

export default class Bot {
  private readonly client: Client
  private readonly prefix: string
  private readonly token: string
  private readonly commands: Commands

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

    this.client.on('message', (message: Message) => onMessage(this.prefix, message, this.commands))

    this.client.on('message', (message: Message) => void onAnyMessage(message))

    void this.client.login(this.token)
  }
}
