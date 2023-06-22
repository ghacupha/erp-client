///
/// Erp System - Mark IV No 1 (David Series) Client 1.4.0
/// Copyright © 2021 - 2023 Edwin Njeru (mailnjeru@gmail.com)
///
/// This program is free software: you can redistribute it and/or modify
/// it under the terms of the GNU General Public License as published by
/// the Free Software Foundation, either version 3 of the License, or
/// (at your option) any later version.
///
/// This program is distributed in the hope that it will be useful,
/// but WITHOUT ANY WARRANTY; without even the implied warranty of
/// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
/// GNU General Public License for more details.
///
/// You should have received a copy of the GNU General Public License
/// along with this program. If not, see <http://www.gnu.org/licenses/>.
///

import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../business-document.test-samples';

import { BusinessDocumentFormService } from './business-document-form.service';

describe('BusinessDocument Form Service', () => {
  let service: BusinessDocumentFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusinessDocumentFormService);
  });

  describe('Service methods', () => {
    describe('createBusinessDocumentFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createBusinessDocumentFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            documentTitle: expect.any(Object),
            description: expect.any(Object),
            documentSerial: expect.any(Object),
            lastModified: expect.any(Object),
            attachmentFilePath: expect.any(Object),
            documentFile: expect.any(Object),
            fileTampered: expect.any(Object),
            documentFileChecksum: expect.any(Object),
            createdBy: expect.any(Object),
            lastModifiedBy: expect.any(Object),
            originatingDepartment: expect.any(Object),
            applicationMappings: expect.any(Object),
            placeholders: expect.any(Object),
            fileChecksumAlgorithm: expect.any(Object),
            securityClearance: expect.any(Object),
          })
        );
      });

      it('passing IBusinessDocument should create a new form with FormGroup', () => {
        const formGroup = service.createBusinessDocumentFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            documentTitle: expect.any(Object),
            description: expect.any(Object),
            documentSerial: expect.any(Object),
            lastModified: expect.any(Object),
            attachmentFilePath: expect.any(Object),
            documentFile: expect.any(Object),
            fileTampered: expect.any(Object),
            documentFileChecksum: expect.any(Object),
            createdBy: expect.any(Object),
            lastModifiedBy: expect.any(Object),
            originatingDepartment: expect.any(Object),
            applicationMappings: expect.any(Object),
            placeholders: expect.any(Object),
            fileChecksumAlgorithm: expect.any(Object),
            securityClearance: expect.any(Object),
          })
        );
      });
    });

    describe('getBusinessDocument', () => {
      it('should return NewBusinessDocument for default BusinessDocument initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createBusinessDocumentFormGroup(sampleWithNewData);

        const businessDocument = service.getBusinessDocument(formGroup) as any;

        expect(businessDocument).toMatchObject(sampleWithNewData);
      });

      it('should return NewBusinessDocument for empty BusinessDocument initial value', () => {
        const formGroup = service.createBusinessDocumentFormGroup();

        const businessDocument = service.getBusinessDocument(formGroup) as any;

        expect(businessDocument).toMatchObject({});
      });

      it('should return IBusinessDocument', () => {
        const formGroup = service.createBusinessDocumentFormGroup(sampleWithRequiredData);

        const businessDocument = service.getBusinessDocument(formGroup) as any;

        expect(businessDocument).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IBusinessDocument should not enable id FormControl', () => {
        const formGroup = service.createBusinessDocumentFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewBusinessDocument should disable id FormControl', () => {
        const formGroup = service.createBusinessDocumentFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
