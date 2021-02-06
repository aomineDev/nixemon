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

  execute (message: Message, args: string[]): void {
    const pokemon = args[0]

    void pokemonService.get(pokemon)
      .then(({ data }) => {
        const name: string = data.name
        const sprite: string = data.sprites.front_default

        const pokemonEmbed = new PokemonEmbed(name, sprite)

        void message.channel.send(pokemonEmbed)
      })
      .catch(err => {
        console.error(err)
        void message.channel.send('no pokemon has been found!')
      })
  }
}
