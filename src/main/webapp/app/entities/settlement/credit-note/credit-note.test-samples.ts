import dayjs from 'dayjs/esm';

import { ICreditNote, NewCreditNote } from './credit-note.model';

export const sampleWithRequiredData: ICreditNote = {
  id: 23983,
  creditNumber: 'Table Polarised Flat',
  creditNoteDate: dayjs('2022-03-20'),
  creditAmount: 13575,
};

export const sampleWithPartialData: ICreditNote = {
  id: 5554,
  creditNumber: 'algorithm Wyoming',
  creditNoteDate: dayjs('2022-03-20'),
  creditAmount: 14931,
};

export const sampleWithFullData: ICreditNote = {
  id: 40775,
  creditNumber: 'Mobility transmit Synergistic',
  creditNoteDate: dayjs('2022-03-20'),
  creditAmount: 31876,
  remarks: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewCreditNote = {
  creditNumber: 'Table portal',
  creditNoteDate: dayjs('2022-03-20'),
  creditAmount: 99881,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
