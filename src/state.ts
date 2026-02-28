import { createInterface, type Interface } from "node:readline";
import { getCommands } from "./command.js";
import { PokeAPI } from "./pokeapi.js";

export type State = {
    readline: Interface;
    commands: Record<string, CLICommand>;
    pokeApi: PokeAPI
    prevLocationsURL: string | null,
    nextLocationsURL: string | null
}

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State) => Promise<void>;
};

export function initSate(): State {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > "
    });

    return {
        readline: rl,
        commands: getCommands(),
        pokeApi: new PokeAPI(),
        prevLocationsURL: null,
        nextLocationsURL: "https://pokeapi.co/api/v2/location-area?offset=0&limit=20"
    }
}