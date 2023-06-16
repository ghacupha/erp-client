import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ISystemModule } from '../system-module.model';
import { SystemModuleService } from '../service/system-module.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './system-module-delete-dialog.component.html',
})
export class SystemModuleDeleteDialogComponent {
  systemModule?: ISystemModule;

  constructor(protected systemModuleService: SystemModuleService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.systemModuleService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
