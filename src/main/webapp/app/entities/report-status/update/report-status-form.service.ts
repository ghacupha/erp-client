import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IReportStatus, NewReportStatus } from '../report-status.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IReportStatus for edit and NewReportStatusFormGroupInput for create.
 */
type ReportStatusFormGroupInput = IReportStatus | PartialWithRequiredKeyOf<NewReportStatus>;

type ReportStatusFormDefaults = Pick<NewReportStatus, 'id' | 'placeholders'>;

type ReportStatusFormGroupContent = {
  id: FormControl<IReportStatus['id'] | NewReportStatus['id']>;
  reportName: FormControl<IReportStatus['reportName']>;
  reportId: FormControl<IReportStatus['reportId']>;
  placeholders: FormControl<IReportStatus['placeholders']>;
  processStatus: FormControl<IReportStatus['processStatus']>;
};

export type ReportStatusFormGroup = FormGroup<ReportStatusFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ReportStatusFormService {
  createReportStatusFormGroup(reportStatus: ReportStatusFormGroupInput = { id: null }): ReportStatusFormGroup {
    const reportStatusRawValue = {
      ...this.getFormDefaults(),
      ...reportStatus,
    };
    return new FormGroup<ReportStatusFormGroupContent>({
      id: new FormControl(
        { value: reportStatusRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      reportName: new FormControl(reportStatusRawValue.reportName, {
        validators: [Validators.required],
      }),
      reportId: new FormControl(reportStatusRawValue.reportId, {
        validators: [Validators.required],
      }),
      placeholders: new FormControl(reportStatusRawValue.placeholders ?? []),
      processStatus: new FormControl(reportStatusRawValue.processStatus),
    });
  }

  getReportStatus(form: ReportStatusFormGroup): IReportStatus | NewReportStatus {
    return form.getRawValue() as IReportStatus | NewReportStatus;
  }

  resetForm(form: ReportStatusFormGroup, reportStatus: ReportStatusFormGroupInput): void {
    const reportStatusRawValue = { ...this.getFormDefaults(), ...reportStatus };
    form.reset(
      {
        ...reportStatusRawValue,
        id: { value: reportStatusRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ReportStatusFormDefaults {
    return {
      id: null,
      placeholders: [],
    };
  }
}
