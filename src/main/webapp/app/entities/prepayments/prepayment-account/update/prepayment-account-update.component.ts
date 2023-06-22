import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { PrepaymentAccountFormService, PrepaymentAccountFormGroup } from './prepayment-account-form.service';
import { IPrepaymentAccount } from '../prepayment-account.model';
import { PrepaymentAccountService } from '../service/prepayment-account.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { ISettlementCurrency } from 'app/entities/settlement/settlement-currency/settlement-currency.model';
import { SettlementCurrencyService } from 'app/entities/settlement/settlement-currency/service/settlement-currency.service';
import { ISettlement } from 'app/entities/settlement/settlement/settlement.model';
import { SettlementService } from 'app/entities/settlement/settlement/service/settlement.service';
import { IServiceOutlet } from 'app/entities/data/service-outlet/service-outlet.model';
import { ServiceOutletService } from 'app/entities/data/service-outlet/service/service-outlet.service';
import { IDealer } from 'app/entities/people/dealer/dealer.model';
import { DealerService } from 'app/entities/people/dealer/service/dealer.service';
import { ITransactionAccount } from 'app/entities/accounting/transaction-account/transaction-account.model';
import { TransactionAccountService } from 'app/entities/accounting/transaction-account/service/transaction-account.service';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/system/placeholder/service/placeholder.service';
import { IUniversallyUniqueMapping } from 'app/entities/system/universally-unique-mapping/universally-unique-mapping.model';
import { UniversallyUniqueMappingService } from 'app/entities/system/universally-unique-mapping/service/universally-unique-mapping.service';
import { IPrepaymentMapping } from 'app/entities/prepayments/prepayment-mapping/prepayment-mapping.model';
import { PrepaymentMappingService } from 'app/entities/prepayments/prepayment-mapping/service/prepayment-mapping.service';
import { IBusinessDocument } from 'app/entities/documentation/business-document/business-document.model';
import { BusinessDocumentService } from 'app/entities/documentation/business-document/service/business-document.service';

@Component({
  selector: 'jhi-prepayment-account-update',
  templateUrl: './prepayment-account-update.component.html',
})
export class PrepaymentAccountUpdateComponent implements OnInit {
  isSaving = false;
  prepaymentAccount: IPrepaymentAccount | null = null;

  settlementCurrenciesSharedCollection: ISettlementCurrency[] = [];
  settlementsSharedCollection: ISettlement[] = [];
  serviceOutletsSharedCollection: IServiceOutlet[] = [];
  dealersSharedCollection: IDealer[] = [];
  transactionAccountsSharedCollection: ITransactionAccount[] = [];
  placeholdersSharedCollection: IPlaceholder[] = [];
  universallyUniqueMappingsSharedCollection: IUniversallyUniqueMapping[] = [];
  prepaymentMappingsSharedCollection: IPrepaymentMapping[] = [];
  businessDocumentsSharedCollection: IBusinessDocument[] = [];

  editForm: PrepaymentAccountFormGroup = this.prepaymentAccountFormService.createPrepaymentAccountFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected prepaymentAccountService: PrepaymentAccountService,
    protected prepaymentAccountFormService: PrepaymentAccountFormService,
    protected settlementCurrencyService: SettlementCurrencyService,
    protected settlementService: SettlementService,
    protected serviceOutletService: ServiceOutletService,
    protected dealerService: DealerService,
    protected transactionAccountService: TransactionAccountService,
    protected placeholderService: PlaceholderService,
    protected universallyUniqueMappingService: UniversallyUniqueMappingService,
    protected prepaymentMappingService: PrepaymentMappingService,
    protected businessDocumentService: BusinessDocumentService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareSettlementCurrency = (o1: ISettlementCurrency | null, o2: ISettlementCurrency | null): boolean =>
    this.settlementCurrencyService.compareSettlementCurrency(o1, o2);

  compareSettlement = (o1: ISettlement | null, o2: ISettlement | null): boolean => this.settlementService.compareSettlement(o1, o2);

  compareServiceOutlet = (o1: IServiceOutlet | null, o2: IServiceOutlet | null): boolean =>
    this.serviceOutletService.compareServiceOutlet(o1, o2);

  compareDealer = (o1: IDealer | null, o2: IDealer | null): boolean => this.dealerService.compareDealer(o1, o2);

