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
import { IPrepaymentMapping } from 'app/entities/prepayments/prepayment-mapping/prepayment-mapping.model';
import { IUniversallyUniqueMapping } from 'app/entities/system/universally-unique-mapping/universally-unique-mapping.model';
import { IDepreciationMethod } from 'app/entities/assets/depreciation-method/depreciation-method.model';
import { IPrepaymentAccount } from 'app/entities/prepayments/prepayment-account/prepayment-account.model';
import { recurrenceFrequency } from 'app/entities/enumerations/recurrence-frequency.model';

export interface IAmortizationRecurrence {
  id: number;
  firstAmortizationDate?: dayjs.Dayjs | null;
  amortizationFrequency?: recurrenceFrequency | null;
  numberOfRecurrences?: number | null;
  notes?: string | null;
  notesContentType?: string | null;
  particulars?: string | null;
  isActive?: boolean | null;
  isOverWritten?: boolean | null;
  timeOfInstallation?: dayjs.Dayjs | null;
  recurrenceGuid?: string | null;
  prepaymentAccountGuid?: string | null;
  placeholders?: Pick<IPlaceholder, 'id' | 'description'>[] | null;
  parameters?: Pick<IPrepaymentMapping, 'id' | 'parameter'>[] | null;
  applicationParameters?: Pick<IUniversallyUniqueMapping, 'id' | 'mappedValue'>[] | null;
  depreciationMethod?: Pick<IDepreciationMethod, 'id' | 'depreciationMethodName'> | null;
  prepaymentAccount?: Pick<IPrepaymentAccount, 'id' | 'catalogueNumber'> | null;
}

export type NewAmortizationRecurrence = Omit<IAmortizationRecurrence, 'id'> & { id: null };
