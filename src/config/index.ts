import dotenv from 'dotenv'

dotenv.config()

interface Config {
  bot: {
    token: string
    prefix: string
  }
  pokeapi: {
    apiURL: string
  }
}

const config: Config = {
  bot: {
    prefix: process.env.PREFIX === undefined ? '' : process.env.PREFIX,
    token: process.env.TOKEN === undefined ? '' : process.env.TOKEN
  },
  pokeapi: {
    apiURL: 'https://pokeapi.co/api/v2/'
  }
}

export default config
