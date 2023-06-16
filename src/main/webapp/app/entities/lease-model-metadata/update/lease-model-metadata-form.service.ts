import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ILeaseModelMetadata, NewLeaseModelMetadata } from '../lease-model-metadata.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ILeaseModelMetadata for edit and NewLeaseModelMetadataFormGroupInput for create.
 */
type LeaseModelMetadataFormGroupInput = ILeaseModelMetadata | PartialWithRequiredKeyOf<NewLeaseModelMetadata>;

type LeaseModelMetadataFormDefaults = Pick<NewLeaseModelMetadata, 'id' | 'placeholders' | 'leaseMappings'>;

type LeaseModelMetadataFormGroupContent = {
  id: FormControl<ILeaseModelMetadata['id'] | NewLeaseModelMetadata['id']>;
  modelTitle: FormControl<ILeaseModelMetadata['modelTitle']>;
  modelVersion: FormControl<ILeaseModelMetadata['modelVersion']>;
  description: FormControl<ILeaseModelMetadata['description']>;
  modelNotes: FormControl<ILeaseModelMetadata['modelNotes']>;
  modelNotesContentType: FormControl<ILeaseModelMetadata['modelNotesContentType']>;
  annualDiscountingRate: FormControl<ILeaseModelMetadata['annualDiscountingRate']>;
  commencementDate: FormControl<ILeaseModelMetadata['commencementDate']>;
  terminalDate: FormControl<ILeaseModelMetadata['terminalDate']>;
  totalReportingPeriods: FormControl<ILeaseModelMetadata['totalReportingPeriods']>;
  reportingPeriodsPerYear: FormControl<ILeaseModelMetadata['reportingPeriodsPerYear']>;
  settlementPeriodsPerYear: FormControl<ILeaseModelMetadata['settlementPeriodsPerYear']>;
  initialLiabilityAmount: FormControl<ILeaseModelMetadata['initialLiabilityAmount']>;
  initialROUAmount: FormControl<ILeaseModelMetadata['initialROUAmount']>;
  totalDepreciationPeriods: FormControl<ILeaseModelMetadata['totalDepreciationPeriods']>;
  placeholders: FormControl<ILeaseModelMetadata['placeholders']>;
  leaseMappings: FormControl<ILeaseModelMetadata['leaseMappings']>;
  leaseContract: FormControl<ILeaseModelMetadata['leaseContract']>;
  predecessor: FormControl<ILeaseModelMetadata['predecessor']>;
  liabilityCurrency: FormControl<ILeaseModelMetadata['liabilityCurrency']>;
  rouAssetCurrency: FormControl<ILeaseModelMetadata['rouAssetCurrency']>;
  modelAttachments: FormControl<ILeaseModelMetadata['modelAttachments']>;
  securityClearance: FormControl<ILeaseModelMetadata['securityClearance']>;
  leaseLiabilityAccount: FormControl<ILeaseModelMetadata['leaseLiabilityAccount']>;
  interestPayableAccount: FormControl<ILeaseModelMetadata['interestPayableAccount']>;
  interestExpenseAccount: FormControl<ILeaseModelMetadata['interestExpenseAccount']>;
  rouAssetAccount: FormControl<ILeaseModelMetadata['rouAssetAccount']>;
  rouDepreciationAccount: FormControl<ILeaseModelMetadata['rouDepreciationAccount']>;
  accruedDepreciationAccount: FormControl<ILeaseModelMetadata['accruedDepreciationAccount']>;
};

