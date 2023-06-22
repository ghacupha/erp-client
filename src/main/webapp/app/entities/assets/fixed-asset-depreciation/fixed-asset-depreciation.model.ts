import dayjs from 'dayjs/esm';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { DepreciationRegime } from 'app/entities/enumerations/depreciation-regime.model';

export interface IFixedAssetDepreciation {
  id: number;
  assetNumber?: number | null;
  serviceOutletCode?: string | null;
  assetTag?: string | null;
  assetDescription?: string | null;
  depreciationDate?: dayjs.Dayjs | null;
  assetCategory?: string | null;
  depreciationAmount?: number | null;
  depreciationRegime?: DepreciationRegime | null;
  fileUploadToken?: string | null;
  compilationToken?: string | null;
  placeholders?: Pick<IPlaceholder, 'id' | 'description'>[] | null;
}

export type NewFixedAssetDepreciation = Omit<IFixedAssetDepreciation, 'id'> & { id: null };
