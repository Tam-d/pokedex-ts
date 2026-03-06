import { CLICommand } from "./state.js";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap } from "./command_map.js";
import { commandMapB } from "./command_map.js";
import { commandExplore } from "./command_explore.js";
import { commandCatch } from "./command_catch.js";

export function getCommands(): Record<string, CLICommand> {
  return {
    exit: {
      name: "exit",
      description: "Exits the pokedex",
      callback: commandExit,
    },

    help: {
        name: "help",
        description: "Displays a help message",
        callback: commandHelp
    },

    map: {
        name: "map",
        description: "Locations from the poki api",
        callback: commandMap
    },

    mapb: {
        name: "mapb",
        description: "Locations from the poki api",
        callback: commandMapB
    },

    explore: {
      name: "explore",
      description: "",
      callback: commandExplore
    },

    catch: {
      name: "catch",
      description: "Attempt to catch a pokemon",
      callback: commandCatch
    }
  };
}