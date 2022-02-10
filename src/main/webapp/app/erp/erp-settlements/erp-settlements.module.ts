import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserRouteAccessService } from '../../core/auth/user-route-access.service';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'settlement',
        data: {
          pageTitle: 'ERP-Payments | Settlements',
          authorities: ['ROLE_PAYMENTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./settlement/settlement.module').then(m => m.SettlementModule),
      },
      {
        path: 'payment-category',
        data: {
          pageTitle: 'ERP-Payments | PaymentCategories',
          authorities: ['ROLE_PAYMENTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./payments/payment-category/payment-category.module').then(m => m.ErpServicePaymentCategoryModule),
      },
      {
        path: 'settlement-currency',
        data: {
          pageTitle: 'ERP-Payments | SettlementCurrencies',
          authorities: ['ROLE_PAYMENTS_USER', 'ROLE_TAX_MODULE_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./settlement-currency/settlement-currency.module').then(m => m.SettlementCurrencyModule),
      },
      {
        path: 'purchase-order',
        data: {
          pageTitle: 'ERP-Payments | PurchaseOrders',
          authorities: ['ROLE_PAYMENTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./purchase-order/purchase-order.module').then(m => m.PurchaseOrderModule),
      },
      {
        path: 'payment-invoice',
        data: {
          pageTitle: 'ERP-Payments | PaymentInvoices',
          authorities: ['ROLE_PAYMENTS_USER'],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./payment-invoice/payment-invoice.module').then(m => m.PaymentInvoiceModule),
      },
    ]),
  ],
})
export class ErpSettlementsModule {}
