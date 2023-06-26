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

export interface IServiceOutlet {
  id: number;
  outletCode?: string | null;
  outletName?: string | null;
  town?: string | null;
  parliamentaryConstituency?: string | null;
  gpsCoordinates?: string | null;
  outletOpeningDate?: dayjs.Dayjs | null;
  regulatorApprovalDate?: dayjs.Dayjs | null;
  outletClosureDate?: dayjs.Dayjs | null;
  dateLastModified?: dayjs.Dayjs | null;
  licenseFeePayable?: number | null;
  placeholders?: Pick<IPlaceholder, 'id' | 'description'>[] | null;
  bankCode?: Pick<IBankBranchCode, 'id' | 'branchCode'> | null;
  outletType?: Pick<IOutletType, 'id' | 'outletType'> | null;
  outletStatus?: Pick<IOutletStatus, 'id' | 'branchStatusType'> | null;
  countyName?: Pick<ICountyCode, 'id' | 'countyName'> | null;
  subCountyName?: Pick<ICountyCode, 'id' | 'subCountyName'> | null;
}

export type NewServiceOutlet = Omit<IServiceOutlet, 'id'> & { id: null };
