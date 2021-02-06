import { MessageEmbed } from 'discord.js'

export default class PokemonEmbed extends MessageEmbed {
  constructor (name: string, sprite: string) {
    super()
    this.color = 0x0099ff
    this.title = 'Pokémon'
    this.description = `Un **${name}** salvaje ha aparecido!`
    this.image = {
      url: sprite
    }
    this.timestamp = Date.now()
  }
}
