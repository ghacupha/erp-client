import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IPaymentRequisition, PaymentRequisition } from '../payment-requisition.model';
import { PaymentRequisitionService } from '../service/payment-requisition.service';
import { IPaymentLabel } from 'app/entities/payment-label/payment-label.model';
import { PaymentLabelService } from 'app/entities/payment-label/service/payment-label.service';
import { IPlaceholder } from 'app/erp/erp-common/models/placeholder.model';
import { PlaceholderService } from 'app/erp/erp-common/services/placeholder.service';

@Component({
  selector: 'jhi-payment-requisition-update',
  templateUrl: './payment-requisition-update.component.html',
})
export class PaymentRequisitionUpdateComponent implements OnInit {
  isSaving = false;

  paymentLabelsSharedCollection: IPaymentLabel[] = [];
  placeholdersSharedCollection: IPlaceholder[] = [];

  editForm = this.fb.group({
    id: [],
    receptionDate: [],
    dealerName: [],
    briefDescription: [],
    requisitionNumber: [],
    invoicedAmount: [],
    disbursementCost: [],
    taxableAmount: [],
    requisitionProcessed: [],
    fileUploadToken: [],
    compilationToken: [],
    paymentLabels: [],
    placeholders: [],
  });

  constructor(
    protected paymentRequisitionService: PaymentRequisitionService,
    protected paymentLabelService: PaymentLabelService,
    protected placeholderService: PlaceholderService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ paymentRequisition }) => {
      this.updateForm(paymentRequisition);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const paymentRequisition = this.createFromForm();
    if (paymentRequisition.id !== undefined) {
      this.subscribeToSaveResponse(this.paymentRequisitionService.update(paymentRequisition));
    } else {
      this.subscribeToSaveResponse(this.paymentRequisitionService.create(paymentRequisition));
    }
  }

  trackPaymentLabelById(index: number, item: IPaymentLabel): number {
    return item.id!;
  }

  trackPlaceholderById(index: number, item: IPlaceholder): number {
    return item.id!;
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

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPaymentRequisition>>): void {
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

  protected updateForm(paymentRequisition: IPaymentRequisition): void {
    this.editForm.patchValue({
      id: paymentRequisition.id,
      receptionDate: paymentRequisition.receptionDate,
      dealerName: paymentRequisition.dealerName,
      briefDescription: paymentRequisition.briefDescription,
      requisitionNumber: paymentRequisition.requisitionNumber,
      invoicedAmount: paymentRequisition.invoicedAmount,
      disbursementCost: paymentRequisition.disbursementCost,
      taxableAmount: paymentRequisition.taxableAmount,
      requisitionProcessed: paymentRequisition.requisitionProcessed,
      fileUploadToken: paymentRequisition.fileUploadToken,
      compilationToken: paymentRequisition.compilationToken,
      paymentLabels: paymentRequisition.paymentLabels,
      placeholders: paymentRequisition.placeholders,
    });

    this.paymentLabelsSharedCollection = this.paymentLabelService.addPaymentLabelToCollectionIfMissing(
      this.paymentLabelsSharedCollection,
      ...(paymentRequisition.paymentLabels ?? [])
    );
    this.placeholdersSharedCollection = this.placeholderService.addPlaceholderToCollectionIfMissing(
      this.placeholdersSharedCollection,
      ...(paymentRequisition.placeholders ?? [])
    );
  }

  protected loadRelationshipsOptions(): void {
    this.paymentLabelService
      .query()
      .pipe(map((res: HttpResponse<IPaymentLabel[]>) => res.body ?? []))
      .pipe(
        map((paymentLabels: IPaymentLabel[]) =>
          this.paymentLabelService.addPaymentLabelToCollectionIfMissing(paymentLabels, ...(this.editForm.get('paymentLabels')!.value ?? []))
        )
      )
      .subscribe((paymentLabels: IPaymentLabel[]) => (this.paymentLabelsSharedCollection = paymentLabels));

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

  protected createFromForm(): IPaymentRequisition {
    return {
      ...new PaymentRequisition(),
      id: this.editForm.get(['id'])!.value,
      receptionDate: this.editForm.get(['receptionDate'])!.value,
      dealerName: this.editForm.get(['dealerName'])!.value,
      briefDescription: this.editForm.get(['briefDescription'])!.value,
      requisitionNumber: this.editForm.get(['requisitionNumber'])!.value,
      invoicedAmount: this.editForm.get(['invoicedAmount'])!.value,
      disbursementCost: this.editForm.get(['disbursementCost'])!.value,
      taxableAmount: this.editForm.get(['taxableAmount'])!.value,
      requisitionProcessed: this.editForm.get(['requisitionProcessed'])!.value,
      fileUploadToken: this.editForm.get(['fileUploadToken'])!.value,
      compilationToken: this.editForm.get(['compilationToken'])!.value,
      paymentLabels: this.editForm.get(['paymentLabels'])!.value,
      placeholders: this.editForm.get(['placeholders'])!.value,
    };
  }
}