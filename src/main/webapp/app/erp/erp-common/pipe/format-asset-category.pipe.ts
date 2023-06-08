import { Pipe, PipeTransform } from '@angular/core';
import { IAssetCategory } from '../../erp-assets/asset-category/asset-category.model';

@Pipe({
  name: 'formatAssetCategory',
})
export class FormatAssetCategoryPipe implements PipeTransform {

  transform(value: IAssetCategory): string {

    const accountDetail = `Selected Category Id: ${value.id} | Designation: ${value.assetCategoryName}`;

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    return value ? accountDetail :'';
  }
}
