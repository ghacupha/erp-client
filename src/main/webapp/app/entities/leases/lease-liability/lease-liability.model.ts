///
/// Erp System - Mark X No 9 (Jehoiada Series) Client 1.7.7
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

import { ILeaseAmortizationCalculation } from 'app/erp/erp-leases/lease-amortization-calculation/lease-amortization-calculation.model';
import * as dayjs from 'dayjs';

export interface ILeaseLiability {
  id?: number;
  leaseId?: string;
  liabilityAmount?: number;
  interestRate?: number;
  startDate?: dayjs.Dayjs;
  endDate?: dayjs.Dayjs;
  leaseAmortizationCalculation?: ILeaseAmortizationCalculation | null;
  leasePayments?: ILeasePayment[] | null;
  leaseContract?: IIFRS16LeaseContract;
}

export class LeaseLiability implements ILeaseLiability {
  constructor(
    public id?: number,
    public leaseId?: string,
    public liabilityAmount?: number,
    public interestRate?: number,
    public startDate?: dayjs.Dayjs,
    public endDate?: dayjs.Dayjs,
    public leaseAmortizationCalculation?: ILeaseAmortizationCalculation | null,
    public leasePayments?: ILeasePayment[] | null,
    public leaseContract?: IIFRS16LeaseContract
  ) {}
}

export function getLeaseLiabilityIdentifier(leaseLiability: ILeaseLiability): number | undefined {
  return leaseLiability.id;
}
