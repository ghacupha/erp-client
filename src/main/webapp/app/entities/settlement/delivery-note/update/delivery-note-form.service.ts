import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IDeliveryNote, NewDeliveryNote } from '../delivery-note.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDeliveryNote for edit and NewDeliveryNoteFormGroupInput for create.
 */
type DeliveryNoteFormGroupInput = IDeliveryNote | PartialWithRequiredKeyOf<NewDeliveryNote>;

type DeliveryNoteFormDefaults = Pick<
  NewDeliveryNote,
  'id' | 'placeholders' | 'deliveryStamps' | 'signatories' | 'otherPurchaseOrders' | 'businessDocuments'
>;

type DeliveryNoteFormGroupContent = {
  id: FormControl<IDeliveryNote['id'] | NewDeliveryNote['id']>;
  deliveryNoteNumber: FormControl<IDeliveryNote['deliveryNoteNumber']>;
  documentDate: FormControl<IDeliveryNote['documentDate']>;
  description: FormControl<IDeliveryNote['description']>;
  serialNumber: FormControl<IDeliveryNote['serialNumber']>;
  quantity: FormControl<IDeliveryNote['quantity']>;
  remarks: FormControl<IDeliveryNote['remarks']>;
  placeholders: FormControl<IDeliveryNote['placeholders']>;
  receivedBy: FormControl<IDeliveryNote['receivedBy']>;
  deliveryStamps: FormControl<IDeliveryNote['deliveryStamps']>;
  purchaseOrder: FormControl<IDeliveryNote['purchaseOrder']>;
  supplier: FormControl<IDeliveryNote['supplier']>;
  signatories: FormControl<IDeliveryNote['signatories']>;
  otherPurchaseOrders: FormControl<IDeliveryNote['otherPurchaseOrders']>;
  businessDocuments: FormControl<IDeliveryNote['businessDocuments']>;
};

export type DeliveryNoteFormGroup = FormGroup<DeliveryNoteFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DeliveryNoteFormService {
  createDeliveryNoteFormGroup(deliveryNote: DeliveryNoteFormGroupInput = { id: null }): DeliveryNoteFormGroup {
    const deliveryNoteRawValue = {
      ...this.getFormDefaults(),
      ...deliveryNote,
    };
    return new FormGroup<DeliveryNoteFormGroupContent>({
      id: new FormControl(
        { value: deliveryNoteRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      deliveryNoteNumber: new FormControl(deliveryNoteRawValue.deliveryNoteNumber, {
        validators: [Validators.required],
      }),
      documentDate: new FormControl(deliveryNoteRawValue.documentDate, {
        validators: [Validators.required],
      }),
      description: new FormControl(deliveryNoteRawValue.description),
      serialNumber: new FormControl(deliveryNoteRawValue.serialNumber),
      quantity: new FormControl(deliveryNoteRawValue.quantity),
      remarks: new FormControl(deliveryNoteRawValue.remarks),
      placeholders: new FormControl(deliveryNoteRawValue.placeholders ?? []),
      receivedBy: new FormControl(deliveryNoteRawValue.receivedBy, {
        validators: [Validators.required],
      }),
      deliveryStamps: new FormControl(deliveryNoteRawValue.deliveryStamps ?? []),
      purchaseOrder: new FormControl(deliveryNoteRawValue.purchaseOrder),
      supplier: new FormControl(deliveryNoteRawValue.supplier, {
        validators: [Validators.required],
      }),
      signatories: new FormControl(deliveryNoteRawValue.signatories ?? []),
      otherPurchaseOrders: new FormControl(deliveryNoteRawValue.otherPurchaseOrders ?? []),
      businessDocuments: new FormControl(deliveryNoteRawValue.businessDocuments ?? []),
    });
  }

  getDeliveryNote(form: DeliveryNoteFormGroup): IDeliveryNote | NewDeliveryNote {
    return form.getRawValue() as IDeliveryNote | NewDeliveryNote;
  }

  resetForm(form: DeliveryNoteFormGroup, deliveryNote: DeliveryNoteFormGroupInput): void {
    const deliveryNoteRawValue = { ...this.getFormDefaults(), ...deliveryNote };
    form.reset(
      {
        ...deliveryNoteRawValue,
        id: { value: deliveryNoteRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): DeliveryNoteFormDefaults {
    return {
      id: null,
      placeholders: [],
      deliveryStamps: [],
      signatories: [],
      otherPurchaseOrders: [],
      businessDocuments: [],
    };
  }
}
