import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IJobSheet, NewJobSheet } from '../job-sheet.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IJobSheet for edit and NewJobSheetFormGroupInput for create.
 */
type JobSheetFormGroupInput = IJobSheet | PartialWithRequiredKeyOf<NewJobSheet>;

type JobSheetFormDefaults = Pick<
  NewJobSheet,
  'id' | 'signatories' | 'businessStamps' | 'placeholders' | 'paymentLabels' | 'businessDocuments'
>;

type JobSheetFormGroupContent = {
  id: FormControl<IJobSheet['id'] | NewJobSheet['id']>;
  serialNumber: FormControl<IJobSheet['serialNumber']>;
  jobSheetDate: FormControl<IJobSheet['jobSheetDate']>;
  details: FormControl<IJobSheet['details']>;
  remarks: FormControl<IJobSheet['remarks']>;
  biller: FormControl<IJobSheet['biller']>;
  signatories: FormControl<IJobSheet['signatories']>;
  contactPerson: FormControl<IJobSheet['contactPerson']>;
  businessStamps: FormControl<IJobSheet['businessStamps']>;
  placeholders: FormControl<IJobSheet['placeholders']>;
  paymentLabels: FormControl<IJobSheet['paymentLabels']>;
  businessDocuments: FormControl<IJobSheet['businessDocuments']>;
};

export type JobSheetFormGroup = FormGroup<JobSheetFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class JobSheetFormService {
  createJobSheetFormGroup(jobSheet: JobSheetFormGroupInput = { id: null }): JobSheetFormGroup {
    const jobSheetRawValue = {
      ...this.getFormDefaults(),
      ...jobSheet,
    };
    return new FormGroup<JobSheetFormGroupContent>({
      id: new FormControl(
        { value: jobSheetRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      serialNumber: new FormControl(jobSheetRawValue.serialNumber, {
        validators: [Validators.required],
      }),
      jobSheetDate: new FormControl(jobSheetRawValue.jobSheetDate),
      details: new FormControl(jobSheetRawValue.details),
      remarks: new FormControl(jobSheetRawValue.remarks),
      biller: new FormControl(jobSheetRawValue.biller, {
        validators: [Validators.required],
      }),
      signatories: new FormControl(jobSheetRawValue.signatories ?? []),
      contactPerson: new FormControl(jobSheetRawValue.contactPerson),
      businessStamps: new FormControl(jobSheetRawValue.businessStamps ?? []),
      placeholders: new FormControl(jobSheetRawValue.placeholders ?? []),
      paymentLabels: new FormControl(jobSheetRawValue.paymentLabels ?? []),
      businessDocuments: new FormControl(jobSheetRawValue.businessDocuments ?? []),
    });
  }

  getJobSheet(form: JobSheetFormGroup): IJobSheet | NewJobSheet {
    return form.getRawValue() as IJobSheet | NewJobSheet;
  }

  resetForm(form: JobSheetFormGroup, jobSheet: JobSheetFormGroupInput): void {
    const jobSheetRawValue = { ...this.getFormDefaults(), ...jobSheet };
    form.reset(
      {
        ...jobSheetRawValue,
        id: { value: jobSheetRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): JobSheetFormDefaults {
    return {
      id: null,
      signatories: [],
      businessStamps: [],
      placeholders: [],
      paymentLabels: [],
      businessDocuments: [],
    };
  }
}
