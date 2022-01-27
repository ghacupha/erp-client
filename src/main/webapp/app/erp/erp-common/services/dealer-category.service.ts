import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {State} from '../../store/global-store.definition';
import {EMPTY, Observable, of} from "rxjs";
import { EntityArrayResponseType } from 'app/erp/erp-pages/payments/payment/service/payment.service';
import { ErpCommonModule } from '../erp-common.module';
import { IPaymentCategory, PaymentCategory } from '../models/payment-category.model';
import { IDealer } from '../models/dealer.model';
import { PaymentService } from './payment.service';

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
