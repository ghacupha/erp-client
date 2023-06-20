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
