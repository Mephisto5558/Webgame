import type { ShopItemIDs } from '../shop';

export function buyUpgrade(event: MouseEvent & { target: { id: ShopItemIDs } }): void;
export function count(event: MouseEvent): void;
export function displayHeaderList(event: MouseEvent): void;