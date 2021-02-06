import path from 'path'
import fs from 'fs'

import Command from '../interfaces/Command'

const commandFiles: string[] = fs.readdirSync(path.join(__dirname, '/')).filter(file => !file.startsWith('index'))

const commands: Map<string, Command> = new Map()

for (const file of commandFiles) {
  const CommandClass = require(`./${file}`).default

  const command: Command = new CommandClass()

  commands.set(command.name, command)
}

export default commands
