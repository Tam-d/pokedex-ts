import { CLICommand, State } from "./state.js";

export async function commandHelp(state : State) {
    const commands : Record<string, CLICommand> = state.commands;

    console.log(`Welcome to the Pokedex!`);
    console.log(`Usage:\n`);

    for(const cliCommand in commands) {
        console.log(`${commands[cliCommand].name}: ${commands[cliCommand].description}`);
    }
}