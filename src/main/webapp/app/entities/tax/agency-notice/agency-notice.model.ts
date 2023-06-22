///
/// Erp System - Mark IV No 1 (David Series) Client 1.4.0
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

import dayjs from 'dayjs/esm';
import { IDealer } from 'app/entities/people/dealer/dealer.model';
import { ISettlementCurrency } from 'app/entities/settlement/settlement-currency/settlement-currency.model';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { IBusinessDocument } from 'app/entities/documentation/business-document/business-document.model';
import { AgencyStatusType } from 'app/entities/enumerations/agency-status-type.model';

export interface IAgencyNotice {
  id: number;
  referenceNumber?: string | null;
  referenceDate?: dayjs.Dayjs | null;
  assessmentAmount?: number | null;
  agencyStatus?: AgencyStatusType | null;
  assessmentNotice?: string | null;
  assessmentNoticeContentType?: string | null;
  correspondents?: Pick<IDealer, 'id' | 'dealerName'>[] | null;
  settlementCurrency?: Pick<ISettlementCurrency, 'id' | 'iso4217CurrencyCode'> | null;
  assessor?: Pick<IDealer, 'id' | 'dealerName'> | null;
  placeholders?: Pick<IPlaceholder, 'id' | 'description'>[] | null;
  businessDocuments?: Pick<IBusinessDocument, 'id' | 'documentTitle'>[] | null;
}

export type NewAgencyNotice = Omit<IAgencyNotice, 'id'> & { id: null };
