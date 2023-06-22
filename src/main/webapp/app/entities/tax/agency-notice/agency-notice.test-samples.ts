///
/// Erp System - Mark IV No 1 (David Series) Client 1.4.0
/// Copyright © 2021 - 2023 Edwin Njeru (mailnjeru@gmail.com)
///
/// This program is free software: you can redistribute it and/or modify
/// it under the terms of the GNU General Public License as published by
/// the Free Software Foundation, either version 3 of the License, or
/// (at your option) any later version.
///
/// This program is distributed in the hope that it will be useful,
/// but WITHOUT ANY WARRANTY; without even the implied warranty of
/// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
/// GNU General Public License for more details.
///
/// You should have received a copy of the GNU General Public License
/// along with this program. If not, see <http://www.gnu.org/licenses/>.
///

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
