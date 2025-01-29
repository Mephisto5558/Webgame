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

export async function importSave() {
  await Swal.fire('User interaction required', 'Click ok to open the file selector', 'info');
  createElement('input', { type: 'file', accept: '.save', onchange: async e => {
    try { loadGame(atob(await e.target.files[0].text())); }
    catch (err) {
      void Swal.fire('Invalid File', `The selected file is not a valid save file.<br>${err.toString()}`, 'error');
    }
  } }).click();
}

export function exportSave() {
  saveGame(); // update on localStorage

  const url = URL.createObjectURL(new Blob([globalThis.localStorage.getItem('saveState')], { type: 'text/plain' }));

  createElement('a', { href: url, download: `webgame_${new Date().toISOString()}.save` }).click();

  URL.revokeObjectURL(url); // clear up space
}