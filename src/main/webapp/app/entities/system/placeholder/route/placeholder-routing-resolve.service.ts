import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IPlaceholder } from '../placeholder.model';
import { PlaceholderService } from '../service/placeholder.service';

@Injectable({ providedIn: 'root' })
export class PlaceholderRoutingResolveService implements Resolve<IPlaceholder | null> {
  constructor(protected service: PlaceholderService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPlaceholder | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((placeholder: HttpResponse<IPlaceholder>) => {
          if (placeholder.body) {
            return of(placeholder.body);
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
