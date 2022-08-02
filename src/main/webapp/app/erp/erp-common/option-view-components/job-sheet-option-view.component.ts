import { Component, Input } from '@angular/core';
import { IJobSheet } from '../../erp-settlements/job-sheet/job-sheet.model';

@Component({
  selector: 'jhi-job-sheet-option-view',
  template: `
    Sno: {{ item.serialNumber }} By: {{ item.biller!.dealerName }} Desc: {{ item.details }}
  `
})
export class JobSheetOptionViewComponent {

  @Input() item: IJobSheet = {};
}
