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
