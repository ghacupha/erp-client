import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../payment-invoice.test-samples';

import { PaymentInvoiceFormService } from './payment-invoice-form.service';

describe('PaymentInvoice Form Service', () => {
  let service: PaymentInvoiceFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentInvoiceFormService);
  });

  describe('Service methods', () => {
    describe('createPaymentInvoiceFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createPaymentInvoiceFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            invoiceNumber: expect.any(Object),
            invoiceDate: expect.any(Object),
            invoiceAmount: expect.any(Object),
            fileUploadToken: expect.any(Object),
            compilationToken: expect.any(Object),
            remarks: expect.any(Object),
            purchaseOrders: expect.any(Object),
            placeholders: expect.any(Object),
            paymentLabels: expect.any(Object),
            settlementCurrency: expect.any(Object),
            biller: expect.any(Object),
            deliveryNotes: expect.any(Object),
            jobSheets: expect.any(Object),
            businessDocuments: expect.any(Object),
          })
        );
      });

      it('passing IPaymentInvoice should create a new form with FormGroup', () => {
        const formGroup = service.createPaymentInvoiceFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            invoiceNumber: expect.any(Object),
            invoiceDate: expect.any(Object),
            invoiceAmount: expect.any(Object),
            fileUploadToken: expect.any(Object),
            compilationToken: expect.any(Object),
            remarks: expect.any(Object),
            purchaseOrders: expect.any(Object),
            placeholders: expect.any(Object),
            paymentLabels: expect.any(Object),
            settlementCurrency: expect.any(Object),
            biller: expect.any(Object),
            deliveryNotes: expect.any(Object),
            jobSheets: expect.any(Object),
            businessDocuments: expect.any(Object),
          })
        );
      });
    });

    describe('getPaymentInvoice', () => {
      it('should return NewPaymentInvoice for default PaymentInvoice initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createPaymentInvoiceFormGroup(sampleWithNewData);

        const paymentInvoice = service.getPaymentInvoice(formGroup) as any;

        expect(paymentInvoice).toMatchObject(sampleWithNewData);
      });

      it('should return NewPaymentInvoice for empty PaymentInvoice initial value', () => {
        const formGroup = service.createPaymentInvoiceFormGroup();

        const paymentInvoice = service.getPaymentInvoice(formGroup) as any;

        expect(paymentInvoice).toMatchObject({});
      });

      it('should return IPaymentInvoice', () => {
        const formGroup = service.createPaymentInvoiceFormGroup(sampleWithRequiredData);

        const paymentInvoice = service.getPaymentInvoice(formGroup) as any;

        expect(paymentInvoice).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IPaymentInvoice should not enable id FormControl', () => {
        const formGroup = service.createPaymentInvoiceFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewPaymentInvoice should disable id FormControl', () => {
        const formGroup = service.createPaymentInvoiceFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
