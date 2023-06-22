import dayjs from 'dayjs/esm';

import { ReportStatusTypes } from 'app/entities/enumerations/report-status-types.model';

import { IPdfReportRequisition, NewPdfReportRequisition } from './pdf-report-requisition.model';

export const sampleWithRequiredData: IPdfReportRequisition = {
  id: 83654,
  reportName: 'frame Shoes overriding',
  userPassword: 'Ball integrated port',
  ownerPassword: 'methodical efficient',
  reportId: '1d8bfb08-7d8e-4703-822f-df8251dc74c4',
};

export const sampleWithPartialData: IPdfReportRequisition = {
  id: 28830,
  reportName: 'purple Data',
  userPassword: 'initiatives',
  ownerPassword: 'Pants Korean override',
  reportFileChecksum: 'synthesizing',
  reportId: '97bc7451-b3a8-49ee-babb-6fec87729429',
};

export const sampleWithFullData: IPdfReportRequisition = {
  id: 4816,
  reportName: 'maroon generating',
  reportDate: dayjs('2022-05-19'),
  userPassword: 'Israel',
  ownerPassword: 'algorithm Rustic',
  reportFileChecksum: 'grey holistic payment',
  reportStatus: ReportStatusTypes['GENERATING'],
  reportId: '1b7bf154-6c84-4327-8c12-bffeb68bc3b7',
};

export const sampleWithNewData: NewPdfReportRequisition = {
  reportName: 'orchestrate Operations monitor',
  userPassword: 'Verde bluetooth',
  ownerPassword: 'Via digital virtual',
  reportId: 'f2a322ac-883e-4ce2-a652-5087eb12ec27',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
