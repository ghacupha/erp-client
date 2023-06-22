import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { MfbBranchCodeFormService, MfbBranchCodeFormGroup } from './mfb-branch-code-form.service';
import { IMfbBranchCode } from '../mfb-branch-code.model';
import { MfbBranchCodeService } from '../service/mfb-branch-code.service';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/system/placeholder/service/placeholder.service';

@Component({
  selector: 'jhi-mfb-branch-code-update',
  templateUrl: './mfb-branch-code-update.component.html',
})
export class MfbBranchCodeUpdateComponent implements OnInit {
  isSaving = false;
  mfbBranchCode: IMfbBranchCode | null = null;

  placeholdersSharedCollection: IPlaceholder[] = [];

  editForm: MfbBranchCodeFormGroup = this.mfbBranchCodeFormService.createMfbBranchCodeFormGroup();

  constructor(
    protected mfbBranchCodeService: MfbBranchCodeService,
    protected mfbBranchCodeFormService: MfbBranchCodeFormService,
    protected placeholderService: PlaceholderService,
    protected activatedRoute: ActivatedRoute
  ) {}

  comparePlaceholder = (o1: IPlaceholder | null, o2: IPlaceholder | null): boolean => this.placeholderService.comparePlaceholder(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ mfbBranchCode }) => {
      this.mfbBranchCode = mfbBranchCode;
      if (mfbBranchCode) {
        this.updateForm(mfbBranchCode);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const mfbBranchCode = this.mfbBranchCodeFormService.getMfbBranchCode(this.editForm);
    if (mfbBranchCode.id !== null) {
      this.subscribeToSaveResponse(this.mfbBranchCodeService.update(mfbBranchCode));
    } else {
      this.subscribeToSaveResponse(this.mfbBranchCodeService.create(mfbBranchCode));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMfbBranchCode>>): void {
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

  protected updateForm(mfbBranchCode: IMfbBranchCode): void {
    this.mfbBranchCode = mfbBranchCode;
    this.mfbBranchCodeFormService.resetForm(this.editForm, mfbBranchCode);

    this.placeholdersSharedCollection = this.placeholderService.addPlaceholderToCollectionIfMissing<IPlaceholder>(
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
          this.placeholderService.addPlaceholderToCollectionIfMissing<IPlaceholder>(
            placeholders,
            ...(this.mfbBranchCode?.placeholders ?? [])
          )
        )
      )
      .subscribe((placeholders: IPlaceholder[]) => (this.placeholdersSharedCollection = placeholders));
  }
}
