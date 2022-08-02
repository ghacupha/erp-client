import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {Store} from "@ngrx/store";
import {State} from "../../../../store/global-store.definition";
import {paymentToInvoiceDealerConcluded} from "../../../../store/actions/dealer-invoice-workflows-status.actions";
import { IInvoice } from '../../../../erp-common/models/invoice.model';

@Component({
  selector: 'jhi-invoice-detail',
  templateUrl: './invoice-detail.component.html',
})
export class InvoiceDetailComponent implements OnInit {
  invoice: IInvoice | null = null;

  constructor(protected activatedRoute: ActivatedRoute, protected store: Store<State>) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ invoice }) => {
      this.invoice = invoice;
    });

    this.store.dispatch(paymentToInvoiceDealerConcluded());
  }

  previousState(): void {
    window.history.back();
  }
}
