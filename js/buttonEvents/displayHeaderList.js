import { isButton } from '../utils/index.js';

/** @type {NodeListOf<HTMLLIElement>} */
const headerLists = document.querySelectorAll('header > [id$=container] > [id$=list]');

/** @type {import('./index.js')['displayHeaderList']} */
export function displayHeaderList(event) {
  if (!isButton(event.target)) return;

  for (const headerList of headerLists)
    headerList.style.display = headerList.id?.startsWith(event.target.id.split('-')[0]) && !headerList.style.display ? 'unset' : '';
}