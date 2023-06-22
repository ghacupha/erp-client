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

import { sampleWithRequiredData, sampleWithNewData } from '../string-question-base.test-samples';

import { StringQuestionBaseFormService } from './string-question-base-form.service';

describe('StringQuestionBase Form Service', () => {
  let service: StringQuestionBaseFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StringQuestionBaseFormService);
  });

  describe('Service methods', () => {
    describe('createStringQuestionBaseFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createStringQuestionBaseFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            value: expect.any(Object),
            key: expect.any(Object),
            label: expect.any(Object),
            required: expect.any(Object),
            order: expect.any(Object),
            controlType: expect.any(Object),
            placeholder: expect.any(Object),
            iterable: expect.any(Object),
            parameters: expect.any(Object),
            placeholderItems: expect.any(Object),
          })
        );
      });

      it('passing IStringQuestionBase should create a new form with FormGroup', () => {
        const formGroup = service.createStringQuestionBaseFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            value: expect.any(Object),
            key: expect.any(Object),
            label: expect.any(Object),
            required: expect.any(Object),
            order: expect.any(Object),
            controlType: expect.any(Object),
            placeholder: expect.any(Object),
            iterable: expect.any(Object),
            parameters: expect.any(Object),
            placeholderItems: expect.any(Object),
          })
        );
      });
    });

    describe('getStringQuestionBase', () => {
      it('should return NewStringQuestionBase for default StringQuestionBase initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createStringQuestionBaseFormGroup(sampleWithNewData);

        const stringQuestionBase = service.getStringQuestionBase(formGroup) as any;

        expect(stringQuestionBase).toMatchObject(sampleWithNewData);
      });

      it('should return NewStringQuestionBase for empty StringQuestionBase initial value', () => {
        const formGroup = service.createStringQuestionBaseFormGroup();

        const stringQuestionBase = service.getStringQuestionBase(formGroup) as any;

        expect(stringQuestionBase).toMatchObject({});
      });

      it('should return IStringQuestionBase', () => {
        const formGroup = service.createStringQuestionBaseFormGroup(sampleWithRequiredData);

        const stringQuestionBase = service.getStringQuestionBase(formGroup) as any;

        expect(stringQuestionBase).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IStringQuestionBase should not enable id FormControl', () => {
        const formGroup = service.createStringQuestionBaseFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewStringQuestionBase should disable id FormControl', () => {
        const formGroup = service.createStringQuestionBaseFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
