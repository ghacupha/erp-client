import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IPaymentCalculation } from '../payment-calculation.model';
import { PaymentCalculationService } from '../service/payment-calculation.service';

@Injectable({ providedIn: 'root' })
export class PaymentCalculationRoutingResolveService implements Resolve<IPaymentCalculation | null> {
  constructor(protected service: PaymentCalculationService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPaymentCalculation | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((paymentCalculation: HttpResponse<IPaymentCalculation>) => {
          if (paymentCalculation.body) {
            return of(paymentCalculation.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}
