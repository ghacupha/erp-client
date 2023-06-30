///
/// Erp System - Mark V No 1 (Ehud Series) Client 1.4.3
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

import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { IProcessStatus } from 'app/entities/system/process-status/process-status.model';

export interface IReportStatus {
  id?: number;
  reportName?: string;
  reportId?: string;
  placeholders?: IPlaceholder[] | null;
  processStatus?: IProcessStatus | null;
}

export class ReportStatus implements IReportStatus {
  constructor(
    public id?: number,
    public reportName?: string,
    public reportId?: string,
    public placeholders?: IPlaceholder[] | null,
    public processStatus?: IProcessStatus | null
  ) {}
}

export function getReportStatusIdentifier(reportStatus: IReportStatus): number | undefined {
  return reportStatus.id;
}
