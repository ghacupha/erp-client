///
/// Erp System - Mark VIII No 1 (Hilkiah Series) Client 1.5.9
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
import { IAccountOwnershipType } from '../../master/account-ownership-type/account-ownership-type.model';
import { IBankBranchCode } from '../../master/bank-branch-code/bank-branch-code.model';

export interface IAccountAttribute {
  id?: number;
  reportingDate?: dayjs.Dayjs;
  customerNumber?: string;
  accountContractNumber?: string;
  accountName?: string;
  accountOpeningDate?: dayjs.Dayjs | null;
  accountClosingDate?: dayjs.Dayjs | null;
  debitInterestRate?: number;
  creditInterestRate?: number;
  sanctionedAccountLimitFcy?: number;
  sanctionedAccountLimitLcy?: number;
  accountStatusChangeDate?: dayjs.Dayjs | null;
  expiryDate?: dayjs.Dayjs | null;
  bankCode?: IInstitutionCode;
  branchCode?: IBankBranchCode;
  accountOwnershipType?: IAccountOwnershipType;
}

export class AccountAttribute implements IAccountAttribute {
  constructor(
    public id?: number,
    public reportingDate?: dayjs.Dayjs,
    public customerNumber?: string,
    public accountContractNumber?: string,
    public accountName?: string,
    public accountOpeningDate?: dayjs.Dayjs | null,
    public accountClosingDate?: dayjs.Dayjs | null,
    public debitInterestRate?: number,
    public creditInterestRate?: number,
    public sanctionedAccountLimitFcy?: number,
    public sanctionedAccountLimitLcy?: number,
    public accountStatusChangeDate?: dayjs.Dayjs | null,
    public expiryDate?: dayjs.Dayjs | null,
    public bankCode?: IInstitutionCode,
    public branchCode?: IBankBranchCode,
    public accountOwnershipType?: IAccountOwnershipType
  ) {}
}

export function getAccountAttributeIdentifier(accountAttribute: IAccountAttribute): number | undefined {
  return accountAttribute.id;
}
