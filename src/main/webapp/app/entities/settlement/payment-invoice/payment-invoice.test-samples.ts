import dayjs from 'dayjs/esm';

import { IPaymentInvoice, NewPaymentInvoice } from './payment-invoice.model';

export const sampleWithRequiredData: IPaymentInvoice = {
  id: 46546,
  invoiceNumber: 'synergize',
};

export const sampleWithPartialData: IPaymentInvoice = {
  id: 31865,
  invoiceNumber: 'compelling Buckinghamshire orchid',
  fileUploadToken: 'COM',
  compilationToken: 'Tonga matrix synthesizing',
  remarks: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: IPaymentInvoice = {
  id: 54300,
  invoiceNumber: 'program whiteboard',
  invoiceDate: dayjs('2022-02-03'),
  invoiceAmount: 67694,
  fileUploadToken: 'ivory Accountability Towels',
  compilationToken: 'Chair Jewelery plum',
  remarks: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewPaymentInvoice = {
  invoiceNumber: 'out-of-the-box context-sensitive B2B',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
