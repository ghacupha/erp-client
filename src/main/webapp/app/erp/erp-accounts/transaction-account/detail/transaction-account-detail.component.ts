///
/// Erp System - Mark X No 10 (Jehoiada Series) Client 1.7.8
/// Copyright © 2021 - 2024 Edwin Njeru (mailnjeru@gmail.com)
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

import { ITransactionAccount } from '../transaction-account.model';
import { DataUtils } from 'app/core/util/data-util.service';
import { IIFRS16LeaseContract } from '../../../erp-leases/ifrs-16-lease-contract/ifrs-16-lease-contract.model';
import { Store } from '@ngrx/store';
import { State } from '../../../store/global-store.definition';
import {
  transactionAccountCopyWorkflowInitiatedFromView,
  transactionAccountEditWorkflowInitiatedFromView
} from '../../../store/actions/transaction-account-update-status.actions';

@Component({
  selector: 'jhi-transaction-account-detail',
  templateUrl: './transaction-account-detail.component.html',
})
export class TransactionAccountDetailComponent implements OnInit {
  transactionAccount: ITransactionAccount | null = null;

  constructor(protected dataUtils: DataUtils, protected activatedRoute: ActivatedRoute, protected store: Store<State>) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ transactionAccount }) => {
      this.transactionAccount = transactionAccount;
    });
  }

  editButtonEvent(instance: IIFRS16LeaseContract): void {
    this.store.dispatch(transactionAccountEditWorkflowInitiatedFromView({editedInstance: instance}))
  }

  copyButtonEvent(instance: IIFRS16LeaseContract): void {
    this.store.dispatch(transactionAccountCopyWorkflowInitiatedFromView({copiedInstance: instance}))
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
