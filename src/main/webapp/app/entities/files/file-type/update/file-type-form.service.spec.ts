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
