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

import { StringQuestionBaseFormService, StringQuestionBaseFormGroup } from './string-question-base-form.service';
import { IStringQuestionBase } from '../string-question-base.model';
import { StringQuestionBaseService } from '../service/string-question-base.service';
import { IUniversallyUniqueMapping } from 'app/entities/system/universally-unique-mapping/universally-unique-mapping.model';
import { UniversallyUniqueMappingService } from 'app/entities/system/universally-unique-mapping/service/universally-unique-mapping.service';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/system/placeholder/service/placeholder.service';
import { ControlTypes } from 'app/entities/enumerations/control-types.model';

@Component({
  selector: 'jhi-string-question-base-update',
  templateUrl: './string-question-base-update.component.html',
})
export class StringQuestionBaseUpdateComponent implements OnInit {
  isSaving = false;
  stringQuestionBase: IStringQuestionBase | null = null;
  controlTypesValues = Object.keys(ControlTypes);

  universallyUniqueMappingsSharedCollection: IUniversallyUniqueMapping[] = [];
  placeholdersSharedCollection: IPlaceholder[] = [];

  editForm: StringQuestionBaseFormGroup = this.stringQuestionBaseFormService.createStringQuestionBaseFormGroup();

  constructor(
    protected stringQuestionBaseService: StringQuestionBaseService,
    protected stringQuestionBaseFormService: StringQuestionBaseFormService,
    protected universallyUniqueMappingService: UniversallyUniqueMappingService,
    protected placeholderService: PlaceholderService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareUniversallyUniqueMapping = (o1: IUniversallyUniqueMapping | null, o2: IUniversallyUniqueMapping | null): boolean =>
    this.universallyUniqueMappingService.compareUniversallyUniqueMapping(o1, o2);

  comparePlaceholder = (o1: IPlaceholder | null, o2: IPlaceholder | null): boolean => this.placeholderService.comparePlaceholder(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ stringQuestionBase }) => {
      this.stringQuestionBase = stringQuestionBase;
      if (stringQuestionBase) {
        this.updateForm(stringQuestionBase);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const stringQuestionBase = this.stringQuestionBaseFormService.getStringQuestionBase(this.editForm);
    if (stringQuestionBase.id !== null) {
      this.subscribeToSaveResponse(this.stringQuestionBaseService.update(stringQuestionBase));
    } else {
      this.subscribeToSaveResponse(this.stringQuestionBaseService.create(stringQuestionBase));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IStringQuestionBase>>): void {
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

  protected updateForm(stringQuestionBase: IStringQuestionBase): void {
    this.stringQuestionBase = stringQuestionBase;
    this.stringQuestionBaseFormService.resetForm(this.editForm, stringQuestionBase);

    this.universallyUniqueMappingsSharedCollection =
      this.universallyUniqueMappingService.addUniversallyUniqueMappingToCollectionIfMissing<IUniversallyUniqueMapping>(
        this.universallyUniqueMappingsSharedCollection,
        ...(stringQuestionBase.parameters ?? [])
      );
    this.placeholdersSharedCollection = this.placeholderService.addPlaceholderToCollectionIfMissing<IPlaceholder>(
      this.placeholdersSharedCollection,
      ...(stringQuestionBase.placeholderItems ?? [])
    );
  }

  protected loadRelationshipsOptions(): void {
    this.universallyUniqueMappingService
      .query()
      .pipe(map((res: HttpResponse<IUniversallyUniqueMapping[]>) => res.body ?? []))
      .pipe(
        map((universallyUniqueMappings: IUniversallyUniqueMapping[]) =>
          this.universallyUniqueMappingService.addUniversallyUniqueMappingToCollectionIfMissing<IUniversallyUniqueMapping>(
            universallyUniqueMappings,
            ...(this.stringQuestionBase?.parameters ?? [])
          )
        )
      )
      .subscribe(
        (universallyUniqueMappings: IUniversallyUniqueMapping[]) =>
          (this.universallyUniqueMappingsSharedCollection = universallyUniqueMappings)
      );

    this.placeholderService
      .query()
      .pipe(map((res: HttpResponse<IPlaceholder[]>) => res.body ?? []))
      .pipe(
        map((placeholders: IPlaceholder[]) =>
          this.placeholderService.addPlaceholderToCollectionIfMissing<IPlaceholder>(
            placeholders,
            ...(this.stringQuestionBase?.placeholderItems ?? [])
          )
        )
      )
      .subscribe((placeholders: IPlaceholder[]) => (this.placeholdersSharedCollection = placeholders));
  }
}
