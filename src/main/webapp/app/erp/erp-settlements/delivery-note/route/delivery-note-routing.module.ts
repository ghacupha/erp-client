///
/// Erp System - Mark II No 23 (Baruch Series) Client v 0.1.1-SNAPSHOT
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
import { DeliveryNoteComponent } from '../list/delivery-note.component';
import { DeliveryNoteDetailComponent } from '../detail/delivery-note-detail.component';
import { DeliveryNoteUpdateComponent } from '../update/delivery-note-update.component';
import { DeliveryNoteRoutingResolveService } from './delivery-note-routing-resolve.service';

const deliveryNoteRoute: Routes = [
  {
    path: '',
    component: DeliveryNoteComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DeliveryNoteDetailComponent,
    resolve: {
      deliveryNote: DeliveryNoteRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DeliveryNoteUpdateComponent,
    resolve: {
      deliveryNote: DeliveryNoteRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DeliveryNoteUpdateComponent,
    resolve: {
      deliveryNote: DeliveryNoteRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(deliveryNoteRoute)],
  exports: [RouterModule],
})
export class DeliveryNoteRoutingModule {}
