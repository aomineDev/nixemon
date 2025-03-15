import { Message } from 'discord.js'

import config from '../config'

import findCommandALias from '../utils/findCommandAlias'
import Command from '../interfaces/Command'
import commands from './index'

const { bot: { prefix } } = config

export default class Help implements Command {
  public readonly name: string = 'help'
  public readonly aliases: string[] = ['commands']
  public readonly description: string = 'List all of my commands or info about a specific command'
  public readonly usage: string = '[command name]'

  public execute (message: Message, args: string[]): void {
    const data: string[] = []
    const commandArr: string[] = []

    if (args.length === 0) {
      data.push('Here\'s a list of all my commands')

      for (const key of commands.keys()) commandArr.push(key)

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

      return
    }

    const commandName: string = args[0].toLowerCase()

    const command: Command | undefined = commands.get(commandName) ?? findCommandALias(commandName, commands)

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
