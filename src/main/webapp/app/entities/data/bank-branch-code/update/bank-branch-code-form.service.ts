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

import { IBankBranchCode, NewBankBranchCode } from '../bank-branch-code.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IBankBranchCode for edit and NewBankBranchCodeFormGroupInput for create.
 */
type BankBranchCodeFormGroupInput = IBankBranchCode | PartialWithRequiredKeyOf<NewBankBranchCode>;

type BankBranchCodeFormDefaults = Pick<NewBankBranchCode, 'id' | 'placeholders'>;

type BankBranchCodeFormGroupContent = {
  id: FormControl<IBankBranchCode['id'] | NewBankBranchCode['id']>;
  bankCode: FormControl<IBankBranchCode['bankCode']>;
  bankName: FormControl<IBankBranchCode['bankName']>;
  branchCode: FormControl<IBankBranchCode['branchCode']>;
  branchName: FormControl<IBankBranchCode['branchName']>;
  notes: FormControl<IBankBranchCode['notes']>;
  placeholders: FormControl<IBankBranchCode['placeholders']>;
};

export type BankBranchCodeFormGroup = FormGroup<BankBranchCodeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class BankBranchCodeFormService {
  createBankBranchCodeFormGroup(bankBranchCode: BankBranchCodeFormGroupInput = { id: null }): BankBranchCodeFormGroup {
    const bankBranchCodeRawValue = {
      ...this.getFormDefaults(),
      ...bankBranchCode,
    };
    return new FormGroup<BankBranchCodeFormGroupContent>({
      id: new FormControl(
        { value: bankBranchCodeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      bankCode: new FormControl(bankBranchCodeRawValue.bankCode),
      bankName: new FormControl(bankBranchCodeRawValue.bankName, {
        validators: [Validators.required],
      }),
      branchCode: new FormControl(bankBranchCodeRawValue.branchCode),
      branchName: new FormControl(bankBranchCodeRawValue.branchName),
      notes: new FormControl(bankBranchCodeRawValue.notes),
      placeholders: new FormControl(bankBranchCodeRawValue.placeholders ?? []),
    });
  }

  getBankBranchCode(form: BankBranchCodeFormGroup): IBankBranchCode | NewBankBranchCode {
    return form.getRawValue() as IBankBranchCode | NewBankBranchCode;
  }

  resetForm(form: BankBranchCodeFormGroup, bankBranchCode: BankBranchCodeFormGroupInput): void {
    const bankBranchCodeRawValue = { ...this.getFormDefaults(), ...bankBranchCode };
    form.reset(
      {
        ...bankBranchCodeRawValue,
        id: { value: bankBranchCodeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): BankBranchCodeFormDefaults {
    return {
      id: null,
      placeholders: [],
    };
  }
}
