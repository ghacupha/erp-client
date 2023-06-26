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

import { IPdfReportRequisition, NewPdfReportRequisition } from './pdf-report-requisition.model';
import { ReportStatusTypes } from '../../erp-common/enumerations/report-status-types.model';

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
