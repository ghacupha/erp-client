import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { CreditNoteComponent } from './list/credit-note.component';
import { CreditNoteDetailComponent } from './detail/credit-note-detail.component';
import { CreditNoteUpdateComponent } from './update/credit-note-update.component';
import { CreditNoteDeleteDialogComponent } from './delete/credit-note-delete-dialog.component';
import { CreditNoteRoutingModule } from './route/credit-note-routing.module';
import { ErpCommonModule } from '../../erp-common/erp-common.module';

@NgModule({
  imports: [SharedModule, CreditNoteRoutingModule, ErpCommonModule],
  declarations: [CreditNoteComponent, CreditNoteDetailComponent, CreditNoteUpdateComponent, CreditNoteDeleteDialogComponent],
})
export class CreditNoteModule {}
