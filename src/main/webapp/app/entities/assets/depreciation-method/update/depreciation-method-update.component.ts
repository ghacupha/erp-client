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

import { DepreciationMethodFormService, DepreciationMethodFormGroup } from './depreciation-method-form.service';
import { IDepreciationMethod } from '../depreciation-method.model';
import { DepreciationMethodService } from '../service/depreciation-method.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/system/placeholder/service/placeholder.service';
import { DepreciationTypes } from 'app/entities/enumerations/depreciation-types.model';

@Component({
  selector: 'jhi-depreciation-method-update',
  templateUrl: './depreciation-method-update.component.html',
})
export class DepreciationMethodUpdateComponent implements OnInit {
  isSaving = false;
  depreciationMethod: IDepreciationMethod | null = null;
  depreciationTypesValues = Object.keys(DepreciationTypes);

  placeholdersSharedCollection: IPlaceholder[] = [];

  editForm: DepreciationMethodFormGroup = this.depreciationMethodFormService.createDepreciationMethodFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected depreciationMethodService: DepreciationMethodService,
    protected depreciationMethodFormService: DepreciationMethodFormService,
    protected placeholderService: PlaceholderService,
    protected activatedRoute: ActivatedRoute
  ) {}

  comparePlaceholder = (o1: IPlaceholder | null, o2: IPlaceholder | null): boolean => this.placeholderService.comparePlaceholder(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ depreciationMethod }) => {
      this.depreciationMethod = depreciationMethod;
      if (depreciationMethod) {
        this.updateForm(depreciationMethod);
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
    const depreciationMethod = this.depreciationMethodFormService.getDepreciationMethod(this.editForm);
    if (depreciationMethod.id !== null) {
      this.subscribeToSaveResponse(this.depreciationMethodService.update(depreciationMethod));
    } else {
      this.subscribeToSaveResponse(this.depreciationMethodService.create(depreciationMethod));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDepreciationMethod>>): void {
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

  protected updateForm(depreciationMethod: IDepreciationMethod): void {
    this.depreciationMethod = depreciationMethod;
    this.depreciationMethodFormService.resetForm(this.editForm, depreciationMethod);

    this.placeholdersSharedCollection = this.placeholderService.addPlaceholderToCollectionIfMissing<IPlaceholder>(
      this.placeholdersSharedCollection,
      ...(depreciationMethod.placeholders ?? [])
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
            ...(this.depreciationMethod?.placeholders ?? [])
          )
        )
      )
      .subscribe((placeholders: IPlaceholder[]) => (this.placeholdersSharedCollection = placeholders));
  }
}
