import dayjs from 'dayjs/esm';

import { ISettlementRequisition, NewSettlementRequisition } from './settlement-requisition.model';
import { PaymentStatus } from '../../erp-common/enumerations/payment-status.model';

export const sampleWithRequiredData: ISettlementRequisition = {
  id: 65430,
  serialNumber: '3669a621-17cd-425d-86dc-9a0539bbfac4',
  timeOfRequisition: dayjs('2022-10-19T07:34'),
  requisitionNumber: 'Handmade',
  paymentAmount: 31557,
  paymentStatus: PaymentStatus['SENT_FOR_FURTHER_APPROVAL'],
};

export const sampleWithPartialData: ISettlementRequisition = {
  id: 48803,
  serialNumber: 'fc89af40-7b18-4b2b-b7a2-523c5a39650c',
  timeOfRequisition: dayjs('2022-10-19T06:34'),
  requisitionNumber: 'systems',
  paymentAmount: 49850,
  paymentStatus: PaymentStatus['RETURNED_TO_SENDER'],
};

export const sampleWithFullData: ISettlementRequisition = {
  id: 81518,
  description: 'solid Cotton',
  serialNumber: '958dc829-d7e1-4b49-8003-3e7c6668dd1b',
  timeOfRequisition: dayjs('2022-10-19T00:00'),
  requisitionNumber: 'solutions eyeballs United',
  paymentAmount: 56866,
  paymentStatus: PaymentStatus['PROCESSED'],
};

export const sampleWithNewData: NewSettlementRequisition = {
  serialNumber: 'a554843e-9c69-4b86-bd6d-a263e1c59c3b',
  timeOfRequisition: dayjs('2022-10-19T00:11'),
  requisitionNumber: 'black',
  paymentAmount: 69879,
  paymentStatus: PaymentStatus['RETURNED_TO_SENDER'],
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
