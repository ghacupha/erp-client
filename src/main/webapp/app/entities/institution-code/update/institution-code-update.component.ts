import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IInstitutionCode, InstitutionCode } from '../institution-code.model';
import { InstitutionCodeService } from '../service/institution-code.service';
import { IPlaceholder } from 'app/entities/erpService/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/erpService/placeholder/service/placeholder.service';

@Component({
  selector: 'jhi-institution-code-update',
  templateUrl: './institution-code-update.component.html',
})
export class InstitutionCodeUpdateComponent implements OnInit {
  isSaving = false;

  placeholdersSharedCollection: IPlaceholder[] = [];

  editForm = this.fb.group({
    id: [],
    institutionCode: [null, [Validators.required]],
    institutionName: [null, [Validators.required]],
    shortName: [],
    category: [],
    institutionCategory: [],
    placeholders: [],
  });

  constructor(
    protected institutionCodeService: InstitutionCodeService,
    protected placeholderService: PlaceholderService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ institutionCode }) => {
      this.updateForm(institutionCode);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const institutionCode = this.createFromForm();
    if (institutionCode.id !== undefined) {
      this.subscribeToSaveResponse(this.institutionCodeService.update(institutionCode));
    } else {
      this.subscribeToSaveResponse(this.institutionCodeService.create(institutionCode));
    }
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

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IInstitutionCode>>): void {
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

  protected updateForm(institutionCode: IInstitutionCode): void {
    this.editForm.patchValue({
      id: institutionCode.id,
      institutionCode: institutionCode.institutionCode,
      institutionName: institutionCode.institutionName,
      shortName: institutionCode.shortName,
      category: institutionCode.category,
      institutionCategory: institutionCode.institutionCategory,
      placeholders: institutionCode.placeholders,
    });

    this.placeholdersSharedCollection = this.placeholderService.addPlaceholderToCollectionIfMissing(
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
          this.placeholderService.addPlaceholderToCollectionIfMissing(placeholders, ...(this.editForm.get('placeholders')!.value ?? []))
        )
      )
      .subscribe((placeholders: IPlaceholder[]) => (this.placeholdersSharedCollection = placeholders));
  }

  protected createFromForm(): IInstitutionCode {
    return {
      ...new InstitutionCode(),
      id: this.editForm.get(['id'])!.value,
      institutionCode: this.editForm.get(['institutionCode'])!.value,
      institutionName: this.editForm.get(['institutionName'])!.value,
      shortName: this.editForm.get(['shortName'])!.value,
      category: this.editForm.get(['category'])!.value,
      institutionCategory: this.editForm.get(['institutionCategory'])!.value,
      placeholders: this.editForm.get(['placeholders'])!.value,
    };
  }
}
