import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ISettlement, NewSettlement } from '../settlement.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ISettlement for edit and NewSettlementFormGroupInput for create.
 */
type SettlementFormGroupInput = ISettlement | PartialWithRequiredKeyOf<NewSettlement>;

type SettlementFormDefaults = Pick<
  NewSettlement,
  'id' | 'placeholders' | 'paymentLabels' | 'paymentInvoices' | 'signatories' | 'businessDocuments'
>;

type SettlementFormGroupContent = {
  id: FormControl<ISettlement['id'] | NewSettlement['id']>;
  paymentNumber: FormControl<ISettlement['paymentNumber']>;
  paymentDate: FormControl<ISettlement['paymentDate']>;
  paymentAmount: FormControl<ISettlement['paymentAmount']>;
  description: FormControl<ISettlement['description']>;
  notes: FormControl<ISettlement['notes']>;
  calculationFile: FormControl<ISettlement['calculationFile']>;
  calculationFileContentType: FormControl<ISettlement['calculationFileContentType']>;
  fileUploadToken: FormControl<ISettlement['fileUploadToken']>;
  compilationToken: FormControl<ISettlement['compilationToken']>;
  remarks: FormControl<ISettlement['remarks']>;
  placeholders: FormControl<ISettlement['placeholders']>;
  settlementCurrency: FormControl<ISettlement['settlementCurrency']>;
  paymentLabels: FormControl<ISettlement['paymentLabels']>;
  paymentCategory: FormControl<ISettlement['paymentCategory']>;
  groupSettlement: FormControl<ISettlement['groupSettlement']>;
  biller: FormControl<ISettlement['biller']>;
  paymentInvoices: FormControl<ISettlement['paymentInvoices']>;
  signatories: FormControl<ISettlement['signatories']>;
  businessDocuments: FormControl<ISettlement['businessDocuments']>;
};

export type SettlementFormGroup = FormGroup<SettlementFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class SettlementFormService {
  createSettlementFormGroup(settlement: SettlementFormGroupInput = { id: null }): SettlementFormGroup {
    const settlementRawValue = {
      ...this.getFormDefaults(),
      ...settlement,
    };
    return new FormGroup<SettlementFormGroupContent>({
      id: new FormControl(
        { value: settlementRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      paymentNumber: new FormControl(settlementRawValue.paymentNumber),
      paymentDate: new FormControl(settlementRawValue.paymentDate),
      paymentAmount: new FormControl(settlementRawValue.paymentAmount),
      description: new FormControl(settlementRawValue.description),
      notes: new FormControl(settlementRawValue.notes),
      calculationFile: new FormControl(settlementRawValue.calculationFile),
      calculationFileContentType: new FormControl(settlementRawValue.calculationFileContentType),
      fileUploadToken: new FormControl(settlementRawValue.fileUploadToken),
      compilationToken: new FormControl(settlementRawValue.compilationToken),
      remarks: new FormControl(settlementRawValue.remarks),
      placeholders: new FormControl(settlementRawValue.placeholders ?? []),
      settlementCurrency: new FormControl(settlementRawValue.settlementCurrency, {
        validators: [Validators.required],
      }),
      paymentLabels: new FormControl(settlementRawValue.paymentLabels ?? []),
      paymentCategory: new FormControl(settlementRawValue.paymentCategory, {
        validators: [Validators.required],
      }),
      groupSettlement: new FormControl(settlementRawValue.groupSettlement),
      biller: new FormControl(settlementRawValue.biller, {
        validators: [Validators.required],
      }),
      paymentInvoices: new FormControl(settlementRawValue.paymentInvoices ?? []),
      signatories: new FormControl(settlementRawValue.signatories ?? []),
      businessDocuments: new FormControl(settlementRawValue.businessDocuments ?? []),
    });
  }

  getSettlement(form: SettlementFormGroup): ISettlement | NewSettlement {
    return form.getRawValue() as ISettlement | NewSettlement;
  }

  resetForm(form: SettlementFormGroup, settlement: SettlementFormGroupInput): void {
    const settlementRawValue = { ...this.getFormDefaults(), ...settlement };
    form.reset(
      {
        ...settlementRawValue,
        id: { value: settlementRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): SettlementFormDefaults {
    return {
      id: null,
      placeholders: [],
      paymentLabels: [],
      paymentInvoices: [],
      signatories: [],
      businessDocuments: [],
    };
  }
}
