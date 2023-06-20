import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IFileType } from '../file-type.model';
import { FileTypeService } from '../service/file-type.service';

@Injectable({ providedIn: 'root' })
export class FileTypeRoutingResolveService implements Resolve<IFileType | null> {
  constructor(protected service: FileTypeService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IFileType | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((fileType: HttpResponse<IFileType>) => {
          if (fileType.body) {
            return of(fileType.body);
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
