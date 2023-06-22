import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../contract-metadata.test-samples';

import { ContractMetadataFormService } from './contract-metadata-form.service';

describe('ContractMetadata Form Service', () => {
  let service: ContractMetadataFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContractMetadataFormService);
  });

  describe('Service methods', () => {
    describe('createContractMetadataFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createContractMetadataFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            description: expect.any(Object),
            typeOfContract: expect.any(Object),
            contractStatus: expect.any(Object),
            startDate: expect.any(Object),
            terminationDate: expect.any(Object),
            commentsAndAttachment: expect.any(Object),
            contractTitle: expect.any(Object),
            contractIdentifier: expect.any(Object),
            contractIdentifierShort: expect.any(Object),
            relatedContracts: expect.any(Object),
            department: expect.any(Object),
            contractPartner: expect.any(Object),
            responsiblePerson: expect.any(Object),
            signatories: expect.any(Object),
            securityClearance: expect.any(Object),
            placeholders: expect.any(Object),
            contractDocumentFiles: expect.any(Object),
            contractMappings: expect.any(Object),
          })
        );
      });

      it('passing IContractMetadata should create a new form with FormGroup', () => {
        const formGroup = service.createContractMetadataFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            description: expect.any(Object),
            typeOfContract: expect.any(Object),
            contractStatus: expect.any(Object),
            startDate: expect.any(Object),
            terminationDate: expect.any(Object),
            commentsAndAttachment: expect.any(Object),
            contractTitle: expect.any(Object),
            contractIdentifier: expect.any(Object),
            contractIdentifierShort: expect.any(Object),
            relatedContracts: expect.any(Object),
            department: expect.any(Object),
            contractPartner: expect.any(Object),
            responsiblePerson: expect.any(Object),
            signatories: expect.any(Object),
            securityClearance: expect.any(Object),
            placeholders: expect.any(Object),
            contractDocumentFiles: expect.any(Object),
            contractMappings: expect.any(Object),
          })
        );
      });
    });

    describe('getContractMetadata', () => {
      it('should return NewContractMetadata for default ContractMetadata initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createContractMetadataFormGroup(sampleWithNewData);

        const contractMetadata = service.getContractMetadata(formGroup) as any;

        expect(contractMetadata).toMatchObject(sampleWithNewData);
      });

      it('should return NewContractMetadata for empty ContractMetadata initial value', () => {
        const formGroup = service.createContractMetadataFormGroup();

        const contractMetadata = service.getContractMetadata(formGroup) as any;

        expect(contractMetadata).toMatchObject({});
      });

      it('should return IContractMetadata', () => {
        const formGroup = service.createContractMetadataFormGroup(sampleWithRequiredData);

        const contractMetadata = service.getContractMetadata(formGroup) as any;

        expect(contractMetadata).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IContractMetadata should not enable id FormControl', () => {
        const formGroup = service.createContractMetadataFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewContractMetadata should disable id FormControl', () => {
        const formGroup = service.createContractMetadataFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
