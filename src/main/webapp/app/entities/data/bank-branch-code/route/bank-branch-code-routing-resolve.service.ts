import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IBankBranchCode } from '../bank-branch-code.model';
import { BankBranchCodeService } from '../service/bank-branch-code.service';

@Injectable({ providedIn: 'root' })
export class BankBranchCodeRoutingResolveService implements Resolve<IBankBranchCode | null> {
  constructor(protected service: BankBranchCodeService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IBankBranchCode | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((bankBranchCode: HttpResponse<IBankBranchCode>) => {
          if (bankBranchCode.body) {
            return of(bankBranchCode.body);
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
