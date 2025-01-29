import { isButton } from '../utils/index.js';

/** @type {import('.')['buyUpgrade']} */
export function buyUpgrade(event) {
  if (
    !isButton(event.target)
    || !shopItems[event.target.id].affordable
  ) return;

  clickCount -= shopItems[event.target.id].calc.getCost();
  shopItems[event.target.id].level++;
}