import {State} from "./state.js"
import {PokeInfo} from "./pokeapi.js"

export async function commandInspect(state: State, ...args:string[]):Promise<void>{ 
const pokeName=args.length>0?args[0]:"pidgey";
if(state.pokedex[pokeName]===undefined)console.log("you have not caught that pokemon");
else{
const info:PokeInfo=state.pokedex[pokeName]; 
console.log(`Name: ${info.name}`);
console.log(`Height: ${info.height}`);
console.log(`Weight: ${info.weight}`);
console.log("Stats:");
for(const s of info.stats){
console.log(`-${s.stat.name}: ${s.base_stat}`);
};
console.log("Types:");
for(const t of info.types){
console.log(`- ${t.type.name}`);
};

}

}
