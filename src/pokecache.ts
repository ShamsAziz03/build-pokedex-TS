export type CacheEntry<T>={
createdAt:number;
value:T;
}

export class Cache {
  #cache = new Map<string, CacheEntry<any>>();
  #reapIntervalId: NodeJS.Timeout | undefined = undefined;
  #interval: number;

  constructor(interval:number){
   this.#interval=interval;
   this.#startReapLoop(); 
  }

  add<T>(key:string, val:T):void{
    const data={
      createdAt:Date.now(),
      value:val,
     };
    this.#cache.set(key,data);     
  } 

  get<T>(key:string):T|undefined{
    return this.#cache?.get(key)?.value; 
  }

  #reap():void{
    console.log("reaping");
    for (const [key, val] of this.#cache){
     if(val.createdAt<(Date.now()-this.#interval)){
      console.log("deleting"); this.#cache.delete(key); }}
  }


  #startReapLoop():void{
    this.#reapIntervalId = setInterval(() => {
      this.#reap();
    }, this.#interval);
  }

  
  stopReapLoop():void{
   clearInterval(this.#reapIntervalId);
   this.#reapIntervalId=undefined;
  }


}

