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

import { IAgencyNotice, NewAgencyNotice } from '../agency-notice.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IAgencyNotice for edit and NewAgencyNoticeFormGroupInput for create.
 */
type AgencyNoticeFormGroupInput = IAgencyNotice | PartialWithRequiredKeyOf<NewAgencyNotice>;

type AgencyNoticeFormDefaults = Pick<NewAgencyNotice, 'id' | 'correspondents' | 'placeholders' | 'businessDocuments'>;

type AgencyNoticeFormGroupContent = {
  id: FormControl<IAgencyNotice['id'] | NewAgencyNotice['id']>;
  referenceNumber: FormControl<IAgencyNotice['referenceNumber']>;
  referenceDate: FormControl<IAgencyNotice['referenceDate']>;
  assessmentAmount: FormControl<IAgencyNotice['assessmentAmount']>;
  agencyStatus: FormControl<IAgencyNotice['agencyStatus']>;
  assessmentNotice: FormControl<IAgencyNotice['assessmentNotice']>;
  assessmentNoticeContentType: FormControl<IAgencyNotice['assessmentNoticeContentType']>;
  correspondents: FormControl<IAgencyNotice['correspondents']>;
  settlementCurrency: FormControl<IAgencyNotice['settlementCurrency']>;
  assessor: FormControl<IAgencyNotice['assessor']>;
  placeholders: FormControl<IAgencyNotice['placeholders']>;
  businessDocuments: FormControl<IAgencyNotice['businessDocuments']>;
};

export type AgencyNoticeFormGroup = FormGroup<AgencyNoticeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class AgencyNoticeFormService {
  createAgencyNoticeFormGroup(agencyNotice: AgencyNoticeFormGroupInput = { id: null }): AgencyNoticeFormGroup {
    const agencyNoticeRawValue = {
      ...this.getFormDefaults(),
      ...agencyNotice,
    };
    return new FormGroup<AgencyNoticeFormGroupContent>({
      id: new FormControl(
        { value: agencyNoticeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      referenceNumber: new FormControl(agencyNoticeRawValue.referenceNumber, {
        validators: [Validators.required],
      }),
      referenceDate: new FormControl(agencyNoticeRawValue.referenceDate),
      assessmentAmount: new FormControl(agencyNoticeRawValue.assessmentAmount, {
        validators: [Validators.required],
      }),
      agencyStatus: new FormControl(agencyNoticeRawValue.agencyStatus, {
        validators: [Validators.required],
      }),
      assessmentNotice: new FormControl(agencyNoticeRawValue.assessmentNotice),
      assessmentNoticeContentType: new FormControl(agencyNoticeRawValue.assessmentNoticeContentType),
      correspondents: new FormControl(agencyNoticeRawValue.correspondents ?? []),
      settlementCurrency: new FormControl(agencyNoticeRawValue.settlementCurrency),
      assessor: new FormControl(agencyNoticeRawValue.assessor),
      placeholders: new FormControl(agencyNoticeRawValue.placeholders ?? []),
      businessDocuments: new FormControl(agencyNoticeRawValue.businessDocuments ?? []),
    });
  }

  getAgencyNotice(form: AgencyNoticeFormGroup): IAgencyNotice | NewAgencyNotice {
    return form.getRawValue() as IAgencyNotice | NewAgencyNotice;
  }

  resetForm(form: AgencyNoticeFormGroup, agencyNotice: AgencyNoticeFormGroupInput): void {
    const agencyNoticeRawValue = { ...this.getFormDefaults(), ...agencyNotice };
    form.reset(
      {
        ...agencyNoticeRawValue,
        id: { value: agencyNoticeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): AgencyNoticeFormDefaults {
    return {
      id: null,
      correspondents: [],
      placeholders: [],
      businessDocuments: [],
    };
  }
}
