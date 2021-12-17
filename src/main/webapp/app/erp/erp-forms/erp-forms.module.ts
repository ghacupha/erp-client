import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErpMaterialModule } from '../../erp-material.module';
import { DealerMaintenanceModule } from './dealer-maintenance/dealer-maintenance.module';
import { RouterModule } from '@angular/router';

@NgModule({
 imports: [
   FormsModule,
   ErpMaterialModule,
   ReactiveFormsModule,
   DealerMaintenanceModule,
   RouterModule.forChild([
       {
         path: 'erp/forms/dealer-maintenance',
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
