import type Sweetalert2 from 'sweetalert2';

declare global {
  // @ts-expect-error must be done this way to work
  const Swal = Sweetalert2;

  interface NodeList {
    namedItem: HTMLCollection['namedItem'];
  }

  type ShopOptions = 'clickPerClick' | 'autoClick';

  type countContainer = HTMLDivElement;
  type currentCount = HTMLSpanElement;
  type cpsCount = HTMLSpanElement;
  type shop = HTMLDivElement;
  type shopLevelContainer = NodeListOf<HTMLSpanElement & { id: `level-${ShopOptions}` }>;

  let clickCount: number;
  type shopItems = Record<ShopOptions, {
    unlockCost: number;
    level: number;
    getCost(): number;
    getIncrease(): number;
    addLevel(): void;
  }>;

  type isButton = (element?: Element) => element is HTMLButtonElement;
}

export declare namespace functs {
  function buyUpgrade(event: MouseEvent & { target: { id: ShopOptions } }): never;
}