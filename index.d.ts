import type Sweetalert2 from 'sweetalert2';

declare global {
  // @ts-expect-error must be done this way to work
  const Swal = Sweetalert2;

  type ShopOptions = 'clickPerClick' | 'autoClick';

  type countContainer = HTMLDivElement;
  type currentCount = HTMLSpanElement;
  type cpsCount = HTMLSpanElement;
  type shop = HTMLDivElement;

  let clickCount: number;
  type shopItems = Record<ShopOptions, {
    unlockCost: number;
    level: number;
    getCost(): number;
    getIncrease(): number;
  }>;

  type isButton = (element?: Element) => element is HTMLButtonElement;
}

export declare namespace functs {
  function buyUpgrade(event: MouseEvent & { target: { id: ShopOptions } }): never;
}