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

import { ICustomerIDDocumentType, NewCustomerIDDocumentType } from '../customer-id-document-type.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICustomerIDDocumentType for edit and NewCustomerIDDocumentTypeFormGroupInput for create.
 */
type CustomerIDDocumentTypeFormGroupInput = ICustomerIDDocumentType | PartialWithRequiredKeyOf<NewCustomerIDDocumentType>;

type CustomerIDDocumentTypeFormDefaults = Pick<NewCustomerIDDocumentType, 'id' | 'placeholders'>;

type CustomerIDDocumentTypeFormGroupContent = {
  id: FormControl<ICustomerIDDocumentType['id'] | NewCustomerIDDocumentType['id']>;
  documentCode: FormControl<ICustomerIDDocumentType['documentCode']>;
  documentType: FormControl<ICustomerIDDocumentType['documentType']>;
  documentTypeDescription: FormControl<ICustomerIDDocumentType['documentTypeDescription']>;
  placeholders: FormControl<ICustomerIDDocumentType['placeholders']>;
};

export type CustomerIDDocumentTypeFormGroup = FormGroup<CustomerIDDocumentTypeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CustomerIDDocumentTypeFormService {
  createCustomerIDDocumentTypeFormGroup(
    customerIDDocumentType: CustomerIDDocumentTypeFormGroupInput = { id: null }
  ): CustomerIDDocumentTypeFormGroup {
    const customerIDDocumentTypeRawValue = {
      ...this.getFormDefaults(),
      ...customerIDDocumentType,
    };
    return new FormGroup<CustomerIDDocumentTypeFormGroupContent>({
      id: new FormControl(
        { value: customerIDDocumentTypeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      documentCode: new FormControl(customerIDDocumentTypeRawValue.documentCode, {
        validators: [Validators.required],
      }),
      documentType: new FormControl(customerIDDocumentTypeRawValue.documentType, {
        validators: [Validators.required],
      }),
      documentTypeDescription: new FormControl(customerIDDocumentTypeRawValue.documentTypeDescription),
      placeholders: new FormControl(customerIDDocumentTypeRawValue.placeholders ?? []),
    });
  }

  getCustomerIDDocumentType(form: CustomerIDDocumentTypeFormGroup): ICustomerIDDocumentType | NewCustomerIDDocumentType {
    return form.getRawValue() as ICustomerIDDocumentType | NewCustomerIDDocumentType;
  }

  resetForm(form: CustomerIDDocumentTypeFormGroup, customerIDDocumentType: CustomerIDDocumentTypeFormGroupInput): void {
    const customerIDDocumentTypeRawValue = { ...this.getFormDefaults(), ...customerIDDocumentType };
    form.reset(
      {
        ...customerIDDocumentTypeRawValue,
        id: { value: customerIDDocumentTypeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CustomerIDDocumentTypeFormDefaults {
    return {
      id: null,
      placeholders: [],
    };
  }
}
