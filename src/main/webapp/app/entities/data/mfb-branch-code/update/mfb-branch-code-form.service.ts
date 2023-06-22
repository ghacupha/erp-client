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
