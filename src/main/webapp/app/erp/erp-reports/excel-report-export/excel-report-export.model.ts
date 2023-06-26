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
import { IPlaceholder } from '../../erp-pages/placeholder/placeholder.model';
import { IAlgorithm } from '../../erp-pages/algorithm/algorithm.model';
import { ISecurityClearance } from '../../erp-pages/security-clearance/security-clearance.model';
import { IApplicationUser } from '../../erp-pages/application-user/application-user.model';
import { IReportStatus } from '../report-status/report-status.model';
import { ISystemModule } from '../../erp-pages/system-module/system-module.model';
import { IReportDesign } from '../report-design/report-design.model';
import { IUniversallyUniqueMapping } from '../../erp-pages/universally-unique-mapping/universally-unique-mapping.model';
import { IDealer } from '../../erp-pages/dealers/dealer/dealer.model';

export interface IExcelReportExport {
  id: number;
  reportName?: string | null;
  reportPassword?: string | null;
  reportNotes?: string | null;
  reportNotesContentType?: string | null;
  fileCheckSum?: string | null;
  reportFile?: string | null;
  reportFileContentType?: string | null;
  reportTimeStamp?: dayjs.Dayjs | null;
  reportId?: string | null;
  placeholders?: Pick<IPlaceholder, 'id' | 'description'>[] | null;
  parameters?: Pick<IUniversallyUniqueMapping, 'id' | 'mappedValue'>[] | null;
  reportStatus?: Pick<IReportStatus, 'id'> | null;
  securityClearance?: Pick<ISecurityClearance, 'id' | 'clearanceLevel'> | null;
  reportCreator?: Pick<IApplicationUser, 'id' | 'applicationIdentity'> | null;
  organization?: Pick<IDealer, 'id' | 'dealerName'> | null;
  department?: Pick<IDealer, 'id' | 'dealerName'> | null;
  systemModule?: Pick<ISystemModule, 'id' | 'moduleName'> | null;
  reportDesign?: Pick<IReportDesign, 'id' | 'designation'> | null;
  fileCheckSumAlgorithm?: Pick<IAlgorithm, 'id' | 'name'> | null;
}

export type NewExcelReportExport = Omit<IExcelReportExport, 'id'> & { id: null };
