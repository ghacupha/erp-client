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

import { ISystemModule, NewSystemModule } from '../system-module.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ISystemModule for edit and NewSystemModuleFormGroupInput for create.
 */
type SystemModuleFormGroupInput = ISystemModule | PartialWithRequiredKeyOf<NewSystemModule>;

type SystemModuleFormDefaults = Pick<NewSystemModule, 'id'>;

type SystemModuleFormGroupContent = {
  id: FormControl<ISystemModule['id'] | NewSystemModule['id']>;
  moduleName: FormControl<ISystemModule['moduleName']>;
};

export type SystemModuleFormGroup = FormGroup<SystemModuleFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class SystemModuleFormService {
  createSystemModuleFormGroup(systemModule: SystemModuleFormGroupInput = { id: null }): SystemModuleFormGroup {
    const systemModuleRawValue = {
      ...this.getFormDefaults(),
      ...systemModule,
    };
    return new FormGroup<SystemModuleFormGroupContent>({
      id: new FormControl(
        { value: systemModuleRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      moduleName: new FormControl(systemModuleRawValue.moduleName, {
        validators: [Validators.required],
      }),
    });
  }

  getSystemModule(form: SystemModuleFormGroup): ISystemModule | NewSystemModule {
    return form.getRawValue() as ISystemModule | NewSystemModule;
  }

  resetForm(form: SystemModuleFormGroup, systemModule: SystemModuleFormGroupInput): void {
    const systemModuleRawValue = { ...this.getFormDefaults(), ...systemModule };
    form.reset(
      {
        ...systemModuleRawValue,
        id: { value: systemModuleRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): SystemModuleFormDefaults {
    return {
      id: null,
    };
  }
}
