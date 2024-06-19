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

import { Pipe, PipeTransform } from '@angular/core';
import { ILeaseAmortizationCalculation } from '../../../erp-leases/lease-amortization-calculation/lease-amortization-calculation.model';
import { LeaseLiabilityService } from '../../../erp-leases/lease-liability/service/lease-liability.service';

@Pipe({
  name: 'formatLeaseAmortizationCalculation',
})
export class FormatLeaseAmortizationCalculationPipe implements PipeTransform {


  constructor(protected leaseLiabilityService: LeaseLiabilityService) {
  }

  transform(value: ILeaseAmortizationCalculation): string {

    let leaseId = "";

    this.leaseLiabilityService.find(<number>value.leaseLiability?.id).subscribe(leaseLiab => {
      if (leaseLiab.body) {
        leaseId = <string>leaseLiab.body.leaseId;
      }
    });

    return `Id: ${value.id} | Lease: ${ leaseId } | Amount: ${ value.leaseAmount } | No. of Periods: ${ value.numberOfPeriods } | Periodicity: ${ value.periodicity }`;
  }
}
