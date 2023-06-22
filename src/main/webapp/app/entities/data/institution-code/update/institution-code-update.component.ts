import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { InstitutionCodeFormService, InstitutionCodeFormGroup } from './institution-code-form.service';
import { IInstitutionCode } from '../institution-code.model';
import { InstitutionCodeService } from '../service/institution-code.service';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/system/placeholder/service/placeholder.service';

@Component({
  selector: 'jhi-institution-code-update',
  templateUrl: './institution-code-update.component.html',
})
export class InstitutionCodeUpdateComponent implements OnInit {
  isSaving = false;
  institutionCode: IInstitutionCode | null = null;

  placeholdersSharedCollection: IPlaceholder[] = [];

  editForm: InstitutionCodeFormGroup = this.institutionCodeFormService.createInstitutionCodeFormGroup();

  constructor(
    protected institutionCodeService: InstitutionCodeService,
    protected institutionCodeFormService: InstitutionCodeFormService,
    protected placeholderService: PlaceholderService,
    protected activatedRoute: ActivatedRoute
  ) {}

  comparePlaceholder = (o1: IPlaceholder | null, o2: IPlaceholder | null): boolean => this.placeholderService.comparePlaceholder(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ institutionCode }) => {
      this.institutionCode = institutionCode;
      if (institutionCode) {
        this.updateForm(institutionCode);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const institutionCode = this.institutionCodeFormService.getInstitutionCode(this.editForm);
    if (institutionCode.id !== null) {
      this.subscribeToSaveResponse(this.institutionCodeService.update(institutionCode));
    } else {
      this.subscribeToSaveResponse(this.institutionCodeService.create(institutionCode));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IInstitutionCode>>): void {
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

  protected updateForm(institutionCode: IInstitutionCode): void {
    this.institutionCode = institutionCode;
    this.institutionCodeFormService.resetForm(this.editForm, institutionCode);

    this.placeholdersSharedCollection = this.placeholderService.addPlaceholderToCollectionIfMissing<IPlaceholder>(
      this.placeholdersSharedCollection,
      ...(institutionCode.placeholders ?? [])
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
            ...(this.institutionCode?.placeholders ?? [])
          )
        )
      )
      .subscribe((placeholders: IPlaceholder[]) => (this.placeholdersSharedCollection = placeholders));
  }
}
