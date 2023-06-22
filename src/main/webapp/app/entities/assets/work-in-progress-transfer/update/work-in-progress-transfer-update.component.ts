import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { WorkInProgressTransferFormService, WorkInProgressTransferFormGroup } from './work-in-progress-transfer-form.service';
import { IWorkInProgressTransfer } from '../work-in-progress-transfer.model';
import { WorkInProgressTransferService } from '../service/work-in-progress-transfer.service';
import { IWorkInProgressRegistration } from 'app/entities/assets/work-in-progress-registration/work-in-progress-registration.model';
import { WorkInProgressRegistrationService } from 'app/entities/assets/work-in-progress-registration/service/work-in-progress-registration.service';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/system/placeholder/service/placeholder.service';
import { IBusinessDocument } from 'app/entities/documentation/business-document/business-document.model';
import { BusinessDocumentService } from 'app/entities/documentation/business-document/service/business-document.service';

@Component({
  selector: 'jhi-work-in-progress-transfer-update',
  templateUrl: './work-in-progress-transfer-update.component.html',
})
export class WorkInProgressTransferUpdateComponent implements OnInit {
  isSaving = false;
  workInProgressTransfer: IWorkInProgressTransfer | null = null;

  workInProgressRegistrationsSharedCollection: IWorkInProgressRegistration[] = [];
  placeholdersSharedCollection: IPlaceholder[] = [];
  businessDocumentsSharedCollection: IBusinessDocument[] = [];

  editForm: WorkInProgressTransferFormGroup = this.workInProgressTransferFormService.createWorkInProgressTransferFormGroup();

  constructor(
    protected workInProgressTransferService: WorkInProgressTransferService,
    protected workInProgressTransferFormService: WorkInProgressTransferFormService,
    protected workInProgressRegistrationService: WorkInProgressRegistrationService,
    protected placeholderService: PlaceholderService,
    protected businessDocumentService: BusinessDocumentService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareWorkInProgressRegistration = (o1: IWorkInProgressRegistration | null, o2: IWorkInProgressRegistration | null): boolean =>
    this.workInProgressRegistrationService.compareWorkInProgressRegistration(o1, o2);

  comparePlaceholder = (o1: IPlaceholder | null, o2: IPlaceholder | null): boolean => this.placeholderService.comparePlaceholder(o1, o2);

  compareBusinessDocument = (o1: IBusinessDocument | null, o2: IBusinessDocument | null): boolean =>
    this.businessDocumentService.compareBusinessDocument(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ workInProgressTransfer }) => {
      this.workInProgressTransfer = workInProgressTransfer;
      if (workInProgressTransfer) {
        this.updateForm(workInProgressTransfer);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const workInProgressTransfer = this.workInProgressTransferFormService.getWorkInProgressTransfer(this.editForm);
    if (workInProgressTransfer.id !== null) {
      this.subscribeToSaveResponse(this.workInProgressTransferService.update(workInProgressTransfer));
    } else {
      this.subscribeToSaveResponse(this.workInProgressTransferService.create(workInProgressTransfer));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IWorkInProgressTransfer>>): void {
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

  protected updateForm(workInProgressTransfer: IWorkInProgressTransfer): void {
    this.workInProgressTransfer = workInProgressTransfer;
    this.workInProgressTransferFormService.resetForm(this.editForm, workInProgressTransfer);

    this.workInProgressRegistrationsSharedCollection =
      this.workInProgressRegistrationService.addWorkInProgressRegistrationToCollectionIfMissing<IWorkInProgressRegistration>(
        this.workInProgressRegistrationsSharedCollection,
        ...(workInProgressTransfer.workInProgressRegistrations ?? [])
      );
    this.placeholdersSharedCollection = this.placeholderService.addPlaceholderToCollectionIfMissing<IPlaceholder>(
      this.placeholdersSharedCollection,
      ...(workInProgressTransfer.placeholders ?? [])
    );
    this.businessDocumentsSharedCollection = this.businessDocumentService.addBusinessDocumentToCollectionIfMissing<IBusinessDocument>(
      this.businessDocumentsSharedCollection,
      ...(workInProgressTransfer.businessDocuments ?? [])
    );
  }

  protected loadRelationshipsOptions(): void {
    this.workInProgressRegistrationService
      .query()
      .pipe(map((res: HttpResponse<IWorkInProgressRegistration[]>) => res.body ?? []))
      .pipe(
        map((workInProgressRegistrations: IWorkInProgressRegistration[]) =>
          this.workInProgressRegistrationService.addWorkInProgressRegistrationToCollectionIfMissing<IWorkInProgressRegistration>(
            workInProgressRegistrations,
            ...(this.workInProgressTransfer?.workInProgressRegistrations ?? [])
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
          this.placeholderService.addPlaceholderToCollectionIfMissing<IPlaceholder>(
            placeholders,
            ...(this.workInProgressTransfer?.placeholders ?? [])
          )
        )
      )
      .subscribe((placeholders: IPlaceholder[]) => (this.placeholdersSharedCollection = placeholders));

    this.businessDocumentService
      .query()
      .pipe(map((res: HttpResponse<IBusinessDocument[]>) => res.body ?? []))
      .pipe(
        map((businessDocuments: IBusinessDocument[]) =>
          this.businessDocumentService.addBusinessDocumentToCollectionIfMissing<IBusinessDocument>(
            businessDocuments,
            ...(this.workInProgressTransfer?.businessDocuments ?? [])
          )
        )
      )
      .subscribe((businessDocuments: IBusinessDocument[]) => (this.businessDocumentsSharedCollection = businessDocuments));
  }
}
