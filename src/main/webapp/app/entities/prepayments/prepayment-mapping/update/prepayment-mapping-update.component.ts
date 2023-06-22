import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { PrepaymentMappingFormService, PrepaymentMappingFormGroup } from './prepayment-mapping-form.service';
import { IPrepaymentMapping } from '../prepayment-mapping.model';
import { PrepaymentMappingService } from '../service/prepayment-mapping.service';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/system/placeholder/service/placeholder.service';

@Component({
  selector: 'jhi-prepayment-mapping-update',
  templateUrl: './prepayment-mapping-update.component.html',
})
export class PrepaymentMappingUpdateComponent implements OnInit {
  isSaving = false;
  prepaymentMapping: IPrepaymentMapping | null = null;

  placeholdersSharedCollection: IPlaceholder[] = [];

  editForm: PrepaymentMappingFormGroup = this.prepaymentMappingFormService.createPrepaymentMappingFormGroup();

  constructor(
    protected prepaymentMappingService: PrepaymentMappingService,
    protected prepaymentMappingFormService: PrepaymentMappingFormService,
    protected placeholderService: PlaceholderService,
    protected activatedRoute: ActivatedRoute
  ) {}

  comparePlaceholder = (o1: IPlaceholder | null, o2: IPlaceholder | null): boolean => this.placeholderService.comparePlaceholder(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ prepaymentMapping }) => {
      this.prepaymentMapping = prepaymentMapping;
      if (prepaymentMapping) {
        this.updateForm(prepaymentMapping);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const prepaymentMapping = this.prepaymentMappingFormService.getPrepaymentMapping(this.editForm);
    if (prepaymentMapping.id !== null) {
      this.subscribeToSaveResponse(this.prepaymentMappingService.update(prepaymentMapping));
    } else {
      this.subscribeToSaveResponse(this.prepaymentMappingService.create(prepaymentMapping));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPrepaymentMapping>>): void {
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

  protected updateForm(prepaymentMapping: IPrepaymentMapping): void {
    this.prepaymentMapping = prepaymentMapping;
    this.prepaymentMappingFormService.resetForm(this.editForm, prepaymentMapping);

    this.placeholdersSharedCollection = this.placeholderService.addPlaceholderToCollectionIfMissing<IPlaceholder>(
      this.placeholdersSharedCollection,
      ...(prepaymentMapping.placeholders ?? [])
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
            ...(this.prepaymentMapping?.placeholders ?? [])
          )
        )
      )
      .subscribe((placeholders: IPlaceholder[]) => (this.placeholdersSharedCollection = placeholders));
  }
}
