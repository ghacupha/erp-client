import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICreditNote, NewCreditNote } from '../credit-note.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICreditNote for edit and NewCreditNoteFormGroupInput for create.
 */
type CreditNoteFormGroupInput = ICreditNote | PartialWithRequiredKeyOf<NewCreditNote>;

type CreditNoteFormDefaults = Pick<NewCreditNote, 'id' | 'purchaseOrders' | 'invoices' | 'paymentLabels' | 'placeholders'>;

type CreditNoteFormGroupContent = {
  id: FormControl<ICreditNote['id'] | NewCreditNote['id']>;
  creditNumber: FormControl<ICreditNote['creditNumber']>;
  creditNoteDate: FormControl<ICreditNote['creditNoteDate']>;
  creditAmount: FormControl<ICreditNote['creditAmount']>;
  remarks: FormControl<ICreditNote['remarks']>;
  purchaseOrders: FormControl<ICreditNote['purchaseOrders']>;
  invoices: FormControl<ICreditNote['invoices']>;
  paymentLabels: FormControl<ICreditNote['paymentLabels']>;
  placeholders: FormControl<ICreditNote['placeholders']>;
  settlementCurrency: FormControl<ICreditNote['settlementCurrency']>;
};

export type CreditNoteFormGroup = FormGroup<CreditNoteFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CreditNoteFormService {
  createCreditNoteFormGroup(creditNote: CreditNoteFormGroupInput = { id: null }): CreditNoteFormGroup {
    const creditNoteRawValue = {
      ...this.getFormDefaults(),
      ...creditNote,
    };
    return new FormGroup<CreditNoteFormGroupContent>({
      id: new FormControl(
        { value: creditNoteRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      creditNumber: new FormControl(creditNoteRawValue.creditNumber, {
        validators: [Validators.required],
      }),
      creditNoteDate: new FormControl(creditNoteRawValue.creditNoteDate, {
        validators: [Validators.required],
      }),
      creditAmount: new FormControl(creditNoteRawValue.creditAmount, {
        validators: [Validators.required],
      }),
      remarks: new FormControl(creditNoteRawValue.remarks),
      purchaseOrders: new FormControl(creditNoteRawValue.purchaseOrders ?? []),
      invoices: new FormControl(creditNoteRawValue.invoices ?? []),
      paymentLabels: new FormControl(creditNoteRawValue.paymentLabels ?? []),
      placeholders: new FormControl(creditNoteRawValue.placeholders ?? []),
      settlementCurrency: new FormControl(creditNoteRawValue.settlementCurrency),
    });
  }

  getCreditNote(form: CreditNoteFormGroup): ICreditNote | NewCreditNote {
    return form.getRawValue() as ICreditNote | NewCreditNote;
  }

  resetForm(form: CreditNoteFormGroup, creditNote: CreditNoteFormGroupInput): void {
    const creditNoteRawValue = { ...this.getFormDefaults(), ...creditNote };
    form.reset(
      {
        ...creditNoteRawValue,
        id: { value: creditNoteRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CreditNoteFormDefaults {
    return {
      id: null,
      purchaseOrders: [],
      invoices: [],
      paymentLabels: [],
      placeholders: [],
    };
  }
}
