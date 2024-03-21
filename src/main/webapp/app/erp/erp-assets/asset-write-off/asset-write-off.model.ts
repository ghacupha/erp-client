import * as dayjs from 'dayjs';
import { IApplicationUser } from '../../erp-pages/application-user/application-user.model';
import { IPlaceholder } from '../../erp-pages/placeholder/placeholder.model';
import { IAssetRegistration } from '../asset-registration/asset-registration.model';
import { IDepreciationPeriod } from '../depreciation-period/depreciation-period.model';

export interface IAssetWriteOff {
  id?: number;
  description?: string | null;
  writeOffAmount?: number;
  writeOffDate?: dayjs.Dayjs;
  writeOffReferenceId?: string | null;
  createdBy?: IApplicationUser | null;
  modifiedBy?: IApplicationUser | null;
  lastAccessedBy?: IApplicationUser | null;
  effectivePeriod?: IDepreciationPeriod;
  placeholders?: IPlaceholder[] | null;
  assetWrittenOff?: IAssetRegistration;
}

export class AssetWriteOff implements IAssetWriteOff {
  constructor(
    public id?: number,
    public description?: string | null,
    public writeOffAmount?: number,
    public writeOffDate?: dayjs.Dayjs,
    public writeOffReferenceId?: string | null,
    public createdBy?: IApplicationUser | null,
    public modifiedBy?: IApplicationUser | null,
    public lastAccessedBy?: IApplicationUser | null,
    public effectivePeriod?: IDepreciationPeriod,
    public placeholders?: IPlaceholder[] | null,
    public assetWrittenOff?: IAssetRegistration
  ) {}
}

export function getAssetWriteOffIdentifier(assetWriteOff: IAssetWriteOff): number | undefined {
  return assetWriteOff.id;
}
