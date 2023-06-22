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
