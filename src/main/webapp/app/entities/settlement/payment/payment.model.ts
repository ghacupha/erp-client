import dayjs from 'dayjs/esm';
import { IPaymentLabel } from 'app/entities/settlement/payment-label/payment-label.model';
import { IPaymentCategory } from 'app/entities/settlement/payment-category/payment-category.model';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { CurrencyTypes } from 'app/entities/enumerations/currency-types.model';

export interface IPayment {
  id: number;
  paymentNumber?: string | null;
  paymentDate?: dayjs.Dayjs | null;
  invoicedAmount?: number | null;
  paymentAmount?: number | null;
  description?: string | null;
  settlementCurrency?: CurrencyTypes | null;
  calculationFile?: string | null;
  calculationFileContentType?: string | null;
  dealerName?: string | null;
  purchaseOrderNumber?: string | null;
  fileUploadToken?: string | null;
  compilationToken?: string | null;
  paymentLabels?: Pick<IPaymentLabel, 'id' | 'description'>[] | null;
  paymentCategory?: Pick<IPaymentCategory, 'id' | 'categoryName'> | null;
  placeholders?: Pick<IPlaceholder, 'id' | 'description'>[] | null;
  paymentGroup?: Pick<IPayment, 'id'> | null;
}

export type NewPayment = Omit<IPayment, 'id'> & { id: null };
