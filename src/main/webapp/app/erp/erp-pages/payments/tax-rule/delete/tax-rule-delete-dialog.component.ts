import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ITaxRule } from '../../../../erp-common/models/tax-rule.model';
import { TaxRuleService } from '../../../../erp-common/services/tax-rule.service';

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
      this.activeModal.close('deleted');
    });
  }
}
