import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IReportRequisition, NewReportRequisition } from '../report-requisition.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IReportRequisition for edit and NewReportRequisitionFormGroupInput for create.
 */
type ReportRequisitionFormGroupInput = IReportRequisition | PartialWithRequiredKeyOf<NewReportRequisition>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IReportRequisition | NewReportRequisition> = Omit<T, 'reportRequestTime'> & {
  reportRequestTime?: string | null;
};

type ReportRequisitionFormRawValue = FormValueOf<IReportRequisition>;

type NewReportRequisitionFormRawValue = FormValueOf<NewReportRequisition>;

type ReportRequisitionFormDefaults = Pick<NewReportRequisition, 'id' | 'reportRequestTime' | 'placeholders' | 'parameters'>;

type ReportRequisitionFormGroupContent = {
  id: FormControl<ReportRequisitionFormRawValue['id'] | NewReportRequisition['id']>;
  reportName: FormControl<ReportRequisitionFormRawValue['reportName']>;
  reportRequestTime: FormControl<ReportRequisitionFormRawValue['reportRequestTime']>;
  reportPassword: FormControl<ReportRequisitionFormRawValue['reportPassword']>;
  reportStatus: FormControl<ReportRequisitionFormRawValue['reportStatus']>;
  reportId: FormControl<ReportRequisitionFormRawValue['reportId']>;
  reportFileAttachment: FormControl<ReportRequisitionFormRawValue['reportFileAttachment']>;
  reportFileAttachmentContentType: FormControl<ReportRequisitionFormRawValue['reportFileAttachmentContentType']>;
  reportFileCheckSum: FormControl<ReportRequisitionFormRawValue['reportFileCheckSum']>;
  reportNotes: FormControl<ReportRequisitionFormRawValue['reportNotes']>;
  reportNotesContentType: FormControl<ReportRequisitionFormRawValue['reportNotesContentType']>;
  placeholders: FormControl<ReportRequisitionFormRawValue['placeholders']>;
  parameters: FormControl<ReportRequisitionFormRawValue['parameters']>;
  reportTemplate: FormControl<ReportRequisitionFormRawValue['reportTemplate']>;
  reportContentType: FormControl<ReportRequisitionFormRawValue['reportContentType']>;
};

export type ReportRequisitionFormGroup = FormGroup<ReportRequisitionFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ReportRequisitionFormService {
  createReportRequisitionFormGroup(reportRequisition: ReportRequisitionFormGroupInput = { id: null }): ReportRequisitionFormGroup {
    const reportRequisitionRawValue = this.convertReportRequisitionToReportRequisitionRawValue({
      ...this.getFormDefaults(),
      ...reportRequisition,
    });
    return new FormGroup<ReportRequisitionFormGroupContent>({
      id: new FormControl(
        { value: reportRequisitionRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      reportName: new FormControl(reportRequisitionRawValue.reportName, {
        validators: [Validators.required],
      }),
      reportRequestTime: new FormControl(reportRequisitionRawValue.reportRequestTime, {
        validators: [Validators.required],
      }),
      reportPassword: new FormControl(reportRequisitionRawValue.reportPassword, {
        validators: [Validators.required, Validators.minLength(6)],
      }),
      reportStatus: new FormControl(reportRequisitionRawValue.reportStatus),
      reportId: new FormControl(reportRequisitionRawValue.reportId, {
        validators: [Validators.required],
      }),
      reportFileAttachment: new FormControl(reportRequisitionRawValue.reportFileAttachment),
      reportFileAttachmentContentType: new FormControl(reportRequisitionRawValue.reportFileAttachmentContentType),
      reportFileCheckSum: new FormControl(reportRequisitionRawValue.reportFileCheckSum),
      reportNotes: new FormControl(reportRequisitionRawValue.reportNotes),
      reportNotesContentType: new FormControl(reportRequisitionRawValue.reportNotesContentType),
      placeholders: new FormControl(reportRequisitionRawValue.placeholders ?? []),
      parameters: new FormControl(reportRequisitionRawValue.parameters ?? []),
      reportTemplate: new FormControl(reportRequisitionRawValue.reportTemplate, {
        validators: [Validators.required],
      }),
      reportContentType: new FormControl(reportRequisitionRawValue.reportContentType, {
        validators: [Validators.required],
      }),
    });
  }

  getReportRequisition(form: ReportRequisitionFormGroup): IReportRequisition | NewReportRequisition {
    return this.convertReportRequisitionRawValueToReportRequisition(
      form.getRawValue() as ReportRequisitionFormRawValue | NewReportRequisitionFormRawValue
    );
  }

  resetForm(form: ReportRequisitionFormGroup, reportRequisition: ReportRequisitionFormGroupInput): void {
    const reportRequisitionRawValue = this.convertReportRequisitionToReportRequisitionRawValue({
      ...this.getFormDefaults(),
      ...reportRequisition,
    });
    form.reset(
      {
        ...reportRequisitionRawValue,
        id: { value: reportRequisitionRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ReportRequisitionFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      reportRequestTime: currentTime,
      placeholders: [],
      parameters: [],
    };
  }

  private convertReportRequisitionRawValueToReportRequisition(
    rawReportRequisition: ReportRequisitionFormRawValue | NewReportRequisitionFormRawValue
  ): IReportRequisition | NewReportRequisition {
    return {
      ...rawReportRequisition,
      reportRequestTime: dayjs(rawReportRequisition.reportRequestTime, DATE_TIME_FORMAT),
    };
  }

  private convertReportRequisitionToReportRequisitionRawValue(
    reportRequisition: IReportRequisition | (Partial<NewReportRequisition> & ReportRequisitionFormDefaults)
  ): ReportRequisitionFormRawValue | PartialWithRequiredKeyOf<NewReportRequisitionFormRawValue> {
    return {
      ...reportRequisition,
      reportRequestTime: reportRequisition.reportRequestTime ? reportRequisition.reportRequestTime.format(DATE_TIME_FORMAT) : undefined,
      placeholders: reportRequisition.placeholders ?? [],
      parameters: reportRequisition.parameters ?? [],
    };
  }
}
