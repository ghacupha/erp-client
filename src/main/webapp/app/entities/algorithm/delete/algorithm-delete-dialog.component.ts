import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IAlgorithm } from '../algorithm.model';
import { AlgorithmService } from '../service/algorithm.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './algorithm-delete-dialog.component.html',
})
export class AlgorithmDeleteDialogComponent {
  algorithm?: IAlgorithm;

  constructor(protected algorithmService: AlgorithmService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.algorithmService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
