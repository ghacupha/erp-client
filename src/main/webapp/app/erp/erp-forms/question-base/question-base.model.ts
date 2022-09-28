import { IUniversallyUniqueMapping } from '../../erp-pages/universally-unique-mapping/universally-unique-mapping.model';
import { IPlaceholder } from '../../erp-pages/placeholder/placeholder.model';

export interface IQuestionBase<T> {
  id?: number;
  value?: T;
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
    public value?: T,
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
