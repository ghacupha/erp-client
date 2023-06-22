import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IInstitutionCode } from '../institution-code.model';
import { InstitutionCodeService } from '../service/institution-code.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './institution-code-delete-dialog.component.html',
})
export class InstitutionCodeDeleteDialogComponent {
  institutionCode?: IInstitutionCode;

  constructor(protected institutionCodeService: InstitutionCodeService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.institutionCodeService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
