import * as dayjs from 'dayjs';
import { IPlaceholder } from 'app/entities/erpService/placeholder/placeholder.model';
import { ISettlementCurrency } from 'app/erp/erp-common/models/settlement-currency.model';
import { IPaymentLabel } from 'app/entities/payment-label/payment-label.model';
import { IPaymentCategory } from 'app/entities/payments/payment-category/payment-category.model';
import { IDealer } from 'app/entities/dealers/dealer/dealer.model';
import { IPaymentInvoice } from 'app/entities/payment-invoice/payment-invoice.model';

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
