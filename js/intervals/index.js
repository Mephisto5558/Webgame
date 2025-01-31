import { cpsCountSpan, statsListElem } from '../constants.js';
import { saveGame } from '../utils/index.js';

setInterval(() => {
  const clicks = shopItems.autoClick.calc.getIncrease();
  if (clicks) clickCount += clicks;
}, 1000);

let oldClickCount = clickCount;
setInterval(() => {
  const cps = clickCount - oldClickCount;
  if (cpsCountSpan.textContent != cps) cpsCountSpan.textContent = cps;
  oldClickCount = clickCount;
}, 1000);

setInterval(saveGame, 60_000);

setInterval(() => {
  if (!statsListElem.style.display) return; // Hidden by css

  for (const [k, v] of Object.entries(stats)) {
    /** @type {HTMLSpanElement} */
    const elem = statsListElem.children.namedItem(k).children.namedItem('count-span');
    if (elem.textContent == v) continue;

    if (v == 0) elem.textContent &&= '';
    else elem.textContent = v;
  }
}, 33); // around 30 times per second (aka 30FPS)