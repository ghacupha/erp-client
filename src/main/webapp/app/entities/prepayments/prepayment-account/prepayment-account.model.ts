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

import { ISettlementCurrency } from 'app/entities/settlement/settlement-currency/settlement-currency.model';
import { ISettlement } from 'app/entities/settlement/settlement/settlement.model';
import { IServiceOutlet } from 'app/entities/data/service-outlet/service-outlet.model';
import { IDealer } from 'app/entities/people/dealer/dealer.model';
import { ITransactionAccount } from 'app/entities/accounting/transaction-account/transaction-account.model';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { IUniversallyUniqueMapping } from 'app/entities/system/universally-unique-mapping/universally-unique-mapping.model';
import { IPrepaymentMapping } from 'app/entities/prepayments/prepayment-mapping/prepayment-mapping.model';
import { IBusinessDocument } from 'app/entities/documentation/business-document/business-document.model';

export interface IPrepaymentAccount {
  id: number;
  catalogueNumber?: string | null;
  particulars?: string | null;
  notes?: string | null;
  prepaymentAmount?: number | null;
  prepaymentGuid?: string | null;
  settlementCurrency?: Pick<ISettlementCurrency, 'id' | 'iso4217CurrencyCode'> | null;
  prepaymentTransaction?: Pick<ISettlement, 'id' | 'paymentNumber'> | null;
  serviceOutlet?: Pick<IServiceOutlet, 'id' | 'outletCode'> | null;
  dealer?: Pick<IDealer, 'id' | 'dealerName'> | null;
  debitAccount?: Pick<ITransactionAccount, 'id' | 'accountName'> | null;
  transferAccount?: Pick<ITransactionAccount, 'id' | 'accountName'> | null;
  placeholders?: Pick<IPlaceholder, 'id' | 'description'>[] | null;
  generalParameters?: Pick<IUniversallyUniqueMapping, 'id' | 'mappedValue'>[] | null;
  prepaymentParameters?: Pick<IPrepaymentMapping, 'id' | 'parameterKey'>[] | null;
  businessDocuments?: Pick<IBusinessDocument, 'id' | 'documentTitle'>[] | null;
}

export type NewPrepaymentAccount = Omit<IPrepaymentAccount, 'id'> & { id: null };
