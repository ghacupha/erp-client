import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IAssetCategory, AssetCategory } from '../asset-category.model';
import { AssetCategoryService } from '../service/asset-category.service';
import { IDepreciationMethod } from 'app/entities/depreciation-method/depreciation-method.model';
import { DepreciationMethodService } from 'app/entities/depreciation-method/service/depreciation-method.service';
import { IPlaceholder } from 'app/entities/erpService/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/erpService/placeholder/service/placeholder.service';

@Component({
  selector: 'jhi-asset-category-update',
  templateUrl: './asset-category-update.component.html',
})
export class AssetCategoryUpdateComponent implements OnInit {
  isSaving = false;

  depreciationMethodsSharedCollection: IDepreciationMethod[] = [];
  placeholdersSharedCollection: IPlaceholder[] = [];

  editForm = this.fb.group({
    id: [],
    assetCategoryName: [null, [Validators.required]],
    description: [],
    notes: [],
    depreciationMethod: [null, Validators.required],
    placeholders: [],
  });

  constructor(
    protected assetCategoryService: AssetCategoryService,
    protected depreciationMethodService: DepreciationMethodService,
    protected placeholderService: PlaceholderService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ assetCategory }) => {
      this.updateForm(assetCategory);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const assetCategory = this.createFromForm();
    if (assetCategory.id !== undefined) {
      this.subscribeToSaveResponse(this.assetCategoryService.update(assetCategory));
    } else {
      this.subscribeToSaveResponse(this.assetCategoryService.create(assetCategory));
    }
  }

  trackDepreciationMethodById(index: number, item: IDepreciationMethod): number {
    return item.id!;
  }

  trackPlaceholderById(index: number, item: IPlaceholder): number {
    return item.id!;
  }

  getSelectedPlaceholder(option: IPlaceholder, selectedVals?: IPlaceholder[]): IPlaceholder {
    if (selectedVals) {
      for (const selectedVal of selectedVals) {
        if (option.id === selectedVal.id) {
          return selectedVal;
        }
      }
    }
    return option;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAssetCategory>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
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

  protected updateForm(assetCategory: IAssetCategory): void {
    this.editForm.patchValue({
      id: assetCategory.id,
      assetCategoryName: assetCategory.assetCategoryName,
      description: assetCategory.description,
      notes: assetCategory.notes,
      depreciationMethod: assetCategory.depreciationMethod,
      placeholders: assetCategory.placeholders,
    });

    this.depreciationMethodsSharedCollection = this.depreciationMethodService.addDepreciationMethodToCollectionIfMissing(
      this.depreciationMethodsSharedCollection,
      assetCategory.depreciationMethod
    );
    this.placeholdersSharedCollection = this.placeholderService.addPlaceholderToCollectionIfMissing(
      this.placeholdersSharedCollection,
      ...(assetCategory.placeholders ?? [])
    );
  }

  protected loadRelationshipsOptions(): void {
    this.depreciationMethodService
      .query()
      .pipe(map((res: HttpResponse<IDepreciationMethod[]>) => res.body ?? []))
      .pipe(
        map((depreciationMethods: IDepreciationMethod[]) =>
          this.depreciationMethodService.addDepreciationMethodToCollectionIfMissing(
            depreciationMethods,
            this.editForm.get('depreciationMethod')!.value
          )
        )
      )
      .subscribe((depreciationMethods: IDepreciationMethod[]) => (this.depreciationMethodsSharedCollection = depreciationMethods));

    this.placeholderService
      .query()
      .pipe(map((res: HttpResponse<IPlaceholder[]>) => res.body ?? []))
      .pipe(
        map((placeholders: IPlaceholder[]) =>
          this.placeholderService.addPlaceholderToCollectionIfMissing(placeholders, ...(this.editForm.get('placeholders')!.value ?? []))
        )
      )
      .subscribe((placeholders: IPlaceholder[]) => (this.placeholdersSharedCollection = placeholders));
  }

  protected createFromForm(): IAssetCategory {
    return {
      ...new AssetCategory(),
      id: this.editForm.get(['id'])!.value,
      assetCategoryName: this.editForm.get(['assetCategoryName'])!.value,
      description: this.editForm.get(['description'])!.value,
      notes: this.editForm.get(['notes'])!.value,
      depreciationMethod: this.editForm.get(['depreciationMethod'])!.value,
      placeholders: this.editForm.get(['placeholders'])!.value,
    };
  }
}
