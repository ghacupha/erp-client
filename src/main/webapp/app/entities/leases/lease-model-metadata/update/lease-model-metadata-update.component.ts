import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { LeaseModelMetadataFormService, LeaseModelMetadataFormGroup } from './lease-model-metadata-form.service';
import { ILeaseModelMetadata } from '../lease-model-metadata.model';
import { LeaseModelMetadataService } from '../service/lease-model-metadata.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/system/placeholder/service/placeholder.service';
import { IUniversallyUniqueMapping } from 'app/entities/system/universally-unique-mapping/universally-unique-mapping.model';
import { UniversallyUniqueMappingService } from 'app/entities/system/universally-unique-mapping/service/universally-unique-mapping.service';
import { ILeaseContract } from 'app/entities/leases/lease-contract/lease-contract.model';
import { LeaseContractService } from 'app/entities/leases/lease-contract/service/lease-contract.service';
import { ISettlementCurrency } from 'app/entities/settlement/settlement-currency/settlement-currency.model';
import { SettlementCurrencyService } from 'app/entities/settlement/settlement-currency/service/settlement-currency.service';
import { IBusinessDocument } from 'app/entities/documentation/business-document/business-document.model';
import { BusinessDocumentService } from 'app/entities/documentation/business-document/service/business-document.service';
import { ISecurityClearance } from 'app/entities/people/security-clearance/security-clearance.model';
import { SecurityClearanceService } from 'app/entities/people/security-clearance/service/security-clearance.service';
import { ITransactionAccount } from 'app/entities/accounting/transaction-account/transaction-account.model';
import { TransactionAccountService } from 'app/entities/accounting/transaction-account/service/transaction-account.service';

@Component({
  selector: 'jhi-lease-model-metadata-update',
  templateUrl: './lease-model-metadata-update.component.html',
})
export class LeaseModelMetadataUpdateComponent implements OnInit {
  isSaving = false;
  leaseModelMetadata: ILeaseModelMetadata | null = null;

  placeholdersSharedCollection: IPlaceholder[] = [];
  universallyUniqueMappingsSharedCollection: IUniversallyUniqueMapping[] = [];
  leaseContractsSharedCollection: ILeaseContract[] = [];
  leaseModelMetadataSharedCollection: ILeaseModelMetadata[] = [];
  settlementCurrenciesSharedCollection: ISettlementCurrency[] = [];
  businessDocumentsSharedCollection: IBusinessDocument[] = [];
  securityClearancesSharedCollection: ISecurityClearance[] = [];
  transactionAccountsSharedCollection: ITransactionAccount[] = [];

