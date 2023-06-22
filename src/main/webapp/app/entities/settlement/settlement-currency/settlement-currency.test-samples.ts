import { ISettlementCurrency, NewSettlementCurrency } from './settlement-currency.model';

export const sampleWithRequiredData: ISettlementCurrency = {
  id: 85808,
  iso4217CurrencyCode: 'blu',
  currencyName: 'Argentine Peso',
  country: 'Papua New Guinea',
};

export const sampleWithPartialData: ISettlementCurrency = {
  id: 54952,
  iso4217CurrencyCode: 'Chi',
  currencyName: 'Uganda Shilling',
  country: 'Paraguay',
  fileUploadToken: 'Caicos Islands connecting',
  compilationToken: 'Gloves Books',
};

export const sampleWithFullData: ISettlementCurrency = {
  id: 43214,
  iso4217CurrencyCode: 'str',
  currencyName: 'Rupiah',
  country: 'Bangladesh',
  numericCode: 'Cheese Silver',
  minorUnit: 'Small magenta',
  fileUploadToken: 'channels Paradigm',
  compilationToken: 'interfaces',
};

export const sampleWithNewData: NewSettlementCurrency = {
  iso4217CurrencyCode: 'Hai',
  currencyName: 'Libyan Dinar',
  country: 'France',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
