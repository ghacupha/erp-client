import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { PurchaseOrderComponent } from './list/purchase-order.component';
import { PurchaseOrderDetailComponent } from './detail/purchase-order-detail.component';
import { PurchaseOrderUpdateComponent } from './update/purchase-order-update.component';
import { PurchaseOrderDeleteDialogComponent } from './delete/purchase-order-delete-dialog.component';
import { PurchaseOrderRoutingModule } from './route/purchase-order-routing.module';
import { ErpCommonModule } from '../../erp-common/erp-common.module';

@NgModule({
  imports: [SharedModule, PurchaseOrderRoutingModule, ErpCommonModule],
  declarations: [PurchaseOrderComponent, PurchaseOrderDetailComponent, PurchaseOrderUpdateComponent, PurchaseOrderDeleteDialogComponent],
  entryComponents: [PurchaseOrderDeleteDialogComponent],
})
export class PurchaseOrderModule {}
