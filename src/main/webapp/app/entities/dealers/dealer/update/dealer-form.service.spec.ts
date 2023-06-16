import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../dealer.test-samples';

import { DealerFormService } from './dealer-form.service';

describe('Dealer Form Service', () => {
  let service: DealerFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DealerFormService);
  });

  describe('Service methods', () => {
    describe('createDealerFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createDealerFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            dealerName: expect.any(Object),
            taxNumber: expect.any(Object),
            identificationDocumentNumber: expect.any(Object),
            organizationName: expect.any(Object),
            department: expect.any(Object),
            position: expect.any(Object),
            postalAddress: expect.any(Object),
            physicalAddress: expect.any(Object),
            accountName: expect.any(Object),
            accountNumber: expect.any(Object),
            bankersName: expect.any(Object),
            bankersBranch: expect.any(Object),
            bankersSwiftCode: expect.any(Object),
            fileUploadToken: expect.any(Object),
            compilationToken: expect.any(Object),
            remarks: expect.any(Object),
            otherNames: expect.any(Object),
            paymentLabels: expect.any(Object),
            dealerGroup: expect.any(Object),
            placeholders: expect.any(Object),
          })
        );
      });

      it('passing IDealer should create a new form with FormGroup', () => {
        const formGroup = service.createDealerFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            dealerName: expect.any(Object),
            taxNumber: expect.any(Object),
            identificationDocumentNumber: expect.any(Object),
            organizationName: expect.any(Object),
            department: expect.any(Object),
            position: expect.any(Object),
            postalAddress: expect.any(Object),
            physicalAddress: expect.any(Object),
            accountName: expect.any(Object),
            accountNumber: expect.any(Object),
            bankersName: expect.any(Object),
            bankersBranch: expect.any(Object),
            bankersSwiftCode: expect.any(Object),
            fileUploadToken: expect.any(Object),
            compilationToken: expect.any(Object),
            remarks: expect.any(Object),
            otherNames: expect.any(Object),
            paymentLabels: expect.any(Object),
            dealerGroup: expect.any(Object),
            placeholders: expect.any(Object),
          })
        );
      });
    });

    describe('getDealer', () => {
      it('should return NewDealer for default Dealer initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createDealerFormGroup(sampleWithNewData);

        const dealer = service.getDealer(formGroup) as any;

        expect(dealer).toMatchObject(sampleWithNewData);
      });

      it('should return NewDealer for empty Dealer initial value', () => {
        const formGroup = service.createDealerFormGroup();

        const dealer = service.getDealer(formGroup) as any;

        expect(dealer).toMatchObject({});
      });

      it('should return IDealer', () => {
        const formGroup = service.createDealerFormGroup(sampleWithRequiredData);

        const dealer = service.getDealer(formGroup) as any;

        expect(dealer).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IDealer should not enable id FormControl', () => {
        const formGroup = service.createDealerFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewDealer should disable id FormControl', () => {
        const formGroup = service.createDealerFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
