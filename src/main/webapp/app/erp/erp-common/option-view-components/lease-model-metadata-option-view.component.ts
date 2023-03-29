import { Component, Input } from '@angular/core';
import { ILeaseModelMetadata } from '../../erp-leases/lease-model-metadata/lease-model-metadata.model';

@Component({
  selector: 'jhi-lease-model-metadata-option-view',
  template: `
    <span class="ng-value-label">
      {{item.modelTitle }}
    </span>
  `
})
export class LeaseModelMetadataOptionViewComponent {

  @Input() item: ILeaseModelMetadata = {};
}
