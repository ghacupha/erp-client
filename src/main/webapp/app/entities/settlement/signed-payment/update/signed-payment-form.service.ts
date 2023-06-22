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
