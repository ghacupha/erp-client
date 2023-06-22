import { IDepreciationMethod } from 'app/entities/assets/depreciation-method/depreciation-method.model';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';

export interface IAssetCategory {
  id: number;
  assetCategoryName?: string | null;
  description?: string | null;
  notes?: string | null;
  remarks?: string | null;
  depreciationMethod?: Pick<IDepreciationMethod, 'id' | 'depreciationMethodName'> | null;
  placeholders?: Pick<IPlaceholder, 'id' | 'description'>[] | null;
}

export type NewAssetCategory = Omit<IAssetCategory, 'id'> & { id: null };
