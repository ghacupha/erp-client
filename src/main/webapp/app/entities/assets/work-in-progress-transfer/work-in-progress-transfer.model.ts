///
/// Erp System - Mark VIII No 1 (Hilkiah Series) Client 1.5.9
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
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { IBusinessDocument } from 'app/entities/documentation/business-document/business-document.model';
import { IAssetCategory } from 'app/entities/assets/asset-category/asset-category.model';
import { IWorkInProgressRegistration } from 'app/entities/assets/work-in-progress-registration/work-in-progress-registration.model';
import { IServiceOutlet } from 'app/entities/gdi/service-outlet/service-outlet.model';
import { ISettlement } from 'app/entities/settlement/settlement/settlement.model';
import { IWorkProjectRegister } from 'app/entities/assets/work-project-register/work-project-register.model';
import { WorkInProgressTransferType } from 'app/entities/enumerations/work-in-progress-transfer-type.model';

export interface IWorkInProgressTransfer {
  id?: number;
  description?: string | null;
  targetAssetNumber?: string | null;
  transferAmount?: number;
  transferDate?: dayjs.Dayjs;
  transferType?: WorkInProgressTransferType;
  placeholders?: IPlaceholder[] | null;
  businessDocuments?: IBusinessDocument[] | null;
  assetCategory?: IAssetCategory | null;
  workInProgressRegistration?: IWorkInProgressRegistration | null;
  serviceOutlet?: IServiceOutlet | null;
  settlement?: ISettlement | null;
  workProjectRegister?: IWorkProjectRegister | null;
}

export class WorkInProgressTransfer implements IWorkInProgressTransfer {
  constructor(
    public id?: number,
    public description?: string | null,
    public targetAssetNumber?: string | null,
    public transferAmount?: number,
    public transferDate?: dayjs.Dayjs,
    public transferType?: WorkInProgressTransferType,
    public placeholders?: IPlaceholder[] | null,
    public businessDocuments?: IBusinessDocument[] | null,
    public assetCategory?: IAssetCategory | null,
    public workInProgressRegistration?: IWorkInProgressRegistration | null,
    public serviceOutlet?: IServiceOutlet | null,
    public settlement?: ISettlement | null,
    public workProjectRegister?: IWorkProjectRegister | null
  ) {}
}

export function getWorkInProgressTransferIdentifier(workInProgressTransfer: IWorkInProgressTransfer): number | undefined {
  return workInProgressTransfer.id;
}
