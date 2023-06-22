import dayjs from 'dayjs/esm';

import { CurrencyTypes } from 'app/entities/enumerations/currency-types.model';

import { ISignedPayment, NewSignedPayment } from './signed-payment.model';

export const sampleWithRequiredData: ISignedPayment = {
  id: 43635,
  transactionNumber: 'invoice',
  transactionDate: dayjs('2021-09-19'),
  transactionCurrency: CurrencyTypes['KES'],
  transactionAmount: 2940,
};

export const sampleWithPartialData: ISignedPayment = {
  id: 98835,
  transactionNumber: 'Keys',
  transactionDate: dayjs('2021-09-20'),
  transactionCurrency: CurrencyTypes['AED'],
  transactionAmount: 12740,
  dealerName: 'sensor',
  compilationToken: 'Papua Streets',
};

export const sampleWithFullData: ISignedPayment = {
  id: 90233,
  transactionNumber: 'deliver JSON RSS',
  transactionDate: dayjs('2021-09-20'),
  transactionCurrency: CurrencyTypes['INR'],
  transactionAmount: 91573,
  dealerName: 'cyan Architect Designer',
  fileUploadToken: 'Mouse Liberian Algerian',
  compilationToken: 'SMTP matrix',
};

export const sampleWithNewData: NewSignedPayment = {
  transactionNumber: 'Avon',
  transactionDate: dayjs('2021-09-20'),
  transactionCurrency: CurrencyTypes['UGX'],
  transactionAmount: 63943,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
