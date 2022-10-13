import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { QuestionBase } from '../../question-base/question-base.model';

@Component({
  selector: 'jhi-app-question',
  templateUrl: './dynamic-form-question.component.html',
  styleUrls: ['./dynamic-form-question.component.scss']
})
export class DynamicFormQuestionComponent implements OnInit{

  @Input() question: QuestionBase<any> = {key: 'Key'};
  @Input() form!: FormGroup;

  get isValid(): boolean {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return,@typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return,@typescript-eslint/no-unnecessary-condition
    return !!this.form && this.form.controls[this.question.key].valid;
  }

  constructor(private fb: FormBuilder) { }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method,@typescript-eslint/no-empty-function,@typescript-eslint/explicit-function-return-type
  ngOnInit(): void { }

  public addQuestion(): void {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    !!this.questionArray && this.questionArray.push(this.fb.control(''));
  }

  public removeQuestion(index: number): void {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    !!this.questionArray && this.questionArray.removeAt(index);
  }

  public get questionArray(): FormArray {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    return !!this.form && this.form.get(this.question.key) as FormArray;
  }

  public get questionIsIterable(): boolean | null | undefined {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    return !!this.question && this.question.iterable;
  }

  public questionControl(index?: number): FormControl {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return,@typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.questionIsIterable ? this.asFormArray(this.form.get(this.question.key)).controls[index] : this.form.get(this.question.key);
  }

  public questionId(index?: number): string | undefined {
    return this.questionIsIterable ? `${this.question.key}-${index}` : this.question.key;
  }

  public questionLabel(index?: number): string | undefined {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition,@typescript-eslint/restrict-plus-operands,@typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition,@typescript-eslint/restrict-plus-operands
    return !!this.questionIsIterable && this.questionIsIterable ? `${this.question.label} n°${index + 1}` : this.question.label;
  }

  private asFormArray(ctrl: AbstractControl): FormArray {
    return ctrl as FormArray;
  }
}
