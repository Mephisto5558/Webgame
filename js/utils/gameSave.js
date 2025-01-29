import { createElement } from './createElement.js';

export function saveGame() {
  globalThis.localStorage.setItem('saveState', btoa(JSON.stringify({
    shopItems, clickCount, stats
  })));
}

export function loadGame(save = atob(globalThis.localStorage.getItem('saveState') ?? '')) {
  if (!save) return;

  /** @type {import('.').SaveData} */
  const data = JSON.parse(save);

  globalThis.clickCount = data.clickCount;
  globalThis.stats = { ...globalThis.stats, ...data.stats };

  let /** @type {import('../shop').ShopItemIDs} */id, shopData;
  for ([id, shopData] of Object.entries(data.shopItems)) {
    for (const [k, v] of Object.entries(shopData)) shopItems[id][k] = v;
    shopItems[id].refreshUseabilities();
  }
}

export function deleteSave() {
  globalThis.localStorage.removeItem('saveState');
  globalThis.noSaveOnExit = true;

  globalThis.location.reload();
}

export function importSave() {
  createElement('input', { type: 'file', accept: '.json', onchange: e => {
    try { loadGame(e.target.files[0].text()); }
    catch (err) {
      void Swal.fire('Invalid File', `The selected file is not a valid save file.<br>${err.toString()}`, 'error');
    }
  } }).click();
}