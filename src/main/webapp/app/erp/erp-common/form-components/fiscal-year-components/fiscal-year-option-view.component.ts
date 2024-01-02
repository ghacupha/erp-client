import { Component, Input } from '@angular/core';
import { IFiscalYear } from '../../../erp-pages/fiscal-year/fiscal-year.model';

@Component({
  selector: 'jhi-fiscal-year-option-view',
  template: `
    # {{item.id}} Code {{ item.fiscalYearCode }} Status: {{ item.fiscalYearStatus }} Start Date: {{ item.startDate }} End Date: {{ item.endDate }}
  `
})
export class FiscalYearOptionViewComponent {

  @Input() item: IFiscalYear = {};
}
