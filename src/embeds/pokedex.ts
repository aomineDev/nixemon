import { MessageEmbed } from 'discord.js'

export default class PokedexEmbed extends MessageEmbed {
  constructor (id: number, name: string, description: string, types: string[], abilities: string[], height: number, weight: number, sprite: string) {
    const titile: string = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()

    super()
    this.color = 0xff1456
    this.author = {
      name: 'nixemon',
      iconURL: 'https://i.imgur.com/wqJt1Lh.png'
    }
    this.thumbnail = {
      url: 'https://i.imgur.com/dBigXhF.png'
    }
    this.title = `#${id} - ${titile}`
    this.description = description
    this.fields = [
      {
        name: 'Types',
        value: types.join(' / '),
        inline: true
      },
      {
        name: 'Height',
        value: `${height / 10} m`,
        inline: true
      },
      {
        name: '\u200b',
        value: '\u200b',
        inline: false
      },
      {
        name: 'Habilities',
        value: abilities.join(' / '),
        inline: true
      },
      {
        name: 'Weight',
        value: `${weight / 10} kg`,
        inline: true
      }
    ]
    this.image = {
      url: sprite
    }
    this.timestamp = Date.now()
  }
}
