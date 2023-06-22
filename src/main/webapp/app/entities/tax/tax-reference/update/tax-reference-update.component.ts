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

import { TaxReferenceFormService, TaxReferenceFormGroup } from './tax-reference-form.service';
import { ITaxReference } from '../tax-reference.model';
import { TaxReferenceService } from '../service/tax-reference.service';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/system/placeholder/service/placeholder.service';
import { taxReferenceTypes } from 'app/entities/enumerations/tax-reference-types.model';

@Component({
  selector: 'jhi-tax-reference-update',
  templateUrl: './tax-reference-update.component.html',
})
export class TaxReferenceUpdateComponent implements OnInit {
  isSaving = false;
  taxReference: ITaxReference | null = null;
  taxReferenceTypesValues = Object.keys(taxReferenceTypes);

  placeholdersSharedCollection: IPlaceholder[] = [];

  editForm: TaxReferenceFormGroup = this.taxReferenceFormService.createTaxReferenceFormGroup();

  constructor(
    protected taxReferenceService: TaxReferenceService,
    protected taxReferenceFormService: TaxReferenceFormService,
    protected placeholderService: PlaceholderService,
    protected activatedRoute: ActivatedRoute
  ) {}

  comparePlaceholder = (o1: IPlaceholder | null, o2: IPlaceholder | null): boolean => this.placeholderService.comparePlaceholder(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ taxReference }) => {
      this.taxReference = taxReference;
      if (taxReference) {
        this.updateForm(taxReference);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const taxReference = this.taxReferenceFormService.getTaxReference(this.editForm);
    if (taxReference.id !== null) {
      this.subscribeToSaveResponse(this.taxReferenceService.update(taxReference));
    } else {
      this.subscribeToSaveResponse(this.taxReferenceService.create(taxReference));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITaxReference>>): void {
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

  protected updateForm(taxReference: ITaxReference): void {
    this.taxReference = taxReference;
    this.taxReferenceFormService.resetForm(this.editForm, taxReference);

    this.placeholdersSharedCollection = this.placeholderService.addPlaceholderToCollectionIfMissing<IPlaceholder>(
      this.placeholdersSharedCollection,
      ...(taxReference.placeholders ?? [])
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
            ...(this.taxReference?.placeholders ?? [])
          )
        )
      )
      .subscribe((placeholders: IPlaceholder[]) => (this.placeholdersSharedCollection = placeholders));
  }
}
