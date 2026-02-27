import { CLICommand } from "./command.js";

export function commandHelp(commands : Record<string, CLICommand>) {
    console.log(`Welcome to the Pokedex!`);
    console.log(`Usage:\n`);

    for(const cliCommand in commands) {
        console.log(`${commands[cliCommand].name}: ${commands[cliCommand].description}`);
    }
}