///
/// Erp System - Mark X No 6 (Jehoiada Series) Client 1.7.4
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
import { MoratoriumItemComponent } from '../list/moratorium-item.component';
import { MoratoriumItemDetailComponent } from '../detail/moratorium-item-detail.component';
import { MoratoriumItemUpdateComponent } from '../update/moratorium-item-update.component';
import { MoratoriumItemRoutingResolveService } from './moratorium-item-routing-resolve.service';

const moratoriumItemRoute: Routes = [
  {
    path: '',
    component: MoratoriumItemComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: MoratoriumItemDetailComponent,
    resolve: {
      moratoriumItem: MoratoriumItemRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: MoratoriumItemUpdateComponent,
    resolve: {
      moratoriumItem: MoratoriumItemRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: MoratoriumItemUpdateComponent,
    resolve: {
      moratoriumItem: MoratoriumItemRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(moratoriumItemRoute)],
  exports: [RouterModule],
})
export class MoratoriumItemRoutingModule {}
