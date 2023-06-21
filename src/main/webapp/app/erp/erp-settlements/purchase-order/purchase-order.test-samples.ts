import dayjs from 'dayjs/esm';

import { IPurchaseOrder, NewPurchaseOrder } from './purchase-order.model';

export const sampleWithRequiredData: IPurchaseOrder = {
  id: 1775,
  purchaseOrderNumber: 'orchid violet',
};

export const sampleWithPartialData: IPurchaseOrder = {
  id: 59739,
  purchaseOrderNumber: 'lime',
  purchaseOrderDate: dayjs('2022-02-02'),
  compilationToken: 'Freeway Bedfordshire',
};

export const sampleWithFullData: IPurchaseOrder = {
  id: 60703,
  purchaseOrderNumber: 'programming synthesize',
  purchaseOrderDate: dayjs('2022-02-02'),
  purchaseOrderAmount: 26356,
  description: 'Soft Franc Wooden',
  notes: 'neural Greece',
  fileUploadToken: 'hack',
  compilationToken: 'bluetooth Regional Assurance',
  remarks: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewPurchaseOrder = {
  purchaseOrderNumber: 'Lead real-time',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
