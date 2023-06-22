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
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { IUniversallyUniqueMapping } from 'app/entities/system/universally-unique-mapping/universally-unique-mapping.model';
import { IReportStatus } from 'app/entities/reports/report-status/report-status.model';
import { ISecurityClearance } from 'app/entities/people/security-clearance/security-clearance.model';
import { IApplicationUser } from 'app/entities/people/application-user/application-user.model';
import { IDealer } from 'app/entities/people/dealer/dealer.model';
import { ISystemModule } from 'app/entities/system/system-module/system-module.model';
import { IReportDesign } from 'app/entities/reports/report-design/report-design.model';
import { IAlgorithm } from 'app/entities/system/algorithm/algorithm.model';

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
