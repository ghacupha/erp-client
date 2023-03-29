import { Component, Input } from '@angular/core';
import { IContractMetadata } from '../../erp-pages/contract-metadata/contract-metadata.model';

@Component({
  selector: 'jhi-contract-metadata-selected-option-view',
  template: `
    <span class="ng-value-label">
      {{item.contractTitle }} {{item.contractIdentifierShort}} {{ item.typeOfContract }}
    </span>
  `
})
export class ContractMetadataSelectedOptionViewComponent {

  @Input() item: IContractMetadata = {};
}