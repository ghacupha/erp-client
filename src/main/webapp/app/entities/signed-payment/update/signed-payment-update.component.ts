import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { SignedPaymentFormService, SignedPaymentFormGroup } from './signed-payment-form.service';
import { ISignedPayment } from '../signed-payment.model';
import { SignedPaymentService } from '../service/signed-payment.service';
import { IPaymentLabel } from 'app/entities/payment-label/payment-label.model';
import { PaymentLabelService } from 'app/entities/payment-label/service/payment-label.service';
import { IPaymentCategory } from 'app/entities/payments/payment-category/payment-category.model';
import { PaymentCategoryService } from 'app/entities/payments/payment-category/service/payment-category.service';
import { IPlaceholder } from 'app/entities/erpService/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/erpService/placeholder/service/placeholder.service';
import { CurrencyTypes } from 'app/entities/enumerations/currency-types.model';

@Component({
  selector: 'jhi-signed-payment-update',
  templateUrl: './signed-payment-update.component.html',
})
export class SignedPaymentUpdateComponent implements OnInit {
  isSaving = false;
  signedPayment: ISignedPayment | null = null;
  currencyTypesValues = Object.keys(CurrencyTypes);

  paymentLabelsSharedCollection: IPaymentLabel[] = [];
  paymentCategoriesSharedCollection: IPaymentCategory[] = [];
  placeholdersSharedCollection: IPlaceholder[] = [];
  signedPaymentsSharedCollection: ISignedPayment[] = [];

  editForm: SignedPaymentFormGroup = this.signedPaymentFormService.createSignedPaymentFormGroup();

  constructor(
    protected signedPaymentService: SignedPaymentService,
    protected signedPaymentFormService: SignedPaymentFormService,
    protected paymentLabelService: PaymentLabelService,
    protected paymentCategoryService: PaymentCategoryService,
    protected placeholderService: PlaceholderService,
    protected activatedRoute: ActivatedRoute
  ) {}

  comparePaymentLabel = (o1: IPaymentLabel | null, o2: IPaymentLabel | null): boolean =>
    this.paymentLabelService.comparePaymentLabel(o1, o2);

  comparePaymentCategory = (o1: IPaymentCategory | null, o2: IPaymentCategory | null): boolean =>
    this.paymentCategoryService.comparePaymentCategory(o1, o2);

  comparePlaceholder = (o1: IPlaceholder | null, o2: IPlaceholder | null): boolean => this.placeholderService.comparePlaceholder(o1, o2);

  compareSignedPayment = (o1: ISignedPayment | null, o2: ISignedPayment | null): boolean =>
    this.signedPaymentService.compareSignedPayment(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ signedPayment }) => {
      this.signedPayment = signedPayment;
      if (signedPayment) {
        this.updateForm(signedPayment);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const signedPayment = this.signedPaymentFormService.getSignedPayment(this.editForm);
    if (signedPayment.id !== null) {
      this.subscribeToSaveResponse(this.signedPaymentService.update(signedPayment));
    } else {
      this.subscribeToSaveResponse(this.signedPaymentService.create(signedPayment));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISignedPayment>>): void {
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

  protected updateForm(signedPayment: ISignedPayment): void {
    this.signedPayment = signedPayment;
    this.signedPaymentFormService.resetForm(this.editForm, signedPayment);

    this.paymentLabelsSharedCollection = this.paymentLabelService.addPaymentLabelToCollectionIfMissing<IPaymentLabel>(
      this.paymentLabelsSharedCollection,
      ...(signedPayment.paymentLabels ?? [])
    );
    this.paymentCategoriesSharedCollection = this.paymentCategoryService.addPaymentCategoryToCollectionIfMissing<IPaymentCategory>(
      this.paymentCategoriesSharedCollection,
      signedPayment.paymentCategory
    );
    this.placeholdersSharedCollection = this.placeholderService.addPlaceholderToCollectionIfMissing<IPlaceholder>(
      this.placeholdersSharedCollection,
      ...(signedPayment.placeholders ?? [])
    );
    this.signedPaymentsSharedCollection = this.signedPaymentService.addSignedPaymentToCollectionIfMissing<ISignedPayment>(
      this.signedPaymentsSharedCollection,
      signedPayment.signedPaymentGroup
    );
  }

  protected loadRelationshipsOptions(): void {
    this.paymentLabelService
      .query()
      .pipe(map((res: HttpResponse<IPaymentLabel[]>) => res.body ?? []))
      .pipe(
        map((paymentLabels: IPaymentLabel[]) =>
          this.paymentLabelService.addPaymentLabelToCollectionIfMissing<IPaymentLabel>(
            paymentLabels,
            ...(this.signedPayment?.paymentLabels ?? [])
          )
        )
      )
      .subscribe((paymentLabels: IPaymentLabel[]) => (this.paymentLabelsSharedCollection = paymentLabels));

    this.paymentCategoryService
      .query()
      .pipe(map((res: HttpResponse<IPaymentCategory[]>) => res.body ?? []))
      .pipe(
        map((paymentCategories: IPaymentCategory[]) =>
          this.paymentCategoryService.addPaymentCategoryToCollectionIfMissing<IPaymentCategory>(
            paymentCategories,
            this.signedPayment?.paymentCategory
          )
        )
      )
      .subscribe((paymentCategories: IPaymentCategory[]) => (this.paymentCategoriesSharedCollection = paymentCategories));

    this.placeholderService
      .query()
      .pipe(map((res: HttpResponse<IPlaceholder[]>) => res.body ?? []))
      .pipe(
        map((placeholders: IPlaceholder[]) =>
          this.placeholderService.addPlaceholderToCollectionIfMissing<IPlaceholder>(
            placeholders,
            ...(this.signedPayment?.placeholders ?? [])
          )
        )
      )
      .subscribe((placeholders: IPlaceholder[]) => (this.placeholdersSharedCollection = placeholders));

    this.signedPaymentService
      .query()
      .pipe(map((res: HttpResponse<ISignedPayment[]>) => res.body ?? []))
      .pipe(
        map((signedPayments: ISignedPayment[]) =>
          this.signedPaymentService.addSignedPaymentToCollectionIfMissing<ISignedPayment>(
            signedPayments,
            this.signedPayment?.signedPaymentGroup
          )
        )
      )
      .subscribe((signedPayments: ISignedPayment[]) => (this.signedPaymentsSharedCollection = signedPayments));
  }
}
