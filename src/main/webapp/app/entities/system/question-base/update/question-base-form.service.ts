import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IQuestionBase, NewQuestionBase } from '../question-base.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IQuestionBase for edit and NewQuestionBaseFormGroupInput for create.
 */
type QuestionBaseFormGroupInput = IQuestionBase | PartialWithRequiredKeyOf<NewQuestionBase>;

type QuestionBaseFormDefaults = Pick<NewQuestionBase, 'id' | 'required' | 'iterable' | 'parameters' | 'placeholderItems'>;

type QuestionBaseFormGroupContent = {
  id: FormControl<IQuestionBase['id'] | NewQuestionBase['id']>;
  context: FormControl<IQuestionBase['context']>;
  serial: FormControl<IQuestionBase['serial']>;
  questionBaseValue: FormControl<IQuestionBase['questionBaseValue']>;
  questionBaseKey: FormControl<IQuestionBase['questionBaseKey']>;
  questionBaseLabel: FormControl<IQuestionBase['questionBaseLabel']>;
  required: FormControl<IQuestionBase['required']>;
  order: FormControl<IQuestionBase['order']>;
  controlType: FormControl<IQuestionBase['controlType']>;
  placeholder: FormControl<IQuestionBase['placeholder']>;
  iterable: FormControl<IQuestionBase['iterable']>;
  parameters: FormControl<IQuestionBase['parameters']>;
  placeholderItems: FormControl<IQuestionBase['placeholderItems']>;
};

export type QuestionBaseFormGroup = FormGroup<QuestionBaseFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class QuestionBaseFormService {
  createQuestionBaseFormGroup(questionBase: QuestionBaseFormGroupInput = { id: null }): QuestionBaseFormGroup {
    const questionBaseRawValue = {
      ...this.getFormDefaults(),
      ...questionBase,
    };
    return new FormGroup<QuestionBaseFormGroupContent>({
      id: new FormControl(
        { value: questionBaseRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      context: new FormControl(questionBaseRawValue.context, {
        validators: [Validators.required],
      }),
      serial: new FormControl(questionBaseRawValue.serial, {
        validators: [Validators.required],
      }),
      questionBaseValue: new FormControl(questionBaseRawValue.questionBaseValue),
      questionBaseKey: new FormControl(questionBaseRawValue.questionBaseKey, {
        validators: [Validators.required],
      }),
      questionBaseLabel: new FormControl(questionBaseRawValue.questionBaseLabel, {
        validators: [Validators.required],
      }),
      required: new FormControl(questionBaseRawValue.required),
      order: new FormControl(questionBaseRawValue.order, {
        validators: [Validators.required],
      }),
      controlType: new FormControl(questionBaseRawValue.controlType, {
        validators: [Validators.required],
      }),
      placeholder: new FormControl(questionBaseRawValue.placeholder),
      iterable: new FormControl(questionBaseRawValue.iterable),
      parameters: new FormControl(questionBaseRawValue.parameters ?? []),
      placeholderItems: new FormControl(questionBaseRawValue.placeholderItems ?? []),
    });
  }

  getQuestionBase(form: QuestionBaseFormGroup): IQuestionBase | NewQuestionBase {
    return form.getRawValue() as IQuestionBase | NewQuestionBase;
  }

  resetForm(form: QuestionBaseFormGroup, questionBase: QuestionBaseFormGroupInput): void {
    const questionBaseRawValue = { ...this.getFormDefaults(), ...questionBase };
    form.reset(
      {
        ...questionBaseRawValue,
        id: { value: questionBaseRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): QuestionBaseFormDefaults {
    return {
      id: null,
      required: false,
      iterable: false,
      parameters: [],
      placeholderItems: [],
    };
  }
}
