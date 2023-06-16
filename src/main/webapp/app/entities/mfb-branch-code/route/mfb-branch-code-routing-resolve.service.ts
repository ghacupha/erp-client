import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IMfbBranchCode } from '../mfb-branch-code.model';
import { MfbBranchCodeService } from '../service/mfb-branch-code.service';

@Injectable({ providedIn: 'root' })
export class MfbBranchCodeRoutingResolveService implements Resolve<IMfbBranchCode | null> {
  constructor(protected service: MfbBranchCodeService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMfbBranchCode | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((mfbBranchCode: HttpResponse<IMfbBranchCode>) => {
          if (mfbBranchCode.body) {
            return of(mfbBranchCode.body);
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
