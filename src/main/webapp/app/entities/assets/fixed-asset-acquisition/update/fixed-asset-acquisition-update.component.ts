import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { FixedAssetAcquisitionFormService, FixedAssetAcquisitionFormGroup } from './fixed-asset-acquisition-form.service';
import { IFixedAssetAcquisition } from '../fixed-asset-acquisition.model';
import { FixedAssetAcquisitionService } from '../service/fixed-asset-acquisition.service';
import { IPlaceholder } from 'app/entities/erpService/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/erpService/placeholder/service/placeholder.service';

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
