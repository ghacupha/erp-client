import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../customer-id-document-type.test-samples';

import { CustomerIDDocumentTypeFormService } from './customer-id-document-type-form.service';

describe('CustomerIDDocumentType Form Service', () => {
  let service: CustomerIDDocumentTypeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerIDDocumentTypeFormService);
  });

  describe('Service methods', () => {
    describe('createCustomerIDDocumentTypeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCustomerIDDocumentTypeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            documentCode: expect.any(Object),
            documentType: expect.any(Object),
            documentTypeDescription: expect.any(Object),
            placeholders: expect.any(Object),
          })
        );
      });

      it('passing ICustomerIDDocumentType should create a new form with FormGroup', () => {
        const formGroup = service.createCustomerIDDocumentTypeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            documentCode: expect.any(Object),
            documentType: expect.any(Object),
            documentTypeDescription: expect.any(Object),
            placeholders: expect.any(Object),
          })
        );
      });
    });

    describe('getCustomerIDDocumentType', () => {
      it('should return NewCustomerIDDocumentType for default CustomerIDDocumentType initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCustomerIDDocumentTypeFormGroup(sampleWithNewData);

        const customerIDDocumentType = service.getCustomerIDDocumentType(formGroup) as any;

        expect(customerIDDocumentType).toMatchObject(sampleWithNewData);
      });

      it('should return NewCustomerIDDocumentType for empty CustomerIDDocumentType initial value', () => {
        const formGroup = service.createCustomerIDDocumentTypeFormGroup();

        const customerIDDocumentType = service.getCustomerIDDocumentType(formGroup) as any;

        expect(customerIDDocumentType).toMatchObject({});
      });

      it('should return ICustomerIDDocumentType', () => {
        const formGroup = service.createCustomerIDDocumentTypeFormGroup(sampleWithRequiredData);

        const customerIDDocumentType = service.getCustomerIDDocumentType(formGroup) as any;

        expect(customerIDDocumentType).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICustomerIDDocumentType should not enable id FormControl', () => {
        const formGroup = service.createCustomerIDDocumentTypeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCustomerIDDocumentType should disable id FormControl', () => {
        const formGroup = service.createCustomerIDDocumentTypeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
