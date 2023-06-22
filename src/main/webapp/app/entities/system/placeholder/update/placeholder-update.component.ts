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

import { PlaceholderFormService, PlaceholderFormGroup } from './placeholder-form.service';
import { IPlaceholder } from '../placeholder.model';
import { PlaceholderService } from '../service/placeholder.service';

@Component({
  selector: 'jhi-placeholder-update',
  templateUrl: './placeholder-update.component.html',
})
export class PlaceholderUpdateComponent implements OnInit {
  isSaving = false;
  placeholder: IPlaceholder | null = null;

  placeholdersSharedCollection: IPlaceholder[] = [];

  editForm: PlaceholderFormGroup = this.placeholderFormService.createPlaceholderFormGroup();

  constructor(
    protected placeholderService: PlaceholderService,
    protected placeholderFormService: PlaceholderFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  comparePlaceholder = (o1: IPlaceholder | null, o2: IPlaceholder | null): boolean => this.placeholderService.comparePlaceholder(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ placeholder }) => {
      this.placeholder = placeholder;
      if (placeholder) {
        this.updateForm(placeholder);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const placeholder = this.placeholderFormService.getPlaceholder(this.editForm);
    if (placeholder.id !== null) {
      this.subscribeToSaveResponse(this.placeholderService.update(placeholder));
    } else {
      this.subscribeToSaveResponse(this.placeholderService.create(placeholder));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPlaceholder>>): void {
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

  protected updateForm(placeholder: IPlaceholder): void {
    this.placeholder = placeholder;
    this.placeholderFormService.resetForm(this.editForm, placeholder);

    this.placeholdersSharedCollection = this.placeholderService.addPlaceholderToCollectionIfMissing<IPlaceholder>(
      this.placeholdersSharedCollection,
      placeholder.containingPlaceholder
    );
  }

  protected loadRelationshipsOptions(): void {
    this.placeholderService
      .query()
      .pipe(map((res: HttpResponse<IPlaceholder[]>) => res.body ?? []))
      .pipe(
        map((placeholders: IPlaceholder[]) =>
          this.placeholderService.addPlaceholderToCollectionIfMissing<IPlaceholder>(placeholders, this.placeholder?.containingPlaceholder)
        )
      )
      .subscribe((placeholders: IPlaceholder[]) => (this.placeholdersSharedCollection = placeholders));
  }
}
