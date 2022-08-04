import { DepreciationTypes } from '../../erp-common/enumerations/depreciation-types.model';
import { IPlaceholder } from '../../erp-pages/placeholder/placeholder.model';

export interface IDepreciationMethod {
  id?: number;
  depreciationMethodName?: string;
  description?: string | null;
  depreciationType?: DepreciationTypes;
  remarks?: string | null;
  placeholders?: IPlaceholder[] | null;
}

export class DepreciationMethod implements IDepreciationMethod {
  constructor(
    public id?: number,
    public depreciationMethodName?: string,
    public description?: string | null,
    public depreciationType?: DepreciationTypes,
    public remarks?: string | null,
    public placeholders?: IPlaceholder[] | null
  ) {}
}

export function getDepreciationMethodIdentifier(depreciationMethod: IDepreciationMethod): number | undefined {
  return depreciationMethod.id;
}
