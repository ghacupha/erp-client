///
/// Erp System - Mark VII No 1 (Gideon Series) Client 1.5.5
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

import { RouterModule, Routes } from '@angular/router';
import { UserRouteAccessService } from '../../../../core/auth/user-route-access.service';
import { NgModule } from '@angular/core';
import { SettlementUpdateComponent } from '../update/settlement-update.component';
import { SettlementNewRoutingResolveService } from './settlement-new-routing-resolve.service';
import { SettlementCopyRoutingResolveService } from './settlement-copy-routing-resolve.service';

const settlementRoute: Routes = [
  {
    path: 'extension/new',
    component: SettlementUpdateComponent,
    resolve: {
      settlement: SettlementNewRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/copy',
    component: SettlementUpdateComponent,
    resolve: {
      settlement: SettlementCopyRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SettlementUpdateComponent,
    resolve: {
      settlement: SettlementNewRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(settlementRoute)],
  exports: [RouterModule],
})
export class SettlementCustomRoutingModule {

}
