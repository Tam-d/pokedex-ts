import { State } from "./state";
import { Location } from "./pokeapi.js";

export async function commandExplore(state : State, ...args: string[]) {
    const locationName: string = args[0];

    console.log(`Exploring ${locationName}...`);
    
    let response : Location = await state.pokeApi.fetchLocation(
        locationName
    );

    const encounters = response.pokemon_encounters

    console.log(`Found Pokemon:`)
    for(const encounter in encounters) {
        console.log(encounters[encounter].pokemon.name);
    }
}