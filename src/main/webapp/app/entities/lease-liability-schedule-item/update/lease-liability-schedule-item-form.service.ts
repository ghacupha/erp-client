import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ILeaseLiabilityScheduleItem, NewLeaseLiabilityScheduleItem } from '../lease-liability-schedule-item.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ILeaseLiabilityScheduleItem for edit and NewLeaseLiabilityScheduleItemFormGroupInput for create.
 */
type LeaseLiabilityScheduleItemFormGroupInput = ILeaseLiabilityScheduleItem | PartialWithRequiredKeyOf<NewLeaseLiabilityScheduleItem>;

type LeaseLiabilityScheduleItemFormDefaults = Pick<
  NewLeaseLiabilityScheduleItem,
  'id' | 'periodIncluded' | 'placeholders' | 'universallyUniqueMappings'
>;

type LeaseLiabilityScheduleItemFormGroupContent = {
  id: FormControl<ILeaseLiabilityScheduleItem['id'] | NewLeaseLiabilityScheduleItem['id']>;
  sequenceNumber: FormControl<ILeaseLiabilityScheduleItem['sequenceNumber']>;
  periodIncluded: FormControl<ILeaseLiabilityScheduleItem['periodIncluded']>;
  periodStartDate: FormControl<ILeaseLiabilityScheduleItem['periodStartDate']>;
  periodEndDate: FormControl<ILeaseLiabilityScheduleItem['periodEndDate']>;
  openingBalance: FormControl<ILeaseLiabilityScheduleItem['openingBalance']>;
  cashPayment: FormControl<ILeaseLiabilityScheduleItem['cashPayment']>;
  principalPayment: FormControl<ILeaseLiabilityScheduleItem['principalPayment']>;
  interestPayment: FormControl<ILeaseLiabilityScheduleItem['interestPayment']>;
  outstandingBalance: FormControl<ILeaseLiabilityScheduleItem['outstandingBalance']>;
  interestPayableOpening: FormControl<ILeaseLiabilityScheduleItem['interestPayableOpening']>;
  interestExpenseAccrued: FormControl<ILeaseLiabilityScheduleItem['interestExpenseAccrued']>;
  interestPayableBalance: FormControl<ILeaseLiabilityScheduleItem['interestPayableBalance']>;
  placeholders: FormControl<ILeaseLiabilityScheduleItem['placeholders']>;
  leaseContract: FormControl<ILeaseLiabilityScheduleItem['leaseContract']>;
  leaseModelMetadata: FormControl<ILeaseLiabilityScheduleItem['leaseModelMetadata']>;
  universallyUniqueMappings: FormControl<ILeaseLiabilityScheduleItem['universallyUniqueMappings']>;
};

export type LeaseLiabilityScheduleItemFormGroup = FormGroup<LeaseLiabilityScheduleItemFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class LeaseLiabilityScheduleItemFormService {
  createLeaseLiabilityScheduleItemFormGroup(
    leaseLiabilityScheduleItem: LeaseLiabilityScheduleItemFormGroupInput = { id: null }
  ): LeaseLiabilityScheduleItemFormGroup {
    const leaseLiabilityScheduleItemRawValue = {
      ...this.getFormDefaults(),
      ...leaseLiabilityScheduleItem,
    };
    return new FormGroup<LeaseLiabilityScheduleItemFormGroupContent>({
      id: new FormControl(
        { value: leaseLiabilityScheduleItemRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      sequenceNumber: new FormControl(leaseLiabilityScheduleItemRawValue.sequenceNumber),
      periodIncluded: new FormControl(leaseLiabilityScheduleItemRawValue.periodIncluded),
      periodStartDate: new FormControl(leaseLiabilityScheduleItemRawValue.periodStartDate),
      periodEndDate: new FormControl(leaseLiabilityScheduleItemRawValue.periodEndDate),
      openingBalance: new FormControl(leaseLiabilityScheduleItemRawValue.openingBalance),
      cashPayment: new FormControl(leaseLiabilityScheduleItemRawValue.cashPayment),
      principalPayment: new FormControl(leaseLiabilityScheduleItemRawValue.principalPayment),
      interestPayment: new FormControl(leaseLiabilityScheduleItemRawValue.interestPayment),
      outstandingBalance: new FormControl(leaseLiabilityScheduleItemRawValue.outstandingBalance),
      interestPayableOpening: new FormControl(leaseLiabilityScheduleItemRawValue.interestPayableOpening),
      interestExpenseAccrued: new FormControl(leaseLiabilityScheduleItemRawValue.interestExpenseAccrued),
      interestPayableBalance: new FormControl(leaseLiabilityScheduleItemRawValue.interestPayableBalance),
      placeholders: new FormControl(leaseLiabilityScheduleItemRawValue.placeholders ?? []),
      leaseContract: new FormControl(leaseLiabilityScheduleItemRawValue.leaseContract, {
        validators: [Validators.required],
      }),
      leaseModelMetadata: new FormControl(leaseLiabilityScheduleItemRawValue.leaseModelMetadata),
      universallyUniqueMappings: new FormControl(leaseLiabilityScheduleItemRawValue.universallyUniqueMappings ?? []),
    });
  }

  getLeaseLiabilityScheduleItem(form: LeaseLiabilityScheduleItemFormGroup): ILeaseLiabilityScheduleItem | NewLeaseLiabilityScheduleItem {
    return form.getRawValue() as ILeaseLiabilityScheduleItem | NewLeaseLiabilityScheduleItem;
  }

  resetForm(form: LeaseLiabilityScheduleItemFormGroup, leaseLiabilityScheduleItem: LeaseLiabilityScheduleItemFormGroupInput): void {
    const leaseLiabilityScheduleItemRawValue = { ...this.getFormDefaults(), ...leaseLiabilityScheduleItem };
    form.reset(
      {
        ...leaseLiabilityScheduleItemRawValue,
        id: { value: leaseLiabilityScheduleItemRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): LeaseLiabilityScheduleItemFormDefaults {
    return {
      id: null,
      periodIncluded: false,
      placeholders: [],
      universallyUniqueMappings: [],
    };
  }
}
