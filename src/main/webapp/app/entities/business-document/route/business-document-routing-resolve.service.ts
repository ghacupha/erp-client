import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IBusinessDocument } from '../business-document.model';
import { BusinessDocumentService } from '../service/business-document.service';

@Injectable({ providedIn: 'root' })
export class BusinessDocumentRoutingResolveService implements Resolve<IBusinessDocument | null> {
  constructor(protected service: BusinessDocumentService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IBusinessDocument | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((businessDocument: HttpResponse<IBusinessDocument>) => {
          if (businessDocument.body) {
            return of(businessDocument.body);
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
