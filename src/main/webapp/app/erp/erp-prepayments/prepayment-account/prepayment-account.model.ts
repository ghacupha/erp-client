///
/// Erp System - Mark II No 11 (Artaxerxes Series)
/// Copyright © 2021 Edwin Njeru (mailnjeru@gmail.com)
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

import { ISettlementCurrency } from '../../erp-settlements/settlement-currency/settlement-currency.model';
import { IDealer } from '../../erp-common/models/dealer.model';
import { ISettlement } from '../../erp-settlements/settlement/settlement.model';
import { IServiceOutlet } from '../../erp-granular/service-outlet/service-outlet.model';
import { IPlaceholder } from '../../erp-pages/placeholder/placeholder.model';
import { ITransactionAccount } from '../../erp-accounts/transaction-account/transaction-account.model';

export interface IPrepaymentAccount {
  id?: number;
  catalogueNumber?: string;
  particulars?: string;
  notes?: string | null;
  prepaymentAmount?: number | null;
  settlementCurrency?: ISettlementCurrency | null;
  prepaymentTransaction?: ISettlement | null;
  serviceOutlet?: IServiceOutlet | null;
  dealer?: IDealer | null;
  placeholder?: IPlaceholder | null;
  debitAccount?: ITransactionAccount | null;
  transferAccount?: ITransactionAccount | null;
}

export class PrepaymentAccount implements IPrepaymentAccount {
  constructor(
    public id?: number,
    public catalogueNumber?: string,
    public particulars?: string,
    public notes?: string | null,
    public prepaymentAmount?: number | null,
    public settlementCurrency?: ISettlementCurrency | null,
    public prepaymentTransaction?: ISettlement | null,
    public serviceOutlet?: IServiceOutlet | null,
    public dealer?: IDealer | null,
    public placeholder?: IPlaceholder | null,
    public debitAccount?: ITransactionAccount | null,
    public transferAccount?: ITransactionAccount | null
  ) {}
}

export function getPrepaymentAccountIdentifier(prepaymentAccount: IPrepaymentAccount): number | undefined {
  return prepaymentAccount.id;
}
