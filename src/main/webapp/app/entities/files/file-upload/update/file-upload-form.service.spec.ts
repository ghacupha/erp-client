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

import { sampleWithRequiredData, sampleWithNewData } from '../file-upload.test-samples';

import { FileUploadFormService } from './file-upload-form.service';

describe('FileUpload Form Service', () => {
  let service: FileUploadFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileUploadFormService);
  });

  describe('Service methods', () => {
    describe('createFileUploadFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createFileUploadFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            description: expect.any(Object),
            fileName: expect.any(Object),
            periodFrom: expect.any(Object),
            periodTo: expect.any(Object),
            fileTypeId: expect.any(Object),
            dataFile: expect.any(Object),
            uploadSuccessful: expect.any(Object),
            uploadProcessed: expect.any(Object),
            uploadToken: expect.any(Object),
            placeholders: expect.any(Object),
          })
        );
      });

      it('passing IFileUpload should create a new form with FormGroup', () => {
        const formGroup = service.createFileUploadFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            description: expect.any(Object),
            fileName: expect.any(Object),
            periodFrom: expect.any(Object),
            periodTo: expect.any(Object),
            fileTypeId: expect.any(Object),
            dataFile: expect.any(Object),
            uploadSuccessful: expect.any(Object),
            uploadProcessed: expect.any(Object),
            uploadToken: expect.any(Object),
            placeholders: expect.any(Object),
          })
        );
      });
    });

    describe('getFileUpload', () => {
      it('should return NewFileUpload for default FileUpload initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createFileUploadFormGroup(sampleWithNewData);

        const fileUpload = service.getFileUpload(formGroup) as any;

        expect(fileUpload).toMatchObject(sampleWithNewData);
      });

      it('should return NewFileUpload for empty FileUpload initial value', () => {
        const formGroup = service.createFileUploadFormGroup();

        const fileUpload = service.getFileUpload(formGroup) as any;

        expect(fileUpload).toMatchObject({});
      });

      it('should return IFileUpload', () => {
        const formGroup = service.createFileUploadFormGroup(sampleWithRequiredData);

        const fileUpload = service.getFileUpload(formGroup) as any;

        expect(fileUpload).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IFileUpload should not enable id FormControl', () => {
        const formGroup = service.createFileUploadFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewFileUpload should disable id FormControl', () => {
        const formGroup = service.createFileUploadFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
