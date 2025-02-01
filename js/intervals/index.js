import { cpsCountSpan, statsListElem } from '../constants.js';
import { saveGame } from '../utils/index.js';

setInterval(() => {
  const clicks = shopItems.autoClick.calc.getIncrease();
  if (clicks) clickCount += clicks;
}, 1000);

let oldClickCount;
setInterval(() => {
  if (oldClickCount === undefined) { // Prevent milions of cps on game load
    oldClickCount = clickCount;
    return;
  }

  const cps = clickCount - oldClickCount;
  if (cpsCountSpan.dataset.value != cps) {
    cpsCountSpan.dataset.value = cps;
    cpsCountSpan.textContent = cps.toLocaleString();
  }
  if (cps > stats.hightestCPS) stats.hightestCPS = cps;
  oldClickCount = clickCount;
}, 1000);

setInterval(saveGame, 60_000);

setInterval(() => {
  for (const advancement of Object.values(advancements))
    if (advancement.unlocked && !advancement.messageElement) advancement.writeMessage();
}, 1000);

setInterval(() => {
  if (!statsListElem.style.display) return; // Hidden by css

  for (const [k, v] of Object.entries(stats)) {
    /** @type {HTMLSpanElement} */
    const elem = statsListElem.children.namedItem(k).children.namedItem('count-span');
    if (elem.dataset.value == v) continue;

    if (v == 0) {
      elem.dataset.value &&= 0;
      elem.textContent &&= '';
    }
    else {
      elem.dataset.value = v;
      elem.textContent = v.toLocaleString();
    }
  }
}, 33); // around 30 times per second (aka 30FPS)