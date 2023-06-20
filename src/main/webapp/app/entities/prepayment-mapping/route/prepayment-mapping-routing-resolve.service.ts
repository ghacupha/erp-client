import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IPrepaymentMapping } from '../prepayment-mapping.model';
import { PrepaymentMappingService } from '../service/prepayment-mapping.service';

@Injectable({ providedIn: 'root' })
export class PrepaymentMappingRoutingResolveService implements Resolve<IPrepaymentMapping | null> {
  constructor(protected service: PrepaymentMappingService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPrepaymentMapping | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((prepaymentMapping: HttpResponse<IPrepaymentMapping>) => {
          if (prepaymentMapping.body) {
            return of(prepaymentMapping.body);
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
