import { State } from "./state.js";

export async function commandCatch(state : State, ...args: string[]) {
    const pokemonName = args[0];

    console.log(`Throwing a Pokeball at ${pokemonName}...`);

    const pokemon = await state.pokeApi.fetchPokemon(pokemonName);

    if(!pokemon.base_experience) {
        throw Error("Pokemon does not have base exp.")
    }

    const catch_chance = Math.random() * pokemon.base_experience

    if(catch_chance > .5 * pokemon.base_experience) {
        console.log(`${pokemonName} was caught!`);
        state.pokedex[pokemonName] = pokemon;
    }
    else {
        console.log(`${pokemonName} escaped!`);
    }
}