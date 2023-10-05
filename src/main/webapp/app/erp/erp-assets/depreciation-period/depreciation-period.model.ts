///
/// Erp System - Mark VI No 1 (Phoebe Series) Client 1.5.3
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

import * as dayjs from 'dayjs';
import { DepreciationPeriodStatusTypes } from '../../erp-common/enumerations/depreciation-period-status-types.model';
import { IFiscalMonth } from '../../erp-pages/fiscal-month/fiscal-month.model';
import { IApplicationUser } from '../../erp-pages/application-user/application-user.model';
import { IFiscalYear } from '../../erp-pages/fiscal-year/fiscal-year.model';
import { IFiscalQuarter } from '../../erp-pages/fiscal-quarter/fiscal-quarter.model';

export interface IDepreciationPeriod {
  id?: number;
  startDate?: dayjs.Dayjs;
  endDate?: dayjs.Dayjs;
  depreciationPeriodStatus?: DepreciationPeriodStatusTypes | null;
  periodCode?: string;
  processLocked?: boolean | null;
  previousPeriod?: IDepreciationPeriod | null;
  createdBy?: IApplicationUser | null;
  fiscalYear?: IFiscalYear;
  fiscalMonth?: IFiscalMonth;
  fiscalQuarter?: IFiscalQuarter;
}

export class DepreciationPeriod implements IDepreciationPeriod {
  constructor(
    public id?: number,
    public startDate?: dayjs.Dayjs,
    public endDate?: dayjs.Dayjs,
    public depreciationPeriodStatus?: DepreciationPeriodStatusTypes | null,
    public periodCode?: string,
    public processLocked?: boolean | null,
    public previousPeriod?: IDepreciationPeriod | null,
    public createdBy?: IApplicationUser | null,
    public fiscalYear?: IFiscalYear,
    public fiscalMonth?: IFiscalMonth,
    public fiscalQuarter?: IFiscalQuarter
  ) {
    this.processLocked = this.processLocked ?? false;
  }
}

export function getDepreciationPeriodIdentifier(depreciationPeriod: IDepreciationPeriod): number | undefined {
  return depreciationPeriod.id;
}
