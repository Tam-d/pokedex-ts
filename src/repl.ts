import { State, CLICommand } from "./state.js";
import { getCommands } from "./command.js";

export function cleanInput(input: string): string[] {
  return input.toLowerCase().trim().split(/\s+/);
}

export function startREPL(state: State) {
    const availableCommands = state.commands;
    const rl = state.readline;

    rl.prompt();

    rl.on('line', (input:string) => {
        if(input.length === 0)
            rl.prompt;

        let inputCommand = cleanInput(input);
        let userCLICommand : CLICommand = availableCommands[inputCommand[0]];

        if (userCLICommand) {
            userCLICommand.callback(state)
        }

        rl.prompt();
    }); 
}