///
/// Erp System - Mark X No 10 (Jehoiada Series) Client 1.7.8
/// Copyright © 2021 - 2024 Edwin Njeru (mailnjeru@gmail.com)
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

export interface IWIPTransferListItem {
  id?: number;
  wipSequence?: number | null;
  wipParticulars?: string | null;
  transferType?: string | null;
  transferSettlement?: string | null;
  transferSettlementDate?: dayjs.Dayjs | null;
  transferAmount?: number | null;
  wipTransferDate?: dayjs.Dayjs | null;
  originalSettlement?: string | null;
  originalSettlementDate?: dayjs.Dayjs | null;
  assetCategory?: string | null;
  serviceOutlet?: string | null;
  workProject?: string | null;
}

export class WIPTransferListItem implements IWIPTransferListItem {
  constructor(
    public id?: number,
    public wipSequence?: number | null,
    public wipParticulars?: string | null,
    public transferType?: string | null,
    public transferSettlement?: string | null,
    public transferSettlementDate?: dayjs.Dayjs | null,
    public transferAmount?: number | null,
    public wipTransferDate?: dayjs.Dayjs | null,
    public originalSettlement?: string | null,
    public originalSettlementDate?: dayjs.Dayjs | null,
    public assetCategory?: string | null,
    public serviceOutlet?: string | null,
    public workProject?: string | null
  ) {}
}

export function getWIPTransferListItemIdentifier(wIPTransferListItem: IWIPTransferListItem): number | undefined {
  return wIPTransferListItem.id;
}
