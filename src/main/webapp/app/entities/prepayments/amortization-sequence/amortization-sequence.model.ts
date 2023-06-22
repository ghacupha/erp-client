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
import { IPrepaymentAccount } from 'app/entities/prepayments/prepayment-account/prepayment-account.model';
import { IAmortizationRecurrence } from 'app/entities/prepayments/amortization-recurrence/amortization-recurrence.model';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { IPrepaymentMapping } from 'app/entities/prepayments/prepayment-mapping/prepayment-mapping.model';
import { IUniversallyUniqueMapping } from 'app/entities/system/universally-unique-mapping/universally-unique-mapping.model';

export interface IAmortizationSequence {
  id: number;
  prepaymentAccountGuid?: string | null;
  recurrenceGuid?: string | null;
  sequenceNumber?: number | null;
  particulars?: string | null;
  currentAmortizationDate?: dayjs.Dayjs | null;
  previousAmortizationDate?: dayjs.Dayjs | null;
  nextAmortizationDate?: dayjs.Dayjs | null;
  isCommencementSequence?: boolean | null;
  isTerminalSequence?: boolean | null;
  amortizationAmount?: number | null;
  sequenceGuid?: string | null;
  prepaymentAccount?: Pick<IPrepaymentAccount, 'id' | 'catalogueNumber'> | null;
  amortizationRecurrence?: Pick<IAmortizationRecurrence, 'id' | 'particulars'> | null;
  placeholders?: Pick<IPlaceholder, 'id' | 'description'>[] | null;
  prepaymentMappings?: Pick<IPrepaymentMapping, 'id' | 'parameter'>[] | null;
  applicationParameters?: Pick<IUniversallyUniqueMapping, 'id' | 'mappedValue'>[] | null;
}

export type NewAmortizationSequence = Omit<IAmortizationSequence, 'id'> & { id: null };
