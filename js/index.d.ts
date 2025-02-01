import type Sweetalert2 from 'sweetalert2';
import type { ShopItem, ShopItemIDs } from './shop/index.js';
import type { Advancement, AdvancementIDs } from './advancements/index.js';

declare global {
  // @ts-expect-error must be done this way to work
  const Swal = Sweetalert2;

  interface NodeList {
    namedItem: HTMLCollection['namedItem'];
  }

  type shopItems = { [ID in ShopItemIDs]: ShopItem<ID>; };
  type advancements = { [ID in AdvancementIDs]: Advancement<ID> };

  type countContainer = HTMLDivElement;
  type cpsCountSpan = HTMLSpanElement;
  type shop = HTMLDivElement;
  type statsListElem = HTMLUListElement;

  let clickCount: number;
  type Stats = {
    realClickCount: number;
    hightestCPS: number;
  };
}