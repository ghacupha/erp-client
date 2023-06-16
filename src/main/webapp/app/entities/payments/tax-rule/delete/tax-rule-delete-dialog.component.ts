import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ITaxRule } from '../tax-rule.model';
import { TaxRuleService } from '../service/tax-rule.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './tax-rule-delete-dialog.component.html',
})
export class TaxRuleDeleteDialogComponent {
  taxRule?: ITaxRule;

  constructor(protected taxRuleService: TaxRuleService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.taxRuleService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
