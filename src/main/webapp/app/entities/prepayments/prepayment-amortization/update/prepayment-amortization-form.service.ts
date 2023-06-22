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
