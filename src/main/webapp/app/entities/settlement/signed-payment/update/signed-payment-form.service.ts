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

import { ISignedPayment, NewSignedPayment } from '../signed-payment.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ISignedPayment for edit and NewSignedPaymentFormGroupInput for create.
 */
type SignedPaymentFormGroupInput = ISignedPayment | PartialWithRequiredKeyOf<NewSignedPayment>;

type SignedPaymentFormDefaults = Pick<NewSignedPayment, 'id' | 'paymentLabels' | 'placeholders'>;

type SignedPaymentFormGroupContent = {
  id: FormControl<ISignedPayment['id'] | NewSignedPayment['id']>;
  transactionNumber: FormControl<ISignedPayment['transactionNumber']>;
  transactionDate: FormControl<ISignedPayment['transactionDate']>;
  transactionCurrency: FormControl<ISignedPayment['transactionCurrency']>;
  transactionAmount: FormControl<ISignedPayment['transactionAmount']>;
  dealerName: FormControl<ISignedPayment['dealerName']>;
  fileUploadToken: FormControl<ISignedPayment['fileUploadToken']>;
  compilationToken: FormControl<ISignedPayment['compilationToken']>;
  paymentLabels: FormControl<ISignedPayment['paymentLabels']>;
  paymentCategory: FormControl<ISignedPayment['paymentCategory']>;
  placeholders: FormControl<ISignedPayment['placeholders']>;
  signedPaymentGroup: FormControl<ISignedPayment['signedPaymentGroup']>;
};

export type SignedPaymentFormGroup = FormGroup<SignedPaymentFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class SignedPaymentFormService {
  createSignedPaymentFormGroup(signedPayment: SignedPaymentFormGroupInput = { id: null }): SignedPaymentFormGroup {
    const signedPaymentRawValue = {
      ...this.getFormDefaults(),
      ...signedPayment,
    };
    return new FormGroup<SignedPaymentFormGroupContent>({
      id: new FormControl(
        { value: signedPaymentRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      transactionNumber: new FormControl(signedPaymentRawValue.transactionNumber, {
        validators: [Validators.required],
      }),
      transactionDate: new FormControl(signedPaymentRawValue.transactionDate, {
        validators: [Validators.required],
      }),
      transactionCurrency: new FormControl(signedPaymentRawValue.transactionCurrency, {
        validators: [Validators.required],
      }),
      transactionAmount: new FormControl(signedPaymentRawValue.transactionAmount, {
        validators: [Validators.required, Validators.min(0)],
      }),
      dealerName: new FormControl(signedPaymentRawValue.dealerName),
      fileUploadToken: new FormControl(signedPaymentRawValue.fileUploadToken),
      compilationToken: new FormControl(signedPaymentRawValue.compilationToken),
      paymentLabels: new FormControl(signedPaymentRawValue.paymentLabels ?? []),
      paymentCategory: new FormControl(signedPaymentRawValue.paymentCategory),
      placeholders: new FormControl(signedPaymentRawValue.placeholders ?? []),
      signedPaymentGroup: new FormControl(signedPaymentRawValue.signedPaymentGroup),
    });
  }

  getSignedPayment(form: SignedPaymentFormGroup): ISignedPayment | NewSignedPayment {
    return form.getRawValue() as ISignedPayment | NewSignedPayment;
  }

  resetForm(form: SignedPaymentFormGroup, signedPayment: SignedPaymentFormGroupInput): void {
    const signedPaymentRawValue = { ...this.getFormDefaults(), ...signedPayment };
    form.reset(
      {
        ...signedPaymentRawValue,
        id: { value: signedPaymentRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): SignedPaymentFormDefaults {
    return {
      id: null,
      paymentLabels: [],
      placeholders: [],
    };
  }
}
