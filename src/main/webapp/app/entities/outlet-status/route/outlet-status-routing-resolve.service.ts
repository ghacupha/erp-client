import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IOutletStatus } from '../outlet-status.model';
import { OutletStatusService } from '../service/outlet-status.service';

@Injectable({ providedIn: 'root' })
export class OutletStatusRoutingResolveService implements Resolve<IOutletStatus | null> {
  constructor(protected service: OutletStatusService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IOutletStatus | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((outletStatus: HttpResponse<IOutletStatus>) => {
          if (outletStatus.body) {
            return of(outletStatus.body);
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
