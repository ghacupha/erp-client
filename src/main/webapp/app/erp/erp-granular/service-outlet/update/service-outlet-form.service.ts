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
