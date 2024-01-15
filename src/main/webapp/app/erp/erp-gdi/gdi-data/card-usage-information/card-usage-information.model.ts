///
/// Erp System - Mark X No 1 (Jehoiada Series) Client 1.7.1
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
import { IInstitutionCode } from '../../master/institution-code/institution-code.model';
import { ICardCategoryType } from '../../master/card-category-type/card-category-type.model';
import { ICardState } from '../card-state/card-state.model';
import { IBankTransactionType } from '../../master/bank-transaction-type/bank-transaction-type.model';
import { ICardBrandType } from '../../master/card-brand-type/card-brand-type.model';
import { IChannelType } from '../../master/channel-type/channel-type.model';
import { ICardTypes } from '../../master/card-types/card-types.model';

export interface ICardUsageInformation {
  id?: number;
  reportingDate?: dayjs.Dayjs;
  totalNumberOfLiveCards?: number;
  totalActiveCards?: number;
  totalNumberOfTransactionsDone?: number;
  totalValueOfTransactionsDoneInLCY?: number;
  bankCode?: IInstitutionCode;
  cardType?: ICardTypes;
  cardBrand?: ICardBrandType;
  cardCategoryType?: ICardCategoryType;
  transactionType?: IBankTransactionType;
  channelType?: IChannelType;
  cardState?: ICardState;
}

export class CardUsageInformation implements ICardUsageInformation {
  constructor(
    public id?: number,
    public reportingDate?: dayjs.Dayjs,
    public totalNumberOfLiveCards?: number,
    public totalActiveCards?: number,
    public totalNumberOfTransactionsDone?: number,
    public totalValueOfTransactionsDoneInLCY?: number,
    public bankCode?: IInstitutionCode,
    public cardType?: ICardTypes,
    public cardBrand?: ICardBrandType,
    public cardCategoryType?: ICardCategoryType,
    public transactionType?: IBankTransactionType,
    public channelType?: IChannelType,
    public cardState?: ICardState
  ) {}
}

export function getCardUsageInformationIdentifier(cardUsageInformation: ICardUsageInformation): number | undefined {
  return cardUsageInformation.id;
}
