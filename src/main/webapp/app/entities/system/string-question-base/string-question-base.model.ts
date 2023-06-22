import { IUniversallyUniqueMapping } from 'app/entities/system/universally-unique-mapping/universally-unique-mapping.model';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { ControlTypes } from 'app/entities/enumerations/control-types.model';

export interface IStringQuestionBase {
  id: number;
  value?: string | null;
  key?: string | null;
  label?: string | null;
  required?: boolean | null;
  order?: number | null;
  controlType?: ControlTypes | null;
  placeholder?: string | null;
  iterable?: boolean | null;
  parameters?: Pick<IUniversallyUniqueMapping, 'id' | 'universalKey'>[] | null;
  placeholderItems?: Pick<IPlaceholder, 'id' | 'description'>[] | null;
}

export type NewStringQuestionBase = Omit<IStringQuestionBase, 'id'> & { id: null };
