import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IAmortizationRecurrence, NewAmortizationRecurrence } from '../amortization-recurrence.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IAmortizationRecurrence for edit and NewAmortizationRecurrenceFormGroupInput for create.
 */
type AmortizationRecurrenceFormGroupInput = IAmortizationRecurrence | PartialWithRequiredKeyOf<NewAmortizationRecurrence>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IAmortizationRecurrence | NewAmortizationRecurrence> = Omit<T, 'timeOfInstallation'> & {
  timeOfInstallation?: string | null;
};

type AmortizationRecurrenceFormRawValue = FormValueOf<IAmortizationRecurrence>;

type NewAmortizationRecurrenceFormRawValue = FormValueOf<NewAmortizationRecurrence>;

type AmortizationRecurrenceFormDefaults = Pick<
  NewAmortizationRecurrence,
  'id' | 'isActive' | 'isOverWritten' | 'timeOfInstallation' | 'placeholders' | 'parameters' | 'applicationParameters'
>;

type AmortizationRecurrenceFormGroupContent = {
  id: FormControl<AmortizationRecurrenceFormRawValue['id'] | NewAmortizationRecurrence['id']>;
  firstAmortizationDate: FormControl<AmortizationRecurrenceFormRawValue['firstAmortizationDate']>;
  amortizationFrequency: FormControl<AmortizationRecurrenceFormRawValue['amortizationFrequency']>;
  numberOfRecurrences: FormControl<AmortizationRecurrenceFormRawValue['numberOfRecurrences']>;
  notes: FormControl<AmortizationRecurrenceFormRawValue['notes']>;
  notesContentType: FormControl<AmortizationRecurrenceFormRawValue['notesContentType']>;
  particulars: FormControl<AmortizationRecurrenceFormRawValue['particulars']>;
  isActive: FormControl<AmortizationRecurrenceFormRawValue['isActive']>;
  isOverWritten: FormControl<AmortizationRecurrenceFormRawValue['isOverWritten']>;
  timeOfInstallation: FormControl<AmortizationRecurrenceFormRawValue['timeOfInstallation']>;
  recurrenceGuid: FormControl<AmortizationRecurrenceFormRawValue['recurrenceGuid']>;
  prepaymentAccountGuid: FormControl<AmortizationRecurrenceFormRawValue['prepaymentAccountGuid']>;
  placeholders: FormControl<AmortizationRecurrenceFormRawValue['placeholders']>;
  parameters: FormControl<AmortizationRecurrenceFormRawValue['parameters']>;
  applicationParameters: FormControl<AmortizationRecurrenceFormRawValue['applicationParameters']>;
  depreciationMethod: FormControl<AmortizationRecurrenceFormRawValue['depreciationMethod']>;
  prepaymentAccount: FormControl<AmortizationRecurrenceFormRawValue['prepaymentAccount']>;
};

