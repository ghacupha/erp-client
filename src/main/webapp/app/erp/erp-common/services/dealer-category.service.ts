///
/// Erp System - Mark II No 20 (Baruch Series)
/// Copyright © 2021 - 2022 Edwin Njeru (mailnjeru@gmail.com)
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

import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {State} from '../../store/global-store.definition';
import {EMPTY, Observable, of} from "rxjs";
import { ErpCommonModule } from '../erp-common.module';
import { IPaymentCategory, PaymentCategory } from '../models/payment-category.model';
import { IDealer } from '../models/dealer.model';
import { EntityArrayResponseType, PaymentService } from './payment.service';

@Injectable({ providedIn: ErpCommonModule })
export class DealerCategoryService {

  constructor(protected paymentService: PaymentService, protected store: Store<State>) {
  }

  getDealerCategory(dealer: IDealer): Observable<IPaymentCategory> {
    let cat: IPaymentCategory | null | undefined = {...new PaymentCategory()};
    this.paymentService.query({'dealerId.equals': dealer.id}).subscribe((pyts: EntityArrayResponseType) => {
      if (pyts.body?.length !== 0) {
        if (pyts.body) {
          if (pyts.body[pyts.body.length - 1].paymentCategory !== undefined) {
            if (cat) {
              cat = pyts.body[pyts.body.length - 1].paymentCategory
              // let's conclude this business
              return of(cat);
            }
          }
        }
      }
      return EMPTY;
    });
    return EMPTY;
  }
}
