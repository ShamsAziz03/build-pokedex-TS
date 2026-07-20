import {Cache} from "./pokecache.js"

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  pokeCache:Cache;
  constructor() {
   this.pokeCache=new Cache(3600000);
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
  const fullUrl =
    pageURL === undefined
      ? `${PokeAPI.baseURL}/location-area`
      : pageURL;

  const cachedData:ShallowLocations|undefined=this.pokeCache.get(fullUrl);
  if(cachedData!== undefined){console.log("from cache\n"); return cachedData;}  

  const result = await fetch(fullUrl);
  const response = await result.json();

  this.pokeCache.add(fullUrl,response);
  return response;
}

  async fetchLocation(locationName: string): Promise<Location> {
     const fullUrl =`${PokeAPI.baseURL}/location-area/${locationName}`;

     const cachedData:Location|undefined=this.pokeCache.get(fullUrl);
     if(cachedData!== undefined) return cachedData;

     const result = await fetch(fullUrl);
     const response = await result.json();
     this.pokeCache.add(fullUrl,response);
     return response;
  }

  
   async getInfo(pokeName: string): Promise<PokeInfo> {
     const fullUrl =`${PokeAPI.baseURL}/pokemon/${pokeName}`;

     const cachedData:PokeInfo|undefined=this.pokeCache.get(fullUrl);
     if(cachedData!== undefined) return cachedData;

     const result = await fetch(fullUrl);
     const response = await result.json();
     this.pokeCache.add(fullUrl,response);
     return response;
  }


}

export type ResultObject={
 name:string;
 url:string;
}

export type ShallowLocations = {
  count:number;
  next:string;
  previous:string;
  results: ResultObject[];
};

export type Location = {
  pokemon_encounters: {
    pokemon: {
      name: string;
      url: string;
    };
  }[];
};

export type PokeInfo={
id:number;
name:string;
base_experience:number;
height:number;
weight:number;
types:{
type:{
name:string;
url:string;
}
}[];
stats:{
base_stat:number;
effort:number;
stat:{
name:string;
url:string;
}
}[];
};
