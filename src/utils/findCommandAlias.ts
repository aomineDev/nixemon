import { Commands } from '../commands/index'
import Command from '../interfaces/Command'

export default function findCommandAlias (commandName: string, commands: Commands): Command | undefined {
  let command: Command | undefined
  console.log('commandName', commandName)

  for (const cmd of commands.values()) {
    console.log('command name', cmd.name)
    console.log('incldues commandName?', cmd.aliases?.includes(commandName))
    console.log('----------------------------------')
    if (cmd.aliases?.includes(commandName) === true) {
      command = cmd
      break
    }
  }

  return command
}
