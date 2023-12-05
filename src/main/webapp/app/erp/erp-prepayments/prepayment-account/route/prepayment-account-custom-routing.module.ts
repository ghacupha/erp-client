import { RouterModule, Routes } from '@angular/router';
import { UserRouteAccessService } from '../../../../core/auth/user-route-access.service';
import { PrepaymentAccountUpdateComponent } from '../update/prepayment-account-update.component';
import { NgModule } from '@angular/core';

const prepaymentAccountRoute: Routes = [
  {
    path: ':id/copy',
    component: PrepaymentAccountUpdateComponent,
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(prepaymentAccountRoute)],
  exports: [RouterModule],
})
export class PrepaymentAccountCustomRoutingModule {
}
