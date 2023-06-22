import dayjs from 'dayjs/esm';

import { IDeliveryNote, NewDeliveryNote } from './delivery-note.model';

export const sampleWithRequiredData: IDeliveryNote = {
  id: 68396,
  deliveryNoteNumber: 'Orchestrator panel',
  documentDate: dayjs('2022-03-01'),
};

export const sampleWithPartialData: IDeliveryNote = {
  id: 60803,
  deliveryNoteNumber: 'Rubber',
  documentDate: dayjs('2022-03-01'),
  description: 'Re-engineered',
  quantity: 49327,
};

export const sampleWithFullData: IDeliveryNote = {
  id: 91194,
  deliveryNoteNumber: 'mesh Avon',
  documentDate: dayjs('2022-03-02'),
  description: 'User-friendly Car',
  serialNumber: 'invoice relationships Interactions',
  quantity: 7785,
  remarks: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewDeliveryNote = {
  deliveryNoteNumber: 'online Steel',
  documentDate: dayjs('2022-03-02'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
