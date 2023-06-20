import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IReportTemplate } from '../report-template.model';
import { ReportTemplateService } from '../service/report-template.service';

@Injectable({ providedIn: 'root' })
export class ReportTemplateRoutingResolveService implements Resolve<IReportTemplate | null> {
  constructor(protected service: ReportTemplateService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IReportTemplate | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((reportTemplate: HttpResponse<IReportTemplate>) => {
          if (reportTemplate.body) {
            return of(reportTemplate.body);
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
