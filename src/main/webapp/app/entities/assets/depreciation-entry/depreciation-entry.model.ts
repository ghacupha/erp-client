///
/// Erp System - Mark V No 5 (Ehud Series) Client 1.5.2
/// Copyright © 2021 - 2023 Edwin Njeru (mailnjeru@gmail.com)
///
/// This program is free software: you can redistribute it and/or modify
/// it under the terms of the GNU General Public License as published by
/// the Free Software Foundation, either version 3 of the License, or
/// (at your option) any later version.
///
/// This program is distributed in the hope that it will be useful,
/// but WITHOUT ANY WARRANTY; without even the implied warranty of
/// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
/// GNU General Public License for more details.
///
/// You should have received a copy of the GNU General Public License
/// along with this program. If not, see <http://www.gnu.org/licenses/>.
///

import * as dayjs from 'dayjs';
import { IServiceOutlet } from 'app/entities/data/service-outlet/service-outlet.model';
import { IAssetCategory } from 'app/entities/assets/asset-category/asset-category.model';
import { IDepreciationMethod } from 'app/entities/assets/depreciation-method/depreciation-method.model';
import { IAssetRegistration } from 'app/entities/assets/asset-registration/asset-registration.model';
import { IDepreciationPeriod } from 'app/entities/assets/depreciation-period/depreciation-period.model';

export interface IDepreciationEntry {
  id?: number;
  postedAt?: dayjs.Dayjs | null;
  depreciationAmount?: number | null;
  assetNumber?: number | null;
  serviceOutlet?: IServiceOutlet | null;
  assetCategory?: IAssetCategory | null;
  depreciationMethod?: IDepreciationMethod | null;
  assetRegistration?: IAssetRegistration | null;
  depreciationPeriod?: IDepreciationPeriod | null;
}

export class DepreciationEntry implements IDepreciationEntry {
  constructor(
    public id?: number,
    public postedAt?: dayjs.Dayjs | null,
    public depreciationAmount?: number | null,
    public assetNumber?: number | null,
    public serviceOutlet?: IServiceOutlet | null,
    public assetCategory?: IAssetCategory | null,
    public depreciationMethod?: IDepreciationMethod | null,
    public assetRegistration?: IAssetRegistration | null,
    public depreciationPeriod?: IDepreciationPeriod | null
  ) {}
}

export function getDepreciationEntryIdentifier(depreciationEntry: IDepreciationEntry): number | undefined {
  return depreciationEntry.id;
}
