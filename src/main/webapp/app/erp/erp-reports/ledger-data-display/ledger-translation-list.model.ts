export interface ILedgerTranslationList {
  id?: number;
  accountNumber?: string;
  accountName?: string;
}

export class LedgerTranslationList implements ILedgerTranslationList {
  constructor(public id?: number, public accountName?: string, public accountNumber?: string) {}
}
