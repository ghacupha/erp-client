///
/// Erp System - Mark X No 8 (Jehoiada Series) Client 1.7.6
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
import { IApplicationUser } from '../../erp-pages/application-user/application-user.model';
import { depreciationProcessStatusTypes } from '../../erp-common/enumerations/depreciation-process-status-types.model';

export interface IRouDepreciationRequest {
  id?: number;
  requisitionId?: string;
  timeOfRequest?: dayjs.Dayjs | null;
  depreciationProcessStatus?: depreciationProcessStatusTypes | null;
  invalidated?: boolean | null;
  numberOfEnumeratedItems?: number | null;
  initiatedBy?: IApplicationUser | null;
}

export class RouDepreciationRequest implements IRouDepreciationRequest {
  constructor(
    public id?: number,
    public requisitionId?: string,
    public timeOfRequest?: dayjs.Dayjs | null,
    public invalidated?: boolean | null,
    public depreciationProcessStatus?: depreciationProcessStatusTypes | null,
    public numberOfEnumeratedItems?: number | null,
    public initiatedBy?: IApplicationUser | null
  ) {
    this.invalidated = this.invalidated ?? false;
  }
}

export function getRouDepreciationRequestIdentifier(rouDepreciationRequest: IRouDepreciationRequest): number | undefined {
  return rouDepreciationRequest.id;
}
