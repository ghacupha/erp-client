import * as dayjs from 'dayjs';
import { IPlaceholder } from '../../erp-common/models/placeholder.model';
import { ISettlementCurrency } from 'app/erp/erp-settlements/settlement-currency/settlement-currency.model';
import { IPaymentLabel } from '../../erp-common/models/payment-label.model';
import { IPaymentCategory } from 'app/erp/erp-settlements/payments/payment-category/payment-category.model';
import { IPaymentInvoice } from 'app/erp/erp-settlements/payment-invoice/payment-invoice.model';
import { IDealer } from '../../erp-common/models/dealer.model';

export interface ISettlement {
  id?: number;
  paymentNumber?: string | null;
  paymentDate?: dayjs.Dayjs | null;
  paymentAmount?: number | null;
  description?: string | null;
  notes?: string | null;
  calculationFileContentType?: string | null;
  calculationFile?: string | null;
  fileUploadToken?: string | null;
  compilationToken?: string | null;
  placeholders?: IPlaceholder[] | null;
  settlementCurrency?: ISettlementCurrency;
  paymentLabels?: IPaymentLabel[] | null;
  paymentCategory?: IPaymentCategory;
  groupSettlement?: ISettlement | null;
  biller?: IDealer;
  paymentInvoices?: IPaymentInvoice[] | null;
  signatories?: IDealer[] | null;
}

export class Settlement implements ISettlement {
  constructor(
    public id?: number,
    public paymentNumber?: string | null,
    public paymentDate?: dayjs.Dayjs | null,
    public paymentAmount?: number | null,
    public description?: string | null,
    public notes?: string | null,
    public calculationFileContentType?: string | null,
    public calculationFile?: string | null,
    public fileUploadToken?: string | null,
    public compilationToken?: string | null,
    public placeholders?: IPlaceholder[] | null,
    public settlementCurrency?: ISettlementCurrency,
    public paymentLabels?: IPaymentLabel[] | null,
    public paymentCategory?: IPaymentCategory,
    public groupSettlement?: ISettlement | null,
    public biller?: IDealer,
    public paymentInvoices?: IPaymentInvoice[] | null,
    public signatories?: IDealer[] | null
  ) {}
}

export function getSettlementIdentifier(settlement: ISettlement): number | undefined {
  return settlement.id;
}
