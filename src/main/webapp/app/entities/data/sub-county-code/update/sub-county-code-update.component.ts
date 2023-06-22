import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { SubCountyCodeFormService, SubCountyCodeFormGroup } from './sub-county-code-form.service';
import { ISubCountyCode } from '../sub-county-code.model';
import { SubCountyCodeService } from '../service/sub-county-code.service';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/system/placeholder/service/placeholder.service';

@Component({
  selector: 'jhi-sub-county-code-update',
  templateUrl: './sub-county-code-update.component.html',
})
export class SubCountyCodeUpdateComponent implements OnInit {
  isSaving = false;
  subCountyCode: ISubCountyCode | null = null;

  placeholdersSharedCollection: IPlaceholder[] = [];

  editForm: SubCountyCodeFormGroup = this.subCountyCodeFormService.createSubCountyCodeFormGroup();

  constructor(
    protected subCountyCodeService: SubCountyCodeService,
    protected subCountyCodeFormService: SubCountyCodeFormService,
    protected placeholderService: PlaceholderService,
    protected activatedRoute: ActivatedRoute
  ) {}

  comparePlaceholder = (o1: IPlaceholder | null, o2: IPlaceholder | null): boolean => this.placeholderService.comparePlaceholder(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ subCountyCode }) => {
      this.subCountyCode = subCountyCode;
      if (subCountyCode) {
        this.updateForm(subCountyCode);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const subCountyCode = this.subCountyCodeFormService.getSubCountyCode(this.editForm);
    if (subCountyCode.id !== null) {
      this.subscribeToSaveResponse(this.subCountyCodeService.update(subCountyCode));
    } else {
      this.subscribeToSaveResponse(this.subCountyCodeService.create(subCountyCode));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISubCountyCode>>): void {
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

  protected updateForm(subCountyCode: ISubCountyCode): void {
    this.subCountyCode = subCountyCode;
    this.subCountyCodeFormService.resetForm(this.editForm, subCountyCode);

    this.placeholdersSharedCollection = this.placeholderService.addPlaceholderToCollectionIfMissing<IPlaceholder>(
      this.placeholdersSharedCollection,
      ...(subCountyCode.placeholders ?? [])
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
            ...(this.subCountyCode?.placeholders ?? [])
          )
        )
      )
      .subscribe((placeholders: IPlaceholder[]) => (this.placeholdersSharedCollection = placeholders));
  }
}
