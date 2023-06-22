import dayjs from 'dayjs/esm';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { DepreciationRegime } from 'app/entities/enumerations/depreciation-regime.model';

export interface IFixedAssetNetBookValue {
  id: number;
  assetNumber?: number | null;
  serviceOutletCode?: string | null;
  assetTag?: string | null;
  assetDescription?: string | null;
  netBookValueDate?: dayjs.Dayjs | null;
  assetCategory?: string | null;
  netBookValue?: number | null;
  depreciationRegime?: DepreciationRegime | null;
  fileUploadToken?: string | null;
  compilationToken?: string | null;
  placeholders?: Pick<IPlaceholder, 'id' | 'description'>[] | null;
}

export type NewFixedAssetNetBookValue = Omit<IFixedAssetNetBookValue, 'id'> & { id: null };
