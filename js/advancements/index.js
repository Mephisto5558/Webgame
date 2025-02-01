import { cpsCountSpan } from '../constants.js';
import { Advancement } from './advancementClass.js';

const fmt = num => num.toLocaleString();

const advancements = [
  new Advancement('1Click', 'You have clicked the button. Great job!', () => clickCount >= 1),
  new Advancement('firstUpgrade', 'You have upgraded an ability, nice.', () => Object.values(shopItems).some(e => e.level > 0)),
  new Advancement('100Clicks', 'You have reached 100 clicks!', () => clickCount >= 100),
  new Advancement('1TClicks', `You have reached ${fmt(1000)} clicks!`, () => clickCount >= 1000),
  new Advancement('100TClicks', `You have reached ${fmt(100_000)} clicks! Are you bored or sth?`, () => clickCount >= 100_000),
  new Advancement('1MClicks', `You have reached ${fmt(1_000_000)} clicks! Now go touch some grass...`, () => clickCount >= 1_000_000),
  new Advancement('10PassiveCPS', 'You are now gaining 10 CPS without even doing anything! Lazy.', () => shopItems.autoClick.calc.getIncrease() >= 10),
  new Advancement('HighActiveCPS', 'Are you really autoclicking right now...', () => cpsCountSpan.dataset.value / Math.max(1, shopItems.clickPerClick.calc.getIncrease() - 1) >= 50)
];

/** @type {advancements} */
globalThis.advancements = advancements.reduce((acc, e) => {
  acc[e.id] = e;
  return acc;
}, {});