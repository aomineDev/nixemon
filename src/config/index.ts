import dotenv from 'dotenv'

dotenv.config()

interface Config {
  token: string
  prefix: string
  pokeapi: string
}

const config: Config = {
  token: process.env.TOKEN === undefined ? '' : process.env.TOKEN,
  prefix: process.env.PREFIX === undefined ? '' : process.env.PREFIX,
  pokeapi: 'https://pokeapi.co/api/v2/'
}

export default config
