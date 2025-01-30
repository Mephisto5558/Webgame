import { statsListElem } from '../constants.js';
import { createElement } from '../utils/index.js';

/** @type {import('.')['showStats']} */
globalThis.showStats = function showStats() {
  statsListElem.style.display = statsListElem.style.display ? '' : 'unset';

  if (!statsListElem.style.display) return; // display is none via css

  statsListElem.textContent = ''; // Clear all childs
  for (const [k, v] of Object.entries(stats)) {
    createElement(
      'span',
      { textContent: v },
      createElement(
        'li',
        { id: k, textContent: k.replaceAll(/[A-Z]/g, e => ' ' + e.toLowerCase()) + ':' },
        statsListElem
      )
    );
  }
};