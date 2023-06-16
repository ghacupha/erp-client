import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IWorkProjectRegister } from '../work-project-register.model';
import { WorkProjectRegisterService } from '../service/work-project-register.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './work-project-register-delete-dialog.component.html',
})
export class WorkProjectRegisterDeleteDialogComponent {
  workProjectRegister?: IWorkProjectRegister;

  constructor(protected workProjectRegisterService: WorkProjectRegisterService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.workProjectRegisterService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
