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
import { CustomerIDDocumentTypeComponent } from '../list/customer-id-document-type.component';
import { CustomerIDDocumentTypeDetailComponent } from '../detail/customer-id-document-type-detail.component';
import { CustomerIDDocumentTypeUpdateComponent } from '../update/customer-id-document-type-update.component';
import { CustomerIDDocumentTypeRoutingResolveService } from './customer-id-document-type-routing-resolve.service';

const customerIDDocumentTypeRoute: Routes = [
  {
    path: '',
    component: CustomerIDDocumentTypeComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CustomerIDDocumentTypeDetailComponent,
    resolve: {
      customerIDDocumentType: CustomerIDDocumentTypeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CustomerIDDocumentTypeUpdateComponent,
    resolve: {
      customerIDDocumentType: CustomerIDDocumentTypeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CustomerIDDocumentTypeUpdateComponent,
    resolve: {
      customerIDDocumentType: CustomerIDDocumentTypeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(customerIDDocumentTypeRoute)],
  exports: [RouterModule],
})
export class CustomerIDDocumentTypeRoutingModule {}
