import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IReportTemplate } from '../report-template.model';
import { ReportTemplateService } from '../service/report-template.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './report-template-delete-dialog.component.html',
})
export class ReportTemplateDeleteDialogComponent {
  reportTemplate?: IReportTemplate;

  constructor(protected reportTemplateService: ReportTemplateService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.reportTemplateService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
