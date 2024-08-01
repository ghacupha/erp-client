import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { FiscalQuarterOptionViewComponent } from './fiscal-quarter-option-view.component';
import { FormatFiscalQuarterPipe } from './format-fiscal-quarter.pipe';
import { M21FiscalQuarterFormControlComponent } from './m21-fiscal-quarter-form-control.component';

@NgModule({
  declarations: [
    FiscalQuarterOptionViewComponent,
    FormatFiscalQuarterPipe,
    M21FiscalQuarterFormControlComponent
  ],
  imports: [SharedModule],
  exports: [
    FiscalQuarterOptionViewComponent,
    FormatFiscalQuarterPipe,
    M21FiscalQuarterFormControlComponent
  ]
})
export class FiscalQuarterComponentsModule {
}
