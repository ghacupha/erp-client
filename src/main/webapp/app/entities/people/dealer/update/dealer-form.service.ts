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

import { IDealer, NewDealer } from '../dealer.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDealer for edit and NewDealerFormGroupInput for create.
 */
type DealerFormGroupInput = IDealer | PartialWithRequiredKeyOf<NewDealer>;

type DealerFormDefaults = Pick<NewDealer, 'id' | 'paymentLabels' | 'placeholders'>;

type DealerFormGroupContent = {
  id: FormControl<IDealer['id'] | NewDealer['id']>;
  dealerName: FormControl<IDealer['dealerName']>;
  taxNumber: FormControl<IDealer['taxNumber']>;
  identificationDocumentNumber: FormControl<IDealer['identificationDocumentNumber']>;
  organizationName: FormControl<IDealer['organizationName']>;
  department: FormControl<IDealer['department']>;
  position: FormControl<IDealer['position']>;
  postalAddress: FormControl<IDealer['postalAddress']>;
  physicalAddress: FormControl<IDealer['physicalAddress']>;
  accountName: FormControl<IDealer['accountName']>;
  accountNumber: FormControl<IDealer['accountNumber']>;
  bankersName: FormControl<IDealer['bankersName']>;
  bankersBranch: FormControl<IDealer['bankersBranch']>;
  bankersSwiftCode: FormControl<IDealer['bankersSwiftCode']>;
  fileUploadToken: FormControl<IDealer['fileUploadToken']>;
  compilationToken: FormControl<IDealer['compilationToken']>;
  remarks: FormControl<IDealer['remarks']>;
  otherNames: FormControl<IDealer['otherNames']>;
  paymentLabels: FormControl<IDealer['paymentLabels']>;
  dealerGroup: FormControl<IDealer['dealerGroup']>;
  placeholders: FormControl<IDealer['placeholders']>;
};

export type DealerFormGroup = FormGroup<DealerFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DealerFormService {
  createDealerFormGroup(dealer: DealerFormGroupInput = { id: null }): DealerFormGroup {
    const dealerRawValue = {
      ...this.getFormDefaults(),
      ...dealer,
    };
    return new FormGroup<DealerFormGroupContent>({
      id: new FormControl(
        { value: dealerRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      dealerName: new FormControl(dealerRawValue.dealerName, {
        validators: [Validators.required],
      }),
      taxNumber: new FormControl(dealerRawValue.taxNumber),
      identificationDocumentNumber: new FormControl(dealerRawValue.identificationDocumentNumber),
      organizationName: new FormControl(dealerRawValue.organizationName),
      department: new FormControl(dealerRawValue.department),
      position: new FormControl(dealerRawValue.position),
      postalAddress: new FormControl(dealerRawValue.postalAddress),
      physicalAddress: new FormControl(dealerRawValue.physicalAddress),
      accountName: new FormControl(dealerRawValue.accountName),
      accountNumber: new FormControl(dealerRawValue.accountNumber),
      bankersName: new FormControl(dealerRawValue.bankersName),
      bankersBranch: new FormControl(dealerRawValue.bankersBranch),
      bankersSwiftCode: new FormControl(dealerRawValue.bankersSwiftCode),
      fileUploadToken: new FormControl(dealerRawValue.fileUploadToken),
      compilationToken: new FormControl(dealerRawValue.compilationToken),
      remarks: new FormControl(dealerRawValue.remarks),
      otherNames: new FormControl(dealerRawValue.otherNames),
      paymentLabels: new FormControl(dealerRawValue.paymentLabels ?? []),
      dealerGroup: new FormControl(dealerRawValue.dealerGroup),
      placeholders: new FormControl(dealerRawValue.placeholders ?? []),
    });
  }

  getDealer(form: DealerFormGroup): IDealer | NewDealer {
    return form.getRawValue() as IDealer | NewDealer;
  }

  resetForm(form: DealerFormGroup, dealer: DealerFormGroupInput): void {
    const dealerRawValue = { ...this.getFormDefaults(), ...dealer };
    form.reset(
      {
        ...dealerRawValue,
        id: { value: dealerRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): DealerFormDefaults {
    return {
      id: null,
      paymentLabels: [],
      placeholders: [],
    };
  }
}
