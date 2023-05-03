///
/// Erp System - Mark III No 13 (Caleb Series) Client 1.3.2
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
import { IPrepaymentAccount } from 'app/entities/prepayment-account/prepayment-account.model';
import { IPlaceholder } from 'app/entities/erpService/placeholder/placeholder.model';

export interface IPrepaymentMarshalling {
  id?: number;
  inactive?: boolean;
  amortizationCommencementDate?: dayjs.Dayjs | null;
  amortizationPeriods?: number | null;
  prepaymentAccount?: IPrepaymentAccount;
  placeholders?: IPlaceholder[] | null;
}

export class PrepaymentMarshalling implements IPrepaymentMarshalling {
  constructor(
    public id?: number,
    public inactive?: boolean,
    public amortizationCommencementDate?: dayjs.Dayjs | null,
    public amortizationPeriods?: number | null,
    public prepaymentAccount?: IPrepaymentAccount,
    public placeholders?: IPlaceholder[] | null
  ) {
    this.inactive = this.inactive ?? false;
  }
}

export function getPrepaymentMarshallingIdentifier(prepaymentMarshalling: IPrepaymentMarshalling): number | undefined {
  return prepaymentMarshalling.id;
}
