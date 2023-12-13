///
/// Erp System - Mark IX No 2 (Iddo Series) Client 1.6.3
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
import { IInstitutionCode } from '../../master/institution-code/institution-code.model';
import { IBankBranchCode } from '../../master/bank-branch-code/bank-branch-code.model';
import { ICountySubCountyCode } from '../county-sub-county-code/county-sub-county-code.model';
import { IKenyanCurrencyDenomination } from '../../master/kenyan-currency-denomination/kenyan-currency-denomination.model';

export interface IWeeklyCashHolding {
  id?: number;
  reportingDate?: dayjs.Dayjs;
  fitUnits?: number;
  unfitUnits?: number;
  bankCode?: IInstitutionCode;
  branchId?: IBankBranchCode;
  subCountyCode?: ICountySubCountyCode;
  denomination?: IKenyanCurrencyDenomination;
}

export class WeeklyCashHolding implements IWeeklyCashHolding {
  constructor(
    public id?: number,
    public reportingDate?: dayjs.Dayjs,
    public fitUnits?: number,
    public unfitUnits?: number,
    public bankCode?: IInstitutionCode,
    public branchId?: IBankBranchCode,
    public subCountyCode?: ICountySubCountyCode,
    public denomination?: IKenyanCurrencyDenomination
  ) {}
}

export function getWeeklyCashHoldingIdentifier(weeklyCashHolding: IWeeklyCashHolding): number | undefined {
  return weeklyCashHolding.id;
}
