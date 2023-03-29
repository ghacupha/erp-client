import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ILeaseLiabilityScheduleItem, LeaseLiabilityScheduleItem } from '../lease-liability-schedule-item.model';
import { LeaseLiabilityScheduleItemService } from '../service/lease-liability-schedule-item.service';
import { IPlaceholder } from '../../../erp-pages/placeholder/placeholder.model';
import { ILeaseModelMetadata } from '../../lease-model-metadata/lease-model-metadata.model';
import { UniversallyUniqueMappingService } from '../../../erp-pages/universally-unique-mapping/service/universally-unique-mapping.service';
import { LeaseContractService } from '../../lease-contract/service/lease-contract.service';
import { LeaseModelMetadataService } from '../../lease-model-metadata/service/lease-model-metadata.service';
import { IUniversallyUniqueMapping } from '../../../erp-pages/universally-unique-mapping/universally-unique-mapping.model';
import { PlaceholderService } from '../../../erp-pages/placeholder/service/placeholder.service';
import { ILeaseContract } from '../../lease-contract/lease-contract.model';

@Component({
  selector: 'jhi-lease-liability-schedule-item-update',
  templateUrl: './lease-liability-schedule-item-update.component.html',
})
export class LeaseLiabilityScheduleItemUpdateComponent implements OnInit {
  isSaving = false;

  placeholdersSharedCollection: IPlaceholder[] = [];
  leaseContractsSharedCollection: ILeaseContract[] = [];
  leaseModelMetadataSharedCollection: ILeaseModelMetadata[] = [];
  universallyUniqueMappingsSharedCollection: IUniversallyUniqueMapping[] = [];

  editForm = this.fb.group({
    id: [],
    sequenceNumber: [],
    periodIncluded: [],
    periodStartDate: [],
    periodEndDate: [],
    openingBalance: [],
    cashPayment: [],
    principalPayment: [],
    interestPayment: [],
    outstandingBalance: [],
    interestPayableOpening: [],
    interestExpenseAccrued: [],
    interestPayableBalance: [],
    placeholders: [],
    leaseContract: [null, Validators.required],
    leaseModelMetadata: [],
    universallyUniqueMappings: [],
  });

