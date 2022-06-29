///
/// Erp System - Mark II No 17 (Baruch Series)
/// Copyright © 2021 - 2022 Edwin Njeru (mailnjeru@gmail.com)
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
import { ISettlementCurrency } from 'app/erp/erp-common/models/settlement-currency.model';
import { AgencyStatusType } from '../enumerations/agency-status-type.model';
import { IDealer } from './dealer.model';

export interface IAgencyNotice {
  id?: number;
  referenceNumber?: string;
  referenceDate?: dayjs.Dayjs | null;
  taxCode?: string | null;
  assessmentAmount?: number;
  agencyStatus?: AgencyStatusType;
  correspondents?: IDealer [] | null;
  settlementCurrency?: ISettlementCurrency;
  assessor?: IDealer;
}

export class AgencyNotice implements IAgencyNotice {
  constructor(
    public id?: number,
    public referenceNumber?: string,
    public referenceDate?: dayjs.Dayjs | null,
    public taxCode?: string | null,
    public assessmentAmount?: number,
    public agencyStatus?: AgencyStatusType,
    public correspondents?: IDealer[] | null,
    public settlementCurrency?: ISettlementCurrency,
    public assessor?: IDealer
  ) {}
}

export function getAgencyNoticeIdentifier(agencyNotice: IAgencyNotice): number | undefined {
  return agencyNotice.id;
}
