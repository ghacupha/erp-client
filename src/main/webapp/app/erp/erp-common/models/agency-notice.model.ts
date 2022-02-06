import * as dayjs from 'dayjs';
import { IDealer } from 'app/entities/dealers/dealer/dealer.model';
import { ISettlementCurrency } from 'app/erp/erp-common/models/settlement-currency.model';
import { AgencyStatusType } from '../enumerations/agency-status-type.model';

export interface IAgencyNotice {
  id?: number;
  referenceNumber?: string;
  referenceDate?: dayjs.Dayjs | null;
  taxCode?: string | null;
  assessmentAmount?: number;
  agencyStatus?: AgencyStatusType;
  correspondents?: IDealer[] | null;
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