export type LeaseModelMetadataFormGroup = FormGroup<LeaseModelMetadataFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class LeaseModelMetadataFormService {
  createLeaseModelMetadataFormGroup(leaseModelMetadata: LeaseModelMetadataFormGroupInput = { id: null }): LeaseModelMetadataFormGroup {
    const leaseModelMetadataRawValue = {
      ...this.getFormDefaults(),
      ...leaseModelMetadata,
    };
    return new FormGroup<LeaseModelMetadataFormGroupContent>({
      id: new FormControl(
        { value: leaseModelMetadataRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      modelTitle: new FormControl(leaseModelMetadataRawValue.modelTitle, {
        validators: [Validators.required],
      }),
      modelVersion: new FormControl(leaseModelMetadataRawValue.modelVersion, {
        validators: [Validators.required],
      }),
      description: new FormControl(leaseModelMetadataRawValue.description),
      modelNotes: new FormControl(leaseModelMetadataRawValue.modelNotes),
      modelNotesContentType: new FormControl(leaseModelMetadataRawValue.modelNotesContentType),
      annualDiscountingRate: new FormControl(leaseModelMetadataRawValue.annualDiscountingRate, {
        validators: [Validators.required],
      }),
      commencementDate: new FormControl(leaseModelMetadataRawValue.commencementDate, {
        validators: [Validators.required],
      }),
      terminalDate: new FormControl(leaseModelMetadataRawValue.terminalDate, {
        validators: [Validators.required],
      }),
      totalReportingPeriods: new FormControl(leaseModelMetadataRawValue.totalReportingPeriods),
      reportingPeriodsPerYear: new FormControl(leaseModelMetadataRawValue.reportingPeriodsPerYear),
      settlementPeriodsPerYear: new FormControl(leaseModelMetadataRawValue.settlementPeriodsPerYear),
      initialLiabilityAmount: new FormControl(leaseModelMetadataRawValue.initialLiabilityAmount),
      initialROUAmount: new FormControl(leaseModelMetadataRawValue.initialROUAmount),
      totalDepreciationPeriods: new FormControl(leaseModelMetadataRawValue.totalDepreciationPeriods),
      placeholders: new FormControl(leaseModelMetadataRawValue.placeholders ?? []),
      leaseMappings: new FormControl(leaseModelMetadataRawValue.leaseMappings ?? []),
      leaseContract: new FormControl(leaseModelMetadataRawValue.leaseContract, {
        validators: [Validators.required],
      }),
      predecessor: new FormControl(leaseModelMetadataRawValue.predecessor),
      liabilityCurrency: new FormControl(leaseModelMetadataRawValue.liabilityCurrency, {
        validators: [Validators.required],
      }),
      rouAssetCurrency: new FormControl(leaseModelMetadataRawValue.rouAssetCurrency, {
        validators: [Validators.required],
      }),
      modelAttachments: new FormControl(leaseModelMetadataRawValue.modelAttachments),
      securityClearance: new FormControl(leaseModelMetadataRawValue.securityClearance),
      leaseLiabilityAccount: new FormControl(leaseModelMetadataRawValue.leaseLiabilityAccount),
      interestPayableAccount: new FormControl(leaseModelMetadataRawValue.interestPayableAccount),
      interestExpenseAccount: new FormControl(leaseModelMetadataRawValue.interestExpenseAccount),
      rouAssetAccount: new FormControl(leaseModelMetadataRawValue.rouAssetAccount),
      rouDepreciationAccount: new FormControl(leaseModelMetadataRawValue.rouDepreciationAccount),
      accruedDepreciationAccount: new FormControl(leaseModelMetadataRawValue.accruedDepreciationAccount),
    });
  }

  getLeaseModelMetadata(form: LeaseModelMetadataFormGroup): ILeaseModelMetadata | NewLeaseModelMetadata {
    return form.getRawValue() as ILeaseModelMetadata | NewLeaseModelMetadata;
  }

  resetForm(form: LeaseModelMetadataFormGroup, leaseModelMetadata: LeaseModelMetadataFormGroupInput): void {
    const leaseModelMetadataRawValue = { ...this.getFormDefaults(), ...leaseModelMetadata };
    form.reset(
      {
        ...leaseModelMetadataRawValue,
        id: { value: leaseModelMetadataRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): LeaseModelMetadataFormDefaults {
    return {
      id: null,
      placeholders: [],
      leaseMappings: [],
    };
  }
}
