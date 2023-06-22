import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IPdfReportRequisition, NewPdfReportRequisition } from '../pdf-report-requisition.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IPdfReportRequisition for edit and NewPdfReportRequisitionFormGroupInput for create.
 */
type PdfReportRequisitionFormGroupInput = IPdfReportRequisition | PartialWithRequiredKeyOf<NewPdfReportRequisition>;

type PdfReportRequisitionFormDefaults = Pick<NewPdfReportRequisition, 'id' | 'placeholders' | 'parameters'>;

type PdfReportRequisitionFormGroupContent = {
  id: FormControl<IPdfReportRequisition['id'] | NewPdfReportRequisition['id']>;
  reportName: FormControl<IPdfReportRequisition['reportName']>;
  reportDate: FormControl<IPdfReportRequisition['reportDate']>;
  userPassword: FormControl<IPdfReportRequisition['userPassword']>;
  ownerPassword: FormControl<IPdfReportRequisition['ownerPassword']>;
  reportFileChecksum: FormControl<IPdfReportRequisition['reportFileChecksum']>;
  reportStatus: FormControl<IPdfReportRequisition['reportStatus']>;
  reportId: FormControl<IPdfReportRequisition['reportId']>;
  reportTemplate: FormControl<IPdfReportRequisition['reportTemplate']>;
  placeholders: FormControl<IPdfReportRequisition['placeholders']>;
  parameters: FormControl<IPdfReportRequisition['parameters']>;
};

export type PdfReportRequisitionFormGroup = FormGroup<PdfReportRequisitionFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class PdfReportRequisitionFormService {
  createPdfReportRequisitionFormGroup(
    pdfReportRequisition: PdfReportRequisitionFormGroupInput = { id: null }
  ): PdfReportRequisitionFormGroup {
    const pdfReportRequisitionRawValue = {
      ...this.getFormDefaults(),
      ...pdfReportRequisition,
    };
    return new FormGroup<PdfReportRequisitionFormGroupContent>({
      id: new FormControl(
        { value: pdfReportRequisitionRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      reportName: new FormControl(pdfReportRequisitionRawValue.reportName, {
        validators: [Validators.required],
      }),
      reportDate: new FormControl(pdfReportRequisitionRawValue.reportDate),
      userPassword: new FormControl(pdfReportRequisitionRawValue.userPassword, {
        validators: [Validators.required],
      }),
      ownerPassword: new FormControl(pdfReportRequisitionRawValue.ownerPassword, {
        validators: [Validators.required],
      }),
      reportFileChecksum: new FormControl(pdfReportRequisitionRawValue.reportFileChecksum),
      reportStatus: new FormControl(pdfReportRequisitionRawValue.reportStatus),
      reportId: new FormControl(pdfReportRequisitionRawValue.reportId, {
        validators: [Validators.required],
      }),
      reportTemplate: new FormControl(pdfReportRequisitionRawValue.reportTemplate, {
        validators: [Validators.required],
      }),
      placeholders: new FormControl(pdfReportRequisitionRawValue.placeholders ?? []),
      parameters: new FormControl(pdfReportRequisitionRawValue.parameters ?? []),
    });
  }

  getPdfReportRequisition(form: PdfReportRequisitionFormGroup): IPdfReportRequisition | NewPdfReportRequisition {
    return form.getRawValue() as IPdfReportRequisition | NewPdfReportRequisition;
  }

  resetForm(form: PdfReportRequisitionFormGroup, pdfReportRequisition: PdfReportRequisitionFormGroupInput): void {
    const pdfReportRequisitionRawValue = { ...this.getFormDefaults(), ...pdfReportRequisition };
    form.reset(
      {
        ...pdfReportRequisitionRawValue,
        id: { value: pdfReportRequisitionRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): PdfReportRequisitionFormDefaults {
    return {
      id: null,
      placeholders: [],
      parameters: [],
    };
  }
}
