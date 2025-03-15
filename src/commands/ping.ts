import { Message } from 'discord.js'

import Command from '../interfaces/Command'

export default class Ping implements Command {
  public readonly name: string = 'ping'
  public readonly description: string = 'Ping!'

  public execute (message: Message, args: string[]): void {
    void message.channel.send('🏓 Pong.')
  }
}
