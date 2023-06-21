import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { DeliveryNoteComponent } from './list/delivery-note.component';
import { DeliveryNoteDetailComponent } from './detail/delivery-note-detail.component';
import { DeliveryNoteUpdateComponent } from './update/delivery-note-update.component';
import { DeliveryNoteDeleteDialogComponent } from './delete/delivery-note-delete-dialog.component';
import { DeliveryNoteRoutingModule } from './route/delivery-note-routing.module';
import { ErpCommonModule } from '../../erp-common/erp-common.module';

@NgModule({
  imports: [SharedModule, DeliveryNoteRoutingModule, ErpCommonModule],
  declarations: [DeliveryNoteComponent, DeliveryNoteDetailComponent, DeliveryNoteUpdateComponent, DeliveryNoteDeleteDialogComponent],
})
export class DeliveryNoteModule {}
