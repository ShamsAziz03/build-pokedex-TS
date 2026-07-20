import {State} from "./state.js"

export function cleanInput(input:string):string[]{
  const lowerCaseData=input.toLowerCase();
  const trimmedData=lowerCaseData.trim();
  return trimmedData.split(/\s+/);
}

export function startREPL(state:State): void{
state.rl.prompt();
state.rl.on('line', async (line:string):Promise<void> => {
try{
  if(line===""){
     state.rl.prompt();
     return;
   }
    const command=line.trim().toLowerCase().split(" ");
    if(state.commands[command[0]]===undefined)console.log("Unknown command");
   else {
    if(command.length===1) await state.commands[command[0]].callback(state);
    else if(command.length>1) await state.commands[command[0]].callback(state,command[1]);

}
     
     state.rl.prompt();  
   }
catch(err){
console.log(err);
}
});

}
