import { createElement } from './createElement.js';


/** @type {import('./index.js')['loadObjData']} */
function loadObjData(sourceObj, targetObj, additionalFn) {
  for (const [id, data] of Object.entries(sourceObj)) {
    if (!(id in targetObj)) continue;

    for (const [k, v] of Object.entries(data)) targetObj[id][k] = v;
    additionalFn?.(targetObj[id]);
  }
}


export function saveGame() {
  globalThis.localStorage.setItem('saveState', btoa(JSON.stringify({
    shopItems, stats, clickCount, advancements
  })));
}

export function loadGame(save = atob(globalThis.localStorage.getItem('saveState') ?? '')) {
  if (!save) return;

  /** @type {import('./index.js').SaveData} */
  const saveData = JSON.parse(save);
  for (const [k, data] of Object.entries(saveData)) {
    switch (k) {
      case 'clickCount': if (typeof data == 'number') globalThis[k] += data; break;
      case 'stats': globalThis[k] = { ...globalThis[k], data }; break;
      case 'advancements': loadObjData(
        Object.fromEntries(Object.entries(data).toSorted((a, b) => a[1].unlockedTimestamp - b[1].unlockedTimestamp)),
        globalThis[k], e => e.unlocked && e.writeMessage()
      ); break;
      case 'shopItems': loadObjData(data, globalThis[k], e => e.refreshUseabilities()); break;

      default: loadObjData(data, globalThis[k]);
    }
  }
}

export async function deleteSave() {
  const swalRes = await Swal.fire({
    title: 'Are you sure you want to do that?',
    html: '<p>This action is irreversible.<br>Consider exporting your save first.<br><br><em style="font-size: .75rem; color: grey">The site will reload after your save has been deleted.</em></p>',
    icon: 'warning',
    showCancelButton: true,
    focusCancel: true
  });

  if (!swalRes.isConfirmed) return;

  globalThis.localStorage.removeItem('saveState');
  globalThis.noSaveOnExit = true;

  globalThis.location.reload();
}

export async function importSave(event) {
  if (!event) await Swal.fire('User interaction required', 'Click ok to open the file selector', 'info');
  createElement('input', { type: 'file', accept: '.save', startIn: 'downloads', onchange: async e => {
    try { loadGame(atob(await e.target.files[0].text())); }
    catch (err) {
      void Swal.fire('Invalid File', `The selected file is not a valid save file.<br>${err.toString()}`, 'error');
    }
  } }).click();
}

export function exportSave() {
  saveGame(); // update on localStorage

  const url = URL.createObjectURL(new Blob([globalThis.localStorage.getItem('saveState')], { type: 'application/base64' }));

  createElement('a', { href: url, download: `webgame_${new Date().toISOString()}.save` }).click();

  URL.revokeObjectURL(url); // clear up space
}