import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ISettlementCurrency, NewSettlementCurrency } from '../settlement-currency.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ISettlementCurrency for edit and NewSettlementCurrencyFormGroupInput for create.
 */
type SettlementCurrencyFormGroupInput = ISettlementCurrency | PartialWithRequiredKeyOf<NewSettlementCurrency>;

type SettlementCurrencyFormDefaults = Pick<NewSettlementCurrency, 'id' | 'placeholders'>;

type SettlementCurrencyFormGroupContent = {
  id: FormControl<ISettlementCurrency['id'] | NewSettlementCurrency['id']>;
  iso4217CurrencyCode: FormControl<ISettlementCurrency['iso4217CurrencyCode']>;
  currencyName: FormControl<ISettlementCurrency['currencyName']>;
  country: FormControl<ISettlementCurrency['country']>;
  numericCode: FormControl<ISettlementCurrency['numericCode']>;
  minorUnit: FormControl<ISettlementCurrency['minorUnit']>;
  fileUploadToken: FormControl<ISettlementCurrency['fileUploadToken']>;
  compilationToken: FormControl<ISettlementCurrency['compilationToken']>;
  placeholders: FormControl<ISettlementCurrency['placeholders']>;
};

export type SettlementCurrencyFormGroup = FormGroup<SettlementCurrencyFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class SettlementCurrencyFormService {
  createSettlementCurrencyFormGroup(settlementCurrency: SettlementCurrencyFormGroupInput = { id: null }): SettlementCurrencyFormGroup {
    const settlementCurrencyRawValue = {
      ...this.getFormDefaults(),
      ...settlementCurrency,
    };
    return new FormGroup<SettlementCurrencyFormGroupContent>({
      id: new FormControl(
        { value: settlementCurrencyRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      iso4217CurrencyCode: new FormControl(settlementCurrencyRawValue.iso4217CurrencyCode, {
        validators: [Validators.required, Validators.minLength(3), Validators.maxLength(3)],
      }),
      currencyName: new FormControl(settlementCurrencyRawValue.currencyName, {
        validators: [Validators.required],
      }),
      country: new FormControl(settlementCurrencyRawValue.country, {
        validators: [Validators.required],
      }),
      numericCode: new FormControl(settlementCurrencyRawValue.numericCode),
      minorUnit: new FormControl(settlementCurrencyRawValue.minorUnit),
      fileUploadToken: new FormControl(settlementCurrencyRawValue.fileUploadToken),
      compilationToken: new FormControl(settlementCurrencyRawValue.compilationToken),
      placeholders: new FormControl(settlementCurrencyRawValue.placeholders ?? []),
    });
  }

  getSettlementCurrency(form: SettlementCurrencyFormGroup): ISettlementCurrency | NewSettlementCurrency {
    return form.getRawValue() as ISettlementCurrency | NewSettlementCurrency;
  }

  resetForm(form: SettlementCurrencyFormGroup, settlementCurrency: SettlementCurrencyFormGroupInput): void {
    const settlementCurrencyRawValue = { ...this.getFormDefaults(), ...settlementCurrency };
    form.reset(
      {
        ...settlementCurrencyRawValue,
        id: { value: settlementCurrencyRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): SettlementCurrencyFormDefaults {
    return {
      id: null,
      placeholders: [],
    };
  }
}
