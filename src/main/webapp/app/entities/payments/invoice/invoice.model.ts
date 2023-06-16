import dayjs from 'dayjs/esm';
import { IPaymentLabel } from 'app/entities/payment-label/payment-label.model';
import { IPlaceholder } from 'app/entities/erpService/placeholder/placeholder.model';
import { CurrencyTypes } from 'app/entities/enumerations/currency-types.model';

export interface IInvoice {
  id: number;
  invoiceNumber?: string | null;
  invoiceDate?: dayjs.Dayjs | null;
  invoiceAmount?: number | null;
  currency?: CurrencyTypes | null;
  paymentReference?: string | null;
  dealerName?: string | null;
  fileUploadToken?: string | null;
  compilationToken?: string | null;
  paymentLabels?: Pick<IPaymentLabel, 'id' | 'description'>[] | null;
  placeholders?: Pick<IPlaceholder, 'id' | 'description'>[] | null;
}

export type NewInvoice = Omit<IInvoice, 'id'> & { id: null };
