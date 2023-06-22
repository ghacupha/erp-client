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

import { IPaymentRequisition, NewPaymentRequisition } from '../payment-requisition.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IPaymentRequisition for edit and NewPaymentRequisitionFormGroupInput for create.
 */
type PaymentRequisitionFormGroupInput = IPaymentRequisition | PartialWithRequiredKeyOf<NewPaymentRequisition>;

type PaymentRequisitionFormDefaults = Pick<NewPaymentRequisition, 'id' | 'requisitionProcessed' | 'paymentLabels' | 'placeholders'>;

type PaymentRequisitionFormGroupContent = {
  id: FormControl<IPaymentRequisition['id'] | NewPaymentRequisition['id']>;
  receptionDate: FormControl<IPaymentRequisition['receptionDate']>;
  dealerName: FormControl<IPaymentRequisition['dealerName']>;
  briefDescription: FormControl<IPaymentRequisition['briefDescription']>;
  requisitionNumber: FormControl<IPaymentRequisition['requisitionNumber']>;
  invoicedAmount: FormControl<IPaymentRequisition['invoicedAmount']>;
  disbursementCost: FormControl<IPaymentRequisition['disbursementCost']>;
  taxableAmount: FormControl<IPaymentRequisition['taxableAmount']>;
  requisitionProcessed: FormControl<IPaymentRequisition['requisitionProcessed']>;
  fileUploadToken: FormControl<IPaymentRequisition['fileUploadToken']>;
  compilationToken: FormControl<IPaymentRequisition['compilationToken']>;
  paymentLabels: FormControl<IPaymentRequisition['paymentLabels']>;
  placeholders: FormControl<IPaymentRequisition['placeholders']>;
};

export type PaymentRequisitionFormGroup = FormGroup<PaymentRequisitionFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class PaymentRequisitionFormService {
  createPaymentRequisitionFormGroup(paymentRequisition: PaymentRequisitionFormGroupInput = { id: null }): PaymentRequisitionFormGroup {
    const paymentRequisitionRawValue = {
      ...this.getFormDefaults(),
      ...paymentRequisition,
    };
    return new FormGroup<PaymentRequisitionFormGroupContent>({
      id: new FormControl(
        { value: paymentRequisitionRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      receptionDate: new FormControl(paymentRequisitionRawValue.receptionDate),
      dealerName: new FormControl(paymentRequisitionRawValue.dealerName),
      briefDescription: new FormControl(paymentRequisitionRawValue.briefDescription),
      requisitionNumber: new FormControl(paymentRequisitionRawValue.requisitionNumber),
      invoicedAmount: new FormControl(paymentRequisitionRawValue.invoicedAmount),
      disbursementCost: new FormControl(paymentRequisitionRawValue.disbursementCost),
      taxableAmount: new FormControl(paymentRequisitionRawValue.taxableAmount),
      requisitionProcessed: new FormControl(paymentRequisitionRawValue.requisitionProcessed),
      fileUploadToken: new FormControl(paymentRequisitionRawValue.fileUploadToken),
      compilationToken: new FormControl(paymentRequisitionRawValue.compilationToken),
      paymentLabels: new FormControl(paymentRequisitionRawValue.paymentLabels ?? []),
      placeholders: new FormControl(paymentRequisitionRawValue.placeholders ?? []),
    });
  }

  getPaymentRequisition(form: PaymentRequisitionFormGroup): IPaymentRequisition | NewPaymentRequisition {
    return form.getRawValue() as IPaymentRequisition | NewPaymentRequisition;
  }

  resetForm(form: PaymentRequisitionFormGroup, paymentRequisition: PaymentRequisitionFormGroupInput): void {
    const paymentRequisitionRawValue = { ...this.getFormDefaults(), ...paymentRequisition };
    form.reset(
      {
        ...paymentRequisitionRawValue,
        id: { value: paymentRequisitionRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): PaymentRequisitionFormDefaults {
    return {
      id: null,
      requisitionProcessed: false,
      paymentLabels: [],
      placeholders: [],
    };
  }
}
