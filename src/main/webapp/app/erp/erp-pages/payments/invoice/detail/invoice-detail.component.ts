///
/// Erp System - Mark VIII No 3 (Hilkiah Series) Client 1.6.2
/// Copyright © 2021 - 2023 Edwin Njeru (mailnjeru@gmail.com)
///
/// This program is free software: you can redistribute it and/or modify
/// it under the terms of the GNU General Public License as published by
/// the Free Software Foundation, either version 3 of the License, or
/// (at your option) any later version.
///
/// This program is distributed in the hope that it will be useful,
/// but WITHOUT ANY WARRANTY; without even the implied warranty of
/// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
/// GNU General Public License for more details.
///
/// You should have received a copy of the GNU General Public License
/// along with this program. If not, see <http://www.gnu.org/licenses/>.
///

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {Store} from "@ngrx/store";
import {State} from "../../../../store/global-store.definition";
import {paymentToInvoiceDealerConcluded} from "../../../../store/actions/dealer-invoice-workflows-status.actions";
import { IInvoice } from '../invoice.model';

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
