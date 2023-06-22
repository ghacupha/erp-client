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

import { ILeaseContract, NewLeaseContract } from '../lease-contract.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ILeaseContract for edit and NewLeaseContractFormGroupInput for create.
 */
type LeaseContractFormGroupInput = ILeaseContract | PartialWithRequiredKeyOf<NewLeaseContract>;

type LeaseContractFormDefaults = Pick<
  NewLeaseContract,
  'id' | 'placeholders' | 'systemMappings' | 'businessDocuments' | 'contractMetadata'
>;

type LeaseContractFormGroupContent = {
  id: FormControl<ILeaseContract['id'] | NewLeaseContract['id']>;
  bookingId: FormControl<ILeaseContract['bookingId']>;
  leaseTitle: FormControl<ILeaseContract['leaseTitle']>;
  identifier: FormControl<ILeaseContract['identifier']>;
  description: FormControl<ILeaseContract['description']>;
  commencementDate: FormControl<ILeaseContract['commencementDate']>;
  terminalDate: FormControl<ILeaseContract['terminalDate']>;
  placeholders: FormControl<ILeaseContract['placeholders']>;
  systemMappings: FormControl<ILeaseContract['systemMappings']>;
  businessDocuments: FormControl<ILeaseContract['businessDocuments']>;
  contractMetadata: FormControl<ILeaseContract['contractMetadata']>;
};

export type LeaseContractFormGroup = FormGroup<LeaseContractFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class LeaseContractFormService {
  createLeaseContractFormGroup(leaseContract: LeaseContractFormGroupInput = { id: null }): LeaseContractFormGroup {
    const leaseContractRawValue = {
      ...this.getFormDefaults(),
      ...leaseContract,
    };
    return new FormGroup<LeaseContractFormGroupContent>({
      id: new FormControl(
        { value: leaseContractRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      bookingId: new FormControl(leaseContractRawValue.bookingId, {
        validators: [Validators.required],
      }),
      leaseTitle: new FormControl(leaseContractRawValue.leaseTitle, {
        validators: [Validators.required],
      }),
      identifier: new FormControl(leaseContractRawValue.identifier, {
        validators: [Validators.required],
      }),
      description: new FormControl(leaseContractRawValue.description),
      commencementDate: new FormControl(leaseContractRawValue.commencementDate, {
        validators: [Validators.required],
      }),
      terminalDate: new FormControl(leaseContractRawValue.terminalDate, {
        validators: [Validators.required],
      }),
      placeholders: new FormControl(leaseContractRawValue.placeholders ?? []),
      systemMappings: new FormControl(leaseContractRawValue.systemMappings ?? []),
      businessDocuments: new FormControl(leaseContractRawValue.businessDocuments ?? []),
      contractMetadata: new FormControl(leaseContractRawValue.contractMetadata ?? []),
    });
  }

  getLeaseContract(form: LeaseContractFormGroup): ILeaseContract | NewLeaseContract {
    return form.getRawValue() as ILeaseContract | NewLeaseContract;
  }

  resetForm(form: LeaseContractFormGroup, leaseContract: LeaseContractFormGroupInput): void {
    const leaseContractRawValue = { ...this.getFormDefaults(), ...leaseContract };
    form.reset(
      {
        ...leaseContractRawValue,
        id: { value: leaseContractRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): LeaseContractFormDefaults {
    return {
      id: null,
      placeholders: [],
      systemMappings: [],
      businessDocuments: [],
      contractMetadata: [],
    };
  }
}
