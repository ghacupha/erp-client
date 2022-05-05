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
          authorities: [
            'ROLE_PAYMENTS_USER',
            'ROLE_PREPAYMENTS_MODULE_USER',
            'ROLE_FIXED_ASSETS_USER'
          ],
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
          authorities: [
            'ROLE_PAYMENTS_USER',
            'ROLE_PREPAYMENTS_MODULE_USER',
            'ROLE_TAX_MODULE_USER'
          ],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./settlement-currency/settlement-currency.module').then(m => m.SettlementCurrencyModule),
      },
      {
        path: 'purchase-order',
        data: {
          pageTitle: 'ERP-Payments | PurchaseOrders',
          authorities: [
            'ROLE_PAYMENTS_USER',
            'ROLE_PREPAYMENTS_MODULE_USER',
            'ROLE_FIXED_ASSETS_USER'
          ],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./purchase-order/purchase-order.module').then(m => m.PurchaseOrderModule),
      },
      {
        path: 'payment-invoice',
        data: {
          pageTitle: 'ERP-Payments | PaymentInvoices',
          authorities: [
            'ROLE_PAYMENTS_USER',
            'ROLE_PREPAYMENTS_MODULE_USER',
            'ROLE_FIXED_ASSETS_USER'
          ],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./payment-invoice/payment-invoice.module').then(m => m.PaymentInvoiceModule),
      },
      {
        path: 'delivery-note',
        data: {
          pageTitle: 'ERP-Payments | Delivery Notes',
          authorities: [
            'ROLE_PAYMENTS_USER',
            'ROLE_FIXED_ASSETS_USER'
          ],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./delivery-note/delivery-note.module').then(m => m.DeliveryNoteModule),
      },
      {
        path: 'business-stamp',
        data: {
          pageTitle: 'ERP-Payments | Business Stamps',
          authorities: [
            'ROLE_PAYMENTS_USER',
            'ROLE_FIXED_ASSETS_USER'
          ],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./business-stamp/business-stamp.module').then(m => m.BusinessStampModule),
      },
      {
        path: 'credit-note',
        data: {
          pageTitle: 'ERP-Payments | Credit Notes',
          authorities: [
            'ROLE_PAYMENTS_USER',
            'ROLE_PREPAYMENTS_MODULE_USER',
            'ROLE_FIXED_ASSETS_USER'
          ],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./credit-note/credit-note.module').then(m => m.CreditNoteModule),
      },
      {
        path: 'job-sheet',
        data: {
          pageTitle: 'ERP-Payments | Job Sheet',
          authorities: [
            'ROLE_PAYMENTS_USER',
            'ROLE_PREPAYMENTS_MODULE_USER',
            'ROLE_FIXED_ASSETS_USER'
          ],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./job-sheet/job-sheet.module').then(m => m.JobSheetModule),
      },
    ]),
  ],
})
export class ErpSettlementsModule {}
