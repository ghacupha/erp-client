import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ISettlementCurrency } from '../settlement-currency.model';
import { SettlementCurrencyService } from '../service/settlement-currency.service';

@Injectable({ providedIn: 'root' })
export class SettlementCurrencyRoutingResolveService implements Resolve<ISettlementCurrency | null> {
  constructor(protected service: SettlementCurrencyService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISettlementCurrency | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((settlementCurrency: HttpResponse<ISettlementCurrency>) => {
          if (settlementCurrency.body) {
            return of(settlementCurrency.body);
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
