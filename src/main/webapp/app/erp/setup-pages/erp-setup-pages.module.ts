import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: 'erp/setup/settlement-currency',
      data: { pageTitle: 'ERP | Setup | Settlement Currency' },
      loadChildren: () => import('./settlement-currency/settlement-currency.module').then(m => m.SettlementCurrencyModule),
    },
    {
      path: 'erp/setup/placeholder',
      data: { pageTitle: 'ERP | Setup | Placeholder' },
      loadChildren: () => import('./settlement-currency/settlement-currency.module').then(m => m.SettlementCurrencyModule),
    },
    ])
  ],
})
export class ErpSetupPagesModule {}
