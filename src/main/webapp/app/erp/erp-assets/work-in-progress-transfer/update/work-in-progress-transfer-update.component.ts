import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IWorkInProgressTransfer, WorkInProgressTransfer } from '../work-in-progress-transfer.model';
import { WorkInProgressTransferService } from '../service/work-in-progress-transfer.service';
import { IWorkInProgressRegistration } from 'app/erp/erp-assets/work-in-progress-registration/work-in-progress-registration.model';
import { WorkInProgressRegistrationService } from 'app/erp/erp-assets/work-in-progress-registration/service/work-in-progress-registration.service';
import { IPlaceholder } from 'app/entities/erpService/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/erpService/placeholder/service/placeholder.service';

@Component({
  selector: 'jhi-work-in-progress-transfer-update',
  templateUrl: './work-in-progress-transfer-update.component.html',
})
export class WorkInProgressTransferUpdateComponent implements OnInit {
  isSaving = false;

  workInProgressRegistrationsSharedCollection: IWorkInProgressRegistration[] = [];
  placeholdersSharedCollection: IPlaceholder[] = [];

  editForm = this.fb.group({
    id: [],
    description: [],
    targetAssetNumber: [],
    workInProgressRegistrations: [],
    placeholders: [],
  });

  constructor(
    protected workInProgressTransferService: WorkInProgressTransferService,
    protected workInProgressRegistrationService: WorkInProgressRegistrationService,
    protected placeholderService: PlaceholderService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ workInProgressTransfer }) => {
      this.updateForm(workInProgressTransfer);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const workInProgressTransfer = this.createFromForm();
    if (workInProgressTransfer.id !== undefined) {
      this.subscribeToSaveResponse(this.workInProgressTransferService.update(workInProgressTransfer));
    } else {
      this.subscribeToSaveResponse(this.workInProgressTransferService.create(workInProgressTransfer));
    }
  }

  trackWorkInProgressRegistrationById(index: number, item: IWorkInProgressRegistration): number {
    return item.id!;
  }

  trackPlaceholderById(index: number, item: IPlaceholder): number {
    return item.id!;
  }

  getSelectedWorkInProgressRegistration(
    option: IWorkInProgressRegistration,
    selectedVals?: IWorkInProgressRegistration[]
  ): IWorkInProgressRegistration {
    if (selectedVals) {
      for (const selectedVal of selectedVals) {
        if (option.id === selectedVal.id) {
          return selectedVal;
        }
      }
    }
    return option;
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

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IWorkInProgressTransfer>>): void {
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

  protected updateForm(workInProgressTransfer: IWorkInProgressTransfer): void {
    this.editForm.patchValue({
      id: workInProgressTransfer.id,
      description: workInProgressTransfer.description,
      targetAssetNumber: workInProgressTransfer.targetAssetNumber,
      workInProgressRegistrations: workInProgressTransfer.workInProgressRegistrations,
      placeholders: workInProgressTransfer.placeholders,
    });

    this.workInProgressRegistrationsSharedCollection =
      this.workInProgressRegistrationService.addWorkInProgressRegistrationToCollectionIfMissing(
        this.workInProgressRegistrationsSharedCollection,
        ...(workInProgressTransfer.workInProgressRegistrations ?? [])
      );
    this.placeholdersSharedCollection = this.placeholderService.addPlaceholderToCollectionIfMissing(
      this.placeholdersSharedCollection,
      ...(workInProgressTransfer.placeholders ?? [])
    );
  }

  protected loadRelationshipsOptions(): void {
    this.workInProgressRegistrationService
      .query()
      .pipe(map((res: HttpResponse<IWorkInProgressRegistration[]>) => res.body ?? []))
      .pipe(
        map((workInProgressRegistrations: IWorkInProgressRegistration[]) =>
          this.workInProgressRegistrationService.addWorkInProgressRegistrationToCollectionIfMissing(
            workInProgressRegistrations,
            ...(this.editForm.get('workInProgressRegistrations')!.value ?? [])
          )
        )
      )
      .subscribe(
        (workInProgressRegistrations: IWorkInProgressRegistration[]) =>
          (this.workInProgressRegistrationsSharedCollection = workInProgressRegistrations)
      );

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

  protected createFromForm(): IWorkInProgressTransfer {
    return {
      ...new WorkInProgressTransfer(),
      id: this.editForm.get(['id'])!.value,
      description: this.editForm.get(['description'])!.value,
      targetAssetNumber: this.editForm.get(['targetAssetNumber'])!.value,
      workInProgressRegistrations: this.editForm.get(['workInProgressRegistrations'])!.value,
      placeholders: this.editForm.get(['placeholders'])!.value,
    };
  }
}
