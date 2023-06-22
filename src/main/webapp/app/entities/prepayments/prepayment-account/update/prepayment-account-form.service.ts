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

import { IPrepaymentAccount, NewPrepaymentAccount } from '../prepayment-account.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IPrepaymentAccount for edit and NewPrepaymentAccountFormGroupInput for create.
 */
type PrepaymentAccountFormGroupInput = IPrepaymentAccount | PartialWithRequiredKeyOf<NewPrepaymentAccount>;

type PrepaymentAccountFormDefaults = Pick<
  NewPrepaymentAccount,
  'id' | 'placeholders' | 'generalParameters' | 'prepaymentParameters' | 'businessDocuments'
>;

type PrepaymentAccountFormGroupContent = {
  id: FormControl<IPrepaymentAccount['id'] | NewPrepaymentAccount['id']>;
  catalogueNumber: FormControl<IPrepaymentAccount['catalogueNumber']>;
  particulars: FormControl<IPrepaymentAccount['particulars']>;
  notes: FormControl<IPrepaymentAccount['notes']>;
  prepaymentAmount: FormControl<IPrepaymentAccount['prepaymentAmount']>;
  prepaymentGuid: FormControl<IPrepaymentAccount['prepaymentGuid']>;
  settlementCurrency: FormControl<IPrepaymentAccount['settlementCurrency']>;
  prepaymentTransaction: FormControl<IPrepaymentAccount['prepaymentTransaction']>;
  serviceOutlet: FormControl<IPrepaymentAccount['serviceOutlet']>;
  dealer: FormControl<IPrepaymentAccount['dealer']>;
  debitAccount: FormControl<IPrepaymentAccount['debitAccount']>;
  transferAccount: FormControl<IPrepaymentAccount['transferAccount']>;
  placeholders: FormControl<IPrepaymentAccount['placeholders']>;
  generalParameters: FormControl<IPrepaymentAccount['generalParameters']>;
  prepaymentParameters: FormControl<IPrepaymentAccount['prepaymentParameters']>;
  businessDocuments: FormControl<IPrepaymentAccount['businessDocuments']>;
};

export type PrepaymentAccountFormGroup = FormGroup<PrepaymentAccountFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class PrepaymentAccountFormService {
  createPrepaymentAccountFormGroup(prepaymentAccount: PrepaymentAccountFormGroupInput = { id: null }): PrepaymentAccountFormGroup {
    const prepaymentAccountRawValue = {
      ...this.getFormDefaults(),
      ...prepaymentAccount,
    };
    return new FormGroup<PrepaymentAccountFormGroupContent>({
      id: new FormControl(
        { value: prepaymentAccountRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      catalogueNumber: new FormControl(prepaymentAccountRawValue.catalogueNumber, {
        validators: [Validators.required],
      }),
      particulars: new FormControl(prepaymentAccountRawValue.particulars, {
        validators: [Validators.required],
      }),
      notes: new FormControl(prepaymentAccountRawValue.notes),
      prepaymentAmount: new FormControl(prepaymentAccountRawValue.prepaymentAmount),
      prepaymentGuid: new FormControl(prepaymentAccountRawValue.prepaymentGuid),
      settlementCurrency: new FormControl(prepaymentAccountRawValue.settlementCurrency),
      prepaymentTransaction: new FormControl(prepaymentAccountRawValue.prepaymentTransaction),
      serviceOutlet: new FormControl(prepaymentAccountRawValue.serviceOutlet),
      dealer: new FormControl(prepaymentAccountRawValue.dealer),
      debitAccount: new FormControl(prepaymentAccountRawValue.debitAccount),
      transferAccount: new FormControl(prepaymentAccountRawValue.transferAccount),
      placeholders: new FormControl(prepaymentAccountRawValue.placeholders ?? []),
      generalParameters: new FormControl(prepaymentAccountRawValue.generalParameters ?? []),
      prepaymentParameters: new FormControl(prepaymentAccountRawValue.prepaymentParameters ?? []),
      businessDocuments: new FormControl(prepaymentAccountRawValue.businessDocuments ?? []),
    });
  }

  getPrepaymentAccount(form: PrepaymentAccountFormGroup): IPrepaymentAccount | NewPrepaymentAccount {
    return form.getRawValue() as IPrepaymentAccount | NewPrepaymentAccount;
  }

  resetForm(form: PrepaymentAccountFormGroup, prepaymentAccount: PrepaymentAccountFormGroupInput): void {
    const prepaymentAccountRawValue = { ...this.getFormDefaults(), ...prepaymentAccount };
    form.reset(
      {
        ...prepaymentAccountRawValue,
        id: { value: prepaymentAccountRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): PrepaymentAccountFormDefaults {
    return {
      id: null,
      placeholders: [],
      generalParameters: [],
      prepaymentParameters: [],
      businessDocuments: [],
    };
  }
}
