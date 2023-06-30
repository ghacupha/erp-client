///
/// Erp System - Mark V No 1 (Ehud Series) Client 1.4.4
/// Copyright © 2021 - 2023 Edwin Njeru (mailnjeru@gmail.com)
///
/// This program is free software: you can redistribute it and/or modify
/// it under the terms of the GNU General Public License as published by
/// the Free Software Foundation, either version 3 of the License, or
/// (at your option) any later version.
///
/// This program is distributed in the hope that it will be useful,
/// but WITHOUT ANY WARRANTY; without even the implied warranty of
/// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
/// GNU General Public License for more details.
///
/// You should have received a copy of the GNU General Public License
/// along with this program. If not, see <http://www.gnu.org/licenses/>.
///

import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ISecurityClearance, SecurityClearance } from '../security-clearance.model';
import { SecurityClearanceService } from '../service/security-clearance.service';

@Injectable({ providedIn: 'root' })
export class SecurityClearanceRoutingResolveService implements Resolve<ISecurityClearance> {
  constructor(protected service: SecurityClearanceService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISecurityClearance> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((securityClearance: HttpResponse<SecurityClearance>) => {
          if (securityClearance.body) {
            return of(securityClearance.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new SecurityClearance());
  }
}
