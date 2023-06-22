import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { JobSheetFormService, JobSheetFormGroup } from './job-sheet-form.service';
import { IJobSheet } from '../job-sheet.model';
import { JobSheetService } from '../service/job-sheet.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { IDealer } from '../../../erp-pages/dealers/dealer/dealer.model';
import { IPlaceholder } from '../../../erp-pages/placeholder/placeholder.model';
import { IBusinessDocument } from '../../../erp-pages/business-document/business-document.model';
import { IPaymentLabel } from '../../../erp-pages/payment-label/payment-label.model';
import { PaymentLabelService } from '../../../erp-pages/payment-label/service/payment-label.service';
import { DealerService } from '../../../erp-pages/dealers/dealer/service/dealer.service';
import { BusinessDocumentService } from '../../../erp-pages/business-document/service/business-document.service';
import { IBusinessStamp } from '../../business-stamp/business-stamp.model';
import { BusinessStampService } from '../../business-stamp/service/business-stamp.service';
import { PlaceholderService } from '../../../erp-pages/placeholder/service/placeholder.service';

@Component({
  selector: 'jhi-job-sheet-update',
  templateUrl: './job-sheet-update.component.html',
})
export class JobSheetUpdateComponent implements OnInit {
  isSaving = false;
  jobSheet: IJobSheet | null = null;

  dealersSharedCollection: IDealer[] = [];
  businessStampsSharedCollection: IBusinessStamp[] = [];
  placeholdersSharedCollection: IPlaceholder[] = [];
  paymentLabelsSharedCollection: IPaymentLabel[] = [];
  businessDocumentsSharedCollection: IBusinessDocument[] = [];

  editForm: JobSheetFormGroup = this.jobSheetFormService.createJobSheetFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected jobSheetService: JobSheetService,
    protected jobSheetFormService: JobSheetFormService,
    protected dealerService: DealerService,
    protected businessStampService: BusinessStampService,
    protected placeholderService: PlaceholderService,
    protected paymentLabelService: PaymentLabelService,
    protected businessDocumentService: BusinessDocumentService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareDealer = (o1: IDealer | null, o2: IDealer | null): boolean => this.dealerService.compareDealer(o1, o2);

  compareBusinessStamp = (o1: IBusinessStamp | null, o2: IBusinessStamp | null): boolean =>
    this.businessStampService.compareBusinessStamp(o1, o2);

  comparePlaceholder = (o1: IPlaceholder | null, o2: IPlaceholder | null): boolean => this.placeholderService.comparePlaceholder(o1, o2);

  comparePaymentLabel = (o1: IPaymentLabel | null, o2: IPaymentLabel | null): boolean =>
    this.paymentLabelService.comparePaymentLabel(o1, o2);

