///
/// Erp System - Mark V No 1 (Ehud Series) Client 1.4.4
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

export interface ILeaseContractQuery {
  billerId?: number,
  from?: dayjs.Dayjs,
  to?: dayjs.Dayjs
}

export interface ILeaseContract {
  id?: number;
  description?: string;
  timeOfRequisition?: dayjs.Dayjs;
  requisitionNumber?: string;
  iso4217CurrencyCode?: string;
  paymentAmount?: number;
  paymentStatus?: string;
  biller?: string;
  currentOwner?: string;
  nativeOwner?: string;
  nativeDepartment?: string;
}

export class ILeaseContract implements ILeaseContract {
  constructor(
    public id?: number,
    public description?: string,
    public timeOfRequisition?: dayjs.Dayjs,
    public requisitionNumber?: string,
    public iso4217CurrencyCode?: string,
    public paymentAmount?: number,
    public paymentStatus?: string,
    public biller?: string,
    public currentOwner?: string,
    public nativeOwner?: string,
    public nativeDepartment?: string,
  ) {}
}
