import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { BusinessStampComponent } from './list/business-stamp.component';
import { BusinessStampDetailComponent } from './detail/business-stamp-detail.component';
import { BusinessStampUpdateComponent } from './update/business-stamp-update.component';
import { BusinessStampDeleteDialogComponent } from './delete/business-stamp-delete-dialog.component';
import { BusinessStampRoutingModule } from './route/business-stamp-routing.module';
import { ErpCommonModule } from '../../erp-common/erp-common.module';

@NgModule({
  imports: [SharedModule, BusinessStampRoutingModule, ErpCommonModule],
  declarations: [BusinessStampComponent, BusinessStampDetailComponent, BusinessStampUpdateComponent, BusinessStampDeleteDialogComponent],
  entryComponents: [BusinessStampDeleteDialogComponent],
})
export class BusinessStampModule {}
