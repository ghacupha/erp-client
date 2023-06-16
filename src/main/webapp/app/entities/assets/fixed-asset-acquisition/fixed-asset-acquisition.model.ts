import * as dayjs from 'dayjs';
import { IPlaceholder } from 'app/entities/erpService/placeholder/placeholder.model';

export interface IFixedAssetAcquisition {
  id?: number;
  assetNumber?: number | null;
  serviceOutletCode?: string | null;
  assetTag?: string | null;
  assetDescription?: string | null;
  purchaseDate?: dayjs.Dayjs | null;
  assetCategory?: string | null;
  purchasePrice?: number | null;
  fileUploadToken?: string | null;
  placeholders?: IPlaceholder[] | null;
}

export class FixedAssetAcquisition implements IFixedAssetAcquisition {
  constructor(
    public id?: number,
    public assetNumber?: number | null,
    public serviceOutletCode?: string | null,
    public assetTag?: string | null,
    public assetDescription?: string | null,
    public purchaseDate?: dayjs.Dayjs | null,
    public assetCategory?: string | null,
    public purchasePrice?: number | null,
    public fileUploadToken?: string | null,
    public placeholders?: IPlaceholder[] | null
  ) {}
}

export function getFixedAssetAcquisitionIdentifier(fixedAssetAcquisition: IFixedAssetAcquisition): number | undefined {
  return fixedAssetAcquisition.id;
}
