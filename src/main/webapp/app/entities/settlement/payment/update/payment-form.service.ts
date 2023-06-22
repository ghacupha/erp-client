import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IPayment, NewPayment } from '../payment.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IPayment for edit and NewPaymentFormGroupInput for create.
 */
type PaymentFormGroupInput = IPayment | PartialWithRequiredKeyOf<NewPayment>;

type PaymentFormDefaults = Pick<NewPayment, 'id' | 'paymentLabels' | 'placeholders'>;

type PaymentFormGroupContent = {
  id: FormControl<IPayment['id'] | NewPayment['id']>;
  paymentNumber: FormControl<IPayment['paymentNumber']>;
  paymentDate: FormControl<IPayment['paymentDate']>;
  invoicedAmount: FormControl<IPayment['invoicedAmount']>;
  paymentAmount: FormControl<IPayment['paymentAmount']>;
  description: FormControl<IPayment['description']>;
  settlementCurrency: FormControl<IPayment['settlementCurrency']>;
  calculationFile: FormControl<IPayment['calculationFile']>;
  calculationFileContentType: FormControl<IPayment['calculationFileContentType']>;
  dealerName: FormControl<IPayment['dealerName']>;
  purchaseOrderNumber: FormControl<IPayment['purchaseOrderNumber']>;
  fileUploadToken: FormControl<IPayment['fileUploadToken']>;
  compilationToken: FormControl<IPayment['compilationToken']>;
  paymentLabels: FormControl<IPayment['paymentLabels']>;
  paymentCategory: FormControl<IPayment['paymentCategory']>;
  placeholders: FormControl<IPayment['placeholders']>;
  paymentGroup: FormControl<IPayment['paymentGroup']>;
};

export type PaymentFormGroup = FormGroup<PaymentFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class PaymentFormService {
  createPaymentFormGroup(payment: PaymentFormGroupInput = { id: null }): PaymentFormGroup {
    const paymentRawValue = {
      ...this.getFormDefaults(),
      ...payment,
    };
    return new FormGroup<PaymentFormGroupContent>({
      id: new FormControl(
        { value: paymentRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      paymentNumber: new FormControl(paymentRawValue.paymentNumber),
      paymentDate: new FormControl(paymentRawValue.paymentDate),
      invoicedAmount: new FormControl(paymentRawValue.invoicedAmount),
      paymentAmount: new FormControl(paymentRawValue.paymentAmount),
      description: new FormControl(paymentRawValue.description),
      settlementCurrency: new FormControl(paymentRawValue.settlementCurrency, {
        validators: [Validators.required],
      }),
      calculationFile: new FormControl(paymentRawValue.calculationFile),
      calculationFileContentType: new FormControl(paymentRawValue.calculationFileContentType),
      dealerName: new FormControl(paymentRawValue.dealerName),
      purchaseOrderNumber: new FormControl(paymentRawValue.purchaseOrderNumber),
      fileUploadToken: new FormControl(paymentRawValue.fileUploadToken),
      compilationToken: new FormControl(paymentRawValue.compilationToken),
      paymentLabels: new FormControl(paymentRawValue.paymentLabels ?? []),
      paymentCategory: new FormControl(paymentRawValue.paymentCategory),
      placeholders: new FormControl(paymentRawValue.placeholders ?? []),
      paymentGroup: new FormControl(paymentRawValue.paymentGroup),
    });
  }

  getPayment(form: PaymentFormGroup): IPayment | NewPayment {
    return form.getRawValue() as IPayment | NewPayment;
  }

  resetForm(form: PaymentFormGroup, payment: PaymentFormGroupInput): void {
    const paymentRawValue = { ...this.getFormDefaults(), ...payment };
    form.reset(
      {
        ...paymentRawValue,
        id: { value: paymentRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): PaymentFormDefaults {
    return {
      id: null,
      paymentLabels: [],
      placeholders: [],
    };
  }
}
