import { IReportContentType, NewReportContentType } from './report-content-type.model';

export const sampleWithRequiredData: IReportContentType = {
  id: 71292,
  reportTypeName: 'Granite hack',
  reportFileExtension: 'program attitude Future',
};

export const sampleWithPartialData: IReportContentType = {
  id: 4869,
  reportTypeName: 'applications Nebraska',
  reportFileExtension: 'Massachusetts',
};

export const sampleWithFullData: IReportContentType = {
  id: 56475,
  reportTypeName: 'Intelligent Account',
  reportFileExtension: 'Illinois Alabama',
};

export const sampleWithNewData: NewReportContentType = {
  reportTypeName: 'mobile',
  reportFileExtension: 'Executive transparent',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
