import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IReportRequisition } from '../report-requisition.model';
import { ReportRequisitionService } from '../service/report-requisition.service';

@Injectable({ providedIn: 'root' })
export class ReportRequisitionRoutingResolveService implements Resolve<IReportRequisition | null> {
  constructor(protected service: ReportRequisitionService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IReportRequisition | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((reportRequisition: HttpResponse<IReportRequisition>) => {
          if (reportRequisition.body) {
            return of(reportRequisition.body);
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
