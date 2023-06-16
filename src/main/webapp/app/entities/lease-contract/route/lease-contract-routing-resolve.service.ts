import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ILeaseContract } from '../lease-contract.model';
import { LeaseContractService } from '../service/lease-contract.service';

@Injectable({ providedIn: 'root' })
export class LeaseContractRoutingResolveService implements Resolve<ILeaseContract | null> {
  constructor(protected service: LeaseContractService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ILeaseContract | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((leaseContract: HttpResponse<ILeaseContract>) => {
          if (leaseContract.body) {
            return of(leaseContract.body);
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
