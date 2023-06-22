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

import { AssetWarrantyFormService, AssetWarrantyFormGroup } from './asset-warranty-form.service';
import { IAssetWarranty } from '../asset-warranty.model';
import { AssetWarrantyService } from '../service/asset-warranty.service';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/system/placeholder/service/placeholder.service';
import { IUniversallyUniqueMapping } from 'app/entities/system/universally-unique-mapping/universally-unique-mapping.model';
import { UniversallyUniqueMappingService } from 'app/entities/system/universally-unique-mapping/service/universally-unique-mapping.service';
import { IDealer } from 'app/entities/people/dealer/dealer.model';
import { DealerService } from 'app/entities/people/dealer/service/dealer.service';
import { IBusinessDocument } from 'app/entities/documentation/business-document/business-document.model';
import { BusinessDocumentService } from 'app/entities/documentation/business-document/service/business-document.service';

@Component({
  selector: 'jhi-asset-warranty-update',
  templateUrl: './asset-warranty-update.component.html',
})
export class AssetWarrantyUpdateComponent implements OnInit {
  isSaving = false;
  assetWarranty: IAssetWarranty | null = null;

  placeholdersSharedCollection: IPlaceholder[] = [];
  universallyUniqueMappingsSharedCollection: IUniversallyUniqueMapping[] = [];
  dealersSharedCollection: IDealer[] = [];
  businessDocumentsSharedCollection: IBusinessDocument[] = [];

  editForm: AssetWarrantyFormGroup = this.assetWarrantyFormService.createAssetWarrantyFormGroup();

  constructor(
    protected assetWarrantyService: AssetWarrantyService,
    protected assetWarrantyFormService: AssetWarrantyFormService,
    protected placeholderService: PlaceholderService,
    protected universallyUniqueMappingService: UniversallyUniqueMappingService,
    protected dealerService: DealerService,
    protected businessDocumentService: BusinessDocumentService,
    protected activatedRoute: ActivatedRoute
  ) {}

  comparePlaceholder = (o1: IPlaceholder | null, o2: IPlaceholder | null): boolean => this.placeholderService.comparePlaceholder(o1, o2);

  compareUniversallyUniqueMapping = (o1: IUniversallyUniqueMapping | null, o2: IUniversallyUniqueMapping | null): boolean =>
    this.universallyUniqueMappingService.compareUniversallyUniqueMapping(o1, o2);

  compareDealer = (o1: IDealer | null, o2: IDealer | null): boolean => this.dealerService.compareDealer(o1, o2);

  compareBusinessDocument = (o1: IBusinessDocument | null, o2: IBusinessDocument | null): boolean =>
    this.businessDocumentService.compareBusinessDocument(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ assetWarranty }) => {
      this.assetWarranty = assetWarranty;
      if (assetWarranty) {
        this.updateForm(assetWarranty);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const assetWarranty = this.assetWarrantyFormService.getAssetWarranty(this.editForm);
    if (assetWarranty.id !== null) {
      this.subscribeToSaveResponse(this.assetWarrantyService.update(assetWarranty));
    } else {
      this.subscribeToSaveResponse(this.assetWarrantyService.create(assetWarranty));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAssetWarranty>>): void {
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

  protected updateForm(assetWarranty: IAssetWarranty): void {
    this.assetWarranty = assetWarranty;
    this.assetWarrantyFormService.resetForm(this.editForm, assetWarranty);

    this.placeholdersSharedCollection = this.placeholderService.addPlaceholderToCollectionIfMissing<IPlaceholder>(
      this.placeholdersSharedCollection,
      ...(assetWarranty.placeholders ?? [])
    );
    this.universallyUniqueMappingsSharedCollection =
      this.universallyUniqueMappingService.addUniversallyUniqueMappingToCollectionIfMissing<IUniversallyUniqueMapping>(
        this.universallyUniqueMappingsSharedCollection,
        ...(assetWarranty.universallyUniqueMappings ?? [])
      );
    this.dealersSharedCollection = this.dealerService.addDealerToCollectionIfMissing<IDealer>(
      this.dealersSharedCollection,
      assetWarranty.dealer
    );
    this.businessDocumentsSharedCollection = this.businessDocumentService.addBusinessDocumentToCollectionIfMissing<IBusinessDocument>(
      this.businessDocumentsSharedCollection,
      ...(assetWarranty.warrantyAttachments ?? [])
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
            ...(this.assetWarranty?.placeholders ?? [])
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
            ...(this.assetWarranty?.universallyUniqueMappings ?? [])
          )
        )
      )
      .subscribe(
        (universallyUniqueMappings: IUniversallyUniqueMapping[]) =>
          (this.universallyUniqueMappingsSharedCollection = universallyUniqueMappings)
      );

    this.dealerService
      .query()
      .pipe(map((res: HttpResponse<IDealer[]>) => res.body ?? []))
      .pipe(map((dealers: IDealer[]) => this.dealerService.addDealerToCollectionIfMissing<IDealer>(dealers, this.assetWarranty?.dealer)))
      .subscribe((dealers: IDealer[]) => (this.dealersSharedCollection = dealers));

    this.businessDocumentService
      .query()
      .pipe(map((res: HttpResponse<IBusinessDocument[]>) => res.body ?? []))
      .pipe(
        map((businessDocuments: IBusinessDocument[]) =>
          this.businessDocumentService.addBusinessDocumentToCollectionIfMissing<IBusinessDocument>(
            businessDocuments,
            ...(this.assetWarranty?.warrantyAttachments ?? [])
          )
        )
      )
      .subscribe((businessDocuments: IBusinessDocument[]) => (this.businessDocumentsSharedCollection = businessDocuments));
  }
}
