import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';
import { DepreciationPeriodOptionViewComponent } from './depreciation-period-option-view.component';
import { FormatDepreciationPeriodPipe } from './format-depreciation-period.pipe';
import { M21DepreciationPeriodFormControlComponent } from './m21-depreciation-period-form-control.component';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [
    DepreciationPeriodOptionViewComponent,
    FormatDepreciationPeriodPipe,
    M21DepreciationPeriodFormControlComponent,
  ],
  exports: [
    DepreciationPeriodOptionViewComponent,
    FormatDepreciationPeriodPipe,
    M21DepreciationPeriodFormControlComponent,
  ],
})
export class DepreciationPeriodFormComponentsModule {
}
