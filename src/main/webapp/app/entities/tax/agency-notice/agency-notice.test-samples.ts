import dayjs from 'dayjs/esm';

import { AgencyStatusType } from 'app/entities/enumerations/agency-status-type.model';

import { IAgencyNotice, NewAgencyNotice } from './agency-notice.model';

export const sampleWithRequiredData: IAgencyNotice = {
  id: 52699,
  referenceNumber: 'knowledge synergize',
  assessmentAmount: 79782,
  agencyStatus: AgencyStatusType['NOT_CLEARED'],
};

export const sampleWithPartialData: IAgencyNotice = {
  id: 81411,
  referenceNumber: 'Automated Licensed',
  assessmentAmount: 38278,
  agencyStatus: AgencyStatusType['CLEARED'],
};

export const sampleWithFullData: IAgencyNotice = {
  id: 78337,
  referenceNumber: 'European',
  referenceDate: dayjs('2022-02-03'),
  assessmentAmount: 12030,
  agencyStatus: AgencyStatusType['CLEARED'],
  assessmentNotice: '../fake-data/blob/hipster.png',
  assessmentNoticeContentType: 'unknown',
};

export const sampleWithNewData: NewAgencyNotice = {
  referenceNumber: 'Spurs Account SMS',
  assessmentAmount: 81068,
  agencyStatus: AgencyStatusType['CLEARED'],
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
