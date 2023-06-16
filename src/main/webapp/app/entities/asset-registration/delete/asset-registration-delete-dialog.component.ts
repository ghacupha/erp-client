import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IAssetRegistration } from '../asset-registration.model';
import { AssetRegistrationService } from '../service/asset-registration.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './asset-registration-delete-dialog.component.html',
})
export class AssetRegistrationDeleteDialogComponent {
  assetRegistration?: IAssetRegistration;

  constructor(protected assetRegistrationService: AssetRegistrationService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.assetRegistrationService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
