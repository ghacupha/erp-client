import * as dayjs from 'dayjs';
import { IPlaceholder } from 'app/erp/erp-pages/placeholder/placeholder.model';
import { CurrencyTypes } from '../../../erp-common/enumerations/currency-types.model';
import { IPaymentLabel } from '../../payment-label/payment-label.model';

export interface IInvoice {
  id?: number;
  invoiceNumber?: string;
  invoiceDate?: dayjs.Dayjs | null;
  invoiceAmount?: number | null;
  currency?: CurrencyTypes;
  paymentReference?: string | null;
  dealerName?: string | null;
  fileUploadToken?: string | null;
  compilationToken?: string | null;
  paymentLabels?: IPaymentLabel[] | null;
  placeholders?: IPlaceholder[] | null;
}

export class Invoice implements IInvoice {
  constructor(
    public id?: number,
    public invoiceNumber?: string,
    public invoiceDate?: dayjs.Dayjs | null,
    public invoiceAmount?: number | null,
    public currency?: CurrencyTypes,
    public paymentReference?: string | null,
    public dealerName?: string | null,
    public fileUploadToken?: string | null,
    public compilationToken?: string | null,
    public paymentLabels?: IPaymentLabel[] | null,
    public placeholders?: IPlaceholder[] | null
  ) {}
}

export function getInvoiceIdentifier(invoice: IInvoice): number | undefined {
  return invoice.id;
}
