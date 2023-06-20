import dayjs from 'dayjs/esm';

import { IPaymentRequisition, NewPaymentRequisition } from './payment-requisition.model';

export const sampleWithRequiredData: IPaymentRequisition = {
  id: 8848,
};

export const sampleWithPartialData: IPaymentRequisition = {
  id: 96591,
  receptionDate: dayjs('2021-07-20'),
  dealerName: 'Borders violet',
  briefDescription: 'Borders eyeballs methodologies',
  disbursementCost: 17036,
  compilationToken: 'Berkshire Nevada',
};

export const sampleWithFullData: IPaymentRequisition = {
  id: 17624,
  receptionDate: dayjs('2021-07-21'),
  dealerName: 'redundant',
  briefDescription: 'Colorado',
  requisitionNumber: 'bandwidth',
  invoicedAmount: 37604,
  disbursementCost: 60518,
  taxableAmount: 38827,
  requisitionProcessed: true,
  fileUploadToken: 'Bacon lavender',
  compilationToken: 'Iowa',
};

export const sampleWithNewData: NewPaymentRequisition = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
