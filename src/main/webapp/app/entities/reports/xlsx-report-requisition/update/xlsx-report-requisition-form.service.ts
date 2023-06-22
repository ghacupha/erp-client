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

import { IXlsxReportRequisition, NewXlsxReportRequisition } from '../xlsx-report-requisition.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IXlsxReportRequisition for edit and NewXlsxReportRequisitionFormGroupInput for create.
 */
type XlsxReportRequisitionFormGroupInput = IXlsxReportRequisition | PartialWithRequiredKeyOf<NewXlsxReportRequisition>;

type XlsxReportRequisitionFormDefaults = Pick<NewXlsxReportRequisition, 'id' | 'placeholders' | 'parameters'>;

type XlsxReportRequisitionFormGroupContent = {
  id: FormControl<IXlsxReportRequisition['id'] | NewXlsxReportRequisition['id']>;
  reportName: FormControl<IXlsxReportRequisition['reportName']>;
  reportDate: FormControl<IXlsxReportRequisition['reportDate']>;
  userPassword: FormControl<IXlsxReportRequisition['userPassword']>;
  reportFileChecksum: FormControl<IXlsxReportRequisition['reportFileChecksum']>;
  reportStatus: FormControl<IXlsxReportRequisition['reportStatus']>;
  reportId: FormControl<IXlsxReportRequisition['reportId']>;
  reportTemplate: FormControl<IXlsxReportRequisition['reportTemplate']>;
  placeholders: FormControl<IXlsxReportRequisition['placeholders']>;
  parameters: FormControl<IXlsxReportRequisition['parameters']>;
};

export type XlsxReportRequisitionFormGroup = FormGroup<XlsxReportRequisitionFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class XlsxReportRequisitionFormService {
  createXlsxReportRequisitionFormGroup(
    xlsxReportRequisition: XlsxReportRequisitionFormGroupInput = { id: null }
  ): XlsxReportRequisitionFormGroup {
    const xlsxReportRequisitionRawValue = {
      ...this.getFormDefaults(),
      ...xlsxReportRequisition,
    };
    return new FormGroup<XlsxReportRequisitionFormGroupContent>({
      id: new FormControl(
        { value: xlsxReportRequisitionRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      reportName: new FormControl(xlsxReportRequisitionRawValue.reportName, {
        validators: [Validators.required],
      }),
      reportDate: new FormControl(xlsxReportRequisitionRawValue.reportDate),
      userPassword: new FormControl(xlsxReportRequisitionRawValue.userPassword, {
        validators: [Validators.required],
      }),
      reportFileChecksum: new FormControl(xlsxReportRequisitionRawValue.reportFileChecksum),
      reportStatus: new FormControl(xlsxReportRequisitionRawValue.reportStatus),
      reportId: new FormControl(xlsxReportRequisitionRawValue.reportId, {
        validators: [Validators.required],
      }),
      reportTemplate: new FormControl(xlsxReportRequisitionRawValue.reportTemplate, {
        validators: [Validators.required],
      }),
      placeholders: new FormControl(xlsxReportRequisitionRawValue.placeholders ?? []),
      parameters: new FormControl(xlsxReportRequisitionRawValue.parameters ?? []),
    });
  }

  getXlsxReportRequisition(form: XlsxReportRequisitionFormGroup): IXlsxReportRequisition | NewXlsxReportRequisition {
    return form.getRawValue() as IXlsxReportRequisition | NewXlsxReportRequisition;
  }

  resetForm(form: XlsxReportRequisitionFormGroup, xlsxReportRequisition: XlsxReportRequisitionFormGroupInput): void {
    const xlsxReportRequisitionRawValue = { ...this.getFormDefaults(), ...xlsxReportRequisition };
    form.reset(
      {
        ...xlsxReportRequisitionRawValue,
        id: { value: xlsxReportRequisitionRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): XlsxReportRequisitionFormDefaults {
    return {
      id: null,
      placeholders: [],
      parameters: [],
    };
  }
}
