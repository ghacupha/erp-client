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
