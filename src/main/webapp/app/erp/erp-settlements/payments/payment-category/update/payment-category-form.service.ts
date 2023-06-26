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

import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IPaymentCategory, NewPaymentCategory } from '../payment-category.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IPaymentCategory for edit and NewPaymentCategoryFormGroupInput for create.
 */
type PaymentCategoryFormGroupInput = IPaymentCategory | PartialWithRequiredKeyOf<NewPaymentCategory>;

type PaymentCategoryFormDefaults = Pick<NewPaymentCategory, 'id' | 'paymentLabels' | 'placeholders'>;

type PaymentCategoryFormGroupContent = {
  id: FormControl<IPaymentCategory['id'] | NewPaymentCategory['id']>;
  categoryName: FormControl<IPaymentCategory['categoryName']>;
  categoryDescription: FormControl<IPaymentCategory['categoryDescription']>;
  categoryType: FormControl<IPaymentCategory['categoryType']>;
  fileUploadToken: FormControl<IPaymentCategory['fileUploadToken']>;
  compilationToken: FormControl<IPaymentCategory['compilationToken']>;
  paymentLabels: FormControl<IPaymentCategory['paymentLabels']>;
  placeholders: FormControl<IPaymentCategory['placeholders']>;
};

export type PaymentCategoryFormGroup = FormGroup<PaymentCategoryFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class PaymentCategoryFormService {
  createPaymentCategoryFormGroup(paymentCategory: PaymentCategoryFormGroupInput = { id: null }): PaymentCategoryFormGroup {
    const paymentCategoryRawValue = {
      ...this.getFormDefaults(),
      ...paymentCategory,
    };
    return new FormGroup<PaymentCategoryFormGroupContent>({
      id: new FormControl(
        { value: paymentCategoryRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      categoryName: new FormControl(paymentCategoryRawValue.categoryName, {
        validators: [Validators.required],
      }),
      categoryDescription: new FormControl(paymentCategoryRawValue.categoryDescription),
      categoryType: new FormControl(paymentCategoryRawValue.categoryType, {
        validators: [Validators.required],
      }),
      fileUploadToken: new FormControl(paymentCategoryRawValue.fileUploadToken),
      compilationToken: new FormControl(paymentCategoryRawValue.compilationToken),
      paymentLabels: new FormControl(paymentCategoryRawValue.paymentLabels ?? []),
      placeholders: new FormControl(paymentCategoryRawValue.placeholders ?? []),
    });
  }

  getPaymentCategory(form: PaymentCategoryFormGroup): IPaymentCategory | NewPaymentCategory {
    return form.getRawValue() as IPaymentCategory | NewPaymentCategory;
  }

  resetForm(form: PaymentCategoryFormGroup, paymentCategory: PaymentCategoryFormGroupInput): void {
    const paymentCategoryRawValue = { ...this.getFormDefaults(), ...paymentCategory };
    form.reset(
      {
        ...paymentCategoryRawValue,
        id: { value: paymentCategoryRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): PaymentCategoryFormDefaults {
    return {
      id: null,
      paymentLabels: [],
      placeholders: [],
    };
  }
}
