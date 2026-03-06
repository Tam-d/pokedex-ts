import { createInterface, type Interface } from "node:readline";
import { getCommands } from "./command.js";
import { PokeAPI, Pokemon } from "./pokeapi.js";

export type State = {
    readline: Interface;
    commands: Record<string, CLICommand>;
    pokeApi: PokeAPI
    pokedex: Record<string, Pokemon>
    prevLocationsURL: string,
    nextLocationsURL: string,
}

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
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
        pokedex: {},
        prevLocationsURL: "",
        nextLocationsURL: ""
    }
}