import './stats/index.js';
import { saveGame, loadGame } from './utils/index.js';

/* eslint-disable sonarjs/no-wildcard-import */
import * as shop from './shop/index.js'; // Required for a global variable
import * as buttonEvents from './buttonEvents/index.js';
import * as intervals from './intervals/index.js';
import * as utils from './utils/index.js';
/* eslint-enable sonarjs/no-wildcard-import */

loadGame();
window.addEventListener('beforeunload', () => {
  if (!globalThis.noSaveOnExit) saveGame(); // set by deleteSave()
});

if (new URLSearchParams(globalThis.location.search).has('dev')) {
  for (const file of [buttonEvents, intervals, shop, utils])
    for (const [k, v] of Object.entries(file)) globalThis[k] = v;
}