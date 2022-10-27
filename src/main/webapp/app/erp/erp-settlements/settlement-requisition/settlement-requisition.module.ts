import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { SettlementRequisitionComponent } from './list/settlement-requisition.component';
import { SettlementRequisitionDetailComponent } from './detail/settlement-requisition-detail.component';
import { SettlementRequisitionUpdateComponent } from './update/settlement-requisition-update.component';
import { SettlementRequisitionDeleteDialogComponent } from './delete/settlement-requisition-delete-dialog.component';
import { SettlementRequisitionRoutingModule } from './route/settlement-requisition-routing.module';
import { ErpCommonModule } from '../../erp-common/erp-common.module';

@NgModule({
  imports: [SharedModule, SettlementRequisitionRoutingModule, ErpCommonModule],
  declarations: [
    SettlementRequisitionComponent,
    SettlementRequisitionDetailComponent,
    SettlementRequisitionUpdateComponent,
    SettlementRequisitionDeleteDialogComponent,
  ],
  entryComponents: [SettlementRequisitionDeleteDialogComponent],
})
export class SettlementRequisitionModule {}