  compareBusinessDocument = (o1: IBusinessDocument | null, o2: IBusinessDocument | null): boolean =>
    this.businessDocumentService.compareBusinessDocument(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ jobSheet }) => {
      this.jobSheet = jobSheet;
      if (jobSheet) {
        this.updateForm(jobSheet);
      }

      this.loadRelationshipsOptions();
    });
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  updateBiller(update: IDealer): void {
    this.editForm.patchValue({
      biller: update,
    });
  }
  // eslint-disable-next-line @typescript-eslint/member-ordering
  updateContactPerson(update: IDealer): void {
    this.editForm.patchValue({
      contactPerson: update,
    });
  }

  updateSignatories(dealerUpdate: IDealer[]): void {
    this.editForm.patchValue({
      signatories: [...dealerUpdate]
    });
  }

  updateBusinessStamps(update: IBusinessStamp[]): void {
    this.editForm.patchValue({
      businessStamps: [...update]
    });
  }

  updatePaymentLabels(update: IPaymentLabel[]): void {
    this.editForm.patchValue({
      paymentLabels: [...update]
    });
  }

  updatePlaceholders(update: IPlaceholder[]): void {
    this.editForm.patchValue({
      placeholders: [...update]
    });
  }

  updateBusinessDocuments(update: IBusinessDocument[]): void {
    this.editForm.patchValue({
      businessDocuments: [...update]
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe({
      error: (err: FileLoadError) =>
        this.eventManager.broadcast(new EventWithContent<AlertError>('erpSystemApp.error', { message: err.message })),
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const jobSheet = this.jobSheetFormService.getJobSheet(this.editForm);
    if (jobSheet.id !== null) {
      this.subscribeToSaveResponse(this.jobSheetService.update(jobSheet));
    } else {
      this.subscribeToSaveResponse(this.jobSheetService.create(jobSheet));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IJobSheet>>): void {
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

  protected updateForm(jobSheet: IJobSheet): void {
    this.jobSheet = jobSheet;
    this.jobSheetFormService.resetForm(this.editForm, jobSheet);

    this.dealersSharedCollection = this.dealerService.addDealerToCollectionIfMissing<IDealer>(
      this.dealersSharedCollection,
      jobSheet.biller,
      ...(jobSheet.signatories ?? []),
      jobSheet.contactPerson
    );
    this.businessStampsSharedCollection = this.businessStampService.addBusinessStampToCollectionIfMissing<IBusinessStamp>(
      this.businessStampsSharedCollection,
      ...(jobSheet.businessStamps ?? [])
    );
    this.placeholdersSharedCollection = this.placeholderService.addPlaceholderToCollectionIfMissing<IPlaceholder>(
      this.placeholdersSharedCollection,
      ...(jobSheet.placeholders ?? [])
    );
    this.paymentLabelsSharedCollection = this.paymentLabelService.addPaymentLabelToCollectionIfMissing<IPaymentLabel>(
      this.paymentLabelsSharedCollection,
      ...(jobSheet.paymentLabels ?? [])
    );
    this.businessDocumentsSharedCollection = this.businessDocumentService.addBusinessDocumentToCollectionIfMissing<IBusinessDocument>(
      this.businessDocumentsSharedCollection,
      ...(jobSheet.businessDocuments ?? [])
    );
  }

  protected loadRelationshipsOptions(): void {
    this.dealerService
      .query()
      .pipe(map((res: HttpResponse<IDealer[]>) => res.body ?? []))
      .pipe(
        map((dealers: IDealer[]) =>
          this.dealerService.addDealerToCollectionIfMissing<IDealer>(
            dealers,
            this.jobSheet?.biller,
            ...(this.jobSheet?.signatories ?? []),
            this.jobSheet?.contactPerson
          )
        )
      )
      .subscribe((dealers: IDealer[]) => (this.dealersSharedCollection = dealers));

    this.businessStampService
      .query()
      .pipe(map((res: HttpResponse<IBusinessStamp[]>) => res.body ?? []))
      .pipe(
        map((businessStamps: IBusinessStamp[]) =>
          this.businessStampService.addBusinessStampToCollectionIfMissing<IBusinessStamp>(
            businessStamps,
            ...(this.jobSheet?.businessStamps ?? [])
          )
        )
      )
      .subscribe((businessStamps: IBusinessStamp[]) => (this.businessStampsSharedCollection = businessStamps));

    this.placeholderService
      .query()
      .pipe(map((res: HttpResponse<IPlaceholder[]>) => res.body ?? []))
      .pipe(
        map((placeholders: IPlaceholder[]) =>
          this.placeholderService.addPlaceholderToCollectionIfMissing<IPlaceholder>(placeholders, ...(this.jobSheet?.placeholders ?? []))
        )
      )
      .subscribe((placeholders: IPlaceholder[]) => (this.placeholdersSharedCollection = placeholders));

    this.paymentLabelService
      .query()
      .pipe(map((res: HttpResponse<IPaymentLabel[]>) => res.body ?? []))
      .pipe(
        map((paymentLabels: IPaymentLabel[]) =>
          this.paymentLabelService.addPaymentLabelToCollectionIfMissing<IPaymentLabel>(
            paymentLabels,
            ...(this.jobSheet?.paymentLabels ?? [])
          )
        )
      )
      .subscribe((paymentLabels: IPaymentLabel[]) => (this.paymentLabelsSharedCollection = paymentLabels));

    this.businessDocumentService
      .query()
      .pipe(map((res: HttpResponse<IBusinessDocument[]>) => res.body ?? []))
      .pipe(
        map((businessDocuments: IBusinessDocument[]) =>
          this.businessDocumentService.addBusinessDocumentToCollectionIfMissing<IBusinessDocument>(
            businessDocuments,
            ...(this.jobSheet?.businessDocuments ?? [])
          )
        )
      )
      .subscribe((businessDocuments: IBusinessDocument[]) => (this.businessDocumentsSharedCollection = businessDocuments));
  }
}
