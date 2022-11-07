import { IPlaceholder } from '../../erp-pages/placeholder/placeholder.model';
import { ControlTypes } from '../../erp-common/enumerations/control-types.model';
import { IUniversallyUniqueMapping } from '../../erp-pages/universally-unique-mapping/universally-unique-mapping.model';

export interface IQuestionBase {
  id?: number;
  context?: string;
  serial?: string;
  value?: string | null;
  key?: string;
  label?: string;
  required?: boolean | null;
  order?: number;
  controlType?: ControlTypes;
  placeholder?: string | null;
  iterable?: boolean | null;
  parameters?: IUniversallyUniqueMapping[] | null;
  placeholderItems?: IPlaceholder[] | null;
}

export class QuestionBase implements IQuestionBase {
  constructor(
    public id?: number,
    public context?: string,
    public serial?: string,
    public value?: string | null,
    public key?: string,
    public label?: string,
    public required?: boolean | null,
    public order?: number,
    public controlType?: ControlTypes,
    public placeholder?: string | null,
    public iterable?: boolean | null,
    public parameters?: IUniversallyUniqueMapping[] | null,
    public placeholderItems?: IPlaceholder[] | null
  ) {
    this.required = this.required ?? false;
    this.iterable = this.iterable ?? false;
    this.order = this.order ?? 0;
  }
}

export function getQuestionBaseIdentifier(questionBase: IQuestionBase): number | undefined {
  return questionBase.id;
}
