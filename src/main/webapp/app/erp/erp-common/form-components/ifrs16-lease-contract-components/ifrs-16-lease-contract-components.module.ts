import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';
import { M21Ifrs16LeaseFormControlComponent } from './m21-ifrs16-lease-form-control.component';
import {
  FormatIfrs16LeaseContractPeriodPipe
} from './format-ifrs16-lease-contract-period.pipe';
import { Ifrs16LeaseContractOptionViewComponent } from './ifrs16-lease-contract-option-view.component';

@NgModule({
  imports: [CommonModule, SharedModule],
  exports: [
    M21Ifrs16LeaseFormControlComponent,
    FormatIfrs16LeaseContractPeriodPipe,
    Ifrs16LeaseContractOptionViewComponent
  ],
  declarations: [
    M21Ifrs16LeaseFormControlComponent,
    FormatIfrs16LeaseContractPeriodPipe,
    Ifrs16LeaseContractOptionViewComponent
  ],
})
export class Ifrs16LeaseContractComponentsModule {
}
