///
/// Erp System - Mark II No 17 (Baruch Series)
/// Copyright © 2021 - 2022 Edwin Njeru (mailnjeru@gmail.com)
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
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable} from 'rxjs';
import { finalize, map, } from 'rxjs/operators';

import { IPrepaymentAccount, PrepaymentAccount } from '../prepayment-account.model';
import { PrepaymentAccountService } from '../service/prepayment-account.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { ISettlementCurrency } from '../../../erp-settlements/settlement-currency/settlement-currency.model';
import { IServiceOutlet } from '../../../erp-granular/service-outlet/service-outlet.model';
import { IPlaceholder } from '../../../erp-common/models/placeholder.model';
import { IDealer } from '../../../erp-common/models/dealer.model';
import { ITransactionAccount } from '../../../erp-accounts/transaction-account/transaction-account.model';
import { SettlementCurrencyService } from '../../../erp-settlements/settlement-currency/service/settlement-currency.service';
import { ServiceOutletService } from '../../../erp-granular/service-outlet/service/service-outlet.service';
import { SettlementService } from '../../../erp-settlements/settlement/service/settlement.service';
import { DealerService } from '../../../erp-common/services/dealer.service';
import { PlaceholderService } from '../../../erp-pages/placeholder/service/placeholder.service';
import { TransactionAccountService } from '../../../erp-accounts/transaction-account/service/transaction-account.service';
import { ISettlement } from '../../../erp-settlements/settlement/settlement.model';
import { PlaceholderSuggestionService } from '../../../erp-common/suggestion/placeholder-suggestion.service';

@Component({
  selector: 'jhi-prepayment-account-update',
  templateUrl: './prepayment-account-update.component.html',
})
export class PrepaymentAccountUpdateComponent implements OnInit {
  isSaving = false;

  settlementCurrenciesSharedCollection: ISettlementCurrency[] = [];
  settlementsSharedCollection: ISettlement[] = [];
  serviceOutletsSharedCollection: IServiceOutlet[] = [];
  dealersSharedCollection: IDealer[] = [];
  placeholdersSharedCollection: IPlaceholder[] = [];
  transactionAccountsSharedCollection: ITransactionAccount[] = [];

