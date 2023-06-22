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

import { IWorkInProgressTransfer, NewWorkInProgressTransfer } from '../work-in-progress-transfer.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IWorkInProgressTransfer for edit and NewWorkInProgressTransferFormGroupInput for create.
 */
type WorkInProgressTransferFormGroupInput = IWorkInProgressTransfer | PartialWithRequiredKeyOf<NewWorkInProgressTransfer>;

type WorkInProgressTransferFormDefaults = Pick<
  NewWorkInProgressTransfer,
  'id' | 'workInProgressRegistrations' | 'placeholders' | 'businessDocuments'
>;

type WorkInProgressTransferFormGroupContent = {
  id: FormControl<IWorkInProgressTransfer['id'] | NewWorkInProgressTransfer['id']>;
  description: FormControl<IWorkInProgressTransfer['description']>;
  targetAssetNumber: FormControl<IWorkInProgressTransfer['targetAssetNumber']>;
  workInProgressRegistrations: FormControl<IWorkInProgressTransfer['workInProgressRegistrations']>;
  placeholders: FormControl<IWorkInProgressTransfer['placeholders']>;
  businessDocuments: FormControl<IWorkInProgressTransfer['businessDocuments']>;
};

export type WorkInProgressTransferFormGroup = FormGroup<WorkInProgressTransferFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class WorkInProgressTransferFormService {
  createWorkInProgressTransferFormGroup(
    workInProgressTransfer: WorkInProgressTransferFormGroupInput = { id: null }
  ): WorkInProgressTransferFormGroup {
    const workInProgressTransferRawValue = {
      ...this.getFormDefaults(),
      ...workInProgressTransfer,
    };
    return new FormGroup<WorkInProgressTransferFormGroupContent>({
      id: new FormControl(
        { value: workInProgressTransferRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      description: new FormControl(workInProgressTransferRawValue.description),
      targetAssetNumber: new FormControl(workInProgressTransferRawValue.targetAssetNumber),
      workInProgressRegistrations: new FormControl(workInProgressTransferRawValue.workInProgressRegistrations ?? []),
      placeholders: new FormControl(workInProgressTransferRawValue.placeholders ?? []),
      businessDocuments: new FormControl(workInProgressTransferRawValue.businessDocuments ?? []),
    });
  }

  getWorkInProgressTransfer(form: WorkInProgressTransferFormGroup): IWorkInProgressTransfer | NewWorkInProgressTransfer {
    return form.getRawValue() as IWorkInProgressTransfer | NewWorkInProgressTransfer;
  }

  resetForm(form: WorkInProgressTransferFormGroup, workInProgressTransfer: WorkInProgressTransferFormGroupInput): void {
    const workInProgressTransferRawValue = { ...this.getFormDefaults(), ...workInProgressTransfer };
    form.reset(
      {
        ...workInProgressTransferRawValue,
        id: { value: workInProgressTransferRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): WorkInProgressTransferFormDefaults {
    return {
      id: null,
      workInProgressRegistrations: [],
      placeholders: [],
      businessDocuments: [],
    };
  }
}
