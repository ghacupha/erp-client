///
/// Erp System - Mark X No 10 (Jehoiada Series) Client 1.7.8
/// Copyright © 2021 - 2024 Edwin Njeru (mailnjeru@gmail.com)
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
import { TALeaseInterestAccrualRuleComponent } from '../list/ta-lease-interest-accrual-rule.component';
import { TALeaseInterestAccrualRuleDetailComponent } from '../detail/ta-lease-interest-accrual-rule-detail.component';
import { TALeaseInterestAccrualRuleUpdateComponent } from '../update/ta-lease-interest-accrual-rule-update.component';
import { TALeaseInterestAccrualRuleRoutingResolveService } from './ta-lease-interest-accrual-rule-routing-resolve.service';

const tALeaseInterestAccrualRuleRoute: Routes = [
  {
    path: '',
    component: TALeaseInterestAccrualRuleComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TALeaseInterestAccrualRuleDetailComponent,
    resolve: {
      tALeaseInterestAccrualRule: TALeaseInterestAccrualRuleRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TALeaseInterestAccrualRuleUpdateComponent,
    resolve: {
      tALeaseInterestAccrualRule: TALeaseInterestAccrualRuleRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TALeaseInterestAccrualRuleUpdateComponent,
    resolve: {
      tALeaseInterestAccrualRule: TALeaseInterestAccrualRuleRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(tALeaseInterestAccrualRuleRoute)],
  exports: [RouterModule],
})
export class TALeaseInterestAccrualRuleRoutingModule {}
