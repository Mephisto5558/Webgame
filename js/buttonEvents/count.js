/** @type {import('.')['count']} */
export function count() {
  const clicks = shopItems.clickPerClick.calc.getIncrease();
  clickCount += clicks;
}