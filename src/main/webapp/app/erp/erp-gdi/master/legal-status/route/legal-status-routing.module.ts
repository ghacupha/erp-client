///
/// Erp System - Mark IX No 2 (Hilkiah Series) Client 1.6.3
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
import { LegalStatusComponent } from '../list/legal-status.component';
import { LegalStatusDetailComponent } from '../detail/legal-status-detail.component';
import { LegalStatusUpdateComponent } from '../update/legal-status-update.component';
import { LegalStatusRoutingResolveService } from './legal-status-routing-resolve.service';

const legalStatusRoute: Routes = [
  {
    path: '',
    component: LegalStatusComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: LegalStatusDetailComponent,
    resolve: {
      legalStatus: LegalStatusRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: LegalStatusUpdateComponent,
    resolve: {
      legalStatus: LegalStatusRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: LegalStatusUpdateComponent,
    resolve: {
      legalStatus: LegalStatusRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(legalStatusRoute)],
  exports: [RouterModule],
})
export class LegalStatusRoutingModule {}
