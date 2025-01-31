import { statsListElem } from '../constants.js';
import { createElement } from '../utils/index.js';

globalThis.stats = {
  realClickCount: 0,
  hightestCPS: 0
};

for (const [k, v] of Object.entries(stats)) {
  createElement(
    'span', { id: 'count-span', textContent: v.toLocaleString() },
    createElement(

      // The regexes add spaces before uppercase letters and lowercase said letters. Does not match acronyms.
      'li', { id: k, textContent: k.replaceAll(/(?<![A-Z])[A-Z]/g, ' $&').replaceAll(/[A-Z][^A-Z]/g, e => e.toLowerCase()) + ':' },
      statsListElem
    )
  );
}