export type AmortizationRecurrenceFormGroup = FormGroup<AmortizationRecurrenceFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class AmortizationRecurrenceFormService {
  createAmortizationRecurrenceFormGroup(
    amortizationRecurrence: AmortizationRecurrenceFormGroupInput = { id: null }
  ): AmortizationRecurrenceFormGroup {
    const amortizationRecurrenceRawValue = this.convertAmortizationRecurrenceToAmortizationRecurrenceRawValue({
      ...this.getFormDefaults(),
      ...amortizationRecurrence,
    });
    return new FormGroup<AmortizationRecurrenceFormGroupContent>({
      id: new FormControl(
        { value: amortizationRecurrenceRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      firstAmortizationDate: new FormControl(amortizationRecurrenceRawValue.firstAmortizationDate, {
        validators: [Validators.required],
      }),
      amortizationFrequency: new FormControl(amortizationRecurrenceRawValue.amortizationFrequency, {
        validators: [Validators.required],
      }),
      numberOfRecurrences: new FormControl(amortizationRecurrenceRawValue.numberOfRecurrences, {
        validators: [Validators.required],
      }),
      notes: new FormControl(amortizationRecurrenceRawValue.notes),
      notesContentType: new FormControl(amortizationRecurrenceRawValue.notesContentType),
      particulars: new FormControl(amortizationRecurrenceRawValue.particulars),
      isActive: new FormControl(amortizationRecurrenceRawValue.isActive),
      isOverWritten: new FormControl(amortizationRecurrenceRawValue.isOverWritten),
      timeOfInstallation: new FormControl(amortizationRecurrenceRawValue.timeOfInstallation, {
        validators: [Validators.required],
      }),
      recurrenceGuid: new FormControl(amortizationRecurrenceRawValue.recurrenceGuid, {
        validators: [Validators.required],
      }),
      prepaymentAccountGuid: new FormControl(amortizationRecurrenceRawValue.prepaymentAccountGuid, {
        validators: [Validators.required],
      }),
      placeholders: new FormControl(amortizationRecurrenceRawValue.placeholders ?? []),
      parameters: new FormControl(amortizationRecurrenceRawValue.parameters ?? []),
      applicationParameters: new FormControl(amortizationRecurrenceRawValue.applicationParameters ?? []),
      depreciationMethod: new FormControl(amortizationRecurrenceRawValue.depreciationMethod, {
        validators: [Validators.required],
      }),
      prepaymentAccount: new FormControl(amortizationRecurrenceRawValue.prepaymentAccount, {
        validators: [Validators.required],
      }),
    });
  }

  getAmortizationRecurrence(form: AmortizationRecurrenceFormGroup): IAmortizationRecurrence | NewAmortizationRecurrence {
    return this.convertAmortizationRecurrenceRawValueToAmortizationRecurrence(
      form.getRawValue() as AmortizationRecurrenceFormRawValue | NewAmortizationRecurrenceFormRawValue
    );
  }

  resetForm(form: AmortizationRecurrenceFormGroup, amortizationRecurrence: AmortizationRecurrenceFormGroupInput): void {
    const amortizationRecurrenceRawValue = this.convertAmortizationRecurrenceToAmortizationRecurrenceRawValue({
      ...this.getFormDefaults(),
      ...amortizationRecurrence,
    });
    form.reset(
      {
        ...amortizationRecurrenceRawValue,
        id: { value: amortizationRecurrenceRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): AmortizationRecurrenceFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      isActive: false,
      isOverWritten: false,
      timeOfInstallation: currentTime,
      placeholders: [],
      parameters: [],
      applicationParameters: [],
    };
  }

  private convertAmortizationRecurrenceRawValueToAmortizationRecurrence(
    rawAmortizationRecurrence: AmortizationRecurrenceFormRawValue | NewAmortizationRecurrenceFormRawValue
  ): IAmortizationRecurrence | NewAmortizationRecurrence {
    return {
      ...rawAmortizationRecurrence,
      timeOfInstallation: dayjs(rawAmortizationRecurrence.timeOfInstallation, DATE_TIME_FORMAT),
    };
  }

  private convertAmortizationRecurrenceToAmortizationRecurrenceRawValue(
    amortizationRecurrence: IAmortizationRecurrence | (Partial<NewAmortizationRecurrence> & AmortizationRecurrenceFormDefaults)
  ): AmortizationRecurrenceFormRawValue | PartialWithRequiredKeyOf<NewAmortizationRecurrenceFormRawValue> {
    return {
      ...amortizationRecurrence,
      timeOfInstallation: amortizationRecurrence.timeOfInstallation
        ? amortizationRecurrence.timeOfInstallation.format(DATE_TIME_FORMAT)
        : undefined,
      placeholders: amortizationRecurrence.placeholders ?? [],
      parameters: amortizationRecurrence.parameters ?? [],
      applicationParameters: amortizationRecurrence.applicationParameters ?? [],
    };
  }
}
