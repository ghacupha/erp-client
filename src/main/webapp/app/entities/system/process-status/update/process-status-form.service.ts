import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IProcessStatus, NewProcessStatus } from '../process-status.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IProcessStatus for edit and NewProcessStatusFormGroupInput for create.
 */
type ProcessStatusFormGroupInput = IProcessStatus | PartialWithRequiredKeyOf<NewProcessStatus>;

type ProcessStatusFormDefaults = Pick<NewProcessStatus, 'id' | 'placeholders' | 'parameters'>;

type ProcessStatusFormGroupContent = {
  id: FormControl<IProcessStatus['id'] | NewProcessStatus['id']>;
  statusCode: FormControl<IProcessStatus['statusCode']>;
  description: FormControl<IProcessStatus['description']>;
  placeholders: FormControl<IProcessStatus['placeholders']>;
  parameters: FormControl<IProcessStatus['parameters']>;
};

export type ProcessStatusFormGroup = FormGroup<ProcessStatusFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ProcessStatusFormService {
  createProcessStatusFormGroup(processStatus: ProcessStatusFormGroupInput = { id: null }): ProcessStatusFormGroup {
    const processStatusRawValue = {
      ...this.getFormDefaults(),
      ...processStatus,
    };
    return new FormGroup<ProcessStatusFormGroupContent>({
      id: new FormControl(
        { value: processStatusRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      statusCode: new FormControl(processStatusRawValue.statusCode, {
        validators: [Validators.required],
      }),
      description: new FormControl(processStatusRawValue.description, {
        validators: [Validators.required],
      }),
      placeholders: new FormControl(processStatusRawValue.placeholders ?? []),
      parameters: new FormControl(processStatusRawValue.parameters ?? []),
    });
  }

  getProcessStatus(form: ProcessStatusFormGroup): IProcessStatus | NewProcessStatus {
    return form.getRawValue() as IProcessStatus | NewProcessStatus;
  }

  resetForm(form: ProcessStatusFormGroup, processStatus: ProcessStatusFormGroupInput): void {
    const processStatusRawValue = { ...this.getFormDefaults(), ...processStatus };
    form.reset(
      {
        ...processStatusRawValue,
        id: { value: processStatusRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ProcessStatusFormDefaults {
    return {
      id: null,
      placeholders: [],
      parameters: [],
    };
  }
}
