///
/// Erp System - Mark II No 27 (Baruch Series) Client 0.1.6-SNAPSHOT
/// Copyright © 2021 - 2022 Edwin Njeru (mailnjeru@gmail.com)
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

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CountyCodeComponent } from '../list/county-code.component';
import { CountyCodeDetailComponent } from '../detail/county-code-detail.component';
import { CountyCodeUpdateComponent } from '../update/county-code-update.component';
import { CountyCodeRoutingResolveService } from './county-code-routing-resolve.service';

const countyCodeRoute: Routes = [
  {
    path: '',
    component: CountyCodeComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CountyCodeDetailComponent,
    resolve: {
      countyCode: CountyCodeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CountyCodeUpdateComponent,
    resolve: {
      countyCode: CountyCodeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CountyCodeUpdateComponent,
    resolve: {
      countyCode: CountyCodeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(countyCodeRoute)],
  exports: [RouterModule],
})
export class CountyCodeRoutingModule {}
