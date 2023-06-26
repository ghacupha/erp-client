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

import { IReportDesign, NewReportDesign } from '../report-design.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IReportDesign for edit and NewReportDesignFormGroupInput for create.
 */
type ReportDesignFormGroupInput = IReportDesign | PartialWithRequiredKeyOf<NewReportDesign>;

type ReportDesignFormDefaults = Pick<NewReportDesign, 'id' | 'parameters' | 'placeholders'>;

type ReportDesignFormGroupContent = {
  id: FormControl<IReportDesign['id'] | NewReportDesign['id']>;
  catalogueNumber: FormControl<IReportDesign['catalogueNumber']>;
  designation: FormControl<IReportDesign['designation']>;
  description: FormControl<IReportDesign['description']>;
  notes: FormControl<IReportDesign['notes']>;
  notesContentType: FormControl<IReportDesign['notesContentType']>;
  reportFile: FormControl<IReportDesign['reportFile']>;
  reportFileContentType: FormControl<IReportDesign['reportFileContentType']>;
  reportFileChecksum: FormControl<IReportDesign['reportFileChecksum']>;
  parameters: FormControl<IReportDesign['parameters']>;
  securityClearance: FormControl<IReportDesign['securityClearance']>;
  reportDesigner: FormControl<IReportDesign['reportDesigner']>;
  organization: FormControl<IReportDesign['organization']>;
  department: FormControl<IReportDesign['department']>;
  placeholders: FormControl<IReportDesign['placeholders']>;
  systemModule: FormControl<IReportDesign['systemModule']>;
  fileCheckSumAlgorithm: FormControl<IReportDesign['fileCheckSumAlgorithm']>;
};

export type ReportDesignFormGroup = FormGroup<ReportDesignFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ReportDesignFormService {
  createReportDesignFormGroup(reportDesign: ReportDesignFormGroupInput = { id: null }): ReportDesignFormGroup {
    const reportDesignRawValue = {
      ...this.getFormDefaults(),
      ...reportDesign,
    };
    return new FormGroup<ReportDesignFormGroupContent>({
      id: new FormControl(
        { value: reportDesignRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      catalogueNumber: new FormControl(reportDesignRawValue.catalogueNumber, {
        validators: [Validators.required],
      }),
      designation: new FormControl(reportDesignRawValue.designation, {
        validators: [Validators.required],
      }),
      description: new FormControl(reportDesignRawValue.description),
      notes: new FormControl(reportDesignRawValue.notes),
      notesContentType: new FormControl(reportDesignRawValue.notesContentType),
      reportFile: new FormControl(reportDesignRawValue.reportFile),
      reportFileContentType: new FormControl(reportDesignRawValue.reportFileContentType),
      reportFileChecksum: new FormControl(reportDesignRawValue.reportFileChecksum),
      parameters: new FormControl(reportDesignRawValue.parameters ?? []),
      securityClearance: new FormControl(reportDesignRawValue.securityClearance, {
        validators: [Validators.required],
      }),
      reportDesigner: new FormControl(reportDesignRawValue.reportDesigner, {
        validators: [Validators.required],
      }),
      organization: new FormControl(reportDesignRawValue.organization, {
        validators: [Validators.required],
      }),
      department: new FormControl(reportDesignRawValue.department, {
        validators: [Validators.required],
      }),
      placeholders: new FormControl(reportDesignRawValue.placeholders ?? []),
      systemModule: new FormControl(reportDesignRawValue.systemModule, {
        validators: [Validators.required],
      }),
      fileCheckSumAlgorithm: new FormControl(reportDesignRawValue.fileCheckSumAlgorithm, {
        validators: [Validators.required],
      }),
    });
  }

  getReportDesign(form: ReportDesignFormGroup): IReportDesign | NewReportDesign {
    return form.getRawValue() as IReportDesign | NewReportDesign;
  }

  resetForm(form: ReportDesignFormGroup, reportDesign: ReportDesignFormGroupInput): void {
    const reportDesignRawValue = { ...this.getFormDefaults(), ...reportDesign };
    form.reset(
      {
        ...reportDesignRawValue,
        id: { value: reportDesignRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ReportDesignFormDefaults {
    return {
      id: null,
      parameters: [],
      placeholders: [],
    };
  }
}
