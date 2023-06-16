import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ITaxRule, NewTaxRule } from '../tax-rule.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITaxRule for edit and NewTaxRuleFormGroupInput for create.
 */
type TaxRuleFormGroupInput = ITaxRule | PartialWithRequiredKeyOf<NewTaxRule>;

type TaxRuleFormDefaults = Pick<NewTaxRule, 'id' | 'placeholders'>;

type TaxRuleFormGroupContent = {
  id: FormControl<ITaxRule['id'] | NewTaxRule['id']>;
  telcoExciseDuty: FormControl<ITaxRule['telcoExciseDuty']>;
  valueAddedTax: FormControl<ITaxRule['valueAddedTax']>;
  withholdingVAT: FormControl<ITaxRule['withholdingVAT']>;
  withholdingTaxConsultancy: FormControl<ITaxRule['withholdingTaxConsultancy']>;
  withholdingTaxRent: FormControl<ITaxRule['withholdingTaxRent']>;
  cateringLevy: FormControl<ITaxRule['cateringLevy']>;
  serviceCharge: FormControl<ITaxRule['serviceCharge']>;
  withholdingTaxImportedService: FormControl<ITaxRule['withholdingTaxImportedService']>;
  fileUploadToken: FormControl<ITaxRule['fileUploadToken']>;
  compilationToken: FormControl<ITaxRule['compilationToken']>;
  placeholders: FormControl<ITaxRule['placeholders']>;
};

export type TaxRuleFormGroup = FormGroup<TaxRuleFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TaxRuleFormService {
  createTaxRuleFormGroup(taxRule: TaxRuleFormGroupInput = { id: null }): TaxRuleFormGroup {
    const taxRuleRawValue = {
      ...this.getFormDefaults(),
      ...taxRule,
    };
    return new FormGroup<TaxRuleFormGroupContent>({
      id: new FormControl(
        { value: taxRuleRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      telcoExciseDuty: new FormControl(taxRuleRawValue.telcoExciseDuty),
      valueAddedTax: new FormControl(taxRuleRawValue.valueAddedTax),
      withholdingVAT: new FormControl(taxRuleRawValue.withholdingVAT),
      withholdingTaxConsultancy: new FormControl(taxRuleRawValue.withholdingTaxConsultancy),
      withholdingTaxRent: new FormControl(taxRuleRawValue.withholdingTaxRent),
      cateringLevy: new FormControl(taxRuleRawValue.cateringLevy),
      serviceCharge: new FormControl(taxRuleRawValue.serviceCharge),
      withholdingTaxImportedService: new FormControl(taxRuleRawValue.withholdingTaxImportedService),
      fileUploadToken: new FormControl(taxRuleRawValue.fileUploadToken),
      compilationToken: new FormControl(taxRuleRawValue.compilationToken),
      placeholders: new FormControl(taxRuleRawValue.placeholders ?? []),
    });
  }

  getTaxRule(form: TaxRuleFormGroup): ITaxRule | NewTaxRule {
    return form.getRawValue() as ITaxRule | NewTaxRule;
  }

  resetForm(form: TaxRuleFormGroup, taxRule: TaxRuleFormGroupInput): void {
    const taxRuleRawValue = { ...this.getFormDefaults(), ...taxRule };
    form.reset(
      {
        ...taxRuleRawValue,
        id: { value: taxRuleRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): TaxRuleFormDefaults {
    return {
      id: null,
      placeholders: [],
    };
  }
}
