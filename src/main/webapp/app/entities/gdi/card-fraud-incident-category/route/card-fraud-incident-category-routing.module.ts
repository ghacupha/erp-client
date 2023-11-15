///
/// Erp System - Mark VII No 5 (Gideon Series) Client 1.5.7
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
import { CardFraudIncidentCategoryComponent } from '../list/card-fraud-incident-category.component';
import { CardFraudIncidentCategoryDetailComponent } from '../detail/card-fraud-incident-category-detail.component';
import { CardFraudIncidentCategoryUpdateComponent } from '../update/card-fraud-incident-category-update.component';
import { CardFraudIncidentCategoryRoutingResolveService } from './card-fraud-incident-category-routing-resolve.service';

const cardFraudIncidentCategoryRoute: Routes = [
  {
    path: '',
    component: CardFraudIncidentCategoryComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CardFraudIncidentCategoryDetailComponent,
    resolve: {
      cardFraudIncidentCategory: CardFraudIncidentCategoryRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CardFraudIncidentCategoryUpdateComponent,
    resolve: {
      cardFraudIncidentCategory: CardFraudIncidentCategoryRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CardFraudIncidentCategoryUpdateComponent,
    resolve: {
      cardFraudIncidentCategory: CardFraudIncidentCategoryRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(cardFraudIncidentCategoryRoute)],
  exports: [RouterModule],
})
export class CardFraudIncidentCategoryRoutingModule {}
