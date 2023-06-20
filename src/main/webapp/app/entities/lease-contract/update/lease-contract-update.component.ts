import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { LeaseContractFormService, LeaseContractFormGroup } from './lease-contract-form.service';
import { ILeaseContract } from '../lease-contract.model';
import { LeaseContractService } from '../service/lease-contract.service';
import { IPlaceholder } from 'app/entities/erpService/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/erpService/placeholder/service/placeholder.service';
import { IUniversallyUniqueMapping } from 'app/entities/universally-unique-mapping/universally-unique-mapping.model';
import { UniversallyUniqueMappingService } from 'app/entities/universally-unique-mapping/service/universally-unique-mapping.service';
import { IBusinessDocument } from 'app/entities/business-document/business-document.model';
import { BusinessDocumentService } from 'app/entities/business-document/service/business-document.service';
import { IContractMetadata } from 'app/entities/contract-metadata/contract-metadata.model';
import { ContractMetadataService } from 'app/entities/contract-metadata/service/contract-metadata.service';

@Component({
  selector: 'jhi-lease-contract-update',
  templateUrl: './lease-contract-update.component.html',
})
export class LeaseContractUpdateComponent implements OnInit {
  isSaving = false;
  leaseContract: ILeaseContract | null = null;

  placeholdersSharedCollection: IPlaceholder[] = [];
  universallyUniqueMappingsSharedCollection: IUniversallyUniqueMapping[] = [];
  businessDocumentsSharedCollection: IBusinessDocument[] = [];
  contractMetadataSharedCollection: IContractMetadata[] = [];

  editForm: LeaseContractFormGroup = this.leaseContractFormService.createLeaseContractFormGroup();

  constructor(
    protected leaseContractService: LeaseContractService,
    protected leaseContractFormService: LeaseContractFormService,
    protected placeholderService: PlaceholderService,
    protected universallyUniqueMappingService: UniversallyUniqueMappingService,
    protected businessDocumentService: BusinessDocumentService,
    protected contractMetadataService: ContractMetadataService,
    protected activatedRoute: ActivatedRoute
  ) {}

  comparePlaceholder = (o1: IPlaceholder | null, o2: IPlaceholder | null): boolean => this.placeholderService.comparePlaceholder(o1, o2);

  compareUniversallyUniqueMapping = (o1: IUniversallyUniqueMapping | null, o2: IUniversallyUniqueMapping | null): boolean =>
    this.universallyUniqueMappingService.compareUniversallyUniqueMapping(o1, o2);

  compareBusinessDocument = (o1: IBusinessDocument | null, o2: IBusinessDocument | null): boolean =>
    this.businessDocumentService.compareBusinessDocument(o1, o2);

  compareContractMetadata = (o1: IContractMetadata | null, o2: IContractMetadata | null): boolean =>
    this.contractMetadataService.compareContractMetadata(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ leaseContract }) => {
      this.leaseContract = leaseContract;
      if (leaseContract) {
        this.updateForm(leaseContract);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const leaseContract = this.leaseContractFormService.getLeaseContract(this.editForm);
    if (leaseContract.id !== null) {
      this.subscribeToSaveResponse(this.leaseContractService.update(leaseContract));
    } else {
      this.subscribeToSaveResponse(this.leaseContractService.create(leaseContract));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILeaseContract>>): void {
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

  protected updateForm(leaseContract: ILeaseContract): void {
    this.leaseContract = leaseContract;
    this.leaseContractFormService.resetForm(this.editForm, leaseContract);

    this.placeholdersSharedCollection = this.placeholderService.addPlaceholderToCollectionIfMissing<IPlaceholder>(
      this.placeholdersSharedCollection,
      ...(leaseContract.placeholders ?? [])
    );
    this.universallyUniqueMappingsSharedCollection =
      this.universallyUniqueMappingService.addUniversallyUniqueMappingToCollectionIfMissing<IUniversallyUniqueMapping>(
        this.universallyUniqueMappingsSharedCollection,
        ...(leaseContract.systemMappings ?? [])
      );
    this.businessDocumentsSharedCollection = this.businessDocumentService.addBusinessDocumentToCollectionIfMissing<IBusinessDocument>(
      this.businessDocumentsSharedCollection,
      ...(leaseContract.businessDocuments ?? [])
    );
    this.contractMetadataSharedCollection = this.contractMetadataService.addContractMetadataToCollectionIfMissing<IContractMetadata>(
      this.contractMetadataSharedCollection,
      ...(leaseContract.contractMetadata ?? [])
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
            ...(this.leaseContract?.placeholders ?? [])
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
            ...(this.leaseContract?.systemMappings ?? [])
          )
        )
      )
      .subscribe(
        (universallyUniqueMappings: IUniversallyUniqueMapping[]) =>
          (this.universallyUniqueMappingsSharedCollection = universallyUniqueMappings)
      );

    this.businessDocumentService
      .query()
      .pipe(map((res: HttpResponse<IBusinessDocument[]>) => res.body ?? []))
      .pipe(
        map((businessDocuments: IBusinessDocument[]) =>
          this.businessDocumentService.addBusinessDocumentToCollectionIfMissing<IBusinessDocument>(
            businessDocuments,
            ...(this.leaseContract?.businessDocuments ?? [])
          )
        )
      )
      .subscribe((businessDocuments: IBusinessDocument[]) => (this.businessDocumentsSharedCollection = businessDocuments));

    this.contractMetadataService
      .query()
      .pipe(map((res: HttpResponse<IContractMetadata[]>) => res.body ?? []))
      .pipe(
        map((contractMetadata: IContractMetadata[]) =>
          this.contractMetadataService.addContractMetadataToCollectionIfMissing<IContractMetadata>(
            contractMetadata,
            ...(this.leaseContract?.contractMetadata ?? [])
          )
        )
      )
      .subscribe((contractMetadata: IContractMetadata[]) => (this.contractMetadataSharedCollection = contractMetadata));
  }
}
