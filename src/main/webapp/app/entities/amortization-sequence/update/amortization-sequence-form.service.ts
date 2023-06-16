import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IAmortizationSequence, NewAmortizationSequence } from '../amortization-sequence.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IAmortizationSequence for edit and NewAmortizationSequenceFormGroupInput for create.
 */
type AmortizationSequenceFormGroupInput = IAmortizationSequence | PartialWithRequiredKeyOf<NewAmortizationSequence>;

type AmortizationSequenceFormDefaults = Pick<
  NewAmortizationSequence,
  'id' | 'isCommencementSequence' | 'isTerminalSequence' | 'placeholders' | 'prepaymentMappings' | 'applicationParameters'
>;

type AmortizationSequenceFormGroupContent = {
  id: FormControl<IAmortizationSequence['id'] | NewAmortizationSequence['id']>;
  prepaymentAccountGuid: FormControl<IAmortizationSequence['prepaymentAccountGuid']>;
  recurrenceGuid: FormControl<IAmortizationSequence['recurrenceGuid']>;
  sequenceNumber: FormControl<IAmortizationSequence['sequenceNumber']>;
  particulars: FormControl<IAmortizationSequence['particulars']>;
  currentAmortizationDate: FormControl<IAmortizationSequence['currentAmortizationDate']>;
  previousAmortizationDate: FormControl<IAmortizationSequence['previousAmortizationDate']>;
  nextAmortizationDate: FormControl<IAmortizationSequence['nextAmortizationDate']>;
  isCommencementSequence: FormControl<IAmortizationSequence['isCommencementSequence']>;
  isTerminalSequence: FormControl<IAmortizationSequence['isTerminalSequence']>;
  amortizationAmount: FormControl<IAmortizationSequence['amortizationAmount']>;
  sequenceGuid: FormControl<IAmortizationSequence['sequenceGuid']>;
  prepaymentAccount: FormControl<IAmortizationSequence['prepaymentAccount']>;
  amortizationRecurrence: FormControl<IAmortizationSequence['amortizationRecurrence']>;
  placeholders: FormControl<IAmortizationSequence['placeholders']>;
  prepaymentMappings: FormControl<IAmortizationSequence['prepaymentMappings']>;
  applicationParameters: FormControl<IAmortizationSequence['applicationParameters']>;
};

export type AmortizationSequenceFormGroup = FormGroup<AmortizationSequenceFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class AmortizationSequenceFormService {
  createAmortizationSequenceFormGroup(
    amortizationSequence: AmortizationSequenceFormGroupInput = { id: null }
  ): AmortizationSequenceFormGroup {
    const amortizationSequenceRawValue = {
      ...this.getFormDefaults(),
      ...amortizationSequence,
    };
    return new FormGroup<AmortizationSequenceFormGroupContent>({
      id: new FormControl(
        { value: amortizationSequenceRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      prepaymentAccountGuid: new FormControl(amortizationSequenceRawValue.prepaymentAccountGuid, {
        validators: [Validators.required],
      }),
      recurrenceGuid: new FormControl(amortizationSequenceRawValue.recurrenceGuid, {
        validators: [Validators.required],
      }),
      sequenceNumber: new FormControl(amortizationSequenceRawValue.sequenceNumber, {
        validators: [Validators.required],
      }),
      particulars: new FormControl(amortizationSequenceRawValue.particulars),
      currentAmortizationDate: new FormControl(amortizationSequenceRawValue.currentAmortizationDate, {
        validators: [Validators.required],
      }),
      previousAmortizationDate: new FormControl(amortizationSequenceRawValue.previousAmortizationDate),
      nextAmortizationDate: new FormControl(amortizationSequenceRawValue.nextAmortizationDate),
      isCommencementSequence: new FormControl(amortizationSequenceRawValue.isCommencementSequence, {
        validators: [Validators.required],
      }),
      isTerminalSequence: new FormControl(amortizationSequenceRawValue.isTerminalSequence, {
        validators: [Validators.required],
      }),
      amortizationAmount: new FormControl(amortizationSequenceRawValue.amortizationAmount, {
        validators: [Validators.required, Validators.min(0)],
      }),
      sequenceGuid: new FormControl(amortizationSequenceRawValue.sequenceGuid, {
        validators: [Validators.required],
      }),
      prepaymentAccount: new FormControl(amortizationSequenceRawValue.prepaymentAccount, {
        validators: [Validators.required],
      }),
      amortizationRecurrence: new FormControl(amortizationSequenceRawValue.amortizationRecurrence, {
        validators: [Validators.required],
      }),
      placeholders: new FormControl(amortizationSequenceRawValue.placeholders ?? []),
      prepaymentMappings: new FormControl(amortizationSequenceRawValue.prepaymentMappings ?? []),
      applicationParameters: new FormControl(amortizationSequenceRawValue.applicationParameters ?? []),
    });
  }

  getAmortizationSequence(form: AmortizationSequenceFormGroup): IAmortizationSequence | NewAmortizationSequence {
    return form.getRawValue() as IAmortizationSequence | NewAmortizationSequence;
  }

  resetForm(form: AmortizationSequenceFormGroup, amortizationSequence: AmortizationSequenceFormGroupInput): void {
    const amortizationSequenceRawValue = { ...this.getFormDefaults(), ...amortizationSequence };
    form.reset(
      {
        ...amortizationSequenceRawValue,
        id: { value: amortizationSequenceRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): AmortizationSequenceFormDefaults {
    return {
      id: null,
      isCommencementSequence: false,
      isTerminalSequence: false,
      placeholders: [],
      prepaymentMappings: [],
      applicationParameters: [],
    };
  }
}
