///
/// Erp System - Mark VIII No 1 (Hilkiah Series) Client 1.5.9
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

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { FraudTypeComponent } from '../list/fraud-type.component';
import { FraudTypeDetailComponent } from '../detail/fraud-type-detail.component';
import { FraudTypeUpdateComponent } from '../update/fraud-type-update.component';
import { FraudTypeRoutingResolveService } from './fraud-type-routing-resolve.service';

const fraudTypeRoute: Routes = [
  {
    path: '',
    component: FraudTypeComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: FraudTypeDetailComponent,
    resolve: {
      fraudType: FraudTypeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: FraudTypeUpdateComponent,
    resolve: {
      fraudType: FraudTypeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: FraudTypeUpdateComponent,
    resolve: {
      fraudType: FraudTypeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(fraudTypeRoute)],
  exports: [RouterModule],
})
export class FraudTypeRoutingModule {}
