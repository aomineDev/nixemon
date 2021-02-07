import { Message } from 'discord.js'

import Command from '../interfaces/Command'
import PokemonService from '../services/pokemon'
import PokedexEmbed from '../embeds/pokedex'

const pokemonService: PokemonService = new PokemonService()

export default class Pokedex implements Command {
  name: string = 'pokedex'
  aliases: string[] = ['p', 'pk', 'pkx']
  description: string = 'spawn a pokemon!'
  args: boolean = true
  usage: string = '[pokemon name]'
  guildOnly: boolean = true

  async execute (message: Message, args: string[]): Promise<void> {
    const pokemonName: string = args[0]

    try {
      const pokemon: any = await pokemonService.getPokemon(pokemonName)
      const name: string = pokemon.name
      const id: number = pokemon.id
      const sprite: string = pokemon.sprites.front_default
      const height: number = pokemon.height
      const weight: number = pokemon.weight

      const types: string[] = []
      const abilities: string[] = []

      pokemon.types.forEach((e: any) => {
        types.push(e.type?.name)
      })

      pokemon.abilities.forEach((e: any) => {
        abilities.push(e.ability?.name)
      })

      const pokemonSpecie: any = await pokemonService.getPokemonSpecies(pokemonName)
      const flavor: any = pokemonSpecie.flavor_text_entries.find(({ version, language }: { version: any, language: any }) => version.name === 'moon' && language.name === 'es')

      const description: string = flavor.flavor_text

      const pokedexEmbed = new PokedexEmbed(id, name, description, types, abilities, height, weight, sprite)

      void message.channel.send(pokedexEmbed)
    } catch (err) {
      console.error(err)
      void message.channel.send('no pokemon has been found!')
    }
  }
}
