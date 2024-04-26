///
/// Erp System - Mark X No 7 (Jehoiada Series) Client 1.7.5
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
import { AgentBankingActivityComponent } from '../list/agent-banking-activity.component';
import { AgentBankingActivityDetailComponent } from '../detail/agent-banking-activity-detail.component';
import { AgentBankingActivityUpdateComponent } from '../update/agent-banking-activity-update.component';
import { AgentBankingActivityRoutingResolveService } from './agent-banking-activity-routing-resolve.service';

const agentBankingActivityRoute: Routes = [
  {
    path: '',
    component: AgentBankingActivityComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AgentBankingActivityDetailComponent,
    resolve: {
      agentBankingActivity: AgentBankingActivityRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AgentBankingActivityUpdateComponent,
    resolve: {
      agentBankingActivity: AgentBankingActivityRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AgentBankingActivityUpdateComponent,
    resolve: {
      agentBankingActivity: AgentBankingActivityRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(agentBankingActivityRoute)],
  exports: [RouterModule],
})
export class AgentBankingActivityRoutingModule {}