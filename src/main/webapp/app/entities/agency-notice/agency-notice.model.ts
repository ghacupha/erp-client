import * as dayjs from 'dayjs';
import { IDealer } from 'app/entities/dealers/dealer/dealer.model';
import { ISettlementCurrency } from 'app/entities/settlement-currency/settlement-currency.model';
import { IPlaceholder } from 'app/entities/erpService/placeholder/placeholder.model';
import { AgencyStatusType } from 'app/entities/enumerations/agency-status-type.model';

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
  placeholders?: IPlaceholder[] | null;
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
    public assessor?: IDealer,
    public placeholders?: IPlaceholder[] | null
  ) {}
}

export function getAgencyNoticeIdentifier(agencyNotice: IAgencyNotice): number | undefined {
  return agencyNotice.id;
}
