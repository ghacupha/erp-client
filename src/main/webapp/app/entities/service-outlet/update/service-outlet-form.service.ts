import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IServiceOutlet, NewServiceOutlet } from '../service-outlet.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IServiceOutlet for edit and NewServiceOutletFormGroupInput for create.
 */
type ServiceOutletFormGroupInput = IServiceOutlet | PartialWithRequiredKeyOf<NewServiceOutlet>;

type ServiceOutletFormDefaults = Pick<NewServiceOutlet, 'id' | 'placeholders'>;

type ServiceOutletFormGroupContent = {
  id: FormControl<IServiceOutlet['id'] | NewServiceOutlet['id']>;
  outletCode: FormControl<IServiceOutlet['outletCode']>;
  outletName: FormControl<IServiceOutlet['outletName']>;
  town: FormControl<IServiceOutlet['town']>;
  parliamentaryConstituency: FormControl<IServiceOutlet['parliamentaryConstituency']>;
  gpsCoordinates: FormControl<IServiceOutlet['gpsCoordinates']>;
  outletOpeningDate: FormControl<IServiceOutlet['outletOpeningDate']>;
  regulatorApprovalDate: FormControl<IServiceOutlet['regulatorApprovalDate']>;
  outletClosureDate: FormControl<IServiceOutlet['outletClosureDate']>;
  dateLastModified: FormControl<IServiceOutlet['dateLastModified']>;
  licenseFeePayable: FormControl<IServiceOutlet['licenseFeePayable']>;
  placeholders: FormControl<IServiceOutlet['placeholders']>;
  bankCode: FormControl<IServiceOutlet['bankCode']>;
  outletType: FormControl<IServiceOutlet['outletType']>;
  outletStatus: FormControl<IServiceOutlet['outletStatus']>;
  countyName: FormControl<IServiceOutlet['countyName']>;
  subCountyName: FormControl<IServiceOutlet['subCountyName']>;
};

export type ServiceOutletFormGroup = FormGroup<ServiceOutletFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ServiceOutletFormService {
  createServiceOutletFormGroup(serviceOutlet: ServiceOutletFormGroupInput = { id: null }): ServiceOutletFormGroup {
    const serviceOutletRawValue = {
      ...this.getFormDefaults(),
      ...serviceOutlet,
    };
    return new FormGroup<ServiceOutletFormGroupContent>({
      id: new FormControl(
        { value: serviceOutletRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      outletCode: new FormControl(serviceOutletRawValue.outletCode, {
        validators: [Validators.required],
      }),
      outletName: new FormControl(serviceOutletRawValue.outletName, {
        validators: [Validators.required],
      }),
      town: new FormControl(serviceOutletRawValue.town),
      parliamentaryConstituency: new FormControl(serviceOutletRawValue.parliamentaryConstituency),
      gpsCoordinates: new FormControl(serviceOutletRawValue.gpsCoordinates),
      outletOpeningDate: new FormControl(serviceOutletRawValue.outletOpeningDate),
      regulatorApprovalDate: new FormControl(serviceOutletRawValue.regulatorApprovalDate),
      outletClosureDate: new FormControl(serviceOutletRawValue.outletClosureDate),
      dateLastModified: new FormControl(serviceOutletRawValue.dateLastModified),
      licenseFeePayable: new FormControl(serviceOutletRawValue.licenseFeePayable),
      placeholders: new FormControl(serviceOutletRawValue.placeholders ?? []),
      bankCode: new FormControl(serviceOutletRawValue.bankCode),
      outletType: new FormControl(serviceOutletRawValue.outletType),
      outletStatus: new FormControl(serviceOutletRawValue.outletStatus),
      countyName: new FormControl(serviceOutletRawValue.countyName),
      subCountyName: new FormControl(serviceOutletRawValue.subCountyName),
    });
  }

  getServiceOutlet(form: ServiceOutletFormGroup): IServiceOutlet | NewServiceOutlet {
    return form.getRawValue() as IServiceOutlet | NewServiceOutlet;
  }

  resetForm(form: ServiceOutletFormGroup, serviceOutlet: ServiceOutletFormGroupInput): void {
    const serviceOutletRawValue = { ...this.getFormDefaults(), ...serviceOutlet };
    form.reset(
      {
        ...serviceOutletRawValue,
        id: { value: serviceOutletRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ServiceOutletFormDefaults {
    return {
      id: null,
      placeholders: [],
    };
  }
}
