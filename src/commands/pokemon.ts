import { Message } from 'discord.js'

import Command from '../interfaces/Command'
import PokemonService from '../services/pokemon'
import PokemonEmbed from '../embeds/pokemon'

const pokemonService: PokemonService = new PokemonService()

export default class Pokemon implements Command {
  name: string = 'pokemon'
  aliases: string[] = ['p', 'pk', 'pkm']
  description: string = 'spawn a pokemon!'
  args: boolean = true
  usage: string = '[pokemon name]'
  guildOnly: boolean = true

  async execute (message: Message, args: string[]): Promise<void> {
    const pokemonName: string = args[0]

    try {
      const pokemon = await pokemonService.getPokemon(pokemonName)
      const name: string = pokemon.name
      const sprite: string = pokemon.sprites.front_default

      const pokemonEmbed = new PokemonEmbed(name, sprite)

      void message.channel.send(pokemonEmbed)
    } catch (err) {
      console.error(err)
      void message.channel.send('no pokemon has been found!')
    }
  }
}
