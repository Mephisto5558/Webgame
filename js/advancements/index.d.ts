export class Advancement<
  ID extends string = string,
  ULCondition extends () => boolean = () => boolean,
  TextBox extends HTMLElement = HTMLDivElement
> {
  id: ID;
  message: string;
  unlockedTimestamp?: number;

  textBox: TextBox;
  messageElement?: HTMLParagraphElement;

  get unlocked(): boolean;
  get formattedTime(): string | null;

  unlockCondition: ULCondition;
  writeMessage(): HTMLParagraphElement;

  constructor(id: string, message: string, unlockCondition: ULCondition, textBox?: TextBox);

  ToJSON(): { unlockedTimestamp: Advancement['unlockedTimestamp'] };
}

export type AdvancementIDs = '1Click' | 'firstUpgrade' | '100Clicks' | '1TClicks' | '100TClicks' | '1MClicks' | '10PassiveCPS' | 'HighActiveCPS';