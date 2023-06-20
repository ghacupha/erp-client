import dayjs from 'dayjs/esm';
import { IDealer } from 'app/entities/dealers/dealer/dealer.model';
import { ISettlementCurrency } from 'app/entities/settlement-currency/settlement-currency.model';
import { IPlaceholder } from 'app/entities/erpService/placeholder/placeholder.model';
import { IBusinessDocument } from 'app/entities/business-document/business-document.model';
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
