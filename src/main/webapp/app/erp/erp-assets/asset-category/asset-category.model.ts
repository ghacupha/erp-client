import { IDepreciationMethod } from '../depreciation-method/depreciation-method.model';
import { IPlaceholder } from '../../erp-common/models/placeholder.model';

export interface IAssetCategory {
  id?: number;
  assetCategoryName?: string;
  description?: string | null;
  notes?: string | null;
  remarks?: string | null;
  depreciationMethod?: IDepreciationMethod;
  placeholders?: IPlaceholder[] | null;
}

export class AssetCategory implements IAssetCategory {
  constructor(
    public id?: number,
    public assetCategoryName?: string,
    public description?: string | null,
    public notes?: string | null,
    public remarks?: string | null,
    public depreciationMethod?: IDepreciationMethod,
    public placeholders?: IPlaceholder[] | null
  ) {}
}

export function getAssetCategoryIdentifier(assetCategory: IAssetCategory): number | undefined {
  return assetCategory.id;
}
