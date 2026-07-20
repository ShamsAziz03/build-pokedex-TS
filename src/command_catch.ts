import {State} from "./state.js"
import {PokeInfo} from "./pokeapi.js"

export async function commandCatch(state: State, ...args:string[]):Promise<void>{
console.log(`Throwing a Pokeball at ${args[0]?? 'pikachu'}...`);

const response:PokeInfo =await state.pokeObj.getInfo(args.length>0?args[0]:'pikachu');
const chance = 1 - response.base_experience / 500;
if(Math.random()<=chance){
state.pokedex[response.name]=response;
console.log(`${response.name} was caught!`);
}
else{
console.log(`${response.name} escaped!`);
}

}
