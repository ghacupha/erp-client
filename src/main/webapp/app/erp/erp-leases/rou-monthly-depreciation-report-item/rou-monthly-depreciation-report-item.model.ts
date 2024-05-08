///
/// Erp System - Mark X No 8 (Jehoiada Series) Client 1.7.6
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

export interface IRouMonthlyDepreciationReportItem {
  id?: number;
  fiscalMonthStartDate?: dayjs.Dayjs | null;
  fiscalMonthEndDate?: dayjs.Dayjs | null;
  totalDepreciationAmount?: number | null;
}

export class RouMonthlyDepreciationReportItem implements IRouMonthlyDepreciationReportItem {
  constructor(
    public id?: number,
    public fiscalMonthStartDate?: dayjs.Dayjs | null,
    public fiscalMonthEndDate?: dayjs.Dayjs | null,
    public totalDepreciationAmount?: number | null
  ) {}
}

export function getRouMonthlyDepreciationReportItemIdentifier(
  rouMonthlyDepreciationReportItem: IRouMonthlyDepreciationReportItem
): number | undefined {
  return rouMonthlyDepreciationReportItem.id;
}
