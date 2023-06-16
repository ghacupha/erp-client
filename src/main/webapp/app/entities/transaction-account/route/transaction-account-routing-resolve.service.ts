import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITransactionAccount } from '../transaction-account.model';
import { TransactionAccountService } from '../service/transaction-account.service';

@Injectable({ providedIn: 'root' })
export class TransactionAccountRoutingResolveService implements Resolve<ITransactionAccount | null> {
  constructor(protected service: TransactionAccountService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITransactionAccount | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((transactionAccount: HttpResponse<ITransactionAccount>) => {
          if (transactionAccount.body) {
            return of(transactionAccount.body);
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
