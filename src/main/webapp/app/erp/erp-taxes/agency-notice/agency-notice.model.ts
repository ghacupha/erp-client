import * as dayjs from 'dayjs';
import { AgencyStatusType } from '../../erp-common/enumerations/agency-status-type.model';
import { ISettlementCurrency } from '../../erp-settlements/settlement-currency/settlement-currency.model';
import { IPlaceholder } from '../../erp-pages/placeholder/placeholder.model';
import { IDealer } from '../../erp-pages/dealers/dealer/dealer.model';

export interface IAgencyNotice {
  id?: number;
  referenceNumber?: string;
  referenceDate?: dayjs.Dayjs | null;
  assessmentAmount?: number;
  agencyStatus?: AgencyStatusType;
  assessmentNoticeContentType?: string | null;
  assessmentNotice?: string | null;
  correspondents?: IDealer[] | null;
  settlementCurrency?: ISettlementCurrency | null;
  assessor?: IDealer | null;
  placeholders?: IPlaceholder[] | null;
}

export class AgencyNotice implements IAgencyNotice {
  constructor(
    public id?: number,
    public referenceNumber?: string,
    public referenceDate?: dayjs.Dayjs | null,
    public assessmentAmount?: number,
    public agencyStatus?: AgencyStatusType,
    public assessmentNoticeContentType?: string | null,
    public assessmentNotice?: string | null,
    public correspondents?: IDealer[] | null,
    public settlementCurrency?: ISettlementCurrency | null,
    public assessor?: IDealer | null,
    public placeholders?: IPlaceholder[] | null
  ) {}
}

export function getAgencyNoticeIdentifier(agencyNotice: IAgencyNotice): number | undefined {
  return agencyNotice.id;
}

