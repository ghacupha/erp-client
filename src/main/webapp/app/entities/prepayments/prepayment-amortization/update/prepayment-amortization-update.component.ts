///
/// Erp System - Mark IV No 1 (David Series) Client 1.4.0
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
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { PrepaymentAmortizationFormService, PrepaymentAmortizationFormGroup } from './prepayment-amortization-form.service';
import { IPrepaymentAmortization } from '../prepayment-amortization.model';
import { PrepaymentAmortizationService } from '../service/prepayment-amortization.service';
import { IPrepaymentAccount } from 'app/entities/prepayments/prepayment-account/prepayment-account.model';
import { PrepaymentAccountService } from 'app/entities/prepayments/prepayment-account/service/prepayment-account.service';
import { ISettlementCurrency } from 'app/entities/settlement/settlement-currency/settlement-currency.model';
import { SettlementCurrencyService } from 'app/entities/settlement/settlement-currency/service/settlement-currency.service';
import { ITransactionAccount } from 'app/entities/accounting/transaction-account/transaction-account.model';
import { TransactionAccountService } from 'app/entities/accounting/transaction-account/service/transaction-account.service';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/system/placeholder/service/placeholder.service';

@Component({
  selector: 'jhi-prepayment-amortization-update',
  templateUrl: './prepayment-amortization-update.component.html',
})
export class PrepaymentAmortizationUpdateComponent implements OnInit {
  isSaving = false;
  prepaymentAmortization: IPrepaymentAmortization | null = null;

  prepaymentAccountsSharedCollection: IPrepaymentAccount[] = [];
  settlementCurrenciesSharedCollection: ISettlementCurrency[] = [];
  transactionAccountsSharedCollection: ITransactionAccount[] = [];
  placeholdersSharedCollection: IPlaceholder[] = [];

  editForm: PrepaymentAmortizationFormGroup = this.prepaymentAmortizationFormService.createPrepaymentAmortizationFormGroup();

  constructor(
    protected prepaymentAmortizationService: PrepaymentAmortizationService,
    protected prepaymentAmortizationFormService: PrepaymentAmortizationFormService,
    protected prepaymentAccountService: PrepaymentAccountService,
    protected settlementCurrencyService: SettlementCurrencyService,
    protected transactionAccountService: TransactionAccountService,
    protected placeholderService: PlaceholderService,
    protected activatedRoute: ActivatedRoute
  ) {}

  comparePrepaymentAccount = (o1: IPrepaymentAccount | null, o2: IPrepaymentAccount | null): boolean =>
    this.prepaymentAccountService.comparePrepaymentAccount(o1, o2);

  compareSettlementCurrency = (o1: ISettlementCurrency | null, o2: ISettlementCurrency | null): boolean =>
    this.settlementCurrencyService.compareSettlementCurrency(o1, o2);

  compareTransactionAccount = (o1: ITransactionAccount | null, o2: ITransactionAccount | null): boolean =>
    this.transactionAccountService.compareTransactionAccount(o1, o2);

  comparePlaceholder = (o1: IPlaceholder | null, o2: IPlaceholder | null): boolean => this.placeholderService.comparePlaceholder(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ prepaymentAmortization }) => {
      this.prepaymentAmortization = prepaymentAmortization;
      if (prepaymentAmortization) {
        this.updateForm(prepaymentAmortization);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const prepaymentAmortization = this.prepaymentAmortizationFormService.getPrepaymentAmortization(this.editForm);
    if (prepaymentAmortization.id !== null) {
      this.subscribeToSaveResponse(this.prepaymentAmortizationService.update(prepaymentAmortization));
    } else {
      this.subscribeToSaveResponse(this.prepaymentAmortizationService.create(prepaymentAmortization));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPrepaymentAmortization>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
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
    this.prepaymentAmortization = prepaymentAmortization;
    this.prepaymentAmortizationFormService.resetForm(this.editForm, prepaymentAmortization);

    this.prepaymentAccountsSharedCollection = this.prepaymentAccountService.addPrepaymentAccountToCollectionIfMissing<IPrepaymentAccount>(
      this.prepaymentAccountsSharedCollection,
      prepaymentAmortization.prepaymentAccount
    );
    this.settlementCurrenciesSharedCollection =
      this.settlementCurrencyService.addSettlementCurrencyToCollectionIfMissing<ISettlementCurrency>(
        this.settlementCurrenciesSharedCollection,
        prepaymentAmortization.settlementCurrency
      );
    this.transactionAccountsSharedCollection =
      this.transactionAccountService.addTransactionAccountToCollectionIfMissing<ITransactionAccount>(
        this.transactionAccountsSharedCollection,
        prepaymentAmortization.debitAccount,
        prepaymentAmortization.creditAccount
      );
    this.placeholdersSharedCollection = this.placeholderService.addPlaceholderToCollectionIfMissing<IPlaceholder>(
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
          this.prepaymentAccountService.addPrepaymentAccountToCollectionIfMissing<IPrepaymentAccount>(
            prepaymentAccounts,
            this.prepaymentAmortization?.prepaymentAccount
          )
        )
      )
      .subscribe((prepaymentAccounts: IPrepaymentAccount[]) => (this.prepaymentAccountsSharedCollection = prepaymentAccounts));

    this.settlementCurrencyService
      .query()
      .pipe(map((res: HttpResponse<ISettlementCurrency[]>) => res.body ?? []))
      .pipe(
        map((settlementCurrencies: ISettlementCurrency[]) =>
          this.settlementCurrencyService.addSettlementCurrencyToCollectionIfMissing<ISettlementCurrency>(
            settlementCurrencies,
            this.prepaymentAmortization?.settlementCurrency
          )
        )
      )
      .subscribe((settlementCurrencies: ISettlementCurrency[]) => (this.settlementCurrenciesSharedCollection = settlementCurrencies));

    this.transactionAccountService
      .query()
      .pipe(map((res: HttpResponse<ITransactionAccount[]>) => res.body ?? []))
      .pipe(
        map((transactionAccounts: ITransactionAccount[]) =>
          this.transactionAccountService.addTransactionAccountToCollectionIfMissing<ITransactionAccount>(
            transactionAccounts,
            this.prepaymentAmortization?.debitAccount,
            this.prepaymentAmortization?.creditAccount
          )
        )
      )
      .subscribe((transactionAccounts: ITransactionAccount[]) => (this.transactionAccountsSharedCollection = transactionAccounts));

    this.placeholderService
      .query()
      .pipe(map((res: HttpResponse<IPlaceholder[]>) => res.body ?? []))
      .pipe(
        map((placeholders: IPlaceholder[]) =>
          this.placeholderService.addPlaceholderToCollectionIfMissing<IPlaceholder>(
            placeholders,
            ...(this.prepaymentAmortization?.placeholders ?? [])
          )
        )
      )
      .subscribe((placeholders: IPlaceholder[]) => (this.placeholdersSharedCollection = placeholders));
  }
}
