import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IServiceOutlet } from '../service-outlet.model';
import { ServiceOutletService } from '../service/service-outlet.service';

@Injectable({ providedIn: 'root' })
export class ServiceOutletRoutingResolveService implements Resolve<IServiceOutlet | null> {
  constructor(protected service: ServiceOutletService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IServiceOutlet | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((serviceOutlet: HttpResponse<IServiceOutlet>) => {
          if (serviceOutlet.body) {
            return of(serviceOutlet.body);
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
