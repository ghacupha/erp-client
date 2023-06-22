import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IReportTemplate, NewReportTemplate } from '../report-template.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IReportTemplate for edit and NewReportTemplateFormGroupInput for create.
 */
type ReportTemplateFormGroupInput = IReportTemplate | PartialWithRequiredKeyOf<NewReportTemplate>;

type ReportTemplateFormDefaults = Pick<NewReportTemplate, 'id' | 'placeholders'>;

type ReportTemplateFormGroupContent = {
  id: FormControl<IReportTemplate['id'] | NewReportTemplate['id']>;
  catalogueNumber: FormControl<IReportTemplate['catalogueNumber']>;
  description: FormControl<IReportTemplate['description']>;
  notes: FormControl<IReportTemplate['notes']>;
  notesContentType: FormControl<IReportTemplate['notesContentType']>;
  reportFile: FormControl<IReportTemplate['reportFile']>;
  reportFileContentType: FormControl<IReportTemplate['reportFileContentType']>;
  compileReportFile: FormControl<IReportTemplate['compileReportFile']>;
  compileReportFileContentType: FormControl<IReportTemplate['compileReportFileContentType']>;
  placeholders: FormControl<IReportTemplate['placeholders']>;
};

export type ReportTemplateFormGroup = FormGroup<ReportTemplateFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ReportTemplateFormService {
  createReportTemplateFormGroup(reportTemplate: ReportTemplateFormGroupInput = { id: null }): ReportTemplateFormGroup {
    const reportTemplateRawValue = {
      ...this.getFormDefaults(),
      ...reportTemplate,
    };
    return new FormGroup<ReportTemplateFormGroupContent>({
      id: new FormControl(
        { value: reportTemplateRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      catalogueNumber: new FormControl(reportTemplateRawValue.catalogueNumber, {
        validators: [Validators.required],
      }),
      description: new FormControl(reportTemplateRawValue.description),
      notes: new FormControl(reportTemplateRawValue.notes),
      notesContentType: new FormControl(reportTemplateRawValue.notesContentType),
      reportFile: new FormControl(reportTemplateRawValue.reportFile),
      reportFileContentType: new FormControl(reportTemplateRawValue.reportFileContentType),
      compileReportFile: new FormControl(reportTemplateRawValue.compileReportFile),
      compileReportFileContentType: new FormControl(reportTemplateRawValue.compileReportFileContentType),
      placeholders: new FormControl(reportTemplateRawValue.placeholders ?? []),
    });
  }

  getReportTemplate(form: ReportTemplateFormGroup): IReportTemplate | NewReportTemplate {
    return form.getRawValue() as IReportTemplate | NewReportTemplate;
  }

  resetForm(form: ReportTemplateFormGroup, reportTemplate: ReportTemplateFormGroupInput): void {
    const reportTemplateRawValue = { ...this.getFormDefaults(), ...reportTemplate };
    form.reset(
      {
        ...reportTemplateRawValue,
        id: { value: reportTemplateRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ReportTemplateFormDefaults {
    return {
      id: null,
      placeholders: [],
    };
  }
}
