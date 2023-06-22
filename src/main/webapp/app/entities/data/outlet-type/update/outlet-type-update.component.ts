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

import { OutletTypeFormService, OutletTypeFormGroup } from './outlet-type-form.service';
import { IOutletType } from '../outlet-type.model';
import { OutletTypeService } from '../service/outlet-type.service';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/system/placeholder/service/placeholder.service';

@Component({
  selector: 'jhi-outlet-type-update',
  templateUrl: './outlet-type-update.component.html',
})
export class OutletTypeUpdateComponent implements OnInit {
  isSaving = false;
  outletType: IOutletType | null = null;

  placeholdersSharedCollection: IPlaceholder[] = [];

  editForm: OutletTypeFormGroup = this.outletTypeFormService.createOutletTypeFormGroup();

  constructor(
    protected outletTypeService: OutletTypeService,
    protected outletTypeFormService: OutletTypeFormService,
    protected placeholderService: PlaceholderService,
    protected activatedRoute: ActivatedRoute
  ) {}

  comparePlaceholder = (o1: IPlaceholder | null, o2: IPlaceholder | null): boolean => this.placeholderService.comparePlaceholder(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ outletType }) => {
      this.outletType = outletType;
      if (outletType) {
        this.updateForm(outletType);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const outletType = this.outletTypeFormService.getOutletType(this.editForm);
    if (outletType.id !== null) {
      this.subscribeToSaveResponse(this.outletTypeService.update(outletType));
    } else {
      this.subscribeToSaveResponse(this.outletTypeService.create(outletType));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOutletType>>): void {
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

  protected updateForm(outletType: IOutletType): void {
    this.outletType = outletType;
    this.outletTypeFormService.resetForm(this.editForm, outletType);

    this.placeholdersSharedCollection = this.placeholderService.addPlaceholderToCollectionIfMissing<IPlaceholder>(
      this.placeholdersSharedCollection,
      ...(outletType.placeholders ?? [])
    );
  }

  protected loadRelationshipsOptions(): void {
    this.placeholderService
      .query()
      .pipe(map((res: HttpResponse<IPlaceholder[]>) => res.body ?? []))
      .pipe(
        map((placeholders: IPlaceholder[]) =>
          this.placeholderService.addPlaceholderToCollectionIfMissing<IPlaceholder>(placeholders, ...(this.outletType?.placeholders ?? []))
        )
      )
      .subscribe((placeholders: IPlaceholder[]) => (this.placeholdersSharedCollection = placeholders));
  }
}
