import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IApplicationUser, NewApplicationUser } from '../application-user.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IApplicationUser for edit and NewApplicationUserFormGroupInput for create.
 */
type ApplicationUserFormGroupInput = IApplicationUser | PartialWithRequiredKeyOf<NewApplicationUser>;

type ApplicationUserFormDefaults = Pick<NewApplicationUser, 'id' | 'userProperties'>;

type ApplicationUserFormGroupContent = {
  id: FormControl<IApplicationUser['id'] | NewApplicationUser['id']>;
  designation: FormControl<IApplicationUser['designation']>;
  applicationIdentity: FormControl<IApplicationUser['applicationIdentity']>;
  organization: FormControl<IApplicationUser['organization']>;
  department: FormControl<IApplicationUser['department']>;
  securityClearance: FormControl<IApplicationUser['securityClearance']>;
  systemIdentity: FormControl<IApplicationUser['systemIdentity']>;
  userProperties: FormControl<IApplicationUser['userProperties']>;
  dealerIdentity: FormControl<IApplicationUser['dealerIdentity']>;
};

export type ApplicationUserFormGroup = FormGroup<ApplicationUserFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ApplicationUserFormService {
  createApplicationUserFormGroup(applicationUser: ApplicationUserFormGroupInput = { id: null }): ApplicationUserFormGroup {
    const applicationUserRawValue = {
      ...this.getFormDefaults(),
      ...applicationUser,
    };
    return new FormGroup<ApplicationUserFormGroupContent>({
      id: new FormControl(
        { value: applicationUserRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      designation: new FormControl(applicationUserRawValue.designation, {
        validators: [Validators.required],
      }),
      applicationIdentity: new FormControl(applicationUserRawValue.applicationIdentity, {
        validators: [Validators.required],
      }),
      organization: new FormControl(applicationUserRawValue.organization, {
        validators: [Validators.required],
      }),
      department: new FormControl(applicationUserRawValue.department, {
        validators: [Validators.required],
      }),
      securityClearance: new FormControl(applicationUserRawValue.securityClearance, {
        validators: [Validators.required],
      }),
      systemIdentity: new FormControl(applicationUserRawValue.systemIdentity, {
        validators: [Validators.required],
      }),
      userProperties: new FormControl(applicationUserRawValue.userProperties ?? []),
      dealerIdentity: new FormControl(applicationUserRawValue.dealerIdentity, {
        validators: [Validators.required],
      }),
    });
  }

  getApplicationUser(form: ApplicationUserFormGroup): IApplicationUser | NewApplicationUser {
    return form.getRawValue() as IApplicationUser | NewApplicationUser;
  }

  resetForm(form: ApplicationUserFormGroup, applicationUser: ApplicationUserFormGroupInput): void {
    const applicationUserRawValue = { ...this.getFormDefaults(), ...applicationUser };
    form.reset(
      {
        ...applicationUserRawValue,
        id: { value: applicationUserRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ApplicationUserFormDefaults {
    return {
      id: null,
      userProperties: [],
    };
  }
}
