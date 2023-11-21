///
/// Erp System - Mark VIII No 1 (Hilkiah Series) Client 1.5.9
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
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IPrepaymentAmortization, PrepaymentAmortization } from '../prepayment-amortization.model';
import { PrepaymentAmortizationService } from '../service/prepayment-amortization.service';
import { ISettlementCurrency } from '../../../erp-settlements/settlement-currency/settlement-currency.model';
import { IPlaceholder } from '../../../erp-pages/placeholder/placeholder.model';
import { PrepaymentAccountService } from '../../prepayment-account/service/prepayment-account.service';
import { ITransactionAccount } from '../../../erp-accounts/transaction-account/transaction-account.model';
import { SettlementCurrencyService } from '../../../erp-settlements/settlement-currency/service/settlement-currency.service';
import { TransactionAccountService } from '../../../erp-accounts/transaction-account/service/transaction-account.service';
import { PlaceholderService } from '../../../erp-pages/placeholder/service/placeholder.service';
import { IPrepaymentAccount } from '../../prepayment-account/prepayment-account.model';

@Component({
  selector: 'jhi-prepayment-amortization-update',
  templateUrl: './prepayment-amortization-update.component.html',
})
export class PrepaymentAmortizationUpdateComponent implements OnInit {
  isSaving = false;

  prepaymentAccountsSharedCollection: IPrepaymentAccount[] = [];
  settlementCurrenciesSharedCollection: ISettlementCurrency[] = [];
  transactionAccountsSharedCollection: ITransactionAccount[] = [];
  placeholdersSharedCollection: IPlaceholder[] = [];

  editForm = this.fb.group({
    id: [],
    description: [],
    prepaymentPeriod: [],
    prepaymentAmount: [],
    inactive: [],
    prepaymentAccount: [],
    settlementCurrency: [],
    debitAccount: [],
    creditAccount: [],
    placeholders: [],
  });

