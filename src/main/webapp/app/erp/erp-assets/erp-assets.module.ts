import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'fixed-asset-net-book-value',
        data: { pageTitle: 'FixedAssetNetBookValue' },
        loadChildren: () =>
          import('./fixed-asset-net-book-value/fixed-asset-net-book-value.module').then(
            m => m.ErpServiceFixedAssetNetBookValueModule
          ),
      },
      {
        path: 'fixed-asset-depreciation',
        data: { pageTitle: 'FixedAssetDepreciation' },
        loadChildren: () =>
          import('./fixed-asset-depreciation/fixed-asset-depreciation.module').then(m => m.ErpServiceFixedAssetDepreciationModule),
      },
      {
        path: 'fixed-asset-acquisition',
        data: { pageTitle: 'FixedAssetAcquisition' },
        loadChildren: () =>
          import('./fixed-asset-acquisition/fixed-asset-acquisition.module').then(m => m.ErpServiceFixedAssetAcquisitionModule),
      },
    ])
  ]
})
export class ErpAssetsModule {

}
