import { RouterModule, Routes } from '@angular/router';
import { UserRouteAccessService } from '../../../../core/auth/user-route-access.service';
import { IFRS16LeaseContractRoutingResolveService } from './ifrs-16-lease-contract-routing-resolve.service';
import { IFRS16LeaseContractUpdateComponent } from '../update/ifrs-16-lease-contract-update.component';
import { NgModule } from '@angular/core';

const iFRS16LeaseContractCopyRoute: Routes = [
  {
    path: ':id/copy',
    component: IFRS16LeaseContractUpdateComponent,
    resolve: {
      iFRS16LeaseContract: IFRS16LeaseContractRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(iFRS16LeaseContractCopyRoute)],
  exports: [RouterModule],
})
export class Ifrs16LeaseContractRoutingCustomModule {
}
