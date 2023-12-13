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
import { IIsoCurrencyCode } from '../../master/iso-currency-code/iso-currency-code.model';
import { IBankBranchCode } from '../../master/bank-branch-code/bank-branch-code.model';

export interface IAccountBalance {
  id?: number;
  reportingDate?: dayjs.Dayjs;
  customerId?: string;
  accountContractNumber?: string;
  accruedInterestBalanceFCY?: number;
  accruedInterestBalanceLCY?: number;
  accountBalanceFCY?: number;
  accountBalanceLCY?: number;
  bankCode?: IInstitutionCode;
  branchId?: IBankBranchCode;
  currencyCode?: IIsoCurrencyCode;
}

export class AccountBalance implements IAccountBalance {
  constructor(
    public id?: number,
    public reportingDate?: dayjs.Dayjs,
    public customerId?: string,
    public accountContractNumber?: string,
    public accruedInterestBalanceFCY?: number,
    public accruedInterestBalanceLCY?: number,
    public accountBalanceFCY?: number,
    public accountBalanceLCY?: number,
    public bankCode?: IInstitutionCode,
    public branchId?: IBankBranchCode,
    public currencyCode?: IIsoCurrencyCode
  ) {}
}

export function getAccountBalanceIdentifier(accountBalance: IAccountBalance): number | undefined {
  return accountBalance.id;
}
