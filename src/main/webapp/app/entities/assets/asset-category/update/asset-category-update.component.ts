import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { AssetCategoryFormService, AssetCategoryFormGroup } from './asset-category-form.service';
import { IAssetCategory } from '../asset-category.model';
import { AssetCategoryService } from '../service/asset-category.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { IDepreciationMethod } from 'app/entities/assets/depreciation-method/depreciation-method.model';
import { DepreciationMethodService } from 'app/entities/assets/depreciation-method/service/depreciation-method.service';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/system/placeholder/service/placeholder.service';

@Component({
  selector: 'jhi-asset-category-update',
  templateUrl: './asset-category-update.component.html',
})
export class AssetCategoryUpdateComponent implements OnInit {
  isSaving = false;
  assetCategory: IAssetCategory | null = null;

  depreciationMethodsSharedCollection: IDepreciationMethod[] = [];
  placeholdersSharedCollection: IPlaceholder[] = [];

  editForm: AssetCategoryFormGroup = this.assetCategoryFormService.createAssetCategoryFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected assetCategoryService: AssetCategoryService,
    protected assetCategoryFormService: AssetCategoryFormService,
    protected depreciationMethodService: DepreciationMethodService,
    protected placeholderService: PlaceholderService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareDepreciationMethod = (o1: IDepreciationMethod | null, o2: IDepreciationMethod | null): boolean =>
    this.depreciationMethodService.compareDepreciationMethod(o1, o2);

  comparePlaceholder = (o1: IPlaceholder | null, o2: IPlaceholder | null): boolean => this.placeholderService.comparePlaceholder(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ assetCategory }) => {
      this.assetCategory = assetCategory;
      if (assetCategory) {
        this.updateForm(assetCategory);
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
    const assetCategory = this.assetCategoryFormService.getAssetCategory(this.editForm);
    if (assetCategory.id !== null) {
      this.subscribeToSaveResponse(this.assetCategoryService.update(assetCategory));
    } else {
      this.subscribeToSaveResponse(this.assetCategoryService.create(assetCategory));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAssetCategory>>): void {
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

  protected updateForm(assetCategory: IAssetCategory): void {
    this.assetCategory = assetCategory;
    this.assetCategoryFormService.resetForm(this.editForm, assetCategory);

    this.depreciationMethodsSharedCollection =
      this.depreciationMethodService.addDepreciationMethodToCollectionIfMissing<IDepreciationMethod>(
        this.depreciationMethodsSharedCollection,
        assetCategory.depreciationMethod
      );
    this.placeholdersSharedCollection = this.placeholderService.addPlaceholderToCollectionIfMissing<IPlaceholder>(
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
          this.depreciationMethodService.addDepreciationMethodToCollectionIfMissing<IDepreciationMethod>(
            depreciationMethods,
            this.assetCategory?.depreciationMethod
          )
        )
      )
      .subscribe((depreciationMethods: IDepreciationMethod[]) => (this.depreciationMethodsSharedCollection = depreciationMethods));

    this.placeholderService
      .query()
      .pipe(map((res: HttpResponse<IPlaceholder[]>) => res.body ?? []))
      .pipe(
        map((placeholders: IPlaceholder[]) =>
          this.placeholderService.addPlaceholderToCollectionIfMissing<IPlaceholder>(
            placeholders,
            ...(this.assetCategory?.placeholders ?? [])
          )
        )
      )
      .subscribe((placeholders: IPlaceholder[]) => (this.placeholdersSharedCollection = placeholders));
  }
}
