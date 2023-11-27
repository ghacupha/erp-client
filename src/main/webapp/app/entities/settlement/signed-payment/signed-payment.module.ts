///
/// Erp System - Mark VIII No 1 (Hilkiah Series) Client 1.5.9
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
import { SignedPaymentComponent } from './list/signed-payment.component';
import { SignedPaymentDetailComponent } from './detail/signed-payment-detail.component';
import { SignedPaymentUpdateComponent } from './update/signed-payment-update.component';
import { SignedPaymentDeleteDialogComponent } from './delete/signed-payment-delete-dialog.component';
import { SignedPaymentRoutingModule } from './route/signed-payment-routing.module';

@NgModule({
  imports: [SharedModule, SignedPaymentRoutingModule],
  declarations: [SignedPaymentComponent, SignedPaymentDetailComponent, SignedPaymentUpdateComponent, SignedPaymentDeleteDialogComponent],
  entryComponents: [SignedPaymentDeleteDialogComponent],
})
export class SignedPaymentModule {}
