import { statsListElem } from '../constants.js';

/** @type {import('.')['showStats']} */
globalThis.showStats = function showStats() {
  statsListElem.style.display = statsListElem.style.display ? '' : 'unset';
};