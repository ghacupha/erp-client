import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../service-outlet.test-samples';

import { ServiceOutletFormService } from './service-outlet-form.service';

describe('ServiceOutlet Form Service', () => {
  let service: ServiceOutletFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceOutletFormService);
  });

  describe('Service methods', () => {
    describe('createServiceOutletFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createServiceOutletFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            outletCode: expect.any(Object),
            outletName: expect.any(Object),
            town: expect.any(Object),
            parliamentaryConstituency: expect.any(Object),
            gpsCoordinates: expect.any(Object),
            outletOpeningDate: expect.any(Object),
            regulatorApprovalDate: expect.any(Object),
            outletClosureDate: expect.any(Object),
            dateLastModified: expect.any(Object),
            licenseFeePayable: expect.any(Object),
            placeholders: expect.any(Object),
            bankCode: expect.any(Object),
            outletType: expect.any(Object),
            outletStatus: expect.any(Object),
            countyName: expect.any(Object),
            subCountyName: expect.any(Object),
          })
        );
      });

      it('passing IServiceOutlet should create a new form with FormGroup', () => {
        const formGroup = service.createServiceOutletFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            outletCode: expect.any(Object),
            outletName: expect.any(Object),
            town: expect.any(Object),
            parliamentaryConstituency: expect.any(Object),
            gpsCoordinates: expect.any(Object),
            outletOpeningDate: expect.any(Object),
            regulatorApprovalDate: expect.any(Object),
            outletClosureDate: expect.any(Object),
            dateLastModified: expect.any(Object),
            licenseFeePayable: expect.any(Object),
            placeholders: expect.any(Object),
            bankCode: expect.any(Object),
            outletType: expect.any(Object),
            outletStatus: expect.any(Object),
            countyName: expect.any(Object),
            subCountyName: expect.any(Object),
          })
        );
      });
    });

    describe('getServiceOutlet', () => {
      it('should return NewServiceOutlet for default ServiceOutlet initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createServiceOutletFormGroup(sampleWithNewData);

        const serviceOutlet = service.getServiceOutlet(formGroup) as any;

        expect(serviceOutlet).toMatchObject(sampleWithNewData);
      });

      it('should return NewServiceOutlet for empty ServiceOutlet initial value', () => {
        const formGroup = service.createServiceOutletFormGroup();

        const serviceOutlet = service.getServiceOutlet(formGroup) as any;

        expect(serviceOutlet).toMatchObject({});
      });

      it('should return IServiceOutlet', () => {
        const formGroup = service.createServiceOutletFormGroup(sampleWithRequiredData);

        const serviceOutlet = service.getServiceOutlet(formGroup) as any;

        expect(serviceOutlet).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IServiceOutlet should not enable id FormControl', () => {
        const formGroup = service.createServiceOutletFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewServiceOutlet should disable id FormControl', () => {
        const formGroup = service.createServiceOutletFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
