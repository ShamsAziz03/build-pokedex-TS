import {State} from "./state.js"
import {PokeInfo} from "./pokeapi.js"

export async function commandPokedex(state: State):Promise<void>{

const info:Record<string,PokeInfo>=state.pokedex;
console.log("Your Pokedex:");

for(const key in info){
console.log(`- ${key}`);
};

}
