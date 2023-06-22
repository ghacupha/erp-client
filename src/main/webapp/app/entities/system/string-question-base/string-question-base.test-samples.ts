import { ControlTypes } from 'app/entities/enumerations/control-types.model';

import { IStringQuestionBase, NewStringQuestionBase } from './string-question-base.model';

export const sampleWithRequiredData: IStringQuestionBase = {
  id: 49305,
  key: 'black',
  label: 'Wooden Mouse Georgia',
  order: 63025,
  controlType: ControlTypes['PASSWORD'],
};

export const sampleWithPartialData: IStringQuestionBase = {
  id: 90608,
  key: 'deposit bandwidth',
  label: 'Sleek',
  order: 10170,
  controlType: ControlTypes['EMAIL'],
  placeholder: 'Fish',
  iterable: true,
};

export const sampleWithFullData: IStringQuestionBase = {
  id: 84425,
  value: 'Dinar invoice Quality',
  key: 'application',
  label: 'Personal incubate',
  required: true,
  order: 78543,
  controlType: ControlTypes['MONTH'],
  placeholder: 'disintermediate PNG Washington',
  iterable: false,
};

export const sampleWithNewData: NewStringQuestionBase = {
  key: 'Associate Technician',
  label: 'Human',
  order: 20540,
  controlType: ControlTypes['NUMBER'],
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
