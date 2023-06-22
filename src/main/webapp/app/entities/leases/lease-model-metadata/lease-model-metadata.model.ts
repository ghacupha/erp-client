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
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { IUniversallyUniqueMapping } from 'app/entities/system/universally-unique-mapping/universally-unique-mapping.model';
import { ILeaseContract } from 'app/entities/leases/lease-contract/lease-contract.model';
import { ISettlementCurrency } from 'app/entities/settlement/settlement-currency/settlement-currency.model';
import { IBusinessDocument } from 'app/entities/documentation/business-document/business-document.model';
import { ISecurityClearance } from 'app/entities/people/security-clearance/security-clearance.model';
import { ITransactionAccount } from 'app/entities/accounting/transaction-account/transaction-account.model';

export interface ILeaseModelMetadata {
  id: number;
  modelTitle?: string | null;
  modelVersion?: number | null;
  description?: string | null;
  modelNotes?: string | null;
  modelNotesContentType?: string | null;
  annualDiscountingRate?: number | null;
  commencementDate?: dayjs.Dayjs | null;
  terminalDate?: dayjs.Dayjs | null;
  totalReportingPeriods?: number | null;
  reportingPeriodsPerYear?: number | null;
  settlementPeriodsPerYear?: number | null;
  initialLiabilityAmount?: number | null;
  initialROUAmount?: number | null;
  totalDepreciationPeriods?: number | null;
  placeholders?: Pick<IPlaceholder, 'id' | 'description'>[] | null;
  leaseMappings?: Pick<IUniversallyUniqueMapping, 'id' | 'universalKey'>[] | null;
  leaseContract?: Pick<ILeaseContract, 'id' | 'bookingId'> | null;
  predecessor?: Pick<ILeaseModelMetadata, 'id' | 'modelTitle'> | null;
  liabilityCurrency?: Pick<ISettlementCurrency, 'id' | 'iso4217CurrencyCode'> | null;
  rouAssetCurrency?: Pick<ISettlementCurrency, 'id' | 'iso4217CurrencyCode'> | null;
  modelAttachments?: Pick<IBusinessDocument, 'id' | 'documentTitle'> | null;
  securityClearance?: Pick<ISecurityClearance, 'id' | 'clearanceLevel'> | null;
  leaseLiabilityAccount?: Pick<ITransactionAccount, 'id' | 'accountNumber'> | null;
  interestPayableAccount?: Pick<ITransactionAccount, 'id' | 'accountNumber'> | null;
  interestExpenseAccount?: Pick<ITransactionAccount, 'id' | 'accountNumber'> | null;
  rouAssetAccount?: Pick<ITransactionAccount, 'id' | 'accountNumber'> | null;
  rouDepreciationAccount?: Pick<ITransactionAccount, 'id' | 'accountNumber'> | null;
  accruedDepreciationAccount?: Pick<ITransactionAccount, 'id' | 'accountNumber'> | null;
}

export type NewLeaseModelMetadata = Omit<ILeaseModelMetadata, 'id'> & { id: null };
