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

import { FixedAssetAcquisitionFormService, FixedAssetAcquisitionFormGroup } from './fixed-asset-acquisition-form.service';
import { IFixedAssetAcquisition } from '../fixed-asset-acquisition.model';
import { FixedAssetAcquisitionService } from '../service/fixed-asset-acquisition.service';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/system/placeholder/service/placeholder.service';

@Component({
  selector: 'jhi-fixed-asset-acquisition-update',
  templateUrl: './fixed-asset-acquisition-update.component.html',
})
export class FixedAssetAcquisitionUpdateComponent implements OnInit {
  isSaving = false;
  fixedAssetAcquisition: IFixedAssetAcquisition | null = null;

  placeholdersSharedCollection: IPlaceholder[] = [];

  editForm: FixedAssetAcquisitionFormGroup = this.fixedAssetAcquisitionFormService.createFixedAssetAcquisitionFormGroup();

  constructor(
    protected fixedAssetAcquisitionService: FixedAssetAcquisitionService,
    protected fixedAssetAcquisitionFormService: FixedAssetAcquisitionFormService,
    protected placeholderService: PlaceholderService,
    protected activatedRoute: ActivatedRoute
  ) {}

  comparePlaceholder = (o1: IPlaceholder | null, o2: IPlaceholder | null): boolean => this.placeholderService.comparePlaceholder(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ fixedAssetAcquisition }) => {
      this.fixedAssetAcquisition = fixedAssetAcquisition;
      if (fixedAssetAcquisition) {
        this.updateForm(fixedAssetAcquisition);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const fixedAssetAcquisition = this.fixedAssetAcquisitionFormService.getFixedAssetAcquisition(this.editForm);
    if (fixedAssetAcquisition.id !== null) {
      this.subscribeToSaveResponse(this.fixedAssetAcquisitionService.update(fixedAssetAcquisition));
    } else {
      this.subscribeToSaveResponse(this.fixedAssetAcquisitionService.create(fixedAssetAcquisition));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFixedAssetAcquisition>>): void {
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

  protected updateForm(fixedAssetAcquisition: IFixedAssetAcquisition): void {
    this.fixedAssetAcquisition = fixedAssetAcquisition;
    this.fixedAssetAcquisitionFormService.resetForm(this.editForm, fixedAssetAcquisition);

    this.placeholdersSharedCollection = this.placeholderService.addPlaceholderToCollectionIfMissing<IPlaceholder>(
      this.placeholdersSharedCollection,
      ...(fixedAssetAcquisition.placeholders ?? [])
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
            ...(this.fixedAssetAcquisition?.placeholders ?? [])
          )
        )
      )
      .subscribe((placeholders: IPlaceholder[]) => (this.placeholdersSharedCollection = placeholders));
  }
}
