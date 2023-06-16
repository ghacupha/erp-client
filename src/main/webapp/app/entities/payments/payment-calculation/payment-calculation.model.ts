import { IPaymentLabel } from 'app/entities/payment-label/payment-label.model';
import { IPaymentCategory } from 'app/entities/payments/payment-category/payment-category.model';
import { IPlaceholder } from 'app/entities/erpService/placeholder/placeholder.model';

export interface IPaymentCalculation {
  id?: number;
  paymentExpense?: number | null;
  withholdingVAT?: number | null;
  withholdingTax?: number | null;
  paymentAmount?: number | null;
  fileUploadToken?: string | null;
  compilationToken?: string | null;
  paymentLabels?: IPaymentLabel[] | null;
  paymentCategory?: IPaymentCategory | null;
  placeholders?: IPlaceholder[] | null;
}

export class PaymentCalculation implements IPaymentCalculation {
  constructor(
    public id?: number,
    public paymentExpense?: number | null,
    public withholdingVAT?: number | null,
    public withholdingTax?: number | null,
    public paymentAmount?: number | null,
    public fileUploadToken?: string | null,
    public compilationToken?: string | null,
    public paymentLabels?: IPaymentLabel[] | null,
    public paymentCategory?: IPaymentCategory | null,
    public placeholders?: IPlaceholder[] | null
  ) {}
}

export function getPaymentCalculationIdentifier(paymentCalculation: IPaymentCalculation): number | undefined {
  return paymentCalculation.id;
}
