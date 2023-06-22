import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IStringQuestionBase } from '../string-question-base.model';
import { StringQuestionBaseService } from '../service/string-question-base.service';

@Injectable({ providedIn: 'root' })
export class StringQuestionBaseRoutingResolveService implements Resolve<IStringQuestionBase | null> {
  constructor(protected service: StringQuestionBaseService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IStringQuestionBase | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((stringQuestionBase: HttpResponse<IStringQuestionBase>) => {
          if (stringQuestionBase.body) {
            return of(stringQuestionBase.body);
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
