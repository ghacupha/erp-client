///
/// Erp System - Mark III No 12 (Caleb Series) Client 1.2.6
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

import { IPlaceholder } from 'app/entities/erpService/placeholder/placeholder.model';

export interface ITransactionAccount {
  id?: number;
  accountNumber?: string;
  accountName?: string;
  notesContentType?: string | null;
  notes?: string | null;
  parentAccount?: ITransactionAccount | null;
  placeholders?: IPlaceholder[] | null;
}

export class TransactionAccount implements ITransactionAccount {
  constructor(
    public id?: number,
    public accountNumber?: string,
    public accountName?: string,
    public notesContentType?: string | null,
    public notes?: string | null,
    public parentAccount?: ITransactionAccount | null,
    public placeholders?: IPlaceholder[] | null
  ) {}
}

export function getTransactionAccountIdentifier(transactionAccount: ITransactionAccount): number | undefined {
  return transactionAccount.id;
}
