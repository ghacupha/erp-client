import { Component, Input } from '@angular/core';
import { ILeaseContract } from '../../erp-leases/lease-contract/lease-contract.model';

@Component({
  selector: 'jhi-lease-contract-selected-option-view',
  template: `
    <span class="ng-value-label">
      {{item.bookingId }} {{item.leaseTitle}}
    </span>
  `
})
export class LeaseContractSelectedOptionViewComponent {

  @Input() item: ILeaseContract = {};
}
