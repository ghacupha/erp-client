import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IPrepaymentAmortization, NewPrepaymentAmortization } from '../prepayment-amortization.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IPrepaymentAmortization for edit and NewPrepaymentAmortizationFormGroupInput for create.
 */
type PrepaymentAmortizationFormGroupInput = IPrepaymentAmortization | PartialWithRequiredKeyOf<NewPrepaymentAmortization>;

type PrepaymentAmortizationFormDefaults = Pick<NewPrepaymentAmortization, 'id' | 'inactive' | 'placeholders'>;

type PrepaymentAmortizationFormGroupContent = {
  id: FormControl<IPrepaymentAmortization['id'] | NewPrepaymentAmortization['id']>;
  description: FormControl<IPrepaymentAmortization['description']>;
  prepaymentPeriod: FormControl<IPrepaymentAmortization['prepaymentPeriod']>;
  prepaymentAmount: FormControl<IPrepaymentAmortization['prepaymentAmount']>;
  inactive: FormControl<IPrepaymentAmortization['inactive']>;
  prepaymentAccount: FormControl<IPrepaymentAmortization['prepaymentAccount']>;
  settlementCurrency: FormControl<IPrepaymentAmortization['settlementCurrency']>;
  debitAccount: FormControl<IPrepaymentAmortization['debitAccount']>;
  creditAccount: FormControl<IPrepaymentAmortization['creditAccount']>;
  placeholders: FormControl<IPrepaymentAmortization['placeholders']>;
};

export type PrepaymentAmortizationFormGroup = FormGroup<PrepaymentAmortizationFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class PrepaymentAmortizationFormService {
  createPrepaymentAmortizationFormGroup(
    prepaymentAmortization: PrepaymentAmortizationFormGroupInput = { id: null }
  ): PrepaymentAmortizationFormGroup {
    const prepaymentAmortizationRawValue = {
      ...this.getFormDefaults(),
      ...prepaymentAmortization,
    };
    return new FormGroup<PrepaymentAmortizationFormGroupContent>({
      id: new FormControl(
        { value: prepaymentAmortizationRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      description: new FormControl(prepaymentAmortizationRawValue.description),
      prepaymentPeriod: new FormControl(prepaymentAmortizationRawValue.prepaymentPeriod),
      prepaymentAmount: new FormControl(prepaymentAmortizationRawValue.prepaymentAmount),
      inactive: new FormControl(prepaymentAmortizationRawValue.inactive),
      prepaymentAccount: new FormControl(prepaymentAmortizationRawValue.prepaymentAccount),
      settlementCurrency: new FormControl(prepaymentAmortizationRawValue.settlementCurrency),
      debitAccount: new FormControl(prepaymentAmortizationRawValue.debitAccount),
      creditAccount: new FormControl(prepaymentAmortizationRawValue.creditAccount),
      placeholders: new FormControl(prepaymentAmortizationRawValue.placeholders ?? []),
    });
  }

  getPrepaymentAmortization(form: PrepaymentAmortizationFormGroup): IPrepaymentAmortization | NewPrepaymentAmortization {
    return form.getRawValue() as IPrepaymentAmortization | NewPrepaymentAmortization;
  }

  resetForm(form: PrepaymentAmortizationFormGroup, prepaymentAmortization: PrepaymentAmortizationFormGroupInput): void {
    const prepaymentAmortizationRawValue = { ...this.getFormDefaults(), ...prepaymentAmortization };
    form.reset(
      {
        ...prepaymentAmortizationRawValue,
        id: { value: prepaymentAmortizationRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): PrepaymentAmortizationFormDefaults {
    return {
      id: null,
      inactive: false,
      placeholders: [],
    };
  }
}
