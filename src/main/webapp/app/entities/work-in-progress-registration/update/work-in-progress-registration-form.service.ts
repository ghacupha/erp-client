import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IWorkInProgressRegistration, NewWorkInProgressRegistration } from '../work-in-progress-registration.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IWorkInProgressRegistration for edit and NewWorkInProgressRegistrationFormGroupInput for create.
 */
type WorkInProgressRegistrationFormGroupInput = IWorkInProgressRegistration | PartialWithRequiredKeyOf<NewWorkInProgressRegistration>;

type WorkInProgressRegistrationFormDefaults = Pick<
  NewWorkInProgressRegistration,
  | 'id'
  | 'placeholders'
  | 'paymentInvoices'
  | 'serviceOutlets'
  | 'settlements'
  | 'purchaseOrders'
  | 'deliveryNotes'
  | 'jobSheets'
  | 'businessDocuments'
  | 'assetAccessories'
  | 'assetWarranties'
>;

type WorkInProgressRegistrationFormGroupContent = {
  id: FormControl<IWorkInProgressRegistration['id'] | NewWorkInProgressRegistration['id']>;
  sequenceNumber: FormControl<IWorkInProgressRegistration['sequenceNumber']>;
  particulars: FormControl<IWorkInProgressRegistration['particulars']>;
  instalmentAmount: FormControl<IWorkInProgressRegistration['instalmentAmount']>;
  comments: FormControl<IWorkInProgressRegistration['comments']>;
  commentsContentType: FormControl<IWorkInProgressRegistration['commentsContentType']>;
  placeholders: FormControl<IWorkInProgressRegistration['placeholders']>;
  paymentInvoices: FormControl<IWorkInProgressRegistration['paymentInvoices']>;
  serviceOutlets: FormControl<IWorkInProgressRegistration['serviceOutlets']>;
  settlements: FormControl<IWorkInProgressRegistration['settlements']>;
  purchaseOrders: FormControl<IWorkInProgressRegistration['purchaseOrders']>;
  deliveryNotes: FormControl<IWorkInProgressRegistration['deliveryNotes']>;
  jobSheets: FormControl<IWorkInProgressRegistration['jobSheets']>;
  dealer: FormControl<IWorkInProgressRegistration['dealer']>;
  workInProgressGroup: FormControl<IWorkInProgressRegistration['workInProgressGroup']>;
  settlementCurrency: FormControl<IWorkInProgressRegistration['settlementCurrency']>;
  workProjectRegister: FormControl<IWorkInProgressRegistration['workProjectRegister']>;
  businessDocuments: FormControl<IWorkInProgressRegistration['businessDocuments']>;
  assetAccessories: FormControl<IWorkInProgressRegistration['assetAccessories']>;
  assetWarranties: FormControl<IWorkInProgressRegistration['assetWarranties']>;
};

export type WorkInProgressRegistrationFormGroup = FormGroup<WorkInProgressRegistrationFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class WorkInProgressRegistrationFormService {
  createWorkInProgressRegistrationFormGroup(
    workInProgressRegistration: WorkInProgressRegistrationFormGroupInput = { id: null }
  ): WorkInProgressRegistrationFormGroup {
    const workInProgressRegistrationRawValue = {
      ...this.getFormDefaults(),
      ...workInProgressRegistration,
    };
    return new FormGroup<WorkInProgressRegistrationFormGroupContent>({
      id: new FormControl(
        { value: workInProgressRegistrationRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      sequenceNumber: new FormControl(workInProgressRegistrationRawValue.sequenceNumber, {
        validators: [Validators.required],
      }),
      particulars: new FormControl(workInProgressRegistrationRawValue.particulars),
      instalmentAmount: new FormControl(workInProgressRegistrationRawValue.instalmentAmount),
      comments: new FormControl(workInProgressRegistrationRawValue.comments),
      commentsContentType: new FormControl(workInProgressRegistrationRawValue.commentsContentType),
      placeholders: new FormControl(workInProgressRegistrationRawValue.placeholders ?? []),
      paymentInvoices: new FormControl(workInProgressRegistrationRawValue.paymentInvoices ?? []),
      serviceOutlets: new FormControl(workInProgressRegistrationRawValue.serviceOutlets ?? []),
      settlements: new FormControl(workInProgressRegistrationRawValue.settlements ?? []),
      purchaseOrders: new FormControl(workInProgressRegistrationRawValue.purchaseOrders ?? []),
      deliveryNotes: new FormControl(workInProgressRegistrationRawValue.deliveryNotes ?? []),
      jobSheets: new FormControl(workInProgressRegistrationRawValue.jobSheets ?? []),
      dealer: new FormControl(workInProgressRegistrationRawValue.dealer),
      workInProgressGroup: new FormControl(workInProgressRegistrationRawValue.workInProgressGroup),
      settlementCurrency: new FormControl(workInProgressRegistrationRawValue.settlementCurrency),
      workProjectRegister: new FormControl(workInProgressRegistrationRawValue.workProjectRegister),
      businessDocuments: new FormControl(workInProgressRegistrationRawValue.businessDocuments ?? []),
      assetAccessories: new FormControl(workInProgressRegistrationRawValue.assetAccessories ?? []),
      assetWarranties: new FormControl(workInProgressRegistrationRawValue.assetWarranties ?? []),
    });
  }

  getWorkInProgressRegistration(form: WorkInProgressRegistrationFormGroup): IWorkInProgressRegistration | NewWorkInProgressRegistration {
    return form.getRawValue() as IWorkInProgressRegistration | NewWorkInProgressRegistration;
  }

  resetForm(form: WorkInProgressRegistrationFormGroup, workInProgressRegistration: WorkInProgressRegistrationFormGroupInput): void {
    const workInProgressRegistrationRawValue = { ...this.getFormDefaults(), ...workInProgressRegistration };
    form.reset(
      {
        ...workInProgressRegistrationRawValue,
        id: { value: workInProgressRegistrationRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): WorkInProgressRegistrationFormDefaults {
    return {
      id: null,
      placeholders: [],
      paymentInvoices: [],
      serviceOutlets: [],
      settlements: [],
      purchaseOrders: [],
      deliveryNotes: [],
      jobSheets: [],
      businessDocuments: [],
      assetAccessories: [],
      assetWarranties: [],
    };
  }
}
