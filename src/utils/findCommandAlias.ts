import { Commands } from '../commands/index'
import Command from '../interfaces/Command'

export default function findCommandAlias (commandName: string, commands: Commands): Command | undefined {
  let command: Command | undefined

  for (const cmd of commands.values()) {
    if (cmd.aliases?.includes(commandName) === true) {
      command = cmd
      break
    }
  }

  return command
}
