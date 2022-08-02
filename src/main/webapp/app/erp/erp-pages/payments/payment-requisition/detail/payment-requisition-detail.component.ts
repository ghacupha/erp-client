import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPaymentRequisition } from '../../../../erp-common/models/payment-requisition.model';

@Component({
  selector: 'jhi-payment-requisition-detail',
  templateUrl: './payment-requisition-detail.component.html',
})
export class PaymentRequisitionDetailComponent implements OnInit {
  paymentRequisition: IPaymentRequisition | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ paymentRequisition }) => {
      this.paymentRequisition = paymentRequisition;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
