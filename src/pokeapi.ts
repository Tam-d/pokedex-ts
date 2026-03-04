import { Cache, CacheEntry } from "./pokecache.js";

export type ShallowLocations = {
  count: number,
  next: string,
  previous: string,
  results: Location[]
};

export type Location = {
  name: string,
  url: string,
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

    const cacheEntry : CacheEntry<Location> = this.#cache.get(locationName);
    
    if(cacheEntry) {
        console.log(`Retrieving location from the cache:`)
        return cacheEntry.val;
    }
    
    const response = await fetch(`${PokeAPI.baseURL}/location/${locationName}`);

    if (!response.ok) {
        throw new Error(`Error fetching location: ${response.status}`);
    }  

    return response.json();
  }
}