import { IUniversallyUniqueMapping } from 'app/entities/system/universally-unique-mapping/universally-unique-mapping.model';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { ControlTypes } from 'app/entities/enumerations/control-types.model';

export interface IQuestionBase {
  id: number;
  context?: string | null;
  serial?: string | null;
  questionBaseValue?: string | null;
  questionBaseKey?: string | null;
  questionBaseLabel?: string | null;
  required?: boolean | null;
  order?: number | null;
  controlType?: ControlTypes | null;
  placeholder?: string | null;
  iterable?: boolean | null;
  parameters?: Pick<IUniversallyUniqueMapping, 'id' | 'universalKey'>[] | null;
  placeholderItems?: Pick<IPlaceholder, 'id' | 'description'>[] | null;
}

export type NewQuestionBase = Omit<IQuestionBase, 'id'> & { id: null };
