import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IMfbBranchCode, MfbBranchCode } from '../mfb-branch-code.model';
import { MfbBranchCodeService } from '../service/mfb-branch-code.service';
import { IPlaceholder } from '../../../erp-common/models/placeholder.model';
import { PlaceholderService } from '../../../erp-common/services/placeholder.service';

@Component({
  selector: 'jhi-mfb-branch-code-update',
  templateUrl: './mfb-branch-code-update.component.html',
})
export class MfbBranchCodeUpdateComponent implements OnInit {
  isSaving = false;

  placeholdersSharedCollection: IPlaceholder[] = [];

  editForm = this.fb.group({
    id: [],
    bankCode: [],
    bankName: [],
    branchCode: [],
    branchName: [],
    placeholders: [],
  });

  constructor(
    protected mfbBranchCodeService: MfbBranchCodeService,
    protected placeholderService: PlaceholderService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ mfbBranchCode }) => {
      this.updateForm(mfbBranchCode);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const mfbBranchCode = this.createFromForm();
    if (mfbBranchCode.id !== undefined) {
      this.subscribeToSaveResponse(this.mfbBranchCodeService.update(mfbBranchCode));
    } else {
      this.subscribeToSaveResponse(this.mfbBranchCodeService.create(mfbBranchCode));
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

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMfbBranchCode>>): void {
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

  protected updateForm(mfbBranchCode: IMfbBranchCode): void {
    this.editForm.patchValue({
      id: mfbBranchCode.id,
      bankCode: mfbBranchCode.bankCode,
      bankName: mfbBranchCode.bankName,
      branchCode: mfbBranchCode.branchCode,
      branchName: mfbBranchCode.branchName,
      placeholders: mfbBranchCode.placeholders,
    });

    this.placeholdersSharedCollection = this.placeholderService.addPlaceholderToCollectionIfMissing(
      this.placeholdersSharedCollection,
      ...(mfbBranchCode.placeholders ?? [])
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

  protected createFromForm(): IMfbBranchCode {
    return {
      ...new MfbBranchCode(),
      id: this.editForm.get(['id'])!.value,
      bankCode: this.editForm.get(['bankCode'])!.value,
      bankName: this.editForm.get(['bankName'])!.value,
      branchCode: this.editForm.get(['branchCode'])!.value,
      branchName: this.editForm.get(['branchName'])!.value,
      placeholders: this.editForm.get(['placeholders'])!.value,
    };
  }
}
