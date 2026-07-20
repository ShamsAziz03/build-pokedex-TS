import {commandExit} from "./command_exit.js"
import {commandHelp} from "./command_help.js"
import {CLICommand} from "./state.js"
import {commandMap} from "./command_map.js"
import {commandMapb} from "./command_mapb.js"
import {commandExplore} from "./command_explore.js"
import {commandCatch} from "./command_catch.js"
import {commandInspect} from "./command_inspect.js"
import {commandPokedex} from "./command_pokedex.js"

export function getCommands(): Record<string, CLICommand> {
  return {
    exit: {
      name: "exit",
      description: "Exit the Pokedex",
      callback: commandExit,
    },
    help:{
    name:"help",
    description:"Help Command",
    callback:commandHelp,
    },
    map:{
    name:"map",
    description:"Get Pokemons",
    callback:commandMap,
    },
    mapb:{
    name:"mapb",
    description:"get prev 20 pokemons",
    callback:commandMapb,
    },
    explore:{
    name:"explore",
    description:"to get pokemons in some location",
    callback:commandExplore,
    },
    catch:{
    name:"catch",
    description:"to catch pokemon and add it into user's pokedex",
    callback:commandCatch,
    },
    inspect:{
    name:"inspect",
    description:"to get info of catched pokemon",
    callback:commandInspect,
    },
    pokedex:{
    name:"pokedex",
    description:"to get all catched pokemons",
    callback:commandPokedex,
    }
    // can add more commands here
  };
}
