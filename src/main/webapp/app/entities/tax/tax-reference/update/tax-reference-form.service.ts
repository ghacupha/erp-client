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

import { ITaxReference, NewTaxReference } from '../tax-reference.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITaxReference for edit and NewTaxReferenceFormGroupInput for create.
 */
type TaxReferenceFormGroupInput = ITaxReference | PartialWithRequiredKeyOf<NewTaxReference>;

type TaxReferenceFormDefaults = Pick<NewTaxReference, 'id' | 'placeholders'>;

type TaxReferenceFormGroupContent = {
  id: FormControl<ITaxReference['id'] | NewTaxReference['id']>;
  taxName: FormControl<ITaxReference['taxName']>;
  taxDescription: FormControl<ITaxReference['taxDescription']>;
  taxPercentage: FormControl<ITaxReference['taxPercentage']>;
  taxReferenceType: FormControl<ITaxReference['taxReferenceType']>;
  fileUploadToken: FormControl<ITaxReference['fileUploadToken']>;
  compilationToken: FormControl<ITaxReference['compilationToken']>;
  placeholders: FormControl<ITaxReference['placeholders']>;
};

export type TaxReferenceFormGroup = FormGroup<TaxReferenceFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TaxReferenceFormService {
  createTaxReferenceFormGroup(taxReference: TaxReferenceFormGroupInput = { id: null }): TaxReferenceFormGroup {
    const taxReferenceRawValue = {
      ...this.getFormDefaults(),
      ...taxReference,
    };
    return new FormGroup<TaxReferenceFormGroupContent>({
      id: new FormControl(
        { value: taxReferenceRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      taxName: new FormControl(taxReferenceRawValue.taxName),
      taxDescription: new FormControl(taxReferenceRawValue.taxDescription),
      taxPercentage: new FormControl(taxReferenceRawValue.taxPercentage, {
        validators: [Validators.required],
      }),
      taxReferenceType: new FormControl(taxReferenceRawValue.taxReferenceType, {
        validators: [Validators.required],
      }),
      fileUploadToken: new FormControl(taxReferenceRawValue.fileUploadToken),
      compilationToken: new FormControl(taxReferenceRawValue.compilationToken),
      placeholders: new FormControl(taxReferenceRawValue.placeholders ?? []),
    });
  }

  getTaxReference(form: TaxReferenceFormGroup): ITaxReference | NewTaxReference {
    return form.getRawValue() as ITaxReference | NewTaxReference;
  }

  resetForm(form: TaxReferenceFormGroup, taxReference: TaxReferenceFormGroupInput): void {
    const taxReferenceRawValue = { ...this.getFormDefaults(), ...taxReference };
    form.reset(
      {
        ...taxReferenceRawValue,
        id: { value: taxReferenceRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): TaxReferenceFormDefaults {
    return {
      id: null,
      placeholders: [],
    };
  }
}
