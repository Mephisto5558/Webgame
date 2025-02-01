import{createElement}from"./createElement.js";function loadObjData(e,a,t){for(var[o,l]of Object.entries(e))if(o in a){for(var[i,s]of Object.entries(l))a[o][i]=s;t?.(a[o])}}function saveGame(){globalThis.localStorage.setItem("saveState",btoa(JSON.stringify({shopItems:shopItems,stats:stats,clickCount:clickCount,advancements:advancements})))}function loadGame(e=atob(globalThis.localStorage.getItem("saveState")??"")){if(e){var a,t,e=JSON.parse(e);for([a,t]of Object.entries(e))switch(a){case"clickCount":"number"==typeof t&&(globalThis[a]+=t);break;case"stats":globalThis[a]={...globalThis[a],...t};break;case"advancements":loadObjData(Object.fromEntries(Object.entries(t).toSorted((e,a)=>e[1].unlockedTimestamp-a[1].unlockedTimestamp)),globalThis[a],e=>e.unlocked&&e.writeMessage());break;case"shopItems":loadObjData(t,globalThis[a],e=>e.refreshUseabilities());break;default:loadObjData(t,globalThis[a])}}}async function deleteSave(){(await Swal.fire({title:"Are you sure you want to do that?",html:'<p>This action is irreversible.<br>Consider exporting your save first.<br><br><em style="font-size: .75rem; color: grey">The site will reload after your save has been deleted.</em></p>',icon:"warning",showCancelButton:!0,focusCancel:!0})).isConfirmed&&(globalThis.localStorage.removeItem("saveState"),globalThis.noSaveOnExit=!0,globalThis.location.reload())}async function importSave(e){e||await Swal.fire("User interaction required","Click ok to open the file selector","info"),createElement("input",{type:"file",accept:".save",startIn:"downloads",onchange:async e=>{try{loadGame(atob(await e.target.files[0].text()))}catch(e){return void Swal.fire("Invalid File","The selected file is not a valid save file.<br>"+e.toString(),"error")}globalThis.noSaveOnExit=!0,globalThis.location.reload()}}).click()}function exportSave(){saveGame();var e=URL.createObjectURL(new Blob([globalThis.localStorage.getItem("saveState")],{type:"application/base64"}));createElement("a",{href:e,download:`webgame_${(new Date).toISOString()}.save`}).click(),URL.revokeObjectURL(e)}export{saveGame,loadGame,deleteSave,importSave,exportSave};