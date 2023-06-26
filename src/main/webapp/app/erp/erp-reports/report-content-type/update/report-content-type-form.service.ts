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

import { IReportContentType, NewReportContentType } from '../report-content-type.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IReportContentType for edit and NewReportContentTypeFormGroupInput for create.
 */
type ReportContentTypeFormGroupInput = IReportContentType | PartialWithRequiredKeyOf<NewReportContentType>;

type ReportContentTypeFormDefaults = Pick<NewReportContentType, 'id' | 'placeholders'>;

type ReportContentTypeFormGroupContent = {
  id: FormControl<IReportContentType['id'] | NewReportContentType['id']>;
  reportTypeName: FormControl<IReportContentType['reportTypeName']>;
  reportFileExtension: FormControl<IReportContentType['reportFileExtension']>;
  systemContentType: FormControl<IReportContentType['systemContentType']>;
  placeholders: FormControl<IReportContentType['placeholders']>;
};

export type ReportContentTypeFormGroup = FormGroup<ReportContentTypeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ReportContentTypeFormService {
  createReportContentTypeFormGroup(reportContentType: ReportContentTypeFormGroupInput = { id: null }): ReportContentTypeFormGroup {
    const reportContentTypeRawValue = {
      ...this.getFormDefaults(),
      ...reportContentType,
    };
    return new FormGroup<ReportContentTypeFormGroupContent>({
      id: new FormControl(
        { value: reportContentTypeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      reportTypeName: new FormControl(reportContentTypeRawValue.reportTypeName, {
        validators: [Validators.required],
      }),
      reportFileExtension: new FormControl(reportContentTypeRawValue.reportFileExtension, {
        validators: [Validators.required],
      }),
      systemContentType: new FormControl(reportContentTypeRawValue.systemContentType, {
        validators: [Validators.required],
      }),
      placeholders: new FormControl(reportContentTypeRawValue.placeholders ?? []),
    });
  }

  getReportContentType(form: ReportContentTypeFormGroup): IReportContentType | NewReportContentType {
    return form.getRawValue() as IReportContentType | NewReportContentType;
  }

  resetForm(form: ReportContentTypeFormGroup, reportContentType: ReportContentTypeFormGroupInput): void {
    const reportContentTypeRawValue = { ...this.getFormDefaults(), ...reportContentType };
    form.reset(
      {
        ...reportContentTypeRawValue,
        id: { value: reportContentTypeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ReportContentTypeFormDefaults {
    return {
      id: null,
      placeholders: [],
    };
  }
}
