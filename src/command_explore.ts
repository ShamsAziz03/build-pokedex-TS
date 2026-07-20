import {State} from "./state.js"
import {Location} from "./pokeapi.js"

export async function commandExplore(state: State, ...args:string[]):Promise<void>{
const response:Location =await state.pokeObj.fetchLocation(args.length>0?args[0]:'pastoria-city-area');
const result=response.pokemon_encounters;
result.forEach((location) => {
   console.log(location.pokemon.name);
});
}
