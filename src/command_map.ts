import {State} from "./state.js"
import {ShallowLocations} from "./pokeapi.js"

export async function commandMap(state: State):Promise<void>{
const path=`https://pokeapi.co/api/v2/location-area?offset=${state.nextLocationsURL}&limit=20`; 
const response:ShallowLocations =await state.pokeObj.fetchLocations(path);
const result=response.results;
result.forEach((location) => {
   console.log(location.name);
});
state.nextLocationsURL=state.nextLocationsURL+20;
state.prevLocationsURL=state.prevLocationsURL+20;
}
