import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IInvoice, NewInvoice } from '../invoice.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IInvoice for edit and NewInvoiceFormGroupInput for create.
 */
type InvoiceFormGroupInput = IInvoice | PartialWithRequiredKeyOf<NewInvoice>;

type InvoiceFormDefaults = Pick<NewInvoice, 'id' | 'paymentLabels' | 'placeholders'>;

type InvoiceFormGroupContent = {
  id: FormControl<IInvoice['id'] | NewInvoice['id']>;
  invoiceNumber: FormControl<IInvoice['invoiceNumber']>;
  invoiceDate: FormControl<IInvoice['invoiceDate']>;
  invoiceAmount: FormControl<IInvoice['invoiceAmount']>;
  currency: FormControl<IInvoice['currency']>;
  paymentReference: FormControl<IInvoice['paymentReference']>;
  dealerName: FormControl<IInvoice['dealerName']>;
  fileUploadToken: FormControl<IInvoice['fileUploadToken']>;
  compilationToken: FormControl<IInvoice['compilationToken']>;
  paymentLabels: FormControl<IInvoice['paymentLabels']>;
  placeholders: FormControl<IInvoice['placeholders']>;
};

export type InvoiceFormGroup = FormGroup<InvoiceFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class InvoiceFormService {
  createInvoiceFormGroup(invoice: InvoiceFormGroupInput = { id: null }): InvoiceFormGroup {
    const invoiceRawValue = {
      ...this.getFormDefaults(),
      ...invoice,
    };
    return new FormGroup<InvoiceFormGroupContent>({
      id: new FormControl(
        { value: invoiceRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      invoiceNumber: new FormControl(invoiceRawValue.invoiceNumber, {
        validators: [Validators.required],
      }),
      invoiceDate: new FormControl(invoiceRawValue.invoiceDate),
      invoiceAmount: new FormControl(invoiceRawValue.invoiceAmount),
      currency: new FormControl(invoiceRawValue.currency, {
        validators: [Validators.required],
      }),
      paymentReference: new FormControl(invoiceRawValue.paymentReference),
      dealerName: new FormControl(invoiceRawValue.dealerName),
      fileUploadToken: new FormControl(invoiceRawValue.fileUploadToken),
      compilationToken: new FormControl(invoiceRawValue.compilationToken),
      paymentLabels: new FormControl(invoiceRawValue.paymentLabels ?? []),
      placeholders: new FormControl(invoiceRawValue.placeholders ?? []),
    });
  }

  getInvoice(form: InvoiceFormGroup): IInvoice | NewInvoice {
    return form.getRawValue() as IInvoice | NewInvoice;
  }

  resetForm(form: InvoiceFormGroup, invoice: InvoiceFormGroupInput): void {
    const invoiceRawValue = { ...this.getFormDefaults(), ...invoice };
    form.reset(
      {
        ...invoiceRawValue,
        id: { value: invoiceRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): InvoiceFormDefaults {
    return {
      id: null,
      paymentLabels: [],
      placeholders: [],
    };
  }
}
