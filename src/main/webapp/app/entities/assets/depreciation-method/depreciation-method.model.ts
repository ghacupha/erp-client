import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { DepreciationTypes } from 'app/entities/enumerations/depreciation-types.model';

export interface IDepreciationMethod {
  id: number;
  depreciationMethodName?: string | null;
  description?: string | null;
  depreciationType?: DepreciationTypes | null;
  remarks?: string | null;
  placeholders?: Pick<IPlaceholder, 'id' | 'description'>[] | null;
}

export type NewDepreciationMethod = Omit<IDepreciationMethod, 'id'> & { id: null };
