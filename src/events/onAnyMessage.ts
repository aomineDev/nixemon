import { Message, Channel, TextChannel } from 'discord.js'

import PokemonService from '../services/pokemon'
import PokemonEmbed from '../embeds/pokemon'

const pokemonService = new PokemonService()

export default async function onAnyMessage (message: Message): Promise<void> {
  if (message.author.bot) return

  const probability: number = Math.floor(Math.random() * 500) + 1
  const pokemonNumber: number = Math.floor(Math.random() * 898) + 1

  if (probability >= 50) return

  try {
    const pokemon: any = await pokemonService.getPokemon(pokemonNumber)
    const name: string = pokemon.name
    const sprite: string = pokemon.sprites.front_default

    const pokemonEmbed: PokemonEmbed = new PokemonEmbed(name, sprite)

    const channel: Channel | undefined = await message.client.channels.cache.get('807296681967616060')

    if (channel === undefined) return

    void (channel as TextChannel).send(pokemonEmbed)
  } catch (err) {
    console.error(err)
    void message.channel.send('no pokemon has been found!')
  }
}
