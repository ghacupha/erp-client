///
/// Erp System - Mark V No 1 (Ehud Series) Client 1.4.2
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
import { SharedModule } from 'app/shared/shared.module';
import { PurchaseOrderComponent } from './list/purchase-order.component';
import { PurchaseOrderDetailComponent } from './detail/purchase-order-detail.component';
import { PurchaseOrderUpdateComponent } from './update/purchase-order-update.component';
import { PurchaseOrderDeleteDialogComponent } from './delete/purchase-order-delete-dialog.component';
import { PurchaseOrderRoutingModule } from './route/purchase-order-routing.module';

@NgModule({
  imports: [SharedModule, PurchaseOrderRoutingModule],
  declarations: [PurchaseOrderComponent, PurchaseOrderDetailComponent, PurchaseOrderUpdateComponent, PurchaseOrderDeleteDialogComponent],
  entryComponents: [PurchaseOrderDeleteDialogComponent],
})
export class PurchaseOrderModule {}