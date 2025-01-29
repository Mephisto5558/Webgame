import type Sweetalert2 from 'sweetalert2';
import type { ShopItem, ShopItemIDs } from './shop';

declare global {
  // @ts-expect-error must be done this way to work
  const Swal = Sweetalert2;

  interface NodeList {
    namedItem: HTMLCollection['namedItem'];
  }

  type shopItems = { [ID in ShopItemIDs]: ShopItem<ID>; };

  type countContainer = HTMLDivElement;
  type cpsCountSpan = HTMLSpanElement;
  type shop = HTMLDivElement;

  let clickCount: number;
}