  compareTransactionAccount = (o1: ITransactionAccount | null, o2: ITransactionAccount | null): boolean =>
    this.transactionAccountService.compareTransactionAccount(o1, o2);

  comparePlaceholder = (o1: IPlaceholder | null, o2: IPlaceholder | null): boolean => this.placeholderService.comparePlaceholder(o1, o2);

  compareUniversallyUniqueMapping = (o1: IUniversallyUniqueMapping | null, o2: IUniversallyUniqueMapping | null): boolean =>
    this.universallyUniqueMappingService.compareUniversallyUniqueMapping(o1, o2);

  comparePrepaymentMapping = (o1: IPrepaymentMapping | null, o2: IPrepaymentMapping | null): boolean =>
    this.prepaymentMappingService.comparePrepaymentMapping(o1, o2);

  compareBusinessDocument = (o1: IBusinessDocument | null, o2: IBusinessDocument | null): boolean =>
    this.businessDocumentService.compareBusinessDocument(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ prepaymentAccount }) => {
      this.prepaymentAccount = prepaymentAccount;
      if (prepaymentAccount) {
        this.updateForm(prepaymentAccount);
      }

      this.loadRelationshipsOptions();
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
    const prepaymentAccount = this.prepaymentAccountFormService.getPrepaymentAccount(this.editForm);
    if (prepaymentAccount.id !== null) {
      this.subscribeToSaveResponse(this.prepaymentAccountService.update(prepaymentAccount));
    } else {
      this.subscribeToSaveResponse(this.prepaymentAccountService.create(prepaymentAccount));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPrepaymentAccount>>): void {
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

  protected updateForm(prepaymentAccount: IPrepaymentAccount): void {
    this.prepaymentAccount = prepaymentAccount;
    this.prepaymentAccountFormService.resetForm(this.editForm, prepaymentAccount);

    this.settlementCurrenciesSharedCollection =
      this.settlementCurrencyService.addSettlementCurrencyToCollectionIfMissing<ISettlementCurrency>(
        this.settlementCurrenciesSharedCollection,
        prepaymentAccount.settlementCurrency
      );
    this.settlementsSharedCollection = this.settlementService.addSettlementToCollectionIfMissing<ISettlement>(
      this.settlementsSharedCollection,
      prepaymentAccount.prepaymentTransaction
    );
    this.serviceOutletsSharedCollection = this.serviceOutletService.addServiceOutletToCollectionIfMissing<IServiceOutlet>(
      this.serviceOutletsSharedCollection,
      prepaymentAccount.serviceOutlet
    );
    this.dealersSharedCollection = this.dealerService.addDealerToCollectionIfMissing<IDealer>(
      this.dealersSharedCollection,
      prepaymentAccount.dealer
    );
    this.transactionAccountsSharedCollection =
      this.transactionAccountService.addTransactionAccountToCollectionIfMissing<ITransactionAccount>(
        this.transactionAccountsSharedCollection,
        prepaymentAccount.debitAccount,
        prepaymentAccount.transferAccount
      );
    this.placeholdersSharedCollection = this.placeholderService.addPlaceholderToCollectionIfMissing<IPlaceholder>(
      this.placeholdersSharedCollection,
      ...(prepaymentAccount.placeholders ?? [])
    );
    this.universallyUniqueMappingsSharedCollection =
      this.universallyUniqueMappingService.addUniversallyUniqueMappingToCollectionIfMissing<IUniversallyUniqueMapping>(
        this.universallyUniqueMappingsSharedCollection,
        ...(prepaymentAccount.generalParameters ?? [])
      );
    this.prepaymentMappingsSharedCollection = this.prepaymentMappingService.addPrepaymentMappingToCollectionIfMissing<IPrepaymentMapping>(
      this.prepaymentMappingsSharedCollection,
      ...(prepaymentAccount.prepaymentParameters ?? [])
    );
    this.businessDocumentsSharedCollection = this.businessDocumentService.addBusinessDocumentToCollectionIfMissing<IBusinessDocument>(
      this.businessDocumentsSharedCollection,
      ...(prepaymentAccount.businessDocuments ?? [])
    );
  }

  protected loadRelationshipsOptions(): void {
    this.settlementCurrencyService
      .query()
      .pipe(map((res: HttpResponse<ISettlementCurrency[]>) => res.body ?? []))
      .pipe(
        map((settlementCurrencies: ISettlementCurrency[]) =>
          this.settlementCurrencyService.addSettlementCurrencyToCollectionIfMissing<ISettlementCurrency>(
            settlementCurrencies,
            this.prepaymentAccount?.settlementCurrency
          )
        )
      )
      .subscribe((settlementCurrencies: ISettlementCurrency[]) => (this.settlementCurrenciesSharedCollection = settlementCurrencies));

    this.settlementService
      .query()
      .pipe(map((res: HttpResponse<ISettlement[]>) => res.body ?? []))
      .pipe(
        map((settlements: ISettlement[]) =>
          this.settlementService.addSettlementToCollectionIfMissing<ISettlement>(settlements, this.prepaymentAccount?.prepaymentTransaction)
        )
      )
      .subscribe((settlements: ISettlement[]) => (this.settlementsSharedCollection = settlements));

    this.serviceOutletService
      .query()
      .pipe(map((res: HttpResponse<IServiceOutlet[]>) => res.body ?? []))
      .pipe(
        map((serviceOutlets: IServiceOutlet[]) =>
          this.serviceOutletService.addServiceOutletToCollectionIfMissing<IServiceOutlet>(
            serviceOutlets,
            this.prepaymentAccount?.serviceOutlet
          )
        )
      )
      .subscribe((serviceOutlets: IServiceOutlet[]) => (this.serviceOutletsSharedCollection = serviceOutlets));

    this.dealerService
      .query()
      .pipe(map((res: HttpResponse<IDealer[]>) => res.body ?? []))
      .pipe(
        map((dealers: IDealer[]) => this.dealerService.addDealerToCollectionIfMissing<IDealer>(dealers, this.prepaymentAccount?.dealer))
      )
      .subscribe((dealers: IDealer[]) => (this.dealersSharedCollection = dealers));

    this.transactionAccountService
      .query()
      .pipe(map((res: HttpResponse<ITransactionAccount[]>) => res.body ?? []))
      .pipe(
        map((transactionAccounts: ITransactionAccount[]) =>
          this.transactionAccountService.addTransactionAccountToCollectionIfMissing<ITransactionAccount>(
            transactionAccounts,
            this.prepaymentAccount?.debitAccount,
            this.prepaymentAccount?.transferAccount
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
            ...(this.prepaymentAccount?.placeholders ?? [])
          )
        )
      )
      .subscribe((placeholders: IPlaceholder[]) => (this.placeholdersSharedCollection = placeholders));

    this.universallyUniqueMappingService
      .query()
      .pipe(map((res: HttpResponse<IUniversallyUniqueMapping[]>) => res.body ?? []))
      .pipe(
        map((universallyUniqueMappings: IUniversallyUniqueMapping[]) =>
          this.universallyUniqueMappingService.addUniversallyUniqueMappingToCollectionIfMissing<IUniversallyUniqueMapping>(
            universallyUniqueMappings,
            ...(this.prepaymentAccount?.generalParameters ?? [])
          )
        )
      )
      .subscribe(
        (universallyUniqueMappings: IUniversallyUniqueMapping[]) =>
          (this.universallyUniqueMappingsSharedCollection = universallyUniqueMappings)
      );

    this.prepaymentMappingService
      .query()
      .pipe(map((res: HttpResponse<IPrepaymentMapping[]>) => res.body ?? []))
      .pipe(
        map((prepaymentMappings: IPrepaymentMapping[]) =>
          this.prepaymentMappingService.addPrepaymentMappingToCollectionIfMissing<IPrepaymentMapping>(
            prepaymentMappings,
            ...(this.prepaymentAccount?.prepaymentParameters ?? [])
          )
        )
      )
      .subscribe((prepaymentMappings: IPrepaymentMapping[]) => (this.prepaymentMappingsSharedCollection = prepaymentMappings));

    this.businessDocumentService
      .query()
      .pipe(map((res: HttpResponse<IBusinessDocument[]>) => res.body ?? []))
      .pipe(
        map((businessDocuments: IBusinessDocument[]) =>
          this.businessDocumentService.addBusinessDocumentToCollectionIfMissing<IBusinessDocument>(
            businessDocuments,
            ...(this.prepaymentAccount?.businessDocuments ?? [])
          )
        )
      )
      .subscribe((businessDocuments: IBusinessDocument[]) => (this.businessDocumentsSharedCollection = businessDocuments));
  }
}
