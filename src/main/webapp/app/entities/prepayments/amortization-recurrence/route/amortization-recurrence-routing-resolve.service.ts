import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IAmortizationRecurrence } from '../amortization-recurrence.model';
import { AmortizationRecurrenceService } from '../service/amortization-recurrence.service';

@Injectable({ providedIn: 'root' })
export class AmortizationRecurrenceRoutingResolveService implements Resolve<IAmortizationRecurrence | null> {
  constructor(protected service: AmortizationRecurrenceService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAmortizationRecurrence | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((amortizationRecurrence: HttpResponse<IAmortizationRecurrence>) => {
          if (amortizationRecurrence.body) {
            return of(amortizationRecurrence.body);
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
