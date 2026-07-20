import {State} from "./state.js"
import {ShallowLocations} from "./pokeapi.js"

export async function commandMapb(state: State):Promise<void>{
state.nextLocationsURL=state.nextLocationsURL-20;
state.prevLocationsURL=state.prevLocationsURL-20;
const path=`https://pokeapi.co/api/v2/location-area?offset=${state.prevLocationsURL>=0?state.prevLocationsURL:0}&limit=20`;
const response:ShallowLocations =await state.pokeObj.fetchLocations(path);
const result=response.results;
result.forEach((location) => {
   console.log(location.name);
});
}
