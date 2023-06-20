import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IPurchaseOrder, NewPurchaseOrder } from '../purchase-order.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IPurchaseOrder for edit and NewPurchaseOrderFormGroupInput for create.
 */
type PurchaseOrderFormGroupInput = IPurchaseOrder | PartialWithRequiredKeyOf<NewPurchaseOrder>;

type PurchaseOrderFormDefaults = Pick<NewPurchaseOrder, 'id' | 'placeholders' | 'signatories' | 'businessDocuments'>;

type PurchaseOrderFormGroupContent = {
  id: FormControl<IPurchaseOrder['id'] | NewPurchaseOrder['id']>;
  purchaseOrderNumber: FormControl<IPurchaseOrder['purchaseOrderNumber']>;
  purchaseOrderDate: FormControl<IPurchaseOrder['purchaseOrderDate']>;
  purchaseOrderAmount: FormControl<IPurchaseOrder['purchaseOrderAmount']>;
  description: FormControl<IPurchaseOrder['description']>;
  notes: FormControl<IPurchaseOrder['notes']>;
  fileUploadToken: FormControl<IPurchaseOrder['fileUploadToken']>;
  compilationToken: FormControl<IPurchaseOrder['compilationToken']>;
  remarks: FormControl<IPurchaseOrder['remarks']>;
  settlementCurrency: FormControl<IPurchaseOrder['settlementCurrency']>;
  placeholders: FormControl<IPurchaseOrder['placeholders']>;
  signatories: FormControl<IPurchaseOrder['signatories']>;
  vendor: FormControl<IPurchaseOrder['vendor']>;
  businessDocuments: FormControl<IPurchaseOrder['businessDocuments']>;
};

export type PurchaseOrderFormGroup = FormGroup<PurchaseOrderFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class PurchaseOrderFormService {
  createPurchaseOrderFormGroup(purchaseOrder: PurchaseOrderFormGroupInput = { id: null }): PurchaseOrderFormGroup {
    const purchaseOrderRawValue = {
      ...this.getFormDefaults(),
      ...purchaseOrder,
    };
    return new FormGroup<PurchaseOrderFormGroupContent>({
      id: new FormControl(
        { value: purchaseOrderRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      purchaseOrderNumber: new FormControl(purchaseOrderRawValue.purchaseOrderNumber, {
        validators: [Validators.required],
      }),
      purchaseOrderDate: new FormControl(purchaseOrderRawValue.purchaseOrderDate),
      purchaseOrderAmount: new FormControl(purchaseOrderRawValue.purchaseOrderAmount),
      description: new FormControl(purchaseOrderRawValue.description),
      notes: new FormControl(purchaseOrderRawValue.notes),
      fileUploadToken: new FormControl(purchaseOrderRawValue.fileUploadToken),
      compilationToken: new FormControl(purchaseOrderRawValue.compilationToken),
      remarks: new FormControl(purchaseOrderRawValue.remarks),
      settlementCurrency: new FormControl(purchaseOrderRawValue.settlementCurrency),
      placeholders: new FormControl(purchaseOrderRawValue.placeholders ?? []),
      signatories: new FormControl(purchaseOrderRawValue.signatories ?? []),
      vendor: new FormControl(purchaseOrderRawValue.vendor, {
        validators: [Validators.required],
      }),
      businessDocuments: new FormControl(purchaseOrderRawValue.businessDocuments ?? []),
    });
  }

  getPurchaseOrder(form: PurchaseOrderFormGroup): IPurchaseOrder | NewPurchaseOrder {
    return form.getRawValue() as IPurchaseOrder | NewPurchaseOrder;
  }

  resetForm(form: PurchaseOrderFormGroup, purchaseOrder: PurchaseOrderFormGroupInput): void {
    const purchaseOrderRawValue = { ...this.getFormDefaults(), ...purchaseOrder };
    form.reset(
      {
        ...purchaseOrderRawValue,
        id: { value: purchaseOrderRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): PurchaseOrderFormDefaults {
    return {
      id: null,
      placeholders: [],
      signatories: [],
      businessDocuments: [],
    };
  }
}
