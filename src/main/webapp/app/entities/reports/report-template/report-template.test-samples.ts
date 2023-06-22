import { IReportTemplate, NewReportTemplate } from './report-template.model';

export const sampleWithRequiredData: IReportTemplate = {
  id: 9779,
  catalogueNumber: 'Louisiana deliver optical',
};

export const sampleWithPartialData: IReportTemplate = {
  id: 35910,
  catalogueNumber: 'invoice Buckinghamshire',
};

export const sampleWithFullData: IReportTemplate = {
  id: 17719,
  catalogueNumber: 'Avon revolutionary Officer',
  description: '../fake-data/blob/hipster.txt',
  notes: '../fake-data/blob/hipster.png',
  notesContentType: 'unknown',
  reportFile: '../fake-data/blob/hipster.png',
  reportFileContentType: 'unknown',
  compileReportFile: '../fake-data/blob/hipster.png',
  compileReportFileContentType: 'unknown',
};

export const sampleWithNewData: NewReportTemplate = {
  catalogueNumber: 'paradigms',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
