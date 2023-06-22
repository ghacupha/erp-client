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
