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

import { IBusinessStamp, NewBusinessStamp } from '../business-stamp.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IBusinessStamp for edit and NewBusinessStampFormGroupInput for create.
 */
type BusinessStampFormGroupInput = IBusinessStamp | PartialWithRequiredKeyOf<NewBusinessStamp>;

type BusinessStampFormDefaults = Pick<NewBusinessStamp, 'id' | 'placeholders'>;

type BusinessStampFormGroupContent = {
  id: FormControl<IBusinessStamp['id'] | NewBusinessStamp['id']>;
  stampDate: FormControl<IBusinessStamp['stampDate']>;
  purpose: FormControl<IBusinessStamp['purpose']>;
  details: FormControl<IBusinessStamp['details']>;
  remarks: FormControl<IBusinessStamp['remarks']>;
  stampHolder: FormControl<IBusinessStamp['stampHolder']>;
  placeholders: FormControl<IBusinessStamp['placeholders']>;
};

export type BusinessStampFormGroup = FormGroup<BusinessStampFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class BusinessStampFormService {
  createBusinessStampFormGroup(businessStamp: BusinessStampFormGroupInput = { id: null }): BusinessStampFormGroup {
    const businessStampRawValue = {
      ...this.getFormDefaults(),
      ...businessStamp,
    };
    return new FormGroup<BusinessStampFormGroupContent>({
      id: new FormControl(
        { value: businessStampRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      stampDate: new FormControl(businessStampRawValue.stampDate),
      purpose: new FormControl(businessStampRawValue.purpose),
      details: new FormControl(businessStampRawValue.details),
      remarks: new FormControl(businessStampRawValue.remarks),
      stampHolder: new FormControl(businessStampRawValue.stampHolder, {
        validators: [Validators.required],
      }),
      placeholders: new FormControl(businessStampRawValue.placeholders ?? []),
    });
  }

  getBusinessStamp(form: BusinessStampFormGroup): IBusinessStamp | NewBusinessStamp {
    return form.getRawValue() as IBusinessStamp | NewBusinessStamp;
  }

  resetForm(form: BusinessStampFormGroup, businessStamp: BusinessStampFormGroupInput): void {
    const businessStampRawValue = { ...this.getFormDefaults(), ...businessStamp };
    form.reset(
      {
        ...businessStampRawValue,
        id: { value: businessStampRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): BusinessStampFormDefaults {
    return {
      id: null,
      placeholders: [],
    };
  }
}
