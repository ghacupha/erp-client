import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IWorkInProgressTransfer } from '../work-in-progress-transfer.model';
import { WorkInProgressTransferService } from '../service/work-in-progress-transfer.service';

@Injectable({ providedIn: 'root' })
export class WorkInProgressTransferRoutingResolveService implements Resolve<IWorkInProgressTransfer | null> {
  constructor(protected service: WorkInProgressTransferService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IWorkInProgressTransfer | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((workInProgressTransfer: HttpResponse<IWorkInProgressTransfer>) => {
          if (workInProgressTransfer.body) {
            return of(workInProgressTransfer.body);
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
