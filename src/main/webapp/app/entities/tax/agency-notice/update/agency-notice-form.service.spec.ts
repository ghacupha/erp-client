import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../agency-notice.test-samples';

import { AgencyNoticeFormService } from './agency-notice-form.service';

describe('AgencyNotice Form Service', () => {
  let service: AgencyNoticeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgencyNoticeFormService);
  });

  describe('Service methods', () => {
    describe('createAgencyNoticeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createAgencyNoticeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            referenceNumber: expect.any(Object),
            referenceDate: expect.any(Object),
            assessmentAmount: expect.any(Object),
            agencyStatus: expect.any(Object),
            assessmentNotice: expect.any(Object),
            correspondents: expect.any(Object),
            settlementCurrency: expect.any(Object),
            assessor: expect.any(Object),
            placeholders: expect.any(Object),
            businessDocuments: expect.any(Object),
          })
        );
      });

      it('passing IAgencyNotice should create a new form with FormGroup', () => {
        const formGroup = service.createAgencyNoticeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            referenceNumber: expect.any(Object),
            referenceDate: expect.any(Object),
            assessmentAmount: expect.any(Object),
            agencyStatus: expect.any(Object),
            assessmentNotice: expect.any(Object),
            correspondents: expect.any(Object),
            settlementCurrency: expect.any(Object),
            assessor: expect.any(Object),
            placeholders: expect.any(Object),
            businessDocuments: expect.any(Object),
          })
        );
      });
    });

    describe('getAgencyNotice', () => {
      it('should return NewAgencyNotice for default AgencyNotice initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createAgencyNoticeFormGroup(sampleWithNewData);

        const agencyNotice = service.getAgencyNotice(formGroup) as any;

        expect(agencyNotice).toMatchObject(sampleWithNewData);
      });

      it('should return NewAgencyNotice for empty AgencyNotice initial value', () => {
        const formGroup = service.createAgencyNoticeFormGroup();

        const agencyNotice = service.getAgencyNotice(formGroup) as any;

        expect(agencyNotice).toMatchObject({});
      });

      it('should return IAgencyNotice', () => {
        const formGroup = service.createAgencyNoticeFormGroup(sampleWithRequiredData);

        const agencyNotice = service.getAgencyNotice(formGroup) as any;

        expect(agencyNotice).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IAgencyNotice should not enable id FormControl', () => {
        const formGroup = service.createAgencyNoticeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewAgencyNotice should disable id FormControl', () => {
        const formGroup = service.createAgencyNoticeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
