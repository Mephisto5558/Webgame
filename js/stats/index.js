import { statsListElem } from '../constants.js';
import { createElement } from '../utils/index.js';

globalThis.stats = {
  realClickCount: 0
};

for (const [k, v] of Object.entries(stats)) {
  createElement(
    'span', { id: 'count-span', textContent: v },
    createElement(
      'li', { id: k, textContent: k.replaceAll(/[A-Z]/g, e => ' ' + e.toLowerCase()) + ':' },
      statsListElem
    )
  );
}