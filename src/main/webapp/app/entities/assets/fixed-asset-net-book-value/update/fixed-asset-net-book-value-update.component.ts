import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { FixedAssetNetBookValueFormService, FixedAssetNetBookValueFormGroup } from './fixed-asset-net-book-value-form.service';
import { IFixedAssetNetBookValue } from '../fixed-asset-net-book-value.model';
import { FixedAssetNetBookValueService } from '../service/fixed-asset-net-book-value.service';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/system/placeholder/service/placeholder.service';
import { DepreciationRegime } from 'app/entities/enumerations/depreciation-regime.model';

@Component({
  selector: 'jhi-fixed-asset-net-book-value-update',
  templateUrl: './fixed-asset-net-book-value-update.component.html',
})
export class FixedAssetNetBookValueUpdateComponent implements OnInit {
  isSaving = false;
  fixedAssetNetBookValue: IFixedAssetNetBookValue | null = null;
  depreciationRegimeValues = Object.keys(DepreciationRegime);

  placeholdersSharedCollection: IPlaceholder[] = [];

  editForm: FixedAssetNetBookValueFormGroup = this.fixedAssetNetBookValueFormService.createFixedAssetNetBookValueFormGroup();

  constructor(
    protected fixedAssetNetBookValueService: FixedAssetNetBookValueService,
    protected fixedAssetNetBookValueFormService: FixedAssetNetBookValueFormService,
    protected placeholderService: PlaceholderService,
    protected activatedRoute: ActivatedRoute
  ) {}

  comparePlaceholder = (o1: IPlaceholder | null, o2: IPlaceholder | null): boolean => this.placeholderService.comparePlaceholder(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ fixedAssetNetBookValue }) => {
      this.fixedAssetNetBookValue = fixedAssetNetBookValue;
      if (fixedAssetNetBookValue) {
        this.updateForm(fixedAssetNetBookValue);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const fixedAssetNetBookValue = this.fixedAssetNetBookValueFormService.getFixedAssetNetBookValue(this.editForm);
    if (fixedAssetNetBookValue.id !== null) {
      this.subscribeToSaveResponse(this.fixedAssetNetBookValueService.update(fixedAssetNetBookValue));
    } else {
      this.subscribeToSaveResponse(this.fixedAssetNetBookValueService.create(fixedAssetNetBookValue));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFixedAssetNetBookValue>>): void {
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

  protected updateForm(fixedAssetNetBookValue: IFixedAssetNetBookValue): void {
    this.fixedAssetNetBookValue = fixedAssetNetBookValue;
    this.fixedAssetNetBookValueFormService.resetForm(this.editForm, fixedAssetNetBookValue);

    this.placeholdersSharedCollection = this.placeholderService.addPlaceholderToCollectionIfMissing<IPlaceholder>(
      this.placeholdersSharedCollection,
      ...(fixedAssetNetBookValue.placeholders ?? [])
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
            ...(this.fixedAssetNetBookValue?.placeholders ?? [])
          )
        )
      )
      .subscribe((placeholders: IPlaceholder[]) => (this.placeholdersSharedCollection = placeholders));
  }
}
