///
/// Erp System - Mark VI No 1 (Phoebe Series) Client 1.5.3
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
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ILeaseLiabilityScheduleItem, LeaseLiabilityScheduleItem } from '../lease-liability-schedule-item.model';
import { LeaseLiabilityScheduleItemService } from '../service/lease-liability-schedule-item.service';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/system/placeholder/service/placeholder.service';
import { ILeaseContract } from 'app/entities/leases/lease-contract/lease-contract.model';
import { LeaseContractService } from 'app/entities/leases/lease-contract/service/lease-contract.service';
import { ILeaseModelMetadata } from 'app/entities/leases/lease-model-metadata/lease-model-metadata.model';
import { LeaseModelMetadataService } from 'app/entities/leases/lease-model-metadata/service/lease-model-metadata.service';
import { IUniversallyUniqueMapping } from 'app/entities/gdi/universally-unique-mapping/universally-unique-mapping.model';
import { UniversallyUniqueMappingService } from 'app/entities/gdi/universally-unique-mapping/service/universally-unique-mapping.service';

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
