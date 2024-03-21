import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';
import { AssetRegistrationOptionViewComponent } from './asset-registration-option-view.component';
import { FormatAssetRegistrationPipe } from './format-asset-registration.pipe';
import { M21AssetRegistrationFormControlComponent } from './m21-asset-registration-form-control.component';

@NgModule({
  declarations: [
    AssetRegistrationOptionViewComponent,
    M21AssetRegistrationFormControlComponent,
    FormatAssetRegistrationPipe
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    AssetRegistrationOptionViewComponent,
    M21AssetRegistrationFormControlComponent,
    FormatAssetRegistrationPipe
  ]
})
export class AssetRegistrationFormComponentsModule {

}
