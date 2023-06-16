import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IExcelReportExport, NewExcelReportExport } from '../excel-report-export.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IExcelReportExport for edit and NewExcelReportExportFormGroupInput for create.
 */
type ExcelReportExportFormGroupInput = IExcelReportExport | PartialWithRequiredKeyOf<NewExcelReportExport>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IExcelReportExport | NewExcelReportExport> = Omit<T, 'reportTimeStamp'> & {
  reportTimeStamp?: string | null;
};

type ExcelReportExportFormRawValue = FormValueOf<IExcelReportExport>;

type NewExcelReportExportFormRawValue = FormValueOf<NewExcelReportExport>;

type ExcelReportExportFormDefaults = Pick<NewExcelReportExport, 'id' | 'reportTimeStamp' | 'placeholders' | 'parameters'>;

type ExcelReportExportFormGroupContent = {
  id: FormControl<ExcelReportExportFormRawValue['id'] | NewExcelReportExport['id']>;
  reportName: FormControl<ExcelReportExportFormRawValue['reportName']>;
  reportPassword: FormControl<ExcelReportExportFormRawValue['reportPassword']>;
  reportNotes: FormControl<ExcelReportExportFormRawValue['reportNotes']>;
  reportNotesContentType: FormControl<ExcelReportExportFormRawValue['reportNotesContentType']>;
  fileCheckSum: FormControl<ExcelReportExportFormRawValue['fileCheckSum']>;
  reportFile: FormControl<ExcelReportExportFormRawValue['reportFile']>;
  reportFileContentType: FormControl<ExcelReportExportFormRawValue['reportFileContentType']>;
  reportTimeStamp: FormControl<ExcelReportExportFormRawValue['reportTimeStamp']>;
  reportId: FormControl<ExcelReportExportFormRawValue['reportId']>;
  placeholders: FormControl<ExcelReportExportFormRawValue['placeholders']>;
  parameters: FormControl<ExcelReportExportFormRawValue['parameters']>;
  reportStatus: FormControl<ExcelReportExportFormRawValue['reportStatus']>;
  securityClearance: FormControl<ExcelReportExportFormRawValue['securityClearance']>;
  reportCreator: FormControl<ExcelReportExportFormRawValue['reportCreator']>;
  organization: FormControl<ExcelReportExportFormRawValue['organization']>;
  department: FormControl<ExcelReportExportFormRawValue['department']>;
  systemModule: FormControl<ExcelReportExportFormRawValue['systemModule']>;
  reportDesign: FormControl<ExcelReportExportFormRawValue['reportDesign']>;
  fileCheckSumAlgorithm: FormControl<ExcelReportExportFormRawValue['fileCheckSumAlgorithm']>;
};

export type ExcelReportExportFormGroup = FormGroup<ExcelReportExportFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ExcelReportExportFormService {
  createExcelReportExportFormGroup(excelReportExport: ExcelReportExportFormGroupInput = { id: null }): ExcelReportExportFormGroup {
    const excelReportExportRawValue = this.convertExcelReportExportToExcelReportExportRawValue({
      ...this.getFormDefaults(),
      ...excelReportExport,
    });
    return new FormGroup<ExcelReportExportFormGroupContent>({
      id: new FormControl(
        { value: excelReportExportRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      reportName: new FormControl(excelReportExportRawValue.reportName, {
        validators: [Validators.required],
      }),
      reportPassword: new FormControl(excelReportExportRawValue.reportPassword, {
        validators: [Validators.required],
      }),
      reportNotes: new FormControl(excelReportExportRawValue.reportNotes),
      reportNotesContentType: new FormControl(excelReportExportRawValue.reportNotesContentType),
      fileCheckSum: new FormControl(excelReportExportRawValue.fileCheckSum),
      reportFile: new FormControl(excelReportExportRawValue.reportFile),
      reportFileContentType: new FormControl(excelReportExportRawValue.reportFileContentType),
      reportTimeStamp: new FormControl(excelReportExportRawValue.reportTimeStamp, {
        validators: [Validators.required],
      }),
      reportId: new FormControl(excelReportExportRawValue.reportId, {
        validators: [Validators.required],
      }),
      placeholders: new FormControl(excelReportExportRawValue.placeholders ?? []),
      parameters: new FormControl(excelReportExportRawValue.parameters ?? []),
      reportStatus: new FormControl(excelReportExportRawValue.reportStatus),
      securityClearance: new FormControl(excelReportExportRawValue.securityClearance, {
        validators: [Validators.required],
      }),
      reportCreator: new FormControl(excelReportExportRawValue.reportCreator, {
        validators: [Validators.required],
      }),
      organization: new FormControl(excelReportExportRawValue.organization, {
        validators: [Validators.required],
      }),
      department: new FormControl(excelReportExportRawValue.department, {
        validators: [Validators.required],
      }),
      systemModule: new FormControl(excelReportExportRawValue.systemModule, {
        validators: [Validators.required],
      }),
      reportDesign: new FormControl(excelReportExportRawValue.reportDesign, {
        validators: [Validators.required],
      }),
      fileCheckSumAlgorithm: new FormControl(excelReportExportRawValue.fileCheckSumAlgorithm, {
        validators: [Validators.required],
      }),
    });
  }

  getExcelReportExport(form: ExcelReportExportFormGroup): IExcelReportExport | NewExcelReportExport {
    return this.convertExcelReportExportRawValueToExcelReportExport(
      form.getRawValue() as ExcelReportExportFormRawValue | NewExcelReportExportFormRawValue
    );
  }

  resetForm(form: ExcelReportExportFormGroup, excelReportExport: ExcelReportExportFormGroupInput): void {
    const excelReportExportRawValue = this.convertExcelReportExportToExcelReportExportRawValue({
      ...this.getFormDefaults(),
      ...excelReportExport,
    });
    form.reset(
      {
        ...excelReportExportRawValue,
        id: { value: excelReportExportRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ExcelReportExportFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      reportTimeStamp: currentTime,
      placeholders: [],
      parameters: [],
    };
  }

  private convertExcelReportExportRawValueToExcelReportExport(
    rawExcelReportExport: ExcelReportExportFormRawValue | NewExcelReportExportFormRawValue
  ): IExcelReportExport | NewExcelReportExport {
    return {
      ...rawExcelReportExport,
      reportTimeStamp: dayjs(rawExcelReportExport.reportTimeStamp, DATE_TIME_FORMAT),
    };
  }

  private convertExcelReportExportToExcelReportExportRawValue(
    excelReportExport: IExcelReportExport | (Partial<NewExcelReportExport> & ExcelReportExportFormDefaults)
  ): ExcelReportExportFormRawValue | PartialWithRequiredKeyOf<NewExcelReportExportFormRawValue> {
    return {
      ...excelReportExport,
      reportTimeStamp: excelReportExport.reportTimeStamp ? excelReportExport.reportTimeStamp.format(DATE_TIME_FORMAT) : undefined,
      placeholders: excelReportExport.placeholders ?? [],
      parameters: excelReportExport.parameters ?? [],
    };
  }
}
