import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IOutletType } from '../outlet-type.model';
import { OutletTypeService } from '../service/outlet-type.service';

@Injectable({ providedIn: 'root' })
export class OutletTypeRoutingResolveService implements Resolve<IOutletType | null> {
  constructor(protected service: OutletTypeService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IOutletType | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((outletType: HttpResponse<IOutletType>) => {
          if (outletType.body) {
            return of(outletType.body);
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
