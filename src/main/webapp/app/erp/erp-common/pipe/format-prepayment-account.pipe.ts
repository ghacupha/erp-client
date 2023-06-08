///
/// Erp System - Mark III No 16 (Caleb Series) Client 1.3.8
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
import { IPrepaymentAccount } from '../../erp-prepayments/prepayment-account/prepayment-account.model';

@Pipe({
  name: 'formatPrepaymentAccount',
})
export class FormatPrepaymentAccountPipe implements PipeTransform {

  transform(value: IPrepaymentAccount): string {

    let accountDetail = '';

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (value) {

      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      accountDetail = `Id: ${value.id} | Catalogue: ${value.catalogueNumber} |${value.particulars}`;
    }

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    return value ? accountDetail :'';
  }
}
