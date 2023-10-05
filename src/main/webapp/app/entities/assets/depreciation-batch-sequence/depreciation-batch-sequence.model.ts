///
/// Erp System - Mark VI No 1 (Phoebe Series) Client 1.5.3
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
import { IDepreciationJob } from 'app/entities/assets/depreciation-job/depreciation-job.model';
import { DepreciationBatchStatusType } from 'app/entities/enumerations/depreciation-batch-status-type.model';

export interface IDepreciationBatchSequence {
  id?: number;
  startIndex?: number | null;
  endIndex?: number | null;
  createdAt?: dayjs.Dayjs | null;
  depreciationBatchStatus?: DepreciationBatchStatusType | null;
  depreciationJob?: IDepreciationJob | null;
}

export class DepreciationBatchSequence implements IDepreciationBatchSequence {
  constructor(
    public id?: number,
    public startIndex?: number | null,
    public endIndex?: number | null,
    public createdAt?: dayjs.Dayjs | null,
    public depreciationBatchStatus?: DepreciationBatchStatusType | null,
    public depreciationJob?: IDepreciationJob | null
  ) {}
}

export function getDepreciationBatchSequenceIdentifier(depreciationBatchSequence: IDepreciationBatchSequence): number | undefined {
  return depreciationBatchSequence.id;
}
