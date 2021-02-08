import { Message } from 'discord.js'

import Command from '../interfaces/Command'

export default class Ping implements Command {
  name: string = 'ping'
  description: string = 'Ping!'

  execute (message: Message, args: string[]): void {
    void message.channel.send('🏓 Pong.')
  }
}