  constructor(
    protected prepaymentAmortizationService: PrepaymentAmortizationService,
    protected prepaymentAccountService: PrepaymentAccountService,
    protected settlementCurrencyService: SettlementCurrencyService,
    protected transactionAccountService: TransactionAccountService,
    protected placeholderService: PlaceholderService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ prepaymentAmortization }) => {
      this.updateForm(prepaymentAmortization);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const prepaymentAmortization = this.createFromForm();
    if (prepaymentAmortization.id !== undefined) {
      this.subscribeToSaveResponse(this.prepaymentAmortizationService.update(prepaymentAmortization));
    } else {
      this.subscribeToSaveResponse(this.prepaymentAmortizationService.create(prepaymentAmortization));
    }
  }

  trackPrepaymentAccountById(index: number, item: IPrepaymentAccount): number {
    return item.id!;
  }

  trackSettlementCurrencyById(index: number, item: ISettlementCurrency): number {
    return item.id!;
  }

  trackTransactionAccountById(index: number, item: ITransactionAccount): number {
    return item.id!;
  }

  trackPlaceholderById(index: number, item: IPlaceholder): number {
    return item.id!;
  }

  getSelectedPlaceholder(option: IPlaceholder, selectedVals?: IPlaceholder[]): IPlaceholder {
    if (selectedVals) {
      for (const selectedVal of selectedVals) {
        if (option.id === selectedVal.id) {
          return selectedVal;
        }
      }
    }
    return option;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPrepaymentAmortization>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(prepaymentAmortization: IPrepaymentAmortization): void {
    this.editForm.patchValue({
      id: prepaymentAmortization.id,
      description: prepaymentAmortization.description,
      prepaymentPeriod: prepaymentAmortization.prepaymentPeriod,
      prepaymentAmount: prepaymentAmortization.prepaymentAmount,
      inactive: prepaymentAmortization.inactive,
      prepaymentAccount: prepaymentAmortization.prepaymentAccount,
      settlementCurrency: prepaymentAmortization.settlementCurrency,
      debitAccount: prepaymentAmortization.debitAccount,
      creditAccount: prepaymentAmortization.creditAccount,
      placeholders: prepaymentAmortization.placeholders,
    });

    this.prepaymentAccountsSharedCollection = this.prepaymentAccountService.addPrepaymentAccountToCollectionIfMissing(
      this.prepaymentAccountsSharedCollection,
      prepaymentAmortization.prepaymentAccount
    );
    this.settlementCurrenciesSharedCollection = this.settlementCurrencyService.addSettlementCurrencyToCollectionIfMissing(
      this.settlementCurrenciesSharedCollection,
      prepaymentAmortization.settlementCurrency
    );
    this.transactionAccountsSharedCollection = this.transactionAccountService.addTransactionAccountToCollectionIfMissing(
      this.transactionAccountsSharedCollection,
      prepaymentAmortization.debitAccount,
      prepaymentAmortization.creditAccount
    );
    this.placeholdersSharedCollection = this.placeholderService.addPlaceholderToCollectionIfMissing(
      this.placeholdersSharedCollection,
      ...(prepaymentAmortization.placeholders ?? [])
    );
  }

  protected loadRelationshipsOptions(): void {
    this.prepaymentAccountService
      .query()
      .pipe(map((res: HttpResponse<IPrepaymentAccount[]>) => res.body ?? []))
      .pipe(
        map((prepaymentAccounts: IPrepaymentAccount[]) =>
          this.prepaymentAccountService.addPrepaymentAccountToCollectionIfMissing(
            prepaymentAccounts,
            this.editForm.get('prepaymentAccount')!.value
          )
        )
      )
      .subscribe((prepaymentAccounts: IPrepaymentAccount[]) => (this.prepaymentAccountsSharedCollection = prepaymentAccounts));

    this.settlementCurrencyService
      .query()
      .pipe(map((res: HttpResponse<ISettlementCurrency[]>) => res.body ?? []))
      .pipe(
        map((settlementCurrencies: ISettlementCurrency[]) =>
          this.settlementCurrencyService.addSettlementCurrencyToCollectionIfMissing(
            settlementCurrencies,
            this.editForm.get('settlementCurrency')!.value
          )
        )
      )
      .subscribe((settlementCurrencies: ISettlementCurrency[]) => (this.settlementCurrenciesSharedCollection = settlementCurrencies));

    this.transactionAccountService
      .query()
      .pipe(map((res: HttpResponse<ITransactionAccount[]>) => res.body ?? []))
      .pipe(
        map((transactionAccounts: ITransactionAccount[]) =>
          this.transactionAccountService.addTransactionAccountToCollectionIfMissing(
            transactionAccounts,
            this.editForm.get('debitAccount')!.value,
            this.editForm.get('creditAccount')!.value
          )
        )
      )
      .subscribe((transactionAccounts: ITransactionAccount[]) => (this.transactionAccountsSharedCollection = transactionAccounts));

    this.placeholderService
      .query()
      .pipe(map((res: HttpResponse<IPlaceholder[]>) => res.body ?? []))
      .pipe(
        map((placeholders: IPlaceholder[]) =>
          this.placeholderService.addPlaceholderToCollectionIfMissing(placeholders, ...(this.editForm.get('placeholders')!.value ?? []))
        )
      )
      .subscribe((placeholders: IPlaceholder[]) => (this.placeholdersSharedCollection = placeholders));
  }

  protected createFromForm(): IPrepaymentAmortization {
    return {
      ...new PrepaymentAmortization(),
      id: this.editForm.get(['id'])!.value,
      description: this.editForm.get(['description'])!.value,
      prepaymentPeriod: this.editForm.get(['prepaymentPeriod'])!.value,
      prepaymentAmount: this.editForm.get(['prepaymentAmount'])!.value,
      inactive: this.editForm.get(['inactive'])!.value,
      prepaymentAccount: this.editForm.get(['prepaymentAccount'])!.value,
      settlementCurrency: this.editForm.get(['settlementCurrency'])!.value,
      debitAccount: this.editForm.get(['debitAccount'])!.value,
      creditAccount: this.editForm.get(['creditAccount'])!.value,
      placeholders: this.editForm.get(['placeholders'])!.value,
    };
  }
}
