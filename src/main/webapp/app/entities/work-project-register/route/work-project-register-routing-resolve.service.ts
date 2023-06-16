import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IWorkProjectRegister } from '../work-project-register.model';
import { WorkProjectRegisterService } from '../service/work-project-register.service';

@Injectable({ providedIn: 'root' })
export class WorkProjectRegisterRoutingResolveService implements Resolve<IWorkProjectRegister | null> {
  constructor(protected service: WorkProjectRegisterService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IWorkProjectRegister | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((workProjectRegister: HttpResponse<IWorkProjectRegister>) => {
          if (workProjectRegister.body) {
            return of(workProjectRegister.body);
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
