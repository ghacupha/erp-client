import dayjs from 'dayjs/esm';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';

export interface IFixedAssetAcquisition {
  id: number;
  assetNumber?: number | null;
  serviceOutletCode?: string | null;
  assetTag?: string | null;
  assetDescription?: string | null;
  purchaseDate?: dayjs.Dayjs | null;
  assetCategory?: string | null;
  purchasePrice?: number | null;
  fileUploadToken?: string | null;
  placeholders?: Pick<IPlaceholder, 'id' | 'description'>[] | null;
}

export type NewFixedAssetAcquisition = Omit<IFixedAssetAcquisition, 'id'> & { id: null };
