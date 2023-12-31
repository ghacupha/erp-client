import { Component, Input } from '@angular/core';
import { IFiscalQuarter } from '../../../erp-pages/fiscal-quarter/fiscal-quarter.model';

@Component({
  selector: 'jhi-fiscal-quarter-option-view',
  template: `
    # {{item.id}} Code {{ item.fiscalQuarterCode }} Start Date: {{ item.startDate }} End Date: {{ item.endDate }}
  `
})
export class FiscalMonthOptionViewComponent {

  @Input() item: IFiscalQuarter = {};
}
