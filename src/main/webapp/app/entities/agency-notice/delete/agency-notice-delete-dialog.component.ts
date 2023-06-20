import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IAgencyNotice } from '../agency-notice.model';
import { AgencyNoticeService } from '../service/agency-notice.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './agency-notice-delete-dialog.component.html',
})
export class AgencyNoticeDeleteDialogComponent {
  agencyNotice?: IAgencyNotice;

  constructor(protected agencyNoticeService: AgencyNoticeService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.agencyNoticeService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
