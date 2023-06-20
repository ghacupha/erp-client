import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { PaymentCategoryFormService, PaymentCategoryFormGroup } from './payment-category-form.service';
import { IPaymentCategory } from '../payment-category.model';
import { PaymentCategoryService } from '../service/payment-category.service';
import { IPaymentLabel } from 'app/entities/payment-label/payment-label.model';
import { PaymentLabelService } from 'app/entities/payment-label/service/payment-label.service';
import { IPlaceholder } from 'app/entities/erpService/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/erpService/placeholder/service/placeholder.service';
import { CategoryTypes } from 'app/entities/enumerations/category-types.model';

@Component({
  selector: 'jhi-payment-category-update',
  templateUrl: './payment-category-update.component.html',
})
export class PaymentCategoryUpdateComponent implements OnInit {
  isSaving = false;
  paymentCategory: IPaymentCategory | null = null;
  categoryTypesValues = Object.keys(CategoryTypes);

  paymentLabelsSharedCollection: IPaymentLabel[] = [];
  placeholdersSharedCollection: IPlaceholder[] = [];

  editForm: PaymentCategoryFormGroup = this.paymentCategoryFormService.createPaymentCategoryFormGroup();

  constructor(
    protected paymentCategoryService: PaymentCategoryService,
    protected paymentCategoryFormService: PaymentCategoryFormService,
    protected paymentLabelService: PaymentLabelService,
    protected placeholderService: PlaceholderService,
    protected activatedRoute: ActivatedRoute
  ) {}

  comparePaymentLabel = (o1: IPaymentLabel | null, o2: IPaymentLabel | null): boolean =>
    this.paymentLabelService.comparePaymentLabel(o1, o2);

  comparePlaceholder = (o1: IPlaceholder | null, o2: IPlaceholder | null): boolean => this.placeholderService.comparePlaceholder(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ paymentCategory }) => {
      this.paymentCategory = paymentCategory;
      if (paymentCategory) {
        this.updateForm(paymentCategory);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const paymentCategory = this.paymentCategoryFormService.getPaymentCategory(this.editForm);
    if (paymentCategory.id !== null) {
      this.subscribeToSaveResponse(this.paymentCategoryService.update(paymentCategory));
    } else {
      this.subscribeToSaveResponse(this.paymentCategoryService.create(paymentCategory));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPaymentCategory>>): void {
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

  protected updateForm(paymentCategory: IPaymentCategory): void {
    this.paymentCategory = paymentCategory;
    this.paymentCategoryFormService.resetForm(this.editForm, paymentCategory);

    this.paymentLabelsSharedCollection = this.paymentLabelService.addPaymentLabelToCollectionIfMissing<IPaymentLabel>(
      this.paymentLabelsSharedCollection,
      ...(paymentCategory.paymentLabels ?? [])
    );
    this.placeholdersSharedCollection = this.placeholderService.addPlaceholderToCollectionIfMissing<IPlaceholder>(
      this.placeholdersSharedCollection,
      ...(paymentCategory.placeholders ?? [])
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
            ...(this.paymentCategory?.paymentLabels ?? [])
          )
        )
      )
      .subscribe((paymentLabels: IPaymentLabel[]) => (this.paymentLabelsSharedCollection = paymentLabels));

    this.placeholderService
      .query()
      .pipe(map((res: HttpResponse<IPlaceholder[]>) => res.body ?? []))
      .pipe(
        map((placeholders: IPlaceholder[]) =>
          this.placeholderService.addPlaceholderToCollectionIfMissing<IPlaceholder>(
            placeholders,
            ...(this.paymentCategory?.placeholders ?? [])
          )
        )
      )
      .subscribe((placeholders: IPlaceholder[]) => (this.placeholdersSharedCollection = placeholders));
  }
}
