import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IOutletStatus, NewOutletStatus } from '../outlet-status.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IOutletStatus for edit and NewOutletStatusFormGroupInput for create.
 */
type OutletStatusFormGroupInput = IOutletStatus | PartialWithRequiredKeyOf<NewOutletStatus>;

type OutletStatusFormDefaults = Pick<NewOutletStatus, 'id' | 'placeholders'>;

type OutletStatusFormGroupContent = {
  id: FormControl<IOutletStatus['id'] | NewOutletStatus['id']>;
  branchStatusTypeCode: FormControl<IOutletStatus['branchStatusTypeCode']>;
  branchStatusType: FormControl<IOutletStatus['branchStatusType']>;
  branchStatusTypeDescription: FormControl<IOutletStatus['branchStatusTypeDescription']>;
  placeholders: FormControl<IOutletStatus['placeholders']>;
};

export type OutletStatusFormGroup = FormGroup<OutletStatusFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class OutletStatusFormService {
  createOutletStatusFormGroup(outletStatus: OutletStatusFormGroupInput = { id: null }): OutletStatusFormGroup {
    const outletStatusRawValue = {
      ...this.getFormDefaults(),
      ...outletStatus,
    };
    return new FormGroup<OutletStatusFormGroupContent>({
      id: new FormControl(
        { value: outletStatusRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      branchStatusTypeCode: new FormControl(outletStatusRawValue.branchStatusTypeCode, {
        validators: [Validators.required],
      }),
      branchStatusType: new FormControl(outletStatusRawValue.branchStatusType, {
        validators: [Validators.required],
      }),
      branchStatusTypeDescription: new FormControl(outletStatusRawValue.branchStatusTypeDescription),
      placeholders: new FormControl(outletStatusRawValue.placeholders ?? []),
    });
  }

  getOutletStatus(form: OutletStatusFormGroup): IOutletStatus | NewOutletStatus {
    return form.getRawValue() as IOutletStatus | NewOutletStatus;
  }

  resetForm(form: OutletStatusFormGroup, outletStatus: OutletStatusFormGroupInput): void {
    const outletStatusRawValue = { ...this.getFormDefaults(), ...outletStatus };
    form.reset(
      {
        ...outletStatusRawValue,
        id: { value: outletStatusRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): OutletStatusFormDefaults {
    return {
      id: null,
      placeholders: [],
    };
  }
}
