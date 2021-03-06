import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IJobSheet, JobSheet } from '../job-sheet.model';
import { JobSheetService } from '../service/job-sheet.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { IDealer } from 'app/entities/dealers/dealer/dealer.model';
import { DealerService } from 'app/entities/dealers/dealer/service/dealer.service';
import { IBusinessStamp } from 'app/entities/business-stamp/business-stamp.model';
import { BusinessStampService } from 'app/entities/business-stamp/service/business-stamp.service';
import { IPlaceholder } from 'app/entities/erpService/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/erpService/placeholder/service/placeholder.service';
import { IPaymentLabel } from 'app/entities/payment-label/payment-label.model';
import { PaymentLabelService } from 'app/entities/payment-label/service/payment-label.service';

@Component({
  selector: 'jhi-job-sheet-update',
  templateUrl: './job-sheet-update.component.html',
})
export class JobSheetUpdateComponent implements OnInit {
  isSaving = false;

  dealersSharedCollection: IDealer[] = [];
  businessStampsSharedCollection: IBusinessStamp[] = [];
  placeholdersSharedCollection: IPlaceholder[] = [];
  paymentLabelsSharedCollection: IPaymentLabel[] = [];

  editForm = this.fb.group({
    id: [],
    serialNumber: [null, [Validators.required]],
    jobSheetDate: [],
    details: [],
    remarks: [],
    biller: [null, Validators.required],
    signatories: [],
    contactPerson: [],
    businessStamps: [],
    placeholders: [],
    paymentLabels: [],
  });

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected jobSheetService: JobSheetService,
    protected dealerService: DealerService,
    protected businessStampService: BusinessStampService,
    protected placeholderService: PlaceholderService,
    protected paymentLabelService: PaymentLabelService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ jobSheet }) => {
      this.updateForm(jobSheet);

      this.loadRelationshipsOptions();
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
    const jobSheet = this.createFromForm();
    if (jobSheet.id !== undefined) {
      this.subscribeToSaveResponse(this.jobSheetService.update(jobSheet));
    } else {
      this.subscribeToSaveResponse(this.jobSheetService.create(jobSheet));
    }
  }

  trackDealerById(index: number, item: IDealer): number {
    return item.id!;
  }

  trackBusinessStampById(index: number, item: IBusinessStamp): number {
    return item.id!;
  }

  trackPlaceholderById(index: number, item: IPlaceholder): number {
    return item.id!;
  }

  trackPaymentLabelById(index: number, item: IPaymentLabel): number {
    return item.id!;
  }

  getSelectedDealer(option: IDealer, selectedVals?: IDealer[]): IDealer {
    if (selectedVals) {
      for (const selectedVal of selectedVals) {
        if (option.id === selectedVal.id) {
          return selectedVal;
        }
      }
    }
    return option;
  }

  getSelectedBusinessStamp(option: IBusinessStamp, selectedVals?: IBusinessStamp[]): IBusinessStamp {
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

  getSelectedPaymentLabel(option: IPaymentLabel, selectedVals?: IPaymentLabel[]): IPaymentLabel {
    if (selectedVals) {
      for (const selectedVal of selectedVals) {
        if (option.id === selectedVal.id) {
          return selectedVal;
        }
      }
    }
    return option;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IJobSheet>>): void {
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

  protected updateForm(jobSheet: IJobSheet): void {
    this.editForm.patchValue({
      id: jobSheet.id,
      serialNumber: jobSheet.serialNumber,
      jobSheetDate: jobSheet.jobSheetDate,
      details: jobSheet.details,
      remarks: jobSheet.remarks,
      biller: jobSheet.biller,
      signatories: jobSheet.signatories,
      contactPerson: jobSheet.contactPerson,
      businessStamps: jobSheet.businessStamps,
      placeholders: jobSheet.placeholders,
      paymentLabels: jobSheet.paymentLabels,
    });

    this.dealersSharedCollection = this.dealerService.addDealerToCollectionIfMissing(
      this.dealersSharedCollection,
      jobSheet.biller,
      ...(jobSheet.signatories ?? []),
      jobSheet.contactPerson
    );
    this.businessStampsSharedCollection = this.businessStampService.addBusinessStampToCollectionIfMissing(
      this.businessStampsSharedCollection,
      ...(jobSheet.businessStamps ?? [])
    );
    this.placeholdersSharedCollection = this.placeholderService.addPlaceholderToCollectionIfMissing(
      this.placeholdersSharedCollection,
      ...(jobSheet.placeholders ?? [])
    );
    this.paymentLabelsSharedCollection = this.paymentLabelService.addPaymentLabelToCollectionIfMissing(
      this.paymentLabelsSharedCollection,
      ...(jobSheet.paymentLabels ?? [])
    );
  }

  protected loadRelationshipsOptions(): void {
    this.dealerService
      .query()
      .pipe(map((res: HttpResponse<IDealer[]>) => res.body ?? []))
      .pipe(
        map((dealers: IDealer[]) =>
          this.dealerService.addDealerToCollectionIfMissing(
            dealers,
            this.editForm.get('biller')!.value,
            ...(this.editForm.get('signatories')!.value ?? []),
            this.editForm.get('contactPerson')!.value
          )
        )
      )
      .subscribe((dealers: IDealer[]) => (this.dealersSharedCollection = dealers));

    this.businessStampService
      .query()
      .pipe(map((res: HttpResponse<IBusinessStamp[]>) => res.body ?? []))
      .pipe(
        map((businessStamps: IBusinessStamp[]) =>
          this.businessStampService.addBusinessStampToCollectionIfMissing(
            businessStamps,
            ...(this.editForm.get('businessStamps')!.value ?? [])
          )
        )
      )
      .subscribe((businessStamps: IBusinessStamp[]) => (this.businessStampsSharedCollection = businessStamps));

    this.placeholderService
      .query()
      .pipe(map((res: HttpResponse<IPlaceholder[]>) => res.body ?? []))
      .pipe(
        map((placeholders: IPlaceholder[]) =>
          this.placeholderService.addPlaceholderToCollectionIfMissing(placeholders, ...(this.editForm.get('placeholders')!.value ?? []))
        )
      )
      .subscribe((placeholders: IPlaceholder[]) => (this.placeholdersSharedCollection = placeholders));

    this.paymentLabelService
      .query()
      .pipe(map((res: HttpResponse<IPaymentLabel[]>) => res.body ?? []))
      .pipe(
        map((paymentLabels: IPaymentLabel[]) =>
          this.paymentLabelService.addPaymentLabelToCollectionIfMissing(paymentLabels, ...(this.editForm.get('paymentLabels')!.value ?? []))
        )
      )
      .subscribe((paymentLabels: IPaymentLabel[]) => (this.paymentLabelsSharedCollection = paymentLabels));
  }

  protected createFromForm(): IJobSheet {
    return {
      ...new JobSheet(),
      id: this.editForm.get(['id'])!.value,
      serialNumber: this.editForm.get(['serialNumber'])!.value,
      jobSheetDate: this.editForm.get(['jobSheetDate'])!.value,
      details: this.editForm.get(['details'])!.value,
      remarks: this.editForm.get(['remarks'])!.value,
      biller: this.editForm.get(['biller'])!.value,
      signatories: this.editForm.get(['signatories'])!.value,
      contactPerson: this.editForm.get(['contactPerson'])!.value,
      businessStamps: this.editForm.get(['businessStamps'])!.value,
      placeholders: this.editForm.get(['placeholders'])!.value,
      paymentLabels: this.editForm.get(['paymentLabels'])!.value,
    };
  }
}
