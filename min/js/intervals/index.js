import{cpsCountSpan,statsListElem}from"../constants.js";import{saveGame}from"../utils/index.js";setInterval(()=>{var t=shopItems.autoClick.calc.getIncrease();t&&(clickCount+=t)},1e3);let oldClickCount;setInterval(()=>{var t;oldClickCount=(void 0===oldClickCount||(t=clickCount-oldClickCount,cpsCountSpan.dataset.value!=t&&(cpsCountSpan.dataset.value=t,cpsCountSpan.textContent=t.toLocaleString()),t>stats.hightestCPS&&(stats.hightestCPS=t)),clickCount)},1e3),setInterval(saveGame,6e4),setInterval(()=>{for(var t of Object.values(advancements))t.unlocked&&!t.messageElement&&t.writeMessage()},1e3),setInterval(()=>{if(statsListElem.style.display)for(var[t,e]of Object.entries(stats)){t=statsListElem.children.namedItem(t).children.namedItem("count-span");t.dataset.value!=e&&(0==e?(t.dataset.value&&=0,t.textContent&&=""):(t.dataset.value=e,t.textContent=e.toLocaleString()))}},33);