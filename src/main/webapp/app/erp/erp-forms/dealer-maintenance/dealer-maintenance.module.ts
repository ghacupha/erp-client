import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErpMaterialModule } from '../../../erp-material.module';
import { UserRouteAccessService } from '../../../core/auth/user-route-access.service';
import { RouterModule, Routes } from '@angular/router';
import { DealerMaintenanceFormComponent } from './dealer-maintenance-form.component';
import { ErpCommonModule } from '../../erp-common/erp-common.module';

const dealerMaintenanceRoute: Routes = [
  {
    path: 'dealer-maintenance',
    component: DealerMaintenanceFormComponent,
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  declarations: [
    DealerMaintenanceFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ErpMaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild(dealerMaintenanceRoute),
    ErpCommonModule
  ]
})
export class DealerMaintenanceModule {}
