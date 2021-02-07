import { Message } from 'discord.js'
import config from '../config'
import Command from '../interfaces/Command'
import commands from './index'

const { bot: { prefix } } = config

export default class Help implements Command {
  name: string = 'help'
  aliases: string[] = ['commands']
  description: string = 'List all of my commands or info about a specific command'
  usage: string = '[command name]'
  execute (message: Message, args: string[]): void {
    const data: string[] = []
    const commandArr: string[] = []

    if (args.length === 0) {
      data.push('Here\'s a list of all my commands')
      commands.forEach((value: Command, key: string): void => {
        commandArr.push(key)
      })

      data.push(commandArr.join(', '))

      data.push(`\nYou can send \`${prefix}${this.name} ${this.usage}\` to get info on a specific command!`)

      void message.author.send(data, { split: true })
        .then(() => {
          if (message.channel.type === 'dm') return
          void message.reply('I\'ve sent you a DM with all my commands!')
        })
        .catch(err => {
          console.error(err)
          void message.reply('it seems like I can\'t Dm you! Do you have DMs disabled?')
        })
    } else {
      const commandName: string = args[0].toLowerCase()

      let command: Command | undefined = commands.get(commandName)

      commands.forEach((value: Command): void => {
        if (value.aliases !== undefined) {
          if (value.aliases.includes(commandName)) {
            command = value
          }
        }
      })

      if (command === undefined) {
        void message.channel.send('that\'s not a valid command!')
        return
      }

      data.push(`**Name:** ${command.name}`)

      if (command.aliases !== undefined) data.push(`**Aliases:** ${command.aliases.join(', ')}`)
      if (command.description !== undefined) data.push(`**Description:** ${command.description}`)
      if (command.usage !== undefined) data.push(`**Usage:** \`${prefix}${command.name} ${command.usage}\``)

      void message.channel.send(data, { split: true })
    }
  }
}
