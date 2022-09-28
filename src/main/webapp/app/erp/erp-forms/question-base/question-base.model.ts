import { IUniversallyUniqueMapping } from '../../erp-pages/universally-unique-mapping/universally-unique-mapping.model';
import { IPlaceholder } from '../../erp-pages/placeholder/placeholder.model';

/**
 * Base representation of information about a form-control that we are trying to construct
 * dynamically at runtime. Each instance of this object consists information enough to form
 * a form-control. A collection of form-controls consist a form-group.
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

export class DropdownQuestion<T> extends QuestionBase<T> {

  controlType = 'dropdown';

  constructor(
    public id?: number,
    public value?: T | null | undefined,
    public key?: string,
    public label?: string,
    public options?: { key: string, value: string }[],
    public required?: boolean | null,
    public order?: number,
    public placeholder?: string | null,
    public iterable?: boolean | null,
    public parameters?: IUniversallyUniqueMapping[] | null,
    public placeholderItems?: IPlaceholder[] | null,
  ) {
    super(
      id,
      value,
      key,
      label,
      required,
      order,
      'dropdown',
      placeholder,
      iterable,
      parameters,
      placeholderItems
    );
  }
}

export class TextareaQuestion<T> extends QuestionBase<T> {
  controlType = 'textarea';

  constructor(
    public id?: number,
    public value?: T | null | undefined,
    public key?: string,
    public label?: string,
    public required?: boolean | null,
    public order?: number,
    public placeholder?: string | null,
    public iterable?: boolean | null,
    public parameters?: IUniversallyUniqueMapping[] | null,
    public placeholderItems?: IPlaceholder[] | null,
    public cols: number = 0,
    public rows: number = 0,
    public maxlength: number = 0,
    public minlength: number = 0
  ) {
    super(
      id,
      value,
      key,
      label,
      required,
      order,
      'textarea',
      placeholder,
      iterable,
      parameters,
      placeholderItems
    );
  }
}

export class TextboxQuestion<T> extends QuestionBase<T> {
  controlType = 'textbox';

  constructor(
    public id?: number,
    public value?: T | null | undefined,
    public key?: string,
    public label?: string,
    public required?: boolean | null,
    public order?: number,
    public placeholder?: string | null,
    public iterable?: boolean | null,
    public parameters?: IUniversallyUniqueMapping[] | null,
    public placeholderItems?: IPlaceholder[] | null,
    public type: string = 'textbox',
    public min: number | string = 0,
    public max: number | string = 0,
    public pattern?: string,
  ) {
    super(
      id,
      value,
      key,
      label,
      required,
      order,
      'textbox',
      placeholder,
      iterable,
      parameters,
      placeholderItems
    );
  }
}
