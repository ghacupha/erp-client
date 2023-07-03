///
/// Erp System - Mark V No 1 (Ehud Series) Client 1.5.1
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
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { AssetRegistration, IAssetRegistration } from '../asset-registration.model';
import { AssetRegistrationService } from '../service/asset-registration.service';
import { Store } from '@ngrx/store';
import { State } from '../../../store/global-store.definition';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import {
  assetRegistrationCreationInitiatedEnRoute
} from '../../../store/actions/fixed-assets-register-update-status.actions';

@Injectable({ providedIn: 'root' })
export class AssetRegistrationCreationRoutingResolveService implements Resolve<IAssetRegistration> {

  constructor(protected service: AssetRegistrationService, protected router: Router, protected store: Store<State>,) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAssetRegistration> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((assetRegistration: HttpResponse<AssetRegistration>) => {
          if (assetRegistration.body) {
            this.store.dispatch(assetRegistrationCreationInitiatedEnRoute());
            return of(assetRegistration.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new AssetRegistration());
  }

}
