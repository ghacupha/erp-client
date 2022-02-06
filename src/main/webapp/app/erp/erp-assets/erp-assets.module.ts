import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'fixed-asset-net-book-value',
        data: { pageTitle: 'FixedAssetNetBookValues' },
        loadChildren: () =>
          import('./fixed-asset-net-book-value/fixed-asset-net-book-value.module').then(
            m => m.ErpServiceFixedAssetNetBookValueModule
          ),
      },
      {
        path: 'fixed-asset-depreciation',
        data: { pageTitle: 'FixedAssetDepreciations' },
        loadChildren: () =>
          import('./fixed-asset-depreciation/fixed-asset-depreciation.module').then(m => m.ErpServiceFixedAssetDepreciationModule),
      },
    ])
  ]
})
export class ErpAssetsModule {

}
