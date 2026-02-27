import { createInterface } from "node:readline";
import { CLICommand } from "./command.js";
import { getCommands } from "./command.js";

export function cleanInput(input: string): string[] {
  return input.toLowerCase().trim().split(/\s+/);
}

export function startREPL() {
    let availableCommands: Record<string, CLICommand> = getCommands();

    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > "
    });

    rl.prompt();

    rl.on('line', (input:string) => {
        if(input.length === 0)
            rl.prompt;

        let inputCommand = cleanInput(input);
        let userCLICommand : CLICommand = availableCommands[inputCommand[0]];

        if (userCLICommand) {
            userCLICommand.callback(availableCommands)
        }

        rl.prompt();
    }); 
}