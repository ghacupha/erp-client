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

import { sampleWithRequiredData, sampleWithNewData } from '../question-base.test-samples';

import { QuestionBaseFormService } from './question-base-form.service';

describe('QuestionBase Form Service', () => {
  let service: QuestionBaseFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionBaseFormService);
  });

  describe('Service methods', () => {
    describe('createQuestionBaseFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createQuestionBaseFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            context: expect.any(Object),
            serial: expect.any(Object),
            questionBaseValue: expect.any(Object),
            questionBaseKey: expect.any(Object),
            questionBaseLabel: expect.any(Object),
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

      it('passing IQuestionBase should create a new form with FormGroup', () => {
        const formGroup = service.createQuestionBaseFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            context: expect.any(Object),
            serial: expect.any(Object),
            questionBaseValue: expect.any(Object),
            questionBaseKey: expect.any(Object),
            questionBaseLabel: expect.any(Object),
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

    describe('getQuestionBase', () => {
      it('should return NewQuestionBase for default QuestionBase initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createQuestionBaseFormGroup(sampleWithNewData);

        const questionBase = service.getQuestionBase(formGroup) as any;

        expect(questionBase).toMatchObject(sampleWithNewData);
      });

      it('should return NewQuestionBase for empty QuestionBase initial value', () => {
        const formGroup = service.createQuestionBaseFormGroup();

        const questionBase = service.getQuestionBase(formGroup) as any;

        expect(questionBase).toMatchObject({});
      });

      it('should return IQuestionBase', () => {
        const formGroup = service.createQuestionBaseFormGroup(sampleWithRequiredData);

        const questionBase = service.getQuestionBase(formGroup) as any;

        expect(questionBase).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IQuestionBase should not enable id FormControl', () => {
        const formGroup = service.createQuestionBaseFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewQuestionBase should disable id FormControl', () => {
        const formGroup = service.createQuestionBaseFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
