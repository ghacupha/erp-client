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

import { FixedAssetDepreciationFormService, FixedAssetDepreciationFormGroup } from './fixed-asset-depreciation-form.service';
import { IFixedAssetDepreciation } from '../fixed-asset-depreciation.model';
import { FixedAssetDepreciationService } from '../service/fixed-asset-depreciation.service';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/system/placeholder/service/placeholder.service';
import { DepreciationRegime } from 'app/entities/enumerations/depreciation-regime.model';

@Component({
  selector: 'jhi-fixed-asset-depreciation-update',
  templateUrl: './fixed-asset-depreciation-update.component.html',
})
export class FixedAssetDepreciationUpdateComponent implements OnInit {
  isSaving = false;
  fixedAssetDepreciation: IFixedAssetDepreciation | null = null;
  depreciationRegimeValues = Object.keys(DepreciationRegime);

  placeholdersSharedCollection: IPlaceholder[] = [];

  editForm: FixedAssetDepreciationFormGroup = this.fixedAssetDepreciationFormService.createFixedAssetDepreciationFormGroup();

  constructor(
    protected fixedAssetDepreciationService: FixedAssetDepreciationService,
    protected fixedAssetDepreciationFormService: FixedAssetDepreciationFormService,
    protected placeholderService: PlaceholderService,
    protected activatedRoute: ActivatedRoute
  ) {}

  comparePlaceholder = (o1: IPlaceholder | null, o2: IPlaceholder | null): boolean => this.placeholderService.comparePlaceholder(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ fixedAssetDepreciation }) => {
      this.fixedAssetDepreciation = fixedAssetDepreciation;
      if (fixedAssetDepreciation) {
        this.updateForm(fixedAssetDepreciation);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const fixedAssetDepreciation = this.fixedAssetDepreciationFormService.getFixedAssetDepreciation(this.editForm);
    if (fixedAssetDepreciation.id !== null) {
      this.subscribeToSaveResponse(this.fixedAssetDepreciationService.update(fixedAssetDepreciation));
    } else {
      this.subscribeToSaveResponse(this.fixedAssetDepreciationService.create(fixedAssetDepreciation));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFixedAssetDepreciation>>): void {
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

  protected updateForm(fixedAssetDepreciation: IFixedAssetDepreciation): void {
    this.fixedAssetDepreciation = fixedAssetDepreciation;
    this.fixedAssetDepreciationFormService.resetForm(this.editForm, fixedAssetDepreciation);

    this.placeholdersSharedCollection = this.placeholderService.addPlaceholderToCollectionIfMissing<IPlaceholder>(
      this.placeholdersSharedCollection,
      ...(fixedAssetDepreciation.placeholders ?? [])
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
            ...(this.fixedAssetDepreciation?.placeholders ?? [])
          )
        )
      )
      .subscribe((placeholders: IPlaceholder[]) => (this.placeholdersSharedCollection = placeholders));
  }
}
