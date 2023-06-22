import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ContractMetadataFormService, ContractMetadataFormGroup } from './contract-metadata-form.service';
import { IContractMetadata } from '../contract-metadata.model';
import { ContractMetadataService } from '../service/contract-metadata.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { IDealer } from 'app/entities/people/dealer/dealer.model';
import { DealerService } from 'app/entities/people/dealer/service/dealer.service';
import { IApplicationUser } from 'app/entities/people/application-user/application-user.model';
import { ApplicationUserService } from 'app/entities/people/application-user/service/application-user.service';
import { ISecurityClearance } from 'app/entities/people/security-clearance/security-clearance.model';
import { SecurityClearanceService } from 'app/entities/people/security-clearance/service/security-clearance.service';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/system/placeholder/service/placeholder.service';
import { IBusinessDocument } from 'app/entities/documentation/business-document/business-document.model';
import { BusinessDocumentService } from 'app/entities/documentation/business-document/service/business-document.service';
import { IUniversallyUniqueMapping } from 'app/entities/system/universally-unique-mapping/universally-unique-mapping.model';
import { UniversallyUniqueMappingService } from 'app/entities/system/universally-unique-mapping/service/universally-unique-mapping.service';
import { ContractType } from 'app/entities/enumerations/contract-type.model';
import { ContractStatus } from 'app/entities/enumerations/contract-status.model';

@Component({
  selector: 'jhi-contract-metadata-update',
  templateUrl: './contract-metadata-update.component.html',
})
export class ContractMetadataUpdateComponent implements OnInit {
  isSaving = false;
  contractMetadata: IContractMetadata | null = null;
  contractTypeValues = Object.keys(ContractType);
  contractStatusValues = Object.keys(ContractStatus);

  contractMetadataSharedCollection: IContractMetadata[] = [];
  dealersSharedCollection: IDealer[] = [];
  applicationUsersSharedCollection: IApplicationUser[] = [];
  securityClearancesSharedCollection: ISecurityClearance[] = [];
  placeholdersSharedCollection: IPlaceholder[] = [];
  businessDocumentsSharedCollection: IBusinessDocument[] = [];
  universallyUniqueMappingsSharedCollection: IUniversallyUniqueMapping[] = [];

  editForm: ContractMetadataFormGroup = this.contractMetadataFormService.createContractMetadataFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected contractMetadataService: ContractMetadataService,
    protected contractMetadataFormService: ContractMetadataFormService,
    protected dealerService: DealerService,
    protected applicationUserService: ApplicationUserService,
    protected securityClearanceService: SecurityClearanceService,
    protected placeholderService: PlaceholderService,
    protected businessDocumentService: BusinessDocumentService,
    protected universallyUniqueMappingService: UniversallyUniqueMappingService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareContractMetadata = (o1: IContractMetadata | null, o2: IContractMetadata | null): boolean =>
    this.contractMetadataService.compareContractMetadata(o1, o2);

  compareDealer = (o1: IDealer | null, o2: IDealer | null): boolean => this.dealerService.compareDealer(o1, o2);

  compareApplicationUser = (o1: IApplicationUser | null, o2: IApplicationUser | null): boolean =>
    this.applicationUserService.compareApplicationUser(o1, o2);

  compareSecurityClearance = (o1: ISecurityClearance | null, o2: ISecurityClearance | null): boolean =>
    this.securityClearanceService.compareSecurityClearance(o1, o2);

  comparePlaceholder = (o1: IPlaceholder | null, o2: IPlaceholder | null): boolean => this.placeholderService.comparePlaceholder(o1, o2);

  compareBusinessDocument = (o1: IBusinessDocument | null, o2: IBusinessDocument | null): boolean =>
    this.businessDocumentService.compareBusinessDocument(o1, o2);

