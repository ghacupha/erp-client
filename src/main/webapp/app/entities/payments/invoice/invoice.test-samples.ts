import dayjs from 'dayjs/esm';

import { CurrencyTypes } from 'app/entities/enumerations/currency-types.model';

import { IInvoice, NewInvoice } from './invoice.model';

export const sampleWithRequiredData: IInvoice = {
  id: 91509,
  invoiceNumber: 'Avon Mandatory',
  currency: CurrencyTypes['GBP'],
};

export const sampleWithPartialData: IInvoice = {
  id: 89161,
  invoiceNumber: 'Venezuela Arkansas auxiliary',
  currency: CurrencyTypes['CNY'],
  fileUploadToken: 'empower Buckinghamshire Florida',
};

export const sampleWithFullData: IInvoice = {
  id: 13401,
  invoiceNumber: 'Account',
  invoiceDate: dayjs('2021-06-26'),
  invoiceAmount: 91014,
  currency: CurrencyTypes['CAD'],
  paymentReference: 'Security Granite HTTP',
  dealerName: 'mobile',
  fileUploadToken: 'South',
  compilationToken: 'application invoice',
};

export const sampleWithNewData: NewInvoice = {
  invoiceNumber: 'Nevada Shoes Ranch',
  currency: CurrencyTypes['USD'],
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
