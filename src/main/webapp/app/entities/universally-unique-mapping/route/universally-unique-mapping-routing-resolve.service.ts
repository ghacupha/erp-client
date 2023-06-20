import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IUniversallyUniqueMapping } from '../universally-unique-mapping.model';
import { UniversallyUniqueMappingService } from '../service/universally-unique-mapping.service';

@Injectable({ providedIn: 'root' })
export class UniversallyUniqueMappingRoutingResolveService implements Resolve<IUniversallyUniqueMapping | null> {
  constructor(protected service: UniversallyUniqueMappingService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IUniversallyUniqueMapping | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((universallyUniqueMapping: HttpResponse<IUniversallyUniqueMapping>) => {
          if (universallyUniqueMapping.body) {
            return of(universallyUniqueMapping.body);
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
