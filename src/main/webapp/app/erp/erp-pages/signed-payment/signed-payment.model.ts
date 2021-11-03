import * as dayjs from 'dayjs';
import { IPlaceholder } from 'app/entities/erpService/placeholder/placeholder.model';
import { CurrencyTypes } from 'app/entities/enumerations/currency-types.model';
import { IPaymentLabel } from '../payment-label/payment-label.model';
import { IPaymentCategory } from '../payments/payment-category/payment-category.model';

export interface ISignedPayment {
  id?: number;
  transactionNumber?: string;
  transactionDate?: dayjs.Dayjs;
  transactionCurrency?: CurrencyTypes;
  transactionAmount?: number;
  dealerName?: string | null;
  fileUploadToken?: string | null;
  compilationToken?: string | null;
  paymentLabels?: IPaymentLabel[] | null;
  paymentCategory?: IPaymentCategory | null;
  placeholders?: IPlaceholder[] | null;
  signedPaymentGroup?: ISignedPayment | null;
}

export class SignedPayment implements ISignedPayment {
  constructor(
    public id?: number,
    public transactionNumber?: string,
    public transactionDate?: dayjs.Dayjs,
    public transactionCurrency?: CurrencyTypes,
    public transactionAmount?: number,
    public dealerName?: string | null,
    public fileUploadToken?: string | null,
    public compilationToken?: string | null,
    public paymentLabels?: IPaymentLabel[] | null,
    public paymentCategory?: IPaymentCategory | null,
    public placeholders?: IPlaceholder[] | null,
    public signedPaymentGroup?: ISignedPayment | null
  ) {}
}

export function getSignedPaymentIdentifier(signedPayment: ISignedPayment): number | undefined {
  return signedPayment.id;
}
