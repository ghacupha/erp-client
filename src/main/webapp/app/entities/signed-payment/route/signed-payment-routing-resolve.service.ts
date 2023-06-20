import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ISignedPayment } from '../signed-payment.model';
import { SignedPaymentService } from '../service/signed-payment.service';

@Injectable({ providedIn: 'root' })
export class SignedPaymentRoutingResolveService implements Resolve<ISignedPayment | null> {
  constructor(protected service: SignedPaymentService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISignedPayment | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((signedPayment: HttpResponse<ISignedPayment>) => {
          if (signedPayment.body) {
            return of(signedPayment.body);
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
