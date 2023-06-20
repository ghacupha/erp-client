import { IPaymentLabel } from 'app/entities/payment-label/payment-label.model';
import { IPaymentCategory } from 'app/entities/payments/payment-category/payment-category.model';
import { IPlaceholder } from 'app/entities/erpService/placeholder/placeholder.model';

export interface IPaymentCalculation {
  id: number;
  paymentExpense?: number | null;
  withholdingVAT?: number | null;
  withholdingTax?: number | null;
  paymentAmount?: number | null;
  fileUploadToken?: string | null;
  compilationToken?: string | null;
  paymentLabels?: Pick<IPaymentLabel, 'id' | 'description'>[] | null;
  paymentCategory?: Pick<IPaymentCategory, 'id'> | null;
  placeholders?: Pick<IPlaceholder, 'id' | 'description'>[] | null;
}

export type NewPaymentCalculation = Omit<IPaymentCalculation, 'id'> & { id: null };
