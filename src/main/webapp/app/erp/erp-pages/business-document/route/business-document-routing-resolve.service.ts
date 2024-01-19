///
/// Erp System - Mark X No 2 (Jehoiada Series) Client 1.7.2
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

import { IBusinessDocument, BusinessDocument } from '../business-document.model';
import { BusinessDocumentService } from '../service/business-document.service';

@Injectable({ providedIn: 'root' })
export class BusinessDocumentRoutingResolveService implements Resolve<IBusinessDocument> {
  constructor(protected service: BusinessDocumentService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IBusinessDocument> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((businessDocument: HttpResponse<BusinessDocument>) => {
          if (businessDocument.body) {
            return of(businessDocument.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new BusinessDocument());
  }
}
