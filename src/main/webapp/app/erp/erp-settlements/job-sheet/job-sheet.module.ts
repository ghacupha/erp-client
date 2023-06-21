import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { JobSheetComponent } from './list/job-sheet.component';
import { JobSheetDetailComponent } from './detail/job-sheet-detail.component';
import { JobSheetUpdateComponent } from './update/job-sheet-update.component';
import { JobSheetDeleteDialogComponent } from './delete/job-sheet-delete-dialog.component';
import { JobSheetRoutingModule } from './route/job-sheet-routing.module';
import { ErpCommonModule } from '../../erp-common/erp-common.module';

@NgModule({
  imports: [SharedModule, JobSheetRoutingModule, ErpCommonModule],
  declarations: [JobSheetComponent, JobSheetDetailComponent, JobSheetUpdateComponent, JobSheetDeleteDialogComponent],
})
export class JobSheetModule {}
