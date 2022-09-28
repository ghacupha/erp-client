import { IUniversallyUniqueMapping } from '../../erp-pages/universally-unique-mapping/universally-unique-mapping.model';
import { IPlaceholder } from '../../erp-pages/placeholder/placeholder.model';

/**
 * Base representation of information about a form-control that we are trying to construct
 * dynamically at runtime
 */
export interface IQuestionBase<T> {
  id?: number;
  value?: T | null | undefined;
  key?: string;
  label?: string;
  required?: boolean | null;
  order?: number;
  controlType?: string;
  placeholder?: string | null;
  iterable?: boolean | null;
  parameters?: IUniversallyUniqueMapping[] | null;
  placeholderItems?: IPlaceholder[] | null;
}

export class QuestionBase<T> implements IQuestionBase<T> {

  constructor(
    public id?: number,
    public value?: T | null | undefined,
    public key?: string,
    public label?: string,
    public required?: boolean | null,
    public order?: number,
    public controlType?: string,
    public placeholder?: string | null,
    public iterable?: boolean | null,
    public parameters?: IUniversallyUniqueMapping[] | null,
    public placeholderItems?: IPlaceholder[] | null
  ) {
    this.required = this.required ?? false;
    this.iterable = this.iterable ?? false;
  }
}

export function getQuestionBaseIdentifier(questionBase: IQuestionBase<any>): number | undefined {
  return questionBase.id;
}

/**
 * Question-base instance designed to fulfill the parameters through options object
 */
export class OptionalQuestionBase<T> extends QuestionBase<T> implements IQuestionBase<T> {
  options: QuestionBase<any> | undefined;

  constructor(options: QuestionBase<T> = {}) {
    super(
      options.id,
      options.value,
      options.key,
      options.label,
      options.required,
      options.order,
      options.controlType,
      options.placeholder,
      options.iterable,
      options.parameters,
      options.placeholderItems
    );
    this.options = options;
  }
}

export class DropdownQuestion extends OptionalQuestionBase<string> {
  controlType = 'dropdown';
  options: QuestionBase<string> = {
    controlType : 'dropdown',
  };

  constructor(options: QuestionBase<string> = {controlType : 'dropdown'}) {
    super(options);
    this.options = options;
  }
}

export class TextareaQuestion extends OptionalQuestionBase<string> {
  controlType = 'textarea';

  constructor(
    options: QuestionBase<string> = {controlType : 'textarea'},
    public cols: number = 0,
    public rows: number = 0,
    public maxlength: number = 0,
    public minlength: number = 0
  ) {
    super(options);
  }
}

export class TextboxQuestion extends OptionalQuestionBase<string> {
  controlType = 'textbox';

  constructor(
    options: QuestionBase<string> = {controlType : 'textbox'},
    public type: string = 'text',
    public min: number | string = 0,
    public max: number | string = 0,
    public pattern: string,
  ) {
    super(options);
  }
}
