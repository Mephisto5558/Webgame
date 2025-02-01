/**
 * @type {import('./index.js')['createElement']}
 * @see {@link https://github.com/Mephisto5558/Website-Assets/blob/56f69a2711bd80348d81688f629fb3e7c767eb31/js/vote.js#L197 Source}*/
export function createElement(tagName, data, parent, replace) {
  const element = document.createElement(tagName);
  if (Object.keys(data ?? {}).length) {
    for (const [k, v] of Object.entries(data)) {
      if (v == undefined) continue;
      if (typeof v == 'object') Object.assign(element[k], v);
      else element[k] = v;
    }
  }
  if (parent) replace ? parent.replaceChildren(element) : parent.append(element);
  return element;
}