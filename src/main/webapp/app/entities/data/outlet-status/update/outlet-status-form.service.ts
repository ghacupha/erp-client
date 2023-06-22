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
