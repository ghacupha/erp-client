///
/// Erp System - Mark VII No 5 (Gideon Series) Client 1.5.7
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

import { IChartOfAccountsCode, ChartOfAccountsCode } from '../chart-of-accounts-code.model';
import { ChartOfAccountsCodeService } from '../service/chart-of-accounts-code.service';

@Injectable({ providedIn: 'root' })
export class ChartOfAccountsCodeRoutingResolveService implements Resolve<IChartOfAccountsCode> {
  constructor(protected service: ChartOfAccountsCodeService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IChartOfAccountsCode> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((chartOfAccountsCode: HttpResponse<ChartOfAccountsCode>) => {
          if (chartOfAccountsCode.body) {
            return of(chartOfAccountsCode.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ChartOfAccountsCode());
  }
}
