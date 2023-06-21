import { SettlementRequisitionRoutingModule } from './route/settlement-requisition-routing.module';
import { ErpCommonModule } from '../../erp-common/erp-common.module';
import { SettlementRequisitionDetailComponent } from './detail/settlement-requisition-detail.component';
import { SettlementRequisitionUpdateComponent } from './update/settlement-requisition-update.component';
import { SettlementRequisitionDeleteDialogComponent } from './delete/settlement-requisition-delete-dialog.component';
import { SettlementRequisitionComponent } from './list/settlement-requisition.component';
import { SharedModule } from '../../../shared/shared.module';
import { SettlementRequisitionCustomRoutingModule } from './route/settlement-requisition-custom-routing.module';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    SharedModule,
    SettlementRequisitionRoutingModule,
    SettlementRequisitionCustomRoutingModule,
    ErpCommonModule,
  ],
  declarations: [
    SettlementRequisitionComponent,
    SettlementRequisitionDetailComponent,
    SettlementRequisitionUpdateComponent,
    SettlementRequisitionDeleteDialogComponent,
  ],
})
export class SettlementRequisitionModule {}
