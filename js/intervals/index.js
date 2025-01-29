import { cpsCountSpan } from '../constants.js';
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