  editForm: LeaseModelMetadataFormGroup = this.leaseModelMetadataFormService.createLeaseModelMetadataFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected leaseModelMetadataService: LeaseModelMetadataService,
    protected leaseModelMetadataFormService: LeaseModelMetadataFormService,
    protected placeholderService: PlaceholderService,
    protected universallyUniqueMappingService: UniversallyUniqueMappingService,
    protected leaseContractService: LeaseContractService,
    protected settlementCurrencyService: SettlementCurrencyService,
    protected businessDocumentService: BusinessDocumentService,
    protected securityClearanceService: SecurityClearanceService,
    protected transactionAccountService: TransactionAccountService,
    protected activatedRoute: ActivatedRoute
  ) {}

  comparePlaceholder = (o1: IPlaceholder | null, o2: IPlaceholder | null): boolean => this.placeholderService.comparePlaceholder(o1, o2);

  compareUniversallyUniqueMapping = (o1: IUniversallyUniqueMapping | null, o2: IUniversallyUniqueMapping | null): boolean =>
    this.universallyUniqueMappingService.compareUniversallyUniqueMapping(o1, o2);

  compareLeaseContract = (o1: ILeaseContract | null, o2: ILeaseContract | null): boolean =>
    this.leaseContractService.compareLeaseContract(o1, o2);

  compareLeaseModelMetadata = (o1: ILeaseModelMetadata | null, o2: ILeaseModelMetadata | null): boolean =>
    this.leaseModelMetadataService.compareLeaseModelMetadata(o1, o2);

  compareSettlementCurrency = (o1: ISettlementCurrency | null, o2: ISettlementCurrency | null): boolean =>
    this.settlementCurrencyService.compareSettlementCurrency(o1, o2);

  compareBusinessDocument = (o1: IBusinessDocument | null, o2: IBusinessDocument | null): boolean =>
    this.businessDocumentService.compareBusinessDocument(o1, o2);

  compareSecurityClearance = (o1: ISecurityClearance | null, o2: ISecurityClearance | null): boolean =>
    this.securityClearanceService.compareSecurityClearance(o1, o2);

  compareTransactionAccount = (o1: ITransactionAccount | null, o2: ITransactionAccount | null): boolean =>
    this.transactionAccountService.compareTransactionAccount(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ leaseModelMetadata }) => {
      this.leaseModelMetadata = leaseModelMetadata;
      if (leaseModelMetadata) {
        this.updateForm(leaseModelMetadata);
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
    const leaseModelMetadata = this.leaseModelMetadataFormService.getLeaseModelMetadata(this.editForm);
    if (leaseModelMetadata.id !== null) {
      this.subscribeToSaveResponse(this.leaseModelMetadataService.update(leaseModelMetadata));
    } else {
      this.subscribeToSaveResponse(this.leaseModelMetadataService.create(leaseModelMetadata));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILeaseModelMetadata>>): void {
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

  protected updateForm(leaseModelMetadata: ILeaseModelMetadata): void {
    this.leaseModelMetadata = leaseModelMetadata;
    this.leaseModelMetadataFormService.resetForm(this.editForm, leaseModelMetadata);

    this.placeholdersSharedCollection = this.placeholderService.addPlaceholderToCollectionIfMissing<IPlaceholder>(
      this.placeholdersSharedCollection,
      ...(leaseModelMetadata.placeholders ?? [])
    );
    this.universallyUniqueMappingsSharedCollection =
      this.universallyUniqueMappingService.addUniversallyUniqueMappingToCollectionIfMissing<IUniversallyUniqueMapping>(
        this.universallyUniqueMappingsSharedCollection,
        ...(leaseModelMetadata.leaseMappings ?? [])
      );
    this.leaseContractsSharedCollection = this.leaseContractService.addLeaseContractToCollectionIfMissing<ILeaseContract>(
      this.leaseContractsSharedCollection,
      leaseModelMetadata.leaseContract
    );
    this.leaseModelMetadataSharedCollection =
      this.leaseModelMetadataService.addLeaseModelMetadataToCollectionIfMissing<ILeaseModelMetadata>(
        this.leaseModelMetadataSharedCollection,
        leaseModelMetadata.predecessor
      );
    this.settlementCurrenciesSharedCollection =
      this.settlementCurrencyService.addSettlementCurrencyToCollectionIfMissing<ISettlementCurrency>(
        this.settlementCurrenciesSharedCollection,
        leaseModelMetadata.liabilityCurrency,
        leaseModelMetadata.rouAssetCurrency
      );
    this.businessDocumentsSharedCollection = this.businessDocumentService.addBusinessDocumentToCollectionIfMissing<IBusinessDocument>(
      this.businessDocumentsSharedCollection,
      leaseModelMetadata.modelAttachments
    );
    this.securityClearancesSharedCollection = this.securityClearanceService.addSecurityClearanceToCollectionIfMissing<ISecurityClearance>(
      this.securityClearancesSharedCollection,
      leaseModelMetadata.securityClearance
    );
    this.transactionAccountsSharedCollection =
      this.transactionAccountService.addTransactionAccountToCollectionIfMissing<ITransactionAccount>(
        this.transactionAccountsSharedCollection,
        leaseModelMetadata.leaseLiabilityAccount,
        leaseModelMetadata.interestPayableAccount,
        leaseModelMetadata.interestExpenseAccount,
        leaseModelMetadata.rouAssetAccount,
        leaseModelMetadata.rouDepreciationAccount,
        leaseModelMetadata.accruedDepreciationAccount
      );
  }

  protected loadRelationshipsOptions(): void {
    this.placeholderService
      .query()
      .pipe(map((res: HttpResponse<IPlaceholder[]>) => res.body ?? []))
      .pipe(
        map((placeholders: IPlaceholder[]) =>
          this.placeholderService.addPlaceholderToCollectionIfMissing<IPlaceholder>(
            placeholders,
            ...(this.leaseModelMetadata?.placeholders ?? [])
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
            ...(this.leaseModelMetadata?.leaseMappings ?? [])
          )
        )
      )
      .subscribe(
        (universallyUniqueMappings: IUniversallyUniqueMapping[]) =>
          (this.universallyUniqueMappingsSharedCollection = universallyUniqueMappings)
      );

    this.leaseContractService
      .query()
      .pipe(map((res: HttpResponse<ILeaseContract[]>) => res.body ?? []))
      .pipe(
        map((leaseContracts: ILeaseContract[]) =>
          this.leaseContractService.addLeaseContractToCollectionIfMissing<ILeaseContract>(
            leaseContracts,
            this.leaseModelMetadata?.leaseContract
          )
        )
      )
      .subscribe((leaseContracts: ILeaseContract[]) => (this.leaseContractsSharedCollection = leaseContracts));

    this.leaseModelMetadataService
      .query()
      .pipe(map((res: HttpResponse<ILeaseModelMetadata[]>) => res.body ?? []))
      .pipe(
        map((leaseModelMetadata: ILeaseModelMetadata[]) =>
          this.leaseModelMetadataService.addLeaseModelMetadataToCollectionIfMissing<ILeaseModelMetadata>(
            leaseModelMetadata,
            this.leaseModelMetadata?.predecessor
          )
        )
      )
      .subscribe((leaseModelMetadata: ILeaseModelMetadata[]) => (this.leaseModelMetadataSharedCollection = leaseModelMetadata));

    this.settlementCurrencyService
      .query()
      .pipe(map((res: HttpResponse<ISettlementCurrency[]>) => res.body ?? []))
      .pipe(
        map((settlementCurrencies: ISettlementCurrency[]) =>
          this.settlementCurrencyService.addSettlementCurrencyToCollectionIfMissing<ISettlementCurrency>(
            settlementCurrencies,
            this.leaseModelMetadata?.liabilityCurrency,
            this.leaseModelMetadata?.rouAssetCurrency
          )
        )
      )
      .subscribe((settlementCurrencies: ISettlementCurrency[]) => (this.settlementCurrenciesSharedCollection = settlementCurrencies));

    this.businessDocumentService
      .query()
      .pipe(map((res: HttpResponse<IBusinessDocument[]>) => res.body ?? []))
      .pipe(
        map((businessDocuments: IBusinessDocument[]) =>
          this.businessDocumentService.addBusinessDocumentToCollectionIfMissing<IBusinessDocument>(
            businessDocuments,
            this.leaseModelMetadata?.modelAttachments
          )
        )
      )
      .subscribe((businessDocuments: IBusinessDocument[]) => (this.businessDocumentsSharedCollection = businessDocuments));

    this.securityClearanceService
      .query()
      .pipe(map((res: HttpResponse<ISecurityClearance[]>) => res.body ?? []))
      .pipe(
        map((securityClearances: ISecurityClearance[]) =>
          this.securityClearanceService.addSecurityClearanceToCollectionIfMissing<ISecurityClearance>(
            securityClearances,
            this.leaseModelMetadata?.securityClearance
          )
        )
      )
      .subscribe((securityClearances: ISecurityClearance[]) => (this.securityClearancesSharedCollection = securityClearances));

    this.transactionAccountService
      .query()
      .pipe(map((res: HttpResponse<ITransactionAccount[]>) => res.body ?? []))
      .pipe(
        map((transactionAccounts: ITransactionAccount[]) =>
          this.transactionAccountService.addTransactionAccountToCollectionIfMissing<ITransactionAccount>(
            transactionAccounts,
            this.leaseModelMetadata?.leaseLiabilityAccount,
            this.leaseModelMetadata?.interestPayableAccount,
            this.leaseModelMetadata?.interestExpenseAccount,
            this.leaseModelMetadata?.rouAssetAccount,
            this.leaseModelMetadata?.rouDepreciationAccount,
            this.leaseModelMetadata?.accruedDepreciationAccount
          )
        )
      )
      .subscribe((transactionAccounts: ITransactionAccount[]) => (this.transactionAccountsSharedCollection = transactionAccounts));
  }
}
