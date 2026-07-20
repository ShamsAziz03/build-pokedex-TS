import { createInterface, type Interface } from "readline";
import { stdin, stdout } from 'node:process';
import {getCommands} from "./commands.js"
import {PokeAPI, PokeInfo} from "./pokeapi.js"

export type State={
  pokeObj:PokeAPI;
  nextLocationsURL:number;
  prevLocationsURL: number;
  rl:Interface;
  commands:Record<string, CLICommand>;
  pokedex:Record<string,PokeInfo>;
}

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args:string[]) => Promise<void>;
};

export function initState():State{
const commands=getCommands();

const rl = createInterface({
  input: stdin,
  output: stdout,
  prompt:"Pokedex > ",

});
 const pokeObj=new PokeAPI();

return{
pokeObj:pokeObj,
commands:commands,
rl:rl,
nextLocationsURL:0,
prevLocationsURL:-20,
pokedex:{},
}
}
