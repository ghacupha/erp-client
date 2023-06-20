import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IWorkInProgressRegistration } from '../work-in-progress-registration.model';
import { WorkInProgressRegistrationService } from '../service/work-in-progress-registration.service';

@Injectable({ providedIn: 'root' })
export class WorkInProgressRegistrationRoutingResolveService implements Resolve<IWorkInProgressRegistration | null> {
  constructor(protected service: WorkInProgressRegistrationService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IWorkInProgressRegistration | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((workInProgressRegistration: HttpResponse<IWorkInProgressRegistration>) => {
          if (workInProgressRegistration.body) {
            return of(workInProgressRegistration.body);
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
