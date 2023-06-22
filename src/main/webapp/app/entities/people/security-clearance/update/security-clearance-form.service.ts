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

import { ISecurityClearance, NewSecurityClearance } from '../security-clearance.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ISecurityClearance for edit and NewSecurityClearanceFormGroupInput for create.
 */
type SecurityClearanceFormGroupInput = ISecurityClearance | PartialWithRequiredKeyOf<NewSecurityClearance>;

type SecurityClearanceFormDefaults = Pick<NewSecurityClearance, 'id' | 'grantedClearances' | 'placeholders'>;

type SecurityClearanceFormGroupContent = {
  id: FormControl<ISecurityClearance['id'] | NewSecurityClearance['id']>;
  clearanceLevel: FormControl<ISecurityClearance['clearanceLevel']>;
  grantedClearances: FormControl<ISecurityClearance['grantedClearances']>;
  placeholders: FormControl<ISecurityClearance['placeholders']>;
};

export type SecurityClearanceFormGroup = FormGroup<SecurityClearanceFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class SecurityClearanceFormService {
  createSecurityClearanceFormGroup(securityClearance: SecurityClearanceFormGroupInput = { id: null }): SecurityClearanceFormGroup {
    const securityClearanceRawValue = {
      ...this.getFormDefaults(),
      ...securityClearance,
    };
    return new FormGroup<SecurityClearanceFormGroupContent>({
      id: new FormControl(
        { value: securityClearanceRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      clearanceLevel: new FormControl(securityClearanceRawValue.clearanceLevel, {
        validators: [Validators.required],
      }),
      grantedClearances: new FormControl(securityClearanceRawValue.grantedClearances ?? []),
      placeholders: new FormControl(securityClearanceRawValue.placeholders ?? []),
    });
  }

  getSecurityClearance(form: SecurityClearanceFormGroup): ISecurityClearance | NewSecurityClearance {
    return form.getRawValue() as ISecurityClearance | NewSecurityClearance;
  }

  resetForm(form: SecurityClearanceFormGroup, securityClearance: SecurityClearanceFormGroupInput): void {
    const securityClearanceRawValue = { ...this.getFormDefaults(), ...securityClearance };
    form.reset(
      {
        ...securityClearanceRawValue,
        id: { value: securityClearanceRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): SecurityClearanceFormDefaults {
    return {
      id: null,
      grantedClearances: [],
      placeholders: [],
    };
  }
}
