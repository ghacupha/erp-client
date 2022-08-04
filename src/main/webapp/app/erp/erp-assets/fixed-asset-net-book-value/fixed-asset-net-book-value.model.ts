import * as dayjs from 'dayjs';
import { DepreciationRegime } from '../../erp-common/enumerations/depreciation-regime.model';
import { IPlaceholder } from '../../erp-pages/placeholder/placeholder.model';

export interface IFixedAssetNetBookValue {
  id?: number;
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
  placeholders?: IPlaceholder[] | null;
}

export class FixedAssetNetBookValue implements IFixedAssetNetBookValue {
  constructor(
    public id?: number,
    public assetNumber?: number | null,
    public serviceOutletCode?: string | null,
    public assetTag?: string | null,
    public assetDescription?: string | null,
    public netBookValueDate?: dayjs.Dayjs | null,
    public assetCategory?: string | null,
    public netBookValue?: number | null,
    public depreciationRegime?: DepreciationRegime | null,
    public fileUploadToken?: string | null,
    public compilationToken?: string | null,
    public placeholders?: IPlaceholder[] | null
  ) {}
}

export function getFixedAssetNetBookValueIdentifier(fixedAssetNetBookValue: IFixedAssetNetBookValue): number | undefined {
  return fixedAssetNetBookValue.id;
}
