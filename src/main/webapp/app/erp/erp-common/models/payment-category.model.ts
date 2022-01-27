import { CategoryTypes } from '../enumerations/category-types.model';
import { IPaymentCalculation } from './payment-calculation.model';
import { IPlaceholder } from './placeholder.model';
import { IPaymentLabel } from './payment-label.model';

export interface IPaymentCategory {
  id?: number;
  categoryName?: string;
  categoryDescription?: string | null;
  categoryType?: CategoryTypes;
  paymentLabels?: IPaymentLabel[] | null;
  paymentCalculations?: IPaymentCalculation[] | null;
  placeholders?: IPlaceholder[] | null;
}

export class PaymentCategory implements IPaymentCategory {
  constructor(
    public id?: number,
    public categoryName?: string,
    public categoryDescription?: string | null,
    public categoryType?: CategoryTypes,
    public paymentLabels?: IPaymentLabel[] | null,
    public paymentCalculations?: IPaymentCalculation[] | null,
    public placeholders?: IPlaceholder[] | null
  ) {}
}

export function getPaymentCategoryIdentifier(paymentCategory: IPaymentCategory): number | undefined {
  return paymentCategory.id;
}
