///
/// Erp System - Mark IV No 1 (David Series) Client 1.4.0
/// Copyright © 2021 - 2023 Edwin Njeru (mailnjeru@gmail.com)
///
/// This program is free software: you can redistribute it and/or modify
/// it under the terms of the GNU General Public License as published by
/// the Free Software Foundation, either version 3 of the License, or
/// (at your option) any later version.
///
/// This program is distributed in the hope that it will be useful,
/// but WITHOUT ANY WARRANTY; without even the implied warranty of
/// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
/// GNU General Public License for more details.
///
/// You should have received a copy of the GNU General Public License
/// along with this program. If not, see <http://www.gnu.org/licenses/>.
///

import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { PaymentCategoryFormService, PaymentCategoryFormGroup } from './payment-category-form.service';
import { IPaymentCategory } from '../payment-category.model';
import { PaymentCategoryService } from '../service/payment-category.service';
import { CategoryTypes } from '../../../../erp-common/enumerations/category-types.model';
import { IPlaceholder } from '../../../../erp-pages/placeholder/placeholder.model';
import { IPaymentLabel } from '../../../../erp-pages/payment-label/payment-label.model';
import { PaymentLabelService } from '../../../../erp-pages/payment-label/service/payment-label.service';
import { PlaceholderService } from '../../../../erp-pages/placeholder/service/placeholder.service';

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
