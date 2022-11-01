import { ControlTypes } from '../../erp-common/enumerations/control-types.model';
import { IPlaceholder } from '../../erp-pages/placeholder/placeholder.model';
import { IUniversallyUniqueMapping } from '../../erp-pages/universally-unique-mapping/universally-unique-mapping.model';

export interface IStringQuestionBase {
  id?: number;
  // value?: string | null;
  value?: any | null;
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

export class StringQuestionBase implements IStringQuestionBase {
  constructor(
    public id?: number,
    public key?: string,
    public value?: string | null,
    public label?: string,
    public required?: boolean | null,
    public order?: number,
    // public controlType: ControlTypes = ControlTypes.TEXTBOX,
    public controlType?: ControlTypes,
    public placeholder?: string | null,
    public iterable?: boolean | null,
    public parameters?: IUniversallyUniqueMapping[] | null,
    public placeholderItems?: IPlaceholder[] | null
  ) {
    this.required = this.required ?? false;
    this.iterable = this.iterable ?? false;
  }
}

export function getStringQuestionBaseIdentifier(stringQuestionBase: IStringQuestionBase): number | undefined {
  return stringQuestionBase.id;
}
