import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IAssetCategory } from '../asset-category.model';
import { AssetCategoryService } from '../service/asset-category.service';

@Injectable({ providedIn: 'root' })
export class AssetCategoryRoutingResolveService implements Resolve<IAssetCategory | null> {
  constructor(protected service: AssetCategoryService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAssetCategory | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((assetCategory: HttpResponse<IAssetCategory>) => {
          if (assetCategory.body) {
            return of(assetCategory.body);
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
