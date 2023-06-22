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

import { IMfbBranchCode, NewMfbBranchCode } from '../mfb-branch-code.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IMfbBranchCode for edit and NewMfbBranchCodeFormGroupInput for create.
 */
type MfbBranchCodeFormGroupInput = IMfbBranchCode | PartialWithRequiredKeyOf<NewMfbBranchCode>;

type MfbBranchCodeFormDefaults = Pick<NewMfbBranchCode, 'id' | 'placeholders'>;

type MfbBranchCodeFormGroupContent = {
  id: FormControl<IMfbBranchCode['id'] | NewMfbBranchCode['id']>;
  bankCode: FormControl<IMfbBranchCode['bankCode']>;
  bankName: FormControl<IMfbBranchCode['bankName']>;
  branchCode: FormControl<IMfbBranchCode['branchCode']>;
  branchName: FormControl<IMfbBranchCode['branchName']>;
  placeholders: FormControl<IMfbBranchCode['placeholders']>;
};

export type MfbBranchCodeFormGroup = FormGroup<MfbBranchCodeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class MfbBranchCodeFormService {
  createMfbBranchCodeFormGroup(mfbBranchCode: MfbBranchCodeFormGroupInput = { id: null }): MfbBranchCodeFormGroup {
    const mfbBranchCodeRawValue = {
      ...this.getFormDefaults(),
      ...mfbBranchCode,
    };
    return new FormGroup<MfbBranchCodeFormGroupContent>({
      id: new FormControl(
        { value: mfbBranchCodeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      bankCode: new FormControl(mfbBranchCodeRawValue.bankCode),
      bankName: new FormControl(mfbBranchCodeRawValue.bankName),
      branchCode: new FormControl(mfbBranchCodeRawValue.branchCode),
      branchName: new FormControl(mfbBranchCodeRawValue.branchName),
      placeholders: new FormControl(mfbBranchCodeRawValue.placeholders ?? []),
    });
  }

  getMfbBranchCode(form: MfbBranchCodeFormGroup): IMfbBranchCode | NewMfbBranchCode {
    return form.getRawValue() as IMfbBranchCode | NewMfbBranchCode;
  }

  resetForm(form: MfbBranchCodeFormGroup, mfbBranchCode: MfbBranchCodeFormGroupInput): void {
    const mfbBranchCodeRawValue = { ...this.getFormDefaults(), ...mfbBranchCode };
    form.reset(
      {
        ...mfbBranchCodeRawValue,
        id: { value: mfbBranchCodeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): MfbBranchCodeFormDefaults {
    return {
      id: null,
      placeholders: [],
    };
  }
}
