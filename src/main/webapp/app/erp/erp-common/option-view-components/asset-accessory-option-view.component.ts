import { Component, Input } from '@angular/core';
import { IAssetAccessory } from '../../erp-assets/asset-accessory/asset-accessory.model';

@Component({
  selector: 'jhi-asset-warranty-option-view',
  template: `
    tag: {{ item.assetTag }}  expiry: {{ item.assetDetails }}
  `
})
export class AssetAccessoryOptionViewComponent {
  @Input() item: IAssetAccessory = {};
}
