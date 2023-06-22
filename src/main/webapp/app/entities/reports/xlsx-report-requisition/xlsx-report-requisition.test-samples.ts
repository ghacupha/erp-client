import dayjs from 'dayjs/esm';

import { ReportStatusTypes } from 'app/entities/enumerations/report-status-types.model';

import { IXlsxReportRequisition, NewXlsxReportRequisition } from './xlsx-report-requisition.model';

export const sampleWithRequiredData: IXlsxReportRequisition = {
  id: 79782,
  reportName: 'Supervisor Sports Steel',
  userPassword: 'dynamic',
  reportId: '9a8b3456-9546-4ef1-ac4b-0f860a19bd70',
};

export const sampleWithPartialData: IXlsxReportRequisition = {
  id: 89287,
  reportName: 'Handmade Ball',
  userPassword: 'bypass Computer',
  reportId: 'b6c55a07-9147-4823-9822-e7f6e46941db',
};

export const sampleWithFullData: IXlsxReportRequisition = {
  id: 23657,
  reportName: 'bypass copying solid',
  reportDate: dayjs('2022-06-04'),
  userPassword: 'Streamlined',
  reportFileChecksum: 'synthesizing Horizontal',
  reportStatus: ReportStatusTypes['SUCCESSFUL'],
  reportId: '9433ce41-544c-487d-a7a3-96a7642c7174',
};

export const sampleWithNewData: NewXlsxReportRequisition = {
  reportName: 'Human Lodge Brand',
  userPassword: 'Cotton Assistant up',
  reportId: '66e4694a-c6d5-4cbd-b2c3-629f6f3a9b0a',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
