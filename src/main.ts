// repl.js actually refers to repl.ts
import { startREPL } from "./repl.js";
import { initSate, State } from "./state.js";

function main() {
    let state: State = initSate();
    startREPL(state);
}

main();