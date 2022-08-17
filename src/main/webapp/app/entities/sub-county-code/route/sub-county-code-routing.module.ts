///
/// Erp System - Mark II No 26 (Baruch Series) Client v 0.1.2-SNAPSHOT
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
import { SubCountyCodeComponent } from '../list/sub-county-code.component';
import { SubCountyCodeDetailComponent } from '../detail/sub-county-code-detail.component';
import { SubCountyCodeUpdateComponent } from '../update/sub-county-code-update.component';
import { SubCountyCodeRoutingResolveService } from './sub-county-code-routing-resolve.service';

const subCountyCodeRoute: Routes = [
  {
    path: '',
    component: SubCountyCodeComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SubCountyCodeDetailComponent,
    resolve: {
      subCountyCode: SubCountyCodeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SubCountyCodeUpdateComponent,
    resolve: {
      subCountyCode: SubCountyCodeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SubCountyCodeUpdateComponent,
    resolve: {
      subCountyCode: SubCountyCodeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(subCountyCodeRoute)],
  exports: [RouterModule],
})
export class SubCountyCodeRoutingModule {}
