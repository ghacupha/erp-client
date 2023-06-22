import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IPrepaymentMarshalling, NewPrepaymentMarshalling } from '../prepayment-marshalling.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IPrepaymentMarshalling for edit and NewPrepaymentMarshallingFormGroupInput for create.
 */
type PrepaymentMarshallingFormGroupInput = IPrepaymentMarshalling | PartialWithRequiredKeyOf<NewPrepaymentMarshalling>;

type PrepaymentMarshallingFormDefaults = Pick<NewPrepaymentMarshalling, 'id' | 'inactive' | 'placeholders'>;

type PrepaymentMarshallingFormGroupContent = {
  id: FormControl<IPrepaymentMarshalling['id'] | NewPrepaymentMarshalling['id']>;
  inactive: FormControl<IPrepaymentMarshalling['inactive']>;
  amortizationCommencementDate: FormControl<IPrepaymentMarshalling['amortizationCommencementDate']>;
  amortizationPeriods: FormControl<IPrepaymentMarshalling['amortizationPeriods']>;
  prepaymentAccount: FormControl<IPrepaymentMarshalling['prepaymentAccount']>;
  placeholders: FormControl<IPrepaymentMarshalling['placeholders']>;
};

export type PrepaymentMarshallingFormGroup = FormGroup<PrepaymentMarshallingFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class PrepaymentMarshallingFormService {
  createPrepaymentMarshallingFormGroup(
    prepaymentMarshalling: PrepaymentMarshallingFormGroupInput = { id: null }
  ): PrepaymentMarshallingFormGroup {
    const prepaymentMarshallingRawValue = {
      ...this.getFormDefaults(),
      ...prepaymentMarshalling,
    };
    return new FormGroup<PrepaymentMarshallingFormGroupContent>({
      id: new FormControl(
        { value: prepaymentMarshallingRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      inactive: new FormControl(prepaymentMarshallingRawValue.inactive, {
        validators: [Validators.required],
      }),
      amortizationCommencementDate: new FormControl(prepaymentMarshallingRawValue.amortizationCommencementDate),
      amortizationPeriods: new FormControl(prepaymentMarshallingRawValue.amortizationPeriods),
      prepaymentAccount: new FormControl(prepaymentMarshallingRawValue.prepaymentAccount, {
        validators: [Validators.required],
      }),
      placeholders: new FormControl(prepaymentMarshallingRawValue.placeholders ?? []),
    });
  }

  getPrepaymentMarshalling(form: PrepaymentMarshallingFormGroup): IPrepaymentMarshalling | NewPrepaymentMarshalling {
    return form.getRawValue() as IPrepaymentMarshalling | NewPrepaymentMarshalling;
  }

  resetForm(form: PrepaymentMarshallingFormGroup, prepaymentMarshalling: PrepaymentMarshallingFormGroupInput): void {
    const prepaymentMarshallingRawValue = { ...this.getFormDefaults(), ...prepaymentMarshalling };
    form.reset(
      {
        ...prepaymentMarshallingRawValue,
        id: { value: prepaymentMarshallingRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): PrepaymentMarshallingFormDefaults {
    return {
      id: null,
      inactive: false,
      placeholders: [],
    };
  }
}
