
import {paymentEditInitiated} from "../../../../store/actions/update-menu-status.actions";
import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {State} from "../../../../store/global-store.definition";
import {EMPTY, Observable, of} from "rxjs";
import {flatMap} from "rxjs/operators";
import {HttpResponse} from "@angular/common/http";
import { IPayment, Payment } from '../../../../erp-common/models/payment.model';
import { PaymentService } from '../../../../erp-common/services/payment.service';

/**
 * Provides the edit form containing the entity to be edited pre-filled
 */
@Injectable({ providedIn: 'root' })
export class EditPaymentResolveService implements Resolve<IPayment> {
  constructor(
    private service: PaymentService,
    private router: Router,
    protected store: Store<State>
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPayment> | Observable<never> {

    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((payment: HttpResponse<Payment>) => {
          if (payment.body) {
            this.store.dispatch(paymentEditInitiated({editPayment: payment.body}))
            return of(payment.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Payment());
  }
}
