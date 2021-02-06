import config from '../config'
import axios from 'axios'

export default class PokemonService {
  private readonly service: string
  private readonly apiURL: string

  constructor () {
    this.service = 'pokemon'
    this.apiURL = config.pokeapi
  }

  public async get (pokemon: string): Promise<any> {
    return await axios.get(`${this.apiURL}/${this.service}/${pokemon}`)
  }
}
