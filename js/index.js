import './stats/index.js';
import './advancements/index.js';

import { saveGame, loadGame, isButton } from './utils/index.js';

/* eslint-disable sonarjs/no-wildcard-import */
import * as shop from './shop/index.js'; // Required for a global variable
import * as buttonEvents from './buttonEvents/index.js';
import * as intervals from './intervals/index.js';
import * as utils from './utils/index.js';
/* eslint-enable sonarjs/no-wildcard-import */

if (new URLSearchParams(globalThis.location.search).has('dev')) {
  for (const file of [shop, intervals, utils])
    for (const [k, v] of Object.entries(file)) globalThis[k] = v;
}

for (const [k, v] of Object.entries(buttonEvents)) globalThis[k] = v;

loadGame();
window.addEventListener('beforeunload', () => {
  if (!globalThis.noSaveOnExit) saveGame(); // set by deleteSave()
});

const maxKeyPerSec = 90;
let lastKeyEvent = 0;
globalThis.addEventListener('keydown', e => {
  if (e.key != 'Enter' || !isButton(e.target)) return;

  const now = Date.now();
  if (now - lastKeyEvent <= maxKeyPerSec) return e.preventDefault();
  lastKeyEvent = now;
});