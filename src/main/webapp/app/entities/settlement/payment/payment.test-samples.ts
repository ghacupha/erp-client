import dayjs from 'dayjs/esm';

import { CurrencyTypes } from 'app/entities/enumerations/currency-types.model';

import { IPayment, NewPayment } from './payment.model';

export const sampleWithRequiredData: IPayment = {
  id: 47537,
  settlementCurrency: CurrencyTypes['UGX'],
};

export const sampleWithPartialData: IPayment = {
  id: 44057,
  paymentNumber: 'Investor hack Curve',
  paymentAmount: 70979,
  settlementCurrency: CurrencyTypes['GBP'],
  fileUploadToken: 'strategic methodical',
  compilationToken: 'boliviano Loan Account',
};

export const sampleWithFullData: IPayment = {
  id: 21456,
  paymentNumber: 'Tunnel',
  paymentDate: dayjs('2021-06-26'),
  invoicedAmount: 42556,
  paymentAmount: 66978,
  description: 'RSS',
  settlementCurrency: CurrencyTypes['CNY'],
  calculationFile: '../fake-data/blob/hipster.png',
  calculationFileContentType: 'unknown',
  dealerName: 'Corporate connect reintermediate',
  purchaseOrderNumber: 'Tasty',
  fileUploadToken: 'hack',
  compilationToken: 'Sleek',
};

export const sampleWithNewData: NewPayment = {
  settlementCurrency: CurrencyTypes['USD'],
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
