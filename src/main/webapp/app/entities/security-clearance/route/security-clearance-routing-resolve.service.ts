import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ISecurityClearance } from '../security-clearance.model';
import { SecurityClearanceService } from '../service/security-clearance.service';

@Injectable({ providedIn: 'root' })
export class SecurityClearanceRoutingResolveService implements Resolve<ISecurityClearance | null> {
  constructor(protected service: SecurityClearanceService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISecurityClearance | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((securityClearance: HttpResponse<ISecurityClearance>) => {
          if (securityClearance.body) {
            return of(securityClearance.body);
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
