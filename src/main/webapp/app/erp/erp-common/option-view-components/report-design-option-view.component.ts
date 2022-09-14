import { Component, Input } from '@angular/core';
import { IReportDesign } from '../../erp-reports/report-design/report-design.model';

@Component({
  selector: 'jhi-report-design-option-view',
  template: `
    id #: {{ item.id }} name: {{ item.designation }} designation: {{ item.catalogueNumber }}: {{ item.description }}
  `
})
export class ReportDesignOptionViewComponent {
  @Input() item: IReportDesign = {};
}
