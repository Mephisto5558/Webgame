import type { Advancement } from '../advancements/index.js';
import type { ShopItem, ShopItemIDs } from '../shop/index.js';

export function isButton(element?: Element): element is HTMLButtonElement;


type HTMLElementData<ELEM> = { [K in keyof ELEM]: ELEM[K] };

// Source: https://github.com/Mephisto5558/Website-Assets/blob/56f69a2711bd80348d81688f629fb3e7c767eb31/js/index.d.ts#L14-L15
export function createElement<
  TAG_NAME extends keyof HTMLElementTagNameMap,
  ELEM extends HTMLElementTagNameMap[TAG_NAME],
  PARENT extends HTMLElement | undefined = undefined
>(
  tagName: TAG_NAME, data?: HTMLElementData<ELEM>, parent?: PARENT, replace?: boolean
): ELEM & (PARENT extends undefined ? unknown : { parentElement: PARENT });

export function saveGame(): void;
export function loadGame(): void;

type SaveShopData = { level: ShopItem['level'] };
type SaveAdvancementData = { unlockedTimestamp: Advancement['unlockedTimestamp'] };
type SaveData = {
  shopItems: Record<ShopItemIDs, SaveShopData>;
  advancements: Record<Advancement['id'], SaveAdvancementData>;
  stats: Stats;
  clickCount: number;
};

declare function loadObjData<
  TARGET extends Record<string, object>
>(
  sourceObj: Record<string, object>, targetObj: TARGET,
  additionalFn?: (obj: TARGET[keyof TARGET]) => unknown
): void;