import { Message, BitFieldResolvable, PermissionString } from 'discord.js'

export default interface Command {
  name: string
  aliases?: string[]
  description?: string
  args?: boolean
  usage?: string
  guildOnly?: boolean
  permissions?: BitFieldResolvable<PermissionString>
  execute: (msg: Message, args: string[]) => void
}
