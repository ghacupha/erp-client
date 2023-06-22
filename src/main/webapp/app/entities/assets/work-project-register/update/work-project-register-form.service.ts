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

import { IWorkProjectRegister, NewWorkProjectRegister } from '../work-project-register.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IWorkProjectRegister for edit and NewWorkProjectRegisterFormGroupInput for create.
 */
type WorkProjectRegisterFormGroupInput = IWorkProjectRegister | PartialWithRequiredKeyOf<NewWorkProjectRegister>;

type WorkProjectRegisterFormDefaults = Pick<NewWorkProjectRegister, 'id' | 'dealers' | 'placeholders' | 'businessDocuments'>;

type WorkProjectRegisterFormGroupContent = {
  id: FormControl<IWorkProjectRegister['id'] | NewWorkProjectRegister['id']>;
  catalogueNumber: FormControl<IWorkProjectRegister['catalogueNumber']>;
  description: FormControl<IWorkProjectRegister['description']>;
  details: FormControl<IWorkProjectRegister['details']>;
  detailsContentType: FormControl<IWorkProjectRegister['detailsContentType']>;
  totalProjectCost: FormControl<IWorkProjectRegister['totalProjectCost']>;
  additionalNotes: FormControl<IWorkProjectRegister['additionalNotes']>;
  additionalNotesContentType: FormControl<IWorkProjectRegister['additionalNotesContentType']>;
  dealers: FormControl<IWorkProjectRegister['dealers']>;
  settlementCurrency: FormControl<IWorkProjectRegister['settlementCurrency']>;
  placeholders: FormControl<IWorkProjectRegister['placeholders']>;
  businessDocuments: FormControl<IWorkProjectRegister['businessDocuments']>;
};

export type WorkProjectRegisterFormGroup = FormGroup<WorkProjectRegisterFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class WorkProjectRegisterFormService {
  createWorkProjectRegisterFormGroup(workProjectRegister: WorkProjectRegisterFormGroupInput = { id: null }): WorkProjectRegisterFormGroup {
    const workProjectRegisterRawValue = {
      ...this.getFormDefaults(),
      ...workProjectRegister,
    };
    return new FormGroup<WorkProjectRegisterFormGroupContent>({
      id: new FormControl(
        { value: workProjectRegisterRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      catalogueNumber: new FormControl(workProjectRegisterRawValue.catalogueNumber, {
        validators: [Validators.required],
      }),
      description: new FormControl(workProjectRegisterRawValue.description, {
        validators: [Validators.required],
      }),
      details: new FormControl(workProjectRegisterRawValue.details),
      detailsContentType: new FormControl(workProjectRegisterRawValue.detailsContentType),
      totalProjectCost: new FormControl(workProjectRegisterRawValue.totalProjectCost),
      additionalNotes: new FormControl(workProjectRegisterRawValue.additionalNotes),
      additionalNotesContentType: new FormControl(workProjectRegisterRawValue.additionalNotesContentType),
      dealers: new FormControl(workProjectRegisterRawValue.dealers ?? []),
      settlementCurrency: new FormControl(workProjectRegisterRawValue.settlementCurrency),
      placeholders: new FormControl(workProjectRegisterRawValue.placeholders ?? []),
      businessDocuments: new FormControl(workProjectRegisterRawValue.businessDocuments ?? []),
    });
  }

  getWorkProjectRegister(form: WorkProjectRegisterFormGroup): IWorkProjectRegister | NewWorkProjectRegister {
    return form.getRawValue() as IWorkProjectRegister | NewWorkProjectRegister;
  }

  resetForm(form: WorkProjectRegisterFormGroup, workProjectRegister: WorkProjectRegisterFormGroupInput): void {
    const workProjectRegisterRawValue = { ...this.getFormDefaults(), ...workProjectRegister };
    form.reset(
      {
        ...workProjectRegisterRawValue,
        id: { value: workProjectRegisterRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): WorkProjectRegisterFormDefaults {
    return {
      id: null,
      dealers: [],
      placeholders: [],
      businessDocuments: [],
    };
  }
}