  constructor(
    protected leaseLiabilityScheduleItemService: LeaseLiabilityScheduleItemService,
    protected placeholderService: PlaceholderService,
    protected leaseContractService: LeaseContractService,
    protected leaseModelMetadataService: LeaseModelMetadataService,
    protected universallyUniqueMappingService: UniversallyUniqueMappingService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ leaseLiabilityScheduleItem }) => {
      this.updateForm(leaseLiabilityScheduleItem);

      this.loadRelationshipsOptions();
    });
  }

  updateLeaseMapping(update: IUniversallyUniqueMapping[]): void {
    this.editForm.patchValue({
      universallyUniqueMappings: [...update]
    });
  }

  updatePlaceholders(update: IPlaceholder[]): void {
    this.editForm.patchValue({
      placeholders: [...update]
    });
  }

  updateLeaseContract(update: ILeaseContract): void {
    this.editForm.patchValue({
      leaseContract: update
    });
  }

  updateLeaseModelMetadata(update: ILeaseModelMetadata): void {
    this.editForm.patchValue({
      leaseModelMetadata: update
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const leaseLiabilityScheduleItem = this.createFromForm();
    if (leaseLiabilityScheduleItem.id !== undefined) {
      this.subscribeToSaveResponse(this.leaseLiabilityScheduleItemService.update(leaseLiabilityScheduleItem));
    } else {
      this.subscribeToSaveResponse(this.leaseLiabilityScheduleItemService.create(leaseLiabilityScheduleItem));
    }
  }

  trackPlaceholderById(index: number, item: IPlaceholder): number {
    return item.id!;
  }

  trackLeaseContractById(index: number, item: ILeaseContract): number {
    return item.id!;
  }

  trackLeaseModelMetadataById(index: number, item: ILeaseModelMetadata): number {
    return item.id!;
  }

  trackUniversallyUniqueMappingById(index: number, item: IUniversallyUniqueMapping): number {
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

  getSelectedUniversallyUniqueMapping(
    option: IUniversallyUniqueMapping,
    selectedVals?: IUniversallyUniqueMapping[]
  ): IUniversallyUniqueMapping {
    if (selectedVals) {
      for (const selectedVal of selectedVals) {
        if (option.id === selectedVal.id) {
          return selectedVal;
        }
      }
    }
    return option;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILeaseLiabilityScheduleItem>>): void {
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

  protected updateForm(leaseLiabilityScheduleItem: ILeaseLiabilityScheduleItem): void {
    this.editForm.patchValue({
      id: leaseLiabilityScheduleItem.id,
      sequenceNumber: leaseLiabilityScheduleItem.sequenceNumber,
      periodIncluded: leaseLiabilityScheduleItem.periodIncluded,
      periodStartDate: leaseLiabilityScheduleItem.periodStartDate,
      periodEndDate: leaseLiabilityScheduleItem.periodEndDate,
      openingBalance: leaseLiabilityScheduleItem.openingBalance,
      cashPayment: leaseLiabilityScheduleItem.cashPayment,
      principalPayment: leaseLiabilityScheduleItem.principalPayment,
      interestPayment: leaseLiabilityScheduleItem.interestPayment,
      outstandingBalance: leaseLiabilityScheduleItem.outstandingBalance,
      interestPayableOpening: leaseLiabilityScheduleItem.interestPayableOpening,
      interestExpenseAccrued: leaseLiabilityScheduleItem.interestExpenseAccrued,
      interestPayableBalance: leaseLiabilityScheduleItem.interestPayableBalance,
      placeholders: leaseLiabilityScheduleItem.placeholders,
      leaseContract: leaseLiabilityScheduleItem.leaseContract,
      leaseModelMetadata: leaseLiabilityScheduleItem.leaseModelMetadata,
      universallyUniqueMappings: leaseLiabilityScheduleItem.universallyUniqueMappings,
    });

    this.placeholdersSharedCollection = this.placeholderService.addPlaceholderToCollectionIfMissing(
      this.placeholdersSharedCollection,
      ...(leaseLiabilityScheduleItem.placeholders ?? [])
    );
    this.leaseContractsSharedCollection = this.leaseContractService.addLeaseContractToCollectionIfMissing(
      this.leaseContractsSharedCollection,
      leaseLiabilityScheduleItem.leaseContract
    );
    this.leaseModelMetadataSharedCollection = this.leaseModelMetadataService.addLeaseModelMetadataToCollectionIfMissing(
      this.leaseModelMetadataSharedCollection,
      leaseLiabilityScheduleItem.leaseModelMetadata
    );
    this.universallyUniqueMappingsSharedCollection = this.universallyUniqueMappingService.addUniversallyUniqueMappingToCollectionIfMissing(
      this.universallyUniqueMappingsSharedCollection,
      ...(leaseLiabilityScheduleItem.universallyUniqueMappings ?? [])
    );
  }

  protected loadRelationshipsOptions(): void {
    this.placeholderService
      .query()
      .pipe(map((res: HttpResponse<IPlaceholder[]>) => res.body ?? []))
      .pipe(
        map((placeholders: IPlaceholder[]) =>
          this.placeholderService.addPlaceholderToCollectionIfMissing(placeholders, ...(this.editForm.get('placeholders')!.value ?? []))
        )
      )
      .subscribe((placeholders: IPlaceholder[]) => (this.placeholdersSharedCollection = placeholders));

    this.leaseContractService
      .query()
      .pipe(map((res: HttpResponse<ILeaseContract[]>) => res.body ?? []))
      .pipe(
        map((leaseContracts: ILeaseContract[]) =>
          this.leaseContractService.addLeaseContractToCollectionIfMissing(leaseContracts, this.editForm.get('leaseContract')!.value)
        )
      )
      .subscribe((leaseContracts: ILeaseContract[]) => (this.leaseContractsSharedCollection = leaseContracts));

    this.leaseModelMetadataService
      .query()
      .pipe(map((res: HttpResponse<ILeaseModelMetadata[]>) => res.body ?? []))
      .pipe(
        map((leaseModelMetadata: ILeaseModelMetadata[]) =>
          this.leaseModelMetadataService.addLeaseModelMetadataToCollectionIfMissing(
            leaseModelMetadata,
            this.editForm.get('leaseModelMetadata')!.value
          )
        )
      )
      .subscribe((leaseModelMetadata: ILeaseModelMetadata[]) => (this.leaseModelMetadataSharedCollection = leaseModelMetadata));

    this.universallyUniqueMappingService
      .query()
      .pipe(map((res: HttpResponse<IUniversallyUniqueMapping[]>) => res.body ?? []))
      .pipe(
        map((universallyUniqueMappings: IUniversallyUniqueMapping[]) =>
          this.universallyUniqueMappingService.addUniversallyUniqueMappingToCollectionIfMissing(
            universallyUniqueMappings,
            ...(this.editForm.get('universallyUniqueMappings')!.value ?? [])
          )
        )
      )
      .subscribe(
        (universallyUniqueMappings: IUniversallyUniqueMapping[]) =>
          (this.universallyUniqueMappingsSharedCollection = universallyUniqueMappings)
      );
  }

  protected createFromForm(): ILeaseLiabilityScheduleItem {
    return {
      ...new LeaseLiabilityScheduleItem(),
      id: this.editForm.get(['id'])!.value,
      sequenceNumber: this.editForm.get(['sequenceNumber'])!.value,
      periodIncluded: this.editForm.get(['periodIncluded'])!.value,
      periodStartDate: this.editForm.get(['periodStartDate'])!.value,
      periodEndDate: this.editForm.get(['periodEndDate'])!.value,
      openingBalance: this.editForm.get(['openingBalance'])!.value,
      cashPayment: this.editForm.get(['cashPayment'])!.value,
      principalPayment: this.editForm.get(['principalPayment'])!.value,
      interestPayment: this.editForm.get(['interestPayment'])!.value,
      outstandingBalance: this.editForm.get(['outstandingBalance'])!.value,
      interestPayableOpening: this.editForm.get(['interestPayableOpening'])!.value,
      interestExpenseAccrued: this.editForm.get(['interestExpenseAccrued'])!.value,
      interestPayableBalance: this.editForm.get(['interestPayableBalance'])!.value,
      placeholders: this.editForm.get(['placeholders'])!.value,
      leaseContract: this.editForm.get(['leaseContract'])!.value,
      leaseModelMetadata: this.editForm.get(['leaseModelMetadata'])!.value,
      universallyUniqueMappings: this.editForm.get(['universallyUniqueMappings'])!.value,
    };
  }
}
