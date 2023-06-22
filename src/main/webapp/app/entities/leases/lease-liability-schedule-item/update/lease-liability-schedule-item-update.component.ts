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

import { LeaseLiabilityScheduleItemFormService, LeaseLiabilityScheduleItemFormGroup } from './lease-liability-schedule-item-form.service';
import { ILeaseLiabilityScheduleItem } from '../lease-liability-schedule-item.model';
import { LeaseLiabilityScheduleItemService } from '../service/lease-liability-schedule-item.service';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/system/placeholder/service/placeholder.service';
import { ILeaseContract } from 'app/entities/leases/lease-contract/lease-contract.model';
import { LeaseContractService } from 'app/entities/leases/lease-contract/service/lease-contract.service';
import { ILeaseModelMetadata } from 'app/entities/leases/lease-model-metadata/lease-model-metadata.model';
import { LeaseModelMetadataService } from 'app/entities/leases/lease-model-metadata/service/lease-model-metadata.service';
import { IUniversallyUniqueMapping } from 'app/entities/system/universally-unique-mapping/universally-unique-mapping.model';
import { UniversallyUniqueMappingService } from 'app/entities/system/universally-unique-mapping/service/universally-unique-mapping.service';

@Component({
  selector: 'jhi-lease-liability-schedule-item-update',
  templateUrl: './lease-liability-schedule-item-update.component.html',
})
export class LeaseLiabilityScheduleItemUpdateComponent implements OnInit {
  isSaving = false;
  leaseLiabilityScheduleItem: ILeaseLiabilityScheduleItem | null = null;

  placeholdersSharedCollection: IPlaceholder[] = [];
  leaseContractsSharedCollection: ILeaseContract[] = [];
  leaseModelMetadataSharedCollection: ILeaseModelMetadata[] = [];
  universallyUniqueMappingsSharedCollection: IUniversallyUniqueMapping[] = [];

  editForm: LeaseLiabilityScheduleItemFormGroup = this.leaseLiabilityScheduleItemFormService.createLeaseLiabilityScheduleItemFormGroup();

  constructor(
    protected leaseLiabilityScheduleItemService: LeaseLiabilityScheduleItemService,
    protected leaseLiabilityScheduleItemFormService: LeaseLiabilityScheduleItemFormService,
    protected placeholderService: PlaceholderService,
    protected leaseContractService: LeaseContractService,
    protected leaseModelMetadataService: LeaseModelMetadataService,
    protected universallyUniqueMappingService: UniversallyUniqueMappingService,
    protected activatedRoute: ActivatedRoute
  ) {}

  comparePlaceholder = (o1: IPlaceholder | null, o2: IPlaceholder | null): boolean => this.placeholderService.comparePlaceholder(o1, o2);

  compareLeaseContract = (o1: ILeaseContract | null, o2: ILeaseContract | null): boolean =>
    this.leaseContractService.compareLeaseContract(o1, o2);

  compareLeaseModelMetadata = (o1: ILeaseModelMetadata | null, o2: ILeaseModelMetadata | null): boolean =>
    this.leaseModelMetadataService.compareLeaseModelMetadata(o1, o2);

  compareUniversallyUniqueMapping = (o1: IUniversallyUniqueMapping | null, o2: IUniversallyUniqueMapping | null): boolean =>
    this.universallyUniqueMappingService.compareUniversallyUniqueMapping(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ leaseLiabilityScheduleItem }) => {
      this.leaseLiabilityScheduleItem = leaseLiabilityScheduleItem;
      if (leaseLiabilityScheduleItem) {
        this.updateForm(leaseLiabilityScheduleItem);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const leaseLiabilityScheduleItem = this.leaseLiabilityScheduleItemFormService.getLeaseLiabilityScheduleItem(this.editForm);
    if (leaseLiabilityScheduleItem.id !== null) {
      this.subscribeToSaveResponse(this.leaseLiabilityScheduleItemService.update(leaseLiabilityScheduleItem));
    } else {
      this.subscribeToSaveResponse(this.leaseLiabilityScheduleItemService.create(leaseLiabilityScheduleItem));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILeaseLiabilityScheduleItem>>): void {
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

  protected updateForm(leaseLiabilityScheduleItem: ILeaseLiabilityScheduleItem): void {
    this.leaseLiabilityScheduleItem = leaseLiabilityScheduleItem;
    this.leaseLiabilityScheduleItemFormService.resetForm(this.editForm, leaseLiabilityScheduleItem);

    this.placeholdersSharedCollection = this.placeholderService.addPlaceholderToCollectionIfMissing<IPlaceholder>(
      this.placeholdersSharedCollection,
      ...(leaseLiabilityScheduleItem.placeholders ?? [])
    );
    this.leaseContractsSharedCollection = this.leaseContractService.addLeaseContractToCollectionIfMissing<ILeaseContract>(
      this.leaseContractsSharedCollection,
      leaseLiabilityScheduleItem.leaseContract
    );
    this.leaseModelMetadataSharedCollection =
      this.leaseModelMetadataService.addLeaseModelMetadataToCollectionIfMissing<ILeaseModelMetadata>(
        this.leaseModelMetadataSharedCollection,
        leaseLiabilityScheduleItem.leaseModelMetadata
      );
    this.universallyUniqueMappingsSharedCollection =
      this.universallyUniqueMappingService.addUniversallyUniqueMappingToCollectionIfMissing<IUniversallyUniqueMapping>(
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
          this.placeholderService.addPlaceholderToCollectionIfMissing<IPlaceholder>(
            placeholders,
            ...(this.leaseLiabilityScheduleItem?.placeholders ?? [])
          )
        )
      )
      .subscribe((placeholders: IPlaceholder[]) => (this.placeholdersSharedCollection = placeholders));

    this.leaseContractService
      .query()
      .pipe(map((res: HttpResponse<ILeaseContract[]>) => res.body ?? []))
      .pipe(
        map((leaseContracts: ILeaseContract[]) =>
          this.leaseContractService.addLeaseContractToCollectionIfMissing<ILeaseContract>(
            leaseContracts,
            this.leaseLiabilityScheduleItem?.leaseContract
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
            this.leaseLiabilityScheduleItem?.leaseModelMetadata
          )
        )
      )
      .subscribe((leaseModelMetadata: ILeaseModelMetadata[]) => (this.leaseModelMetadataSharedCollection = leaseModelMetadata));

    this.universallyUniqueMappingService
      .query()
      .pipe(map((res: HttpResponse<IUniversallyUniqueMapping[]>) => res.body ?? []))
      .pipe(
        map((universallyUniqueMappings: IUniversallyUniqueMapping[]) =>
          this.universallyUniqueMappingService.addUniversallyUniqueMappingToCollectionIfMissing<IUniversallyUniqueMapping>(
            universallyUniqueMappings,
            ...(this.leaseLiabilityScheduleItem?.universallyUniqueMappings ?? [])
          )
        )
      )
      .subscribe(
        (universallyUniqueMappings: IUniversallyUniqueMapping[]) =>
          (this.universallyUniqueMappingsSharedCollection = universallyUniqueMappings)
      );
  }
}
