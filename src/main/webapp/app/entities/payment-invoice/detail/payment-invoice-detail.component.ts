import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPaymentInvoice } from '../payment-invoice.model';

@Component({
  selector: 'jhi-payment-invoice-detail',
  templateUrl: './payment-invoice-detail.component.html',
})
export class PaymentInvoiceDetailComponent implements OnInit {
  paymentInvoice: IPaymentInvoice | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ paymentInvoice }) => {
      this.paymentInvoice = paymentInvoice;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
