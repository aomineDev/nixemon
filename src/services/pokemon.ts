import config from '../config'
import axios from 'axios'

const { pokeapi: { apiURL } } = config

export default class PokemonService {
  private readonly service: string
  private readonly apiURL: string

  constructor () {
    this.service = 'pokemon'
    this.apiURL = apiURL
  }

  public async getPokemon (pokemon: string| number): Promise<any> {
    const { data } = await axios.get(`${this.apiURL}/${this.service}/${pokemon}`)

    return data
  }
}
