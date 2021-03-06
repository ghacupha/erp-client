import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataUtils } from '../../../../../core/util/data-util.service';
import { IPayment } from '../../../../erp-common/models/payment.model';

@Component({
  selector: 'jhi-payment-detail',
  templateUrl: './payment-detail.component.html',
})
export class PaymentDetailComponent implements OnInit {
  payment: IPayment | null = null;

  constructor(protected dataUtils: DataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ payment }) => {
      this.payment = payment;
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  previousState(): void {
    window.history.back();
  }
}
