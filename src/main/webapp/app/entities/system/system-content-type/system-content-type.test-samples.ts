import { SystemContentTypeAvailability } from 'app/entities/enumerations/system-content-type-availability.model';

import { ISystemContentType, NewSystemContentType } from './system-content-type.model';

export const sampleWithRequiredData: ISystemContentType = {
  id: 75492,
  contentTypeName: 'neural neural-net',
  contentTypeHeader: 'program bus',
  availability: SystemContentTypeAvailability['NOT_SUPPORTED'],
};

export const sampleWithPartialData: ISystemContentType = {
  id: 48606,
  contentTypeName: 'Credit',
  contentTypeHeader: 'Liberian Technician SQL',
  comments: '../fake-data/blob/hipster.txt',
  availability: SystemContentTypeAvailability['NOT_SUPPORTED'],
};

export const sampleWithFullData: ISystemContentType = {
  id: 93397,
  contentTypeName: 'reboot static Fresh',
  contentTypeHeader: 'Rubber forecast enable',
  comments: '../fake-data/blob/hipster.txt',
  availability: SystemContentTypeAvailability['NOT_SUPPORTED'],
};

export const sampleWithNewData: NewSystemContentType = {
  contentTypeName: 'navigate',
  contentTypeHeader: 'Account invoice invoice',
  availability: SystemContentTypeAvailability['SUPPORTED'],
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
