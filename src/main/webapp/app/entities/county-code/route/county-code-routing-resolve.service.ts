import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICountyCode } from '../county-code.model';
import { CountyCodeService } from '../service/county-code.service';

@Injectable({ providedIn: 'root' })
export class CountyCodeRoutingResolveService implements Resolve<ICountyCode | null> {
  constructor(protected service: CountyCodeService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICountyCode | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((countyCode: HttpResponse<ICountyCode>) => {
          if (countyCode.body) {
            return of(countyCode.body);
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