  editForm = this.fb.group({
    id: [],
    catalogueNumber: [null, [Validators.required]],
    particulars: [null, [Validators.required]],
    notes: [],
    prepaymentAmount: [],
    settlementCurrency: [],
    prepaymentTransaction: [],
    serviceOutlet: [],
    dealer: [],
    placeholder: [],
    debitAccount: [],
    transferAccount: [],
  });

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected prepaymentAccountService: PrepaymentAccountService,
    protected settlementCurrencyService: SettlementCurrencyService,
    protected settlementService: SettlementService,
    protected serviceOutletService: ServiceOutletService,
    protected dealerService: DealerService,
    protected placeholderService: PlaceholderService,
    protected transactionAccountService: TransactionAccountService,
    protected placeholderSuggestionService: PlaceholderSuggestionService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ prepaymentAccount }) => {
      this.updateForm(prepaymentAccount);

      this.loadRelationshipsOptions();
    });

  }

  trackPlaceholdersByFn(item: IPlaceholder): number {
    return item.id!;
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  updateDealer(dealerUpdate: IDealer): void {
    this.editForm.patchValue({
      dealer: dealerUpdate,
    });
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  updatePlaceholders(update: IPlaceholder[]): void {
    this.editForm.patchValue({
      placeholder: update
    });
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  updatePrepaymentTransaction(update: ISettlement): void {
    this.editForm.patchValue({
      prepaymentTransaction: update,
    });
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  updateCurrencies(update: ISettlementCurrency): void {
    this.editForm.patchValue({
      settlementCurrency: update,
    });
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  updateServiceOutlet(update: IServiceOutlet): void {
    this.editForm.patchValue({
      serviceOutlet: update,
    });
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  updateDebitAccount(update: ITransactionAccount): void {
    this.editForm.patchValue({
      debitAccount: update,
    });
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  updateTransferAccount(update: ITransactionAccount): void {
    this.editForm.patchValue({
      transferAccount: update,
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe({
      error: (err: FileLoadError) =>
        this.eventManager.broadcast(new EventWithContent<AlertError>('erpSystemApp.error', { message: err.message })),
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const prepaymentAccount = this.createFromForm();
    if (prepaymentAccount.id !== undefined) {
      this.subscribeToSaveResponse(this.prepaymentAccountService.update(prepaymentAccount));
    } else {
      this.subscribeToSaveResponse(this.prepaymentAccountService.create(prepaymentAccount));
    }
  }

  trackSettlementCurrencyById(index: number, item: ISettlementCurrency): number {
    return item.id!;
  }

  trackSettlementById(index: number, item: ISettlement): number {
    return item.id!;
  }

  trackServiceOutletById(index: number, item: IServiceOutlet): number {
    return item.id!;
  }

  trackDealerById(index: number, item: IDealer): number {
    return item.id!;
  }

  trackPlaceholderById(index: number, item: IPlaceholder): number {
    return item.id!;
  }

  trackTransactionAccountById(index: number, item: ITransactionAccount): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPrepaymentAccount>>): void {
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

  protected updateForm(prepaymentAccount: IPrepaymentAccount): void {
    this.editForm.patchValue({
      id: prepaymentAccount.id,
      catalogueNumber: prepaymentAccount.catalogueNumber,
      particulars: prepaymentAccount.particulars,
      notes: prepaymentAccount.notes,
      prepaymentAmount: prepaymentAccount.prepaymentAmount,
      settlementCurrency: prepaymentAccount.settlementCurrency,
      prepaymentTransaction: prepaymentAccount.prepaymentTransaction,
      serviceOutlet: prepaymentAccount.serviceOutlet,
      dealer: prepaymentAccount.dealer,
      placeholder: prepaymentAccount.placeholder,
      debitAccount: prepaymentAccount.debitAccount,
      transferAccount: prepaymentAccount.transferAccount,
    });

    this.settlementCurrenciesSharedCollection = this.settlementCurrencyService.addSettlementCurrencyToCollectionIfMissing(
      this.settlementCurrenciesSharedCollection,
      prepaymentAccount.settlementCurrency
    );
    this.settlementsSharedCollection = this.settlementService.addSettlementToCollectionIfMissing(
      this.settlementsSharedCollection,
      prepaymentAccount.prepaymentTransaction
    );
    this.serviceOutletsSharedCollection = this.serviceOutletService.addServiceOutletToCollectionIfMissing(
      this.serviceOutletsSharedCollection,
      prepaymentAccount.serviceOutlet
    );
    this.dealersSharedCollection = this.dealerService.addDealerToCollectionIfMissing(
      this.dealersSharedCollection,
      prepaymentAccount.dealer
    );
    this.placeholdersSharedCollection = this.placeholderService.addPlaceholderToCollectionIfMissing(
      this.placeholdersSharedCollection,
      prepaymentAccount.placeholder
    );
    this.transactionAccountsSharedCollection = this.transactionAccountService.addTransactionAccountToCollectionIfMissing(
      this.transactionAccountsSharedCollection,
      prepaymentAccount.debitAccount,
      prepaymentAccount.transferAccount
    );
  }

  protected loadRelationshipsOptions(): void {
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

    this.settlementService
      .query()
      .pipe(map((res: HttpResponse<ISettlement[]>) => res.body ?? []))
      .pipe(
        map((settlements: ISettlement[]) =>
          this.settlementService.addSettlementToCollectionIfMissing(settlements, this.editForm.get('prepaymentTransaction')!.value)
        )
      )
      .subscribe((settlements: ISettlement[]) => (this.settlementsSharedCollection = settlements));

    this.serviceOutletService
      .query()
      .pipe(map((res: HttpResponse<IServiceOutlet[]>) => res.body ?? []))
      .pipe(
        map((serviceOutlets: IServiceOutlet[]) =>
          this.serviceOutletService.addServiceOutletToCollectionIfMissing(serviceOutlets, this.editForm.get('serviceOutlet')!.value)
        )
      )
      .subscribe((serviceOutlets: IServiceOutlet[]) => (this.serviceOutletsSharedCollection = serviceOutlets));

    this.dealerService
      .query()
      .pipe(map((res: HttpResponse<IDealer[]>) => res.body ?? []))
      .pipe(map((dealers: IDealer[]) => this.dealerService.addDealerToCollectionIfMissing(dealers, this.editForm.get('dealer')!.value)))
      .subscribe((dealers: IDealer[]) => (this.dealersSharedCollection = dealers));

    this.placeholderService
      .query()
      .pipe(map((res: HttpResponse<IPlaceholder[]>) => res.body ?? []))
      .pipe(
        map((placeholders: IPlaceholder[]) =>
          this.placeholderService.addPlaceholderToCollectionIfMissing(placeholders, this.editForm.get('placeholder')!.value)
        )
      )
      .subscribe((placeholders: IPlaceholder[]) => (this.placeholdersSharedCollection = placeholders));

    this.transactionAccountService
      .query()
      .pipe(map((res: HttpResponse<ITransactionAccount[]>) => res.body ?? []))
      .pipe(
        map((transactionAccounts: ITransactionAccount[]) =>
          this.transactionAccountService.addTransactionAccountToCollectionIfMissing(
            transactionAccounts,
            this.editForm.get('debitAccount')!.value,
            this.editForm.get('transferAccount')!.value
          )
        )
      )
      .subscribe((transactionAccounts: ITransactionAccount[]) => (this.transactionAccountsSharedCollection = transactionAccounts));
  }

  protected createFromForm(): IPrepaymentAccount {
    return {
      ...new PrepaymentAccount(),
      id: this.editForm.get(['id'])!.value,
      catalogueNumber: this.editForm.get(['catalogueNumber'])!.value,
      particulars: this.editForm.get(['particulars'])!.value,
      notes: this.editForm.get(['notes'])!.value,
      prepaymentAmount: this.editForm.get(['prepaymentAmount'])!.value,
      settlementCurrency: this.editForm.get(['settlementCurrency'])!.value,
      prepaymentTransaction: this.editForm.get(['prepaymentTransaction'])!.value,
      serviceOutlet: this.editForm.get(['serviceOutlet'])!.value,
      dealer: this.editForm.get(['dealer'])!.value,
      placeholder: this.editForm.get(['placeholder'])!.value,
      debitAccount: this.editForm.get(['debitAccount'])!.value,
      transferAccount: this.editForm.get(['transferAccount'])!.value,
    };
  }
}
