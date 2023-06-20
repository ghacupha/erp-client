import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IFileUpload } from '../file-upload.model';
import { FileUploadService } from '../service/file-upload.service';

@Injectable({ providedIn: 'root' })
export class FileUploadRoutingResolveService implements Resolve<IFileUpload | null> {
  constructor(protected service: FileUploadService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IFileUpload | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((fileUpload: HttpResponse<IFileUpload>) => {
          if (fileUpload.body) {
            return of(fileUpload.body);
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
