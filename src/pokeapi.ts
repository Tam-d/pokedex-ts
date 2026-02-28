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

  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {

    const response = await fetch(`${pageURL}`);

    if (!response.ok) {
        throw new Error(`Error fetching locations: ${response.status}`);
    }

    return response.json();
  }

  async fetchLocation(locationName: string): Promise<Location> {
    
    const response = await fetch(`${PokeAPI.baseURL}/location/${locationName}`);

    if (!response.ok) {
        throw new Error(`Error fetching location: ${response.status}`);
    }  

    return response.json();
  }
}