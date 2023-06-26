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

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { ISettlementRequisition, NewSettlementRequisition } from '../settlement-requisition.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ISettlementRequisition for edit and NewSettlementRequisitionFormGroupInput for create.
 */
type SettlementRequisitionFormGroupInput = ISettlementRequisition | PartialWithRequiredKeyOf<NewSettlementRequisition>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends ISettlementRequisition | NewSettlementRequisition> = Omit<T, 'timeOfRequisition'> & {
  timeOfRequisition?: string | null;
};

type SettlementRequisitionFormRawValue = FormValueOf<ISettlementRequisition>;

type NewSettlementRequisitionFormRawValue = FormValueOf<NewSettlementRequisition>;

type SettlementRequisitionFormDefaults = Pick<
  NewSettlementRequisition,
  | 'id'
  | 'timeOfRequisition'
  | 'paymentInvoices'
  | 'deliveryNotes'
  | 'jobSheets'
  | 'signatures'
  | 'businessDocuments'
  | 'applicationMappings'
  | 'placeholders'
  | 'settlements'
>;

type SettlementRequisitionFormGroupContent = {
  id: FormControl<SettlementRequisitionFormRawValue['id'] | NewSettlementRequisition['id']>;
  description: FormControl<SettlementRequisitionFormRawValue['description']>;
  serialNumber: FormControl<SettlementRequisitionFormRawValue['serialNumber']>;
  timeOfRequisition: FormControl<SettlementRequisitionFormRawValue['timeOfRequisition']>;
  requisitionNumber: FormControl<SettlementRequisitionFormRawValue['requisitionNumber']>;
  paymentAmount: FormControl<SettlementRequisitionFormRawValue['paymentAmount']>;
  paymentStatus: FormControl<SettlementRequisitionFormRawValue['paymentStatus']>;
  settlementCurrency: FormControl<SettlementRequisitionFormRawValue['settlementCurrency']>;
  currentOwner: FormControl<SettlementRequisitionFormRawValue['currentOwner']>;
  nativeOwner: FormControl<SettlementRequisitionFormRawValue['nativeOwner']>;
  nativeDepartment: FormControl<SettlementRequisitionFormRawValue['nativeDepartment']>;
  biller: FormControl<SettlementRequisitionFormRawValue['biller']>;
  paymentInvoices: FormControl<SettlementRequisitionFormRawValue['paymentInvoices']>;
  deliveryNotes: FormControl<SettlementRequisitionFormRawValue['deliveryNotes']>;
  jobSheets: FormControl<SettlementRequisitionFormRawValue['jobSheets']>;
  signatures: FormControl<SettlementRequisitionFormRawValue['signatures']>;
  businessDocuments: FormControl<SettlementRequisitionFormRawValue['businessDocuments']>;
  applicationMappings: FormControl<SettlementRequisitionFormRawValue['applicationMappings']>;
  placeholders: FormControl<SettlementRequisitionFormRawValue['placeholders']>;
  settlements: FormControl<SettlementRequisitionFormRawValue['settlements']>;
};

export type SettlementRequisitionFormGroup = FormGroup<SettlementRequisitionFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class SettlementRequisitionFormService {
  createSettlementRequisitionFormGroup(
    settlementRequisition: SettlementRequisitionFormGroupInput = { id: null }
  ): SettlementRequisitionFormGroup {
    const settlementRequisitionRawValue = this.convertSettlementRequisitionToSettlementRequisitionRawValue({
      ...this.getFormDefaults(),
      ...settlementRequisition,
    });
    return new FormGroup<SettlementRequisitionFormGroupContent>({
      id: new FormControl(
        { value: settlementRequisitionRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      description: new FormControl(settlementRequisitionRawValue.description),
      serialNumber: new FormControl(settlementRequisitionRawValue.serialNumber, {
        validators: [Validators.required],
      }),
      timeOfRequisition: new FormControl(settlementRequisitionRawValue.timeOfRequisition, {
        validators: [Validators.required],
      }),
      requisitionNumber: new FormControl(settlementRequisitionRawValue.requisitionNumber, {
        validators: [Validators.required],
      }),
      paymentAmount: new FormControl(settlementRequisitionRawValue.paymentAmount, {
        validators: [Validators.required],
      }),
      paymentStatus: new FormControl(settlementRequisitionRawValue.paymentStatus, {
        validators: [Validators.required],
      }),
      settlementCurrency: new FormControl(settlementRequisitionRawValue.settlementCurrency, {
        validators: [Validators.required],
      }),
      currentOwner: new FormControl(settlementRequisitionRawValue.currentOwner, {
        validators: [Validators.required],
      }),
      nativeOwner: new FormControl(settlementRequisitionRawValue.nativeOwner, {
        validators: [Validators.required],
      }),
      nativeDepartment: new FormControl(settlementRequisitionRawValue.nativeDepartment, {
        validators: [Validators.required],
      }),
      biller: new FormControl(settlementRequisitionRawValue.biller, {
        validators: [Validators.required],
      }),
      paymentInvoices: new FormControl(settlementRequisitionRawValue.paymentInvoices ?? []),
      deliveryNotes: new FormControl(settlementRequisitionRawValue.deliveryNotes ?? []),
      jobSheets: new FormControl(settlementRequisitionRawValue.jobSheets ?? []),
      signatures: new FormControl(settlementRequisitionRawValue.signatures ?? []),
      businessDocuments: new FormControl(settlementRequisitionRawValue.businessDocuments ?? []),
      applicationMappings: new FormControl(settlementRequisitionRawValue.applicationMappings ?? []),
      placeholders: new FormControl(settlementRequisitionRawValue.placeholders ?? []),
      settlements: new FormControl(settlementRequisitionRawValue.settlements ?? []),
    });
  }

  getSettlementRequisition(form: SettlementRequisitionFormGroup): ISettlementRequisition | NewSettlementRequisition {
    return this.convertSettlementRequisitionRawValueToSettlementRequisition(
      form.getRawValue() as SettlementRequisitionFormRawValue | NewSettlementRequisitionFormRawValue
    );
  }

  resetForm(form: SettlementRequisitionFormGroup, settlementRequisition: SettlementRequisitionFormGroupInput): void {
    const settlementRequisitionRawValue = this.convertSettlementRequisitionToSettlementRequisitionRawValue({
      ...this.getFormDefaults(),
      ...settlementRequisition,
    });
    form.reset(
      {
        ...settlementRequisitionRawValue,
        id: { value: settlementRequisitionRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): SettlementRequisitionFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      timeOfRequisition: currentTime,
      paymentInvoices: [],
      deliveryNotes: [],
      jobSheets: [],
      signatures: [],
      businessDocuments: [],
      applicationMappings: [],
      placeholders: [],
      settlements: [],
    };
  }

  private convertSettlementRequisitionRawValueToSettlementRequisition(
    rawSettlementRequisition: SettlementRequisitionFormRawValue | NewSettlementRequisitionFormRawValue
  ): ISettlementRequisition | NewSettlementRequisition {
    return {
      ...rawSettlementRequisition,
      timeOfRequisition: dayjs(rawSettlementRequisition.timeOfRequisition, DATE_TIME_FORMAT),
    };
  }

  private convertSettlementRequisitionToSettlementRequisitionRawValue(
    settlementRequisition: ISettlementRequisition | (Partial<NewSettlementRequisition> & SettlementRequisitionFormDefaults)
  ): SettlementRequisitionFormRawValue | PartialWithRequiredKeyOf<NewSettlementRequisitionFormRawValue> {
    return {
      ...settlementRequisition,
      timeOfRequisition: settlementRequisition.timeOfRequisition
        ? settlementRequisition.timeOfRequisition.format(DATE_TIME_FORMAT)
        : undefined,
      paymentInvoices: settlementRequisition.paymentInvoices ?? [],
      deliveryNotes: settlementRequisition.deliveryNotes ?? [],
      jobSheets: settlementRequisition.jobSheets ?? [],
      signatures: settlementRequisition.signatures ?? [],
      businessDocuments: settlementRequisition.businessDocuments ?? [],
      applicationMappings: settlementRequisition.applicationMappings ?? [],
      placeholders: settlementRequisition.placeholders ?? [],
      settlements: settlementRequisition.settlements ?? [],
    };
  }
}
