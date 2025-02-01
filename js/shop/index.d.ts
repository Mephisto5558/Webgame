declare abstract class BaseShopItem<ID extends string = string, NAME extends string = string> {
  id: ID;
  name: NAME;
  unlockCost: number;

  /** clickCount >= half the unlockCost */
  unlocked: boolean;

  /** Can either be unlocked or upgraded */
  affordable: boolean;
  levelOverviewSpan: HTMLSpanElement & { id: `level-${ID}` };
  levelUpButton: HTMLButtonElement & { id: ID; textContent: NAME };
  level: number;

  calc: {
    getCost(this: BaseShopItem): number;
    getIncrease(this: BaseShopItem): number;
  };

  addToDOM(): this;
  refreshUseabilities(): void;

  constructor(id: ID, name: NAME);

  /** Object with id, name and level */
  toJSON(): { level: BaseShopItem['level'] };
}

type CalcMethods = Record<string, ((this: ShopItem, ...args: unknown[]) => unknown)>;
export class ShopItem<
  ID extends string = string, NAME extends string = string,
  CALC_METHODS extends CalcMethods = CalcMethods
> extends BaseShopItem<ID, NAME> {
  constructor(id: ID, name: NAME, calcMethods?: CALC_METHODS);

  calc: BaseShopItem['calc'] & CALC_METHODS;
}

type ShopItemIDs = 'clickPerClick' | 'autoClick';