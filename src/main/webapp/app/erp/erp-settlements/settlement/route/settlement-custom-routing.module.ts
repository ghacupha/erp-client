import { RouterModule, Routes } from '@angular/router';
import { UserRouteAccessService } from '../../../../core/auth/user-route-access.service';
import { NgModule } from '@angular/core';
import { SettlementUpdateComponent } from '../update/settlement-update.component';
import { SettlementRoutingResolveService } from './settlement-routing-resolve.service';

const settlementRoute: Routes = [
  {
    path: 'extension/new',
    component: SettlementUpdateComponent,
    resolve: {
      settlement: SettlementRoutingResolveService,
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
