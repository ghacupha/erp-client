import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IPaymentInvoice, NewPaymentInvoice } from '../payment-invoice.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IPaymentInvoice for edit and NewPaymentInvoiceFormGroupInput for create.
 */
type PaymentInvoiceFormGroupInput = IPaymentInvoice | PartialWithRequiredKeyOf<NewPaymentInvoice>;

type PaymentInvoiceFormDefaults = Pick<
  NewPaymentInvoice,
  'id' | 'purchaseOrders' | 'placeholders' | 'paymentLabels' | 'deliveryNotes' | 'jobSheets' | 'businessDocuments'
>;

type PaymentInvoiceFormGroupContent = {
  id: FormControl<IPaymentInvoice['id'] | NewPaymentInvoice['id']>;
  invoiceNumber: FormControl<IPaymentInvoice['invoiceNumber']>;
  invoiceDate: FormControl<IPaymentInvoice['invoiceDate']>;
  invoiceAmount: FormControl<IPaymentInvoice['invoiceAmount']>;
  fileUploadToken: FormControl<IPaymentInvoice['fileUploadToken']>;
  compilationToken: FormControl<IPaymentInvoice['compilationToken']>;
  remarks: FormControl<IPaymentInvoice['remarks']>;
  purchaseOrders: FormControl<IPaymentInvoice['purchaseOrders']>;
  placeholders: FormControl<IPaymentInvoice['placeholders']>;
  paymentLabels: FormControl<IPaymentInvoice['paymentLabels']>;
  settlementCurrency: FormControl<IPaymentInvoice['settlementCurrency']>;
  biller: FormControl<IPaymentInvoice['biller']>;
  deliveryNotes: FormControl<IPaymentInvoice['deliveryNotes']>;
  jobSheets: FormControl<IPaymentInvoice['jobSheets']>;
  businessDocuments: FormControl<IPaymentInvoice['businessDocuments']>;
};

export type PaymentInvoiceFormGroup = FormGroup<PaymentInvoiceFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class PaymentInvoiceFormService {
  createPaymentInvoiceFormGroup(paymentInvoice: PaymentInvoiceFormGroupInput = { id: null }): PaymentInvoiceFormGroup {
    const paymentInvoiceRawValue = {
      ...this.getFormDefaults(),
      ...paymentInvoice,
    };
    return new FormGroup<PaymentInvoiceFormGroupContent>({
      id: new FormControl(
        { value: paymentInvoiceRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      invoiceNumber: new FormControl(paymentInvoiceRawValue.invoiceNumber, {
        validators: [Validators.required],
      }),
      invoiceDate: new FormControl(paymentInvoiceRawValue.invoiceDate),
      invoiceAmount: new FormControl(paymentInvoiceRawValue.invoiceAmount),
      fileUploadToken: new FormControl(paymentInvoiceRawValue.fileUploadToken),
      compilationToken: new FormControl(paymentInvoiceRawValue.compilationToken),
      remarks: new FormControl(paymentInvoiceRawValue.remarks),
      purchaseOrders: new FormControl(paymentInvoiceRawValue.purchaseOrders ?? []),
      placeholders: new FormControl(paymentInvoiceRawValue.placeholders ?? []),
      paymentLabels: new FormControl(paymentInvoiceRawValue.paymentLabels ?? []),
      settlementCurrency: new FormControl(paymentInvoiceRawValue.settlementCurrency, {
        validators: [Validators.required],
      }),
      biller: new FormControl(paymentInvoiceRawValue.biller, {
        validators: [Validators.required],
      }),
      deliveryNotes: new FormControl(paymentInvoiceRawValue.deliveryNotes ?? []),
      jobSheets: new FormControl(paymentInvoiceRawValue.jobSheets ?? []),
      businessDocuments: new FormControl(paymentInvoiceRawValue.businessDocuments ?? []),
    });
  }

  getPaymentInvoice(form: PaymentInvoiceFormGroup): IPaymentInvoice | NewPaymentInvoice {
    return form.getRawValue() as IPaymentInvoice | NewPaymentInvoice;
  }

  resetForm(form: PaymentInvoiceFormGroup, paymentInvoice: PaymentInvoiceFormGroupInput): void {
    const paymentInvoiceRawValue = { ...this.getFormDefaults(), ...paymentInvoice };
    form.reset(
      {
        ...paymentInvoiceRawValue,
        id: { value: paymentInvoiceRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): PaymentInvoiceFormDefaults {
    return {
      id: null,
      purchaseOrders: [],
      placeholders: [],
      paymentLabels: [],
      deliveryNotes: [],
      jobSheets: [],
      businessDocuments: [],
    };
  }
}
