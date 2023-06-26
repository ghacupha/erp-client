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
import { ReportStatusTypes } from '../../erp-common/enumerations/report-status-types.model';
import { IPlaceholder } from '../../erp-pages/placeholder/placeholder.model';
import { IReportContentType } from '../report-content-type/report-content-type.model';
import { IReportTemplate } from '../report-template/report-template.model';
import { IUniversallyUniqueMapping } from '../../erp-pages/universally-unique-mapping/universally-unique-mapping.model';

export interface IReportRequisition {
  id: number;
  reportName?: string | null;
  reportRequestTime?: dayjs.Dayjs | null;
  reportPassword?: string | null;
  reportStatus?: ReportStatusTypes | null;
  reportId?: string | null;
  reportFileAttachment?: string | null;
  reportFileAttachmentContentType?: string | null;
  reportFileCheckSum?: string | null;
  reportNotes?: string | null;
  reportNotesContentType?: string | null;
  placeholders?: Pick<IPlaceholder, 'id' | 'description'>[] | null;
  parameters?: Pick<IUniversallyUniqueMapping, 'id' | 'mappedValue'>[] | null;
  reportTemplate?: Pick<IReportTemplate, 'id' | 'catalogueNumber'> | null;
  reportContentType?: Pick<IReportContentType, 'id' | 'reportTypeName'> | null;
}

export type NewReportRequisition = Omit<IReportRequisition, 'id'> & { id: null };
