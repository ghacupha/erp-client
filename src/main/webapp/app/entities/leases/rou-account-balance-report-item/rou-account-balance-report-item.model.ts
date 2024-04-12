///
/// Erp System - Mark X No 7 (Jehoiada Series) Client 1.7.5
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

export interface IRouAccountBalanceReportItem {
  id?: number;
  assetAccountName?: string | null;
  assetAccountNumber?: string | null;
  depreciationAccountNumber?: string | null;
  netBookValue?: number | null;
  fiscalMonthEndDate?: dayjs.Dayjs | null;
}

export class RouAccountBalanceReportItem implements IRouAccountBalanceReportItem {
  constructor(
    public id?: number,
    public assetAccountName?: string | null,
    public assetAccountNumber?: string | null,
    public depreciationAccountNumber?: string | null,
    public netBookValue?: number | null,
    public fiscalMonthEndDate?: dayjs.Dayjs | null
  ) {}
}

export function getRouAccountBalanceReportItemIdentifier(rouAccountBalanceReportItem: IRouAccountBalanceReportItem): number | undefined {
  return rouAccountBalanceReportItem.id;
}
