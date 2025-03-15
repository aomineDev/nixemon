import { Message } from 'discord.js'

import PokemonService from '../services/pokemon'
import PokedexEmbed from '../embeds/pokedex'
import Command from '../interfaces/Command'

const pokemonService: PokemonService = new PokemonService()

export default class Pokedex implements Command {
  public readonly name: string = 'pokedex'
  public readonly aliases: string[] = ['p', 'pk', 'pkx']
  public readonly description: string = 'check the information of any existing pokémon!'
  public readonly args: boolean = true
  public readonly usage: string = '[pokemon name]'
  public readonly guildOnly: boolean = true

  public async execute (message: Message, args: string[]): Promise<void> {
    const pokemonName: string = args[0]

    try {
      const pokemon: any = await pokemonService.getPokemon(pokemonName)
      const id: number = pokemon.id
      const name: string = pokemon.name
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
      const flavor: any = pokemonSpecie.flavor_text_entries.find(({ language }: { language: any }) => language.name === 'es')

      const description: string = flavor.flavor_text

      const pokedexEmbed: PokedexEmbed = new PokedexEmbed(id, name, description, types, abilities, height, weight, sprite)

      void message.channel.send(pokedexEmbed)
    } catch (err) {
      console.error(err)
      void message.channel.send('no pokemon has been found!')
    }
  }
}