  compareUniversallyUniqueMapping = (o1: IUniversallyUniqueMapping | null, o2: IUniversallyUniqueMapping | null): boolean =>
    this.universallyUniqueMappingService.compareUniversallyUniqueMapping(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ contractMetadata }) => {
      this.contractMetadata = contractMetadata;
      if (contractMetadata) {
        this.updateForm(contractMetadata);
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
    const contractMetadata = this.contractMetadataFormService.getContractMetadata(this.editForm);
    if (contractMetadata.id !== null) {
      this.subscribeToSaveResponse(this.contractMetadataService.update(contractMetadata));
    } else {
      this.subscribeToSaveResponse(this.contractMetadataService.create(contractMetadata));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IContractMetadata>>): void {
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

  protected updateForm(contractMetadata: IContractMetadata): void {
    this.contractMetadata = contractMetadata;
    this.contractMetadataFormService.resetForm(this.editForm, contractMetadata);

    this.contractMetadataSharedCollection = this.contractMetadataService.addContractMetadataToCollectionIfMissing<IContractMetadata>(
      this.contractMetadataSharedCollection,
      ...(contractMetadata.relatedContracts ?? [])
    );
    this.dealersSharedCollection = this.dealerService.addDealerToCollectionIfMissing<IDealer>(
      this.dealersSharedCollection,
      contractMetadata.department,
      contractMetadata.contractPartner
    );
    this.applicationUsersSharedCollection = this.applicationUserService.addApplicationUserToCollectionIfMissing<IApplicationUser>(
      this.applicationUsersSharedCollection,
      contractMetadata.responsiblePerson,
      ...(contractMetadata.signatories ?? [])
    );
    this.securityClearancesSharedCollection = this.securityClearanceService.addSecurityClearanceToCollectionIfMissing<ISecurityClearance>(
      this.securityClearancesSharedCollection,
      contractMetadata.securityClearance
    );
    this.placeholdersSharedCollection = this.placeholderService.addPlaceholderToCollectionIfMissing<IPlaceholder>(
      this.placeholdersSharedCollection,
      ...(contractMetadata.placeholders ?? [])
    );
    this.businessDocumentsSharedCollection = this.businessDocumentService.addBusinessDocumentToCollectionIfMissing<IBusinessDocument>(
      this.businessDocumentsSharedCollection,
      ...(contractMetadata.contractDocumentFiles ?? [])
    );
    this.universallyUniqueMappingsSharedCollection =
      this.universallyUniqueMappingService.addUniversallyUniqueMappingToCollectionIfMissing<IUniversallyUniqueMapping>(
        this.universallyUniqueMappingsSharedCollection,
        ...(contractMetadata.contractMappings ?? [])
      );
  }

  protected loadRelationshipsOptions(): void {
    this.contractMetadataService
      .query()
      .pipe(map((res: HttpResponse<IContractMetadata[]>) => res.body ?? []))
      .pipe(
        map((contractMetadata: IContractMetadata[]) =>
          this.contractMetadataService.addContractMetadataToCollectionIfMissing<IContractMetadata>(
            contractMetadata,
            ...(this.contractMetadata?.relatedContracts ?? [])
          )
        )
      )
      .subscribe((contractMetadata: IContractMetadata[]) => (this.contractMetadataSharedCollection = contractMetadata));

    this.dealerService
      .query()
      .pipe(map((res: HttpResponse<IDealer[]>) => res.body ?? []))
      .pipe(
        map((dealers: IDealer[]) =>
          this.dealerService.addDealerToCollectionIfMissing<IDealer>(
            dealers,
            this.contractMetadata?.department,
            this.contractMetadata?.contractPartner
          )
        )
      )
      .subscribe((dealers: IDealer[]) => (this.dealersSharedCollection = dealers));

    this.applicationUserService
      .query()
      .pipe(map((res: HttpResponse<IApplicationUser[]>) => res.body ?? []))
      .pipe(
        map((applicationUsers: IApplicationUser[]) =>
          this.applicationUserService.addApplicationUserToCollectionIfMissing<IApplicationUser>(
            applicationUsers,
            this.contractMetadata?.responsiblePerson,
            ...(this.contractMetadata?.signatories ?? [])
          )
        )
      )
      .subscribe((applicationUsers: IApplicationUser[]) => (this.applicationUsersSharedCollection = applicationUsers));

    this.securityClearanceService
      .query()
      .pipe(map((res: HttpResponse<ISecurityClearance[]>) => res.body ?? []))
      .pipe(
        map((securityClearances: ISecurityClearance[]) =>
          this.securityClearanceService.addSecurityClearanceToCollectionIfMissing<ISecurityClearance>(
            securityClearances,
            this.contractMetadata?.securityClearance
          )
        )
      )
      .subscribe((securityClearances: ISecurityClearance[]) => (this.securityClearancesSharedCollection = securityClearances));

    this.placeholderService
      .query()
      .pipe(map((res: HttpResponse<IPlaceholder[]>) => res.body ?? []))
      .pipe(
        map((placeholders: IPlaceholder[]) =>
          this.placeholderService.addPlaceholderToCollectionIfMissing<IPlaceholder>(
            placeholders,
            ...(this.contractMetadata?.placeholders ?? [])
          )
        )
      )
      .subscribe((placeholders: IPlaceholder[]) => (this.placeholdersSharedCollection = placeholders));

    this.businessDocumentService
      .query()
      .pipe(map((res: HttpResponse<IBusinessDocument[]>) => res.body ?? []))
      .pipe(
        map((businessDocuments: IBusinessDocument[]) =>
          this.businessDocumentService.addBusinessDocumentToCollectionIfMissing<IBusinessDocument>(
            businessDocuments,
            ...(this.contractMetadata?.contractDocumentFiles ?? [])
          )
        )
      )
      .subscribe((businessDocuments: IBusinessDocument[]) => (this.businessDocumentsSharedCollection = businessDocuments));

    this.universallyUniqueMappingService
      .query()
      .pipe(map((res: HttpResponse<IUniversallyUniqueMapping[]>) => res.body ?? []))
      .pipe(
        map((universallyUniqueMappings: IUniversallyUniqueMapping[]) =>
          this.universallyUniqueMappingService.addUniversallyUniqueMappingToCollectionIfMissing<IUniversallyUniqueMapping>(
            universallyUniqueMappings,
            ...(this.contractMetadata?.contractMappings ?? [])
          )
        )
      )
      .subscribe(
        (universallyUniqueMappings: IUniversallyUniqueMapping[]) =>
          (this.universallyUniqueMappingsSharedCollection = universallyUniqueMappings)
      );
  }
}
