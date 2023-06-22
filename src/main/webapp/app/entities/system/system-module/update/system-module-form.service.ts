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
