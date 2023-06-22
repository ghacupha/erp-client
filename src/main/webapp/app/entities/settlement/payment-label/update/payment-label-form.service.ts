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

import { IPaymentLabel, NewPaymentLabel } from '../payment-label.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IPaymentLabel for edit and NewPaymentLabelFormGroupInput for create.
 */
type PaymentLabelFormGroupInput = IPaymentLabel | PartialWithRequiredKeyOf<NewPaymentLabel>;

type PaymentLabelFormDefaults = Pick<NewPaymentLabel, 'id' | 'placeholders'>;

type PaymentLabelFormGroupContent = {
  id: FormControl<IPaymentLabel['id'] | NewPaymentLabel['id']>;
  description: FormControl<IPaymentLabel['description']>;
  comments: FormControl<IPaymentLabel['comments']>;
  fileUploadToken: FormControl<IPaymentLabel['fileUploadToken']>;
  compilationToken: FormControl<IPaymentLabel['compilationToken']>;
  remarks: FormControl<IPaymentLabel['remarks']>;
  containingPaymentLabel: FormControl<IPaymentLabel['containingPaymentLabel']>;
  placeholders: FormControl<IPaymentLabel['placeholders']>;
};

export type PaymentLabelFormGroup = FormGroup<PaymentLabelFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class PaymentLabelFormService {
  createPaymentLabelFormGroup(paymentLabel: PaymentLabelFormGroupInput = { id: null }): PaymentLabelFormGroup {
    const paymentLabelRawValue = {
      ...this.getFormDefaults(),
      ...paymentLabel,
    };
    return new FormGroup<PaymentLabelFormGroupContent>({
      id: new FormControl(
        { value: paymentLabelRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      description: new FormControl(paymentLabelRawValue.description, {
        validators: [Validators.required],
      }),
      comments: new FormControl(paymentLabelRawValue.comments),
      fileUploadToken: new FormControl(paymentLabelRawValue.fileUploadToken),
      compilationToken: new FormControl(paymentLabelRawValue.compilationToken),
      remarks: new FormControl(paymentLabelRawValue.remarks),
      containingPaymentLabel: new FormControl(paymentLabelRawValue.containingPaymentLabel),
      placeholders: new FormControl(paymentLabelRawValue.placeholders ?? []),
    });
  }

  getPaymentLabel(form: PaymentLabelFormGroup): IPaymentLabel | NewPaymentLabel {
    return form.getRawValue() as IPaymentLabel | NewPaymentLabel;
  }

  resetForm(form: PaymentLabelFormGroup, paymentLabel: PaymentLabelFormGroupInput): void {
    const paymentLabelRawValue = { ...this.getFormDefaults(), ...paymentLabel };
    form.reset(
      {
        ...paymentLabelRawValue,
        id: { value: paymentLabelRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): PaymentLabelFormDefaults {
    return {
      id: null,
      placeholders: [],
    };
  }
}
