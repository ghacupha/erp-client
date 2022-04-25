import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { AssetRegistrationComponent } from './list/asset-registration.component';
import { AssetRegistrationDetailComponent } from './detail/asset-registration-detail.component';
import { AssetRegistrationUpdateComponent } from './update/asset-registration-update.component';
import { AssetRegistrationDeleteDialogComponent } from './delete/asset-registration-delete-dialog.component';
import { AssetRegistrationRoutingModule } from './route/asset-registration-routing.module';
import { ErpCommonModule } from '../../erp-common/erp-common.module';

@NgModule({
  imports: [SharedModule, AssetRegistrationRoutingModule, ErpCommonModule],
  declarations: [
    AssetRegistrationComponent,
    AssetRegistrationDetailComponent,
    AssetRegistrationUpdateComponent,
    AssetRegistrationDeleteDialogComponent,
  ],
  entryComponents: [AssetRegistrationDeleteDialogComponent],
})
export class AssetRegistrationModule {}
