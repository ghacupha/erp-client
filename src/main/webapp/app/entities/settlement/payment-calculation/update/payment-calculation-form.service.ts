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

import { IPaymentCalculation, NewPaymentCalculation } from '../payment-calculation.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IPaymentCalculation for edit and NewPaymentCalculationFormGroupInput for create.
 */
type PaymentCalculationFormGroupInput = IPaymentCalculation | PartialWithRequiredKeyOf<NewPaymentCalculation>;

type PaymentCalculationFormDefaults = Pick<NewPaymentCalculation, 'id' | 'paymentLabels' | 'placeholders'>;

type PaymentCalculationFormGroupContent = {
  id: FormControl<IPaymentCalculation['id'] | NewPaymentCalculation['id']>;
  paymentExpense: FormControl<IPaymentCalculation['paymentExpense']>;
  withholdingVAT: FormControl<IPaymentCalculation['withholdingVAT']>;
  withholdingTax: FormControl<IPaymentCalculation['withholdingTax']>;
  paymentAmount: FormControl<IPaymentCalculation['paymentAmount']>;
  fileUploadToken: FormControl<IPaymentCalculation['fileUploadToken']>;
  compilationToken: FormControl<IPaymentCalculation['compilationToken']>;
  paymentLabels: FormControl<IPaymentCalculation['paymentLabels']>;
  paymentCategory: FormControl<IPaymentCalculation['paymentCategory']>;
  placeholders: FormControl<IPaymentCalculation['placeholders']>;
};

export type PaymentCalculationFormGroup = FormGroup<PaymentCalculationFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class PaymentCalculationFormService {
  createPaymentCalculationFormGroup(paymentCalculation: PaymentCalculationFormGroupInput = { id: null }): PaymentCalculationFormGroup {
    const paymentCalculationRawValue = {
      ...this.getFormDefaults(),
      ...paymentCalculation,
    };
    return new FormGroup<PaymentCalculationFormGroupContent>({
      id: new FormControl(
        { value: paymentCalculationRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      paymentExpense: new FormControl(paymentCalculationRawValue.paymentExpense),
      withholdingVAT: new FormControl(paymentCalculationRawValue.withholdingVAT),
      withholdingTax: new FormControl(paymentCalculationRawValue.withholdingTax),
      paymentAmount: new FormControl(paymentCalculationRawValue.paymentAmount),
      fileUploadToken: new FormControl(paymentCalculationRawValue.fileUploadToken),
      compilationToken: new FormControl(paymentCalculationRawValue.compilationToken),
      paymentLabels: new FormControl(paymentCalculationRawValue.paymentLabels ?? []),
      paymentCategory: new FormControl(paymentCalculationRawValue.paymentCategory),
      placeholders: new FormControl(paymentCalculationRawValue.placeholders ?? []),
    });
  }

  getPaymentCalculation(form: PaymentCalculationFormGroup): IPaymentCalculation | NewPaymentCalculation {
    return form.getRawValue() as IPaymentCalculation | NewPaymentCalculation;
  }

  resetForm(form: PaymentCalculationFormGroup, paymentCalculation: PaymentCalculationFormGroupInput): void {
    const paymentCalculationRawValue = { ...this.getFormDefaults(), ...paymentCalculation };
    form.reset(
      {
        ...paymentCalculationRawValue,
        id: { value: paymentCalculationRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): PaymentCalculationFormDefaults {
    return {
      id: null,
      paymentLabels: [],
      placeholders: [],
    };
  }
}
