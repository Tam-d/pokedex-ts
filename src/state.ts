import { createInterface, type Interface } from "node:readline";
import { getCommands } from "./command.js";

export type State = {
    readline: Interface;
    commands: Record<string, CLICommand>;
}

export type CLICommand = {
  name: string;
  description: string;
  callback:  (state: State) => void;
};

export function initSate(): State {
    let availableCommands: Record<string, CLICommand> = getCommands();

    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > "
    });

    return {
        readline: rl,
        commands: availableCommands
    }
}