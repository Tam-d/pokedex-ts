import { createInterface } from "node:readline";

export function cleanInput(input: string): string[] {
  return input.toLowerCase().trim().split(/\s+/);
}

export function startREPL() {

    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > "
    });

    rl.prompt();

    rl.on('line', (input:string) => {
        if(input.length === 0)
            rl.prompt;

        let result = cleanInput(input);

        console.log(`Your command was: ${result[0]}`);

        rl.prompt();
    }); 
}