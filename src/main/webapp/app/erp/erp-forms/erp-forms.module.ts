import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErpMaterialModule } from '../../erp-material.module';
import { DealerMaintenanceModule } from './dealer-maintenance/dealer-maintenance.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
 imports: [
   FormsModule,
   ErpMaterialModule,
   ReactiveFormsModule,
   DealerMaintenanceModule,
   SharedModule,
   RouterModule.forChild([
       {
         path: 'erp/forms',
         data: { pageTitle: 'ERP | Dealer Maintenance' },
         loadChildren: () => import('./dealer-maintenance/dealer-maintenance.module').then(m => m.DealerMaintenanceModule),
       },
     ]),
  ],
  exports: [
    DealerMaintenanceModule
  ]
})
export class ErpFormsModule {}
