import { createElement } from '../utils/index.js';

/** @typedef {import('.').Advancement}T_Advancement*/

export class Advancement {
  id; message; unlockCondition; textBox;
  unlockedTimestamp;
  /** @type {T_Advancement['messageElement']}*/ messageElement;

  get unlocked() {
    if (this.unlockCondition()) {
      this.unlockedTimestamp ??= Date.now();
      return true;
    }

    return false;
  }

  get formattedTime() {
    /* eslint-disable-next-line unicorn/no-null */
    if (!this.unlockedTimestamp) return null;

    return new Date(this.unlockedTimestamp).toLocaleString(undefined, {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    });
  }

  /** @type {T_Advancement['writeMessage']} */
  writeMessage() {
    this.messageElement = createElement(
      'p',
      { id: this.id, innerHTML: `<time datetime="${new Date(this.unlockedTimestamp).toISOString()}">${this.formattedTime}</time>: ${this.message}` },
      this.textBox
    );
    this.messageElement.scrollIntoView({ behavior: 'smooth' });

    return this.messageElement;
  }

  /**
   * @param {T_Advancement['id']}id
   * @param {T_Advancement['message']}message
   * @param {T_Advancement['unlockCondition']}unlockCondition
   * @param {T_Advancement['textBox']}textBox
   */
  constructor(id, message, unlockCondition, textBox = document.querySelector('footer')) {
    this.id = id;
    this.message = message;
    this.unlockCondition = unlockCondition.bind(this);
    this.textBox = textBox;
  }

  /** @type {T_Advancement['ToJSON']} */
  toJSON() {
    return { unlockedTimestamp: this.unlockedTimestamp };
  }
}