import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../file-type.test-samples';

import { FileTypeFormService } from './file-type-form.service';

describe('FileType Form Service', () => {
  let service: FileTypeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileTypeFormService);
  });

  describe('Service methods', () => {
    describe('createFileTypeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createFileTypeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            fileTypeName: expect.any(Object),
            fileMediumType: expect.any(Object),
            description: expect.any(Object),
            fileTemplate: expect.any(Object),
            fileType: expect.any(Object),
            placeholders: expect.any(Object),
          })
        );
      });

      it('passing IFileType should create a new form with FormGroup', () => {
        const formGroup = service.createFileTypeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            fileTypeName: expect.any(Object),
            fileMediumType: expect.any(Object),
            description: expect.any(Object),
            fileTemplate: expect.any(Object),
            fileType: expect.any(Object),
            placeholders: expect.any(Object),
          })
        );
      });
    });

    describe('getFileType', () => {
      it('should return NewFileType for default FileType initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createFileTypeFormGroup(sampleWithNewData);

        const fileType = service.getFileType(formGroup) as any;

        expect(fileType).toMatchObject(sampleWithNewData);
      });

      it('should return NewFileType for empty FileType initial value', () => {
        const formGroup = service.createFileTypeFormGroup();

        const fileType = service.getFileType(formGroup) as any;

        expect(fileType).toMatchObject({});
      });

      it('should return IFileType', () => {
        const formGroup = service.createFileTypeFormGroup(sampleWithRequiredData);

        const fileType = service.getFileType(formGroup) as any;

        expect(fileType).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IFileType should not enable id FormControl', () => {
        const formGroup = service.createFileTypeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewFileType should disable id FormControl', () => {
        const formGroup = service.createFileTypeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
