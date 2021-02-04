import { Client, Message } from 'discord.js'

export class Bot {
  private readonly client: Client
  private readonly prefix: string
  private readonly token: string

  constructor (prefix: string, token: string) {
    this.client = new Client()
    this.prefix = prefix
    this.token = token
  }

  public start (): void {
    this.client.on('ready', () => {
      console.log('nixemon is ready!')
    })

    this.client.on('message', (message: Message): void => {
      if (!message.content.startsWith(this.prefix) || message.author.bot) return

      if (message.content === `${this.prefix}ping`) {
        void message.channel.send('🏓 Pong.')
        return
      }

      void message.channel.send('No command found!')
    })

    void this.client.login(this.token)
  }
}
