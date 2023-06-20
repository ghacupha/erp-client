import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ITransactionAccount, NewTransactionAccount } from '../transaction-account.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITransactionAccount for edit and NewTransactionAccountFormGroupInput for create.
 */
type TransactionAccountFormGroupInput = ITransactionAccount | PartialWithRequiredKeyOf<NewTransactionAccount>;

type TransactionAccountFormDefaults = Pick<NewTransactionAccount, 'id' | 'placeholders'>;

type TransactionAccountFormGroupContent = {
  id: FormControl<ITransactionAccount['id'] | NewTransactionAccount['id']>;
  accountNumber: FormControl<ITransactionAccount['accountNumber']>;
  accountName: FormControl<ITransactionAccount['accountName']>;
  notes: FormControl<ITransactionAccount['notes']>;
  notesContentType: FormControl<ITransactionAccount['notesContentType']>;
  parentAccount: FormControl<ITransactionAccount['parentAccount']>;
  placeholders: FormControl<ITransactionAccount['placeholders']>;
};

export type TransactionAccountFormGroup = FormGroup<TransactionAccountFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TransactionAccountFormService {
  createTransactionAccountFormGroup(transactionAccount: TransactionAccountFormGroupInput = { id: null }): TransactionAccountFormGroup {
    const transactionAccountRawValue = {
      ...this.getFormDefaults(),
      ...transactionAccount,
    };
    return new FormGroup<TransactionAccountFormGroupContent>({
      id: new FormControl(
        { value: transactionAccountRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      accountNumber: new FormControl(transactionAccountRawValue.accountNumber, {
        validators: [Validators.required],
      }),
      accountName: new FormControl(transactionAccountRawValue.accountName, {
        validators: [Validators.required],
      }),
      notes: new FormControl(transactionAccountRawValue.notes),
      notesContentType: new FormControl(transactionAccountRawValue.notesContentType),
      parentAccount: new FormControl(transactionAccountRawValue.parentAccount),
      placeholders: new FormControl(transactionAccountRawValue.placeholders ?? []),
    });
  }

  getTransactionAccount(form: TransactionAccountFormGroup): ITransactionAccount | NewTransactionAccount {
    return form.getRawValue() as ITransactionAccount | NewTransactionAccount;
  }

  resetForm(form: TransactionAccountFormGroup, transactionAccount: TransactionAccountFormGroupInput): void {
    const transactionAccountRawValue = { ...this.getFormDefaults(), ...transactionAccount };
    form.reset(
      {
        ...transactionAccountRawValue,
        id: { value: transactionAccountRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): TransactionAccountFormDefaults {
    return {
      id: null,
      placeholders: [],
    };
  }
}
