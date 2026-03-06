import { Cache, CacheEntry } from "./pokecache.js";

export type ShallowLocations = {
  count: number,
  next: string,
  previous: string,
  results: Location[]
};

export type Location = {
  id: number,
  name: string,
  url: string,
  pokemon_encounters: PokemonEncounters[]
};

export type PokemonEncounters = {
    pokemon: {
        name: string,
        url: string,
    }
};

export type Pokemon = {
    name: string,
    base_experience: number,
    height: number,
    is_default: boolean,
    order: number,
    weight: number,
    stats: {
        base_stat: number,
        effort: number,
        stat: {
            name: string,
            url: string,
        }
    }[],
    types: {
        slot: number,
        type: {
            name: string,
            url: string,
        }
    }[]
};

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  #cache = new Cache(50000);

  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL || `${PokeAPI.baseURL}/location-area`
    
    const cacheEntry : ShallowLocations = this.#cache.get(url);
    
    if(cacheEntry !== undefined) {
        console.log(`Retrieving ${url} from the cache!`)
        return cacheEntry;
    }

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Error fetching locations: ${response.status}`);
    }

    const responseJson = response.json()
    this.#cache.add(url, responseJson)

    return responseJson;
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const url = `${PokeAPI.baseURL}/location-area/${locationName}`
    
    const cacheEntry: Location = this.#cache.get(url);
    
    if(cacheEntry !== undefined) {
        console.log(`Retrieving location from the cache.`)
        return cacheEntry;
    }
    
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Error fetching location: ${response.status}`);
    } 

    const responseJson = response.json()
    this.#cache.add(url, responseJson)

    return responseJson;
  }

  async fetchPokemon(pokemonName: string): Promise<Pokemon> {
    const url = `${PokeAPI.baseURL}/pokemon/${pokemonName}/`;

    const cacheEntry: Pokemon = this.#cache.get(url);
    
    if(cacheEntry !== undefined) {
        console.log(`Retrieving pokemon info from the cache.`)
        return cacheEntry;
    }

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Error fetching pokemon: ${response.status}`);
    } 

    const responseJson = response.json()
    this.#cache.add(url, responseJson)

    return responseJson;
  }

}