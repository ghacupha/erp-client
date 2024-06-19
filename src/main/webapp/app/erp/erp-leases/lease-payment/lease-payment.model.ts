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

import * as dayjs from 'dayjs';
import { ILeaseLiability } from '../lease-liability/lease-liability.model';

export interface ILeasePayment {
  id?: number;
  paymentDate?: dayjs.Dayjs | null;
  paymentAmount?: number | null;
  leaseLiability?: ILeaseLiability;
}

export class LeasePayment implements ILeasePayment {
  constructor(
    public id?: number,
    public paymentDate?: dayjs.Dayjs | null,
    public paymentAmount?: number | null,
    public leaseLiability?: ILeaseLiability
  ) {}
}

export function getLeasePaymentIdentifier(leasePayment: ILeasePayment): number | undefined {
  return leasePayment.id;
}
