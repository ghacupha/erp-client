import dayjs from 'dayjs/esm';
import { IPaymentLabel } from 'app/entities/payment-label/payment-label.model';
import { IPaymentCategory } from 'app/entities/payments/payment-category/payment-category.model';
import { IPlaceholder } from 'app/entities/erpService/placeholder/placeholder.model';
import { CurrencyTypes } from 'app/entities/enumerations/currency-types.model';

export interface ISignedPayment {
  id: number;
  transactionNumber?: string | null;
  transactionDate?: dayjs.Dayjs | null;
  transactionCurrency?: CurrencyTypes | null;
  transactionAmount?: number | null;
  dealerName?: string | null;
  fileUploadToken?: string | null;
  compilationToken?: string | null;
  paymentLabels?: Pick<IPaymentLabel, 'id' | 'description'>[] | null;
  paymentCategory?: Pick<IPaymentCategory, 'id' | 'categoryName'> | null;
  placeholders?: Pick<IPlaceholder, 'id' | 'description'>[] | null;
  signedPaymentGroup?: Pick<ISignedPayment, 'id'> | null;
}

export type NewSignedPayment = Omit<ISignedPayment, 'id'> & { id: null };
