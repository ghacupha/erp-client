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

import { ISystemContentType, NewSystemContentType } from '../system-content-type.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ISystemContentType for edit and NewSystemContentTypeFormGroupInput for create.
 */
type SystemContentTypeFormGroupInput = ISystemContentType | PartialWithRequiredKeyOf<NewSystemContentType>;

type SystemContentTypeFormDefaults = Pick<NewSystemContentType, 'id' | 'placeholders' | 'sysMaps'>;

type SystemContentTypeFormGroupContent = {
  id: FormControl<ISystemContentType['id'] | NewSystemContentType['id']>;
  contentTypeName: FormControl<ISystemContentType['contentTypeName']>;
  contentTypeHeader: FormControl<ISystemContentType['contentTypeHeader']>;
  comments: FormControl<ISystemContentType['comments']>;
  availability: FormControl<ISystemContentType['availability']>;
  placeholders: FormControl<ISystemContentType['placeholders']>;
  sysMaps: FormControl<ISystemContentType['sysMaps']>;
};

export type SystemContentTypeFormGroup = FormGroup<SystemContentTypeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class SystemContentTypeFormService {
  createSystemContentTypeFormGroup(systemContentType: SystemContentTypeFormGroupInput = { id: null }): SystemContentTypeFormGroup {
    const systemContentTypeRawValue = {
      ...this.getFormDefaults(),
      ...systemContentType,
    };
    return new FormGroup<SystemContentTypeFormGroupContent>({
      id: new FormControl(
        { value: systemContentTypeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      contentTypeName: new FormControl(systemContentTypeRawValue.contentTypeName, {
        validators: [Validators.required],
      }),
      contentTypeHeader: new FormControl(systemContentTypeRawValue.contentTypeHeader, {
        validators: [Validators.required],
      }),
      comments: new FormControl(systemContentTypeRawValue.comments),
      availability: new FormControl(systemContentTypeRawValue.availability, {
        validators: [Validators.required],
      }),
      placeholders: new FormControl(systemContentTypeRawValue.placeholders ?? []),
      sysMaps: new FormControl(systemContentTypeRawValue.sysMaps ?? []),
    });
  }

  getSystemContentType(form: SystemContentTypeFormGroup): ISystemContentType | NewSystemContentType {
    return form.getRawValue() as ISystemContentType | NewSystemContentType;
  }

  resetForm(form: SystemContentTypeFormGroup, systemContentType: SystemContentTypeFormGroupInput): void {
    const systemContentTypeRawValue = { ...this.getFormDefaults(), ...systemContentType };
    form.reset(
      {
        ...systemContentTypeRawValue,
        id: { value: systemContentTypeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): SystemContentTypeFormDefaults {
    return {
      id: null,
      placeholders: [],
      sysMaps: [],
    };
  }
}
