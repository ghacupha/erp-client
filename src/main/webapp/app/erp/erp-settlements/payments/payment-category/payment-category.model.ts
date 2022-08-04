import { IPaymentLabel } from '../../../erp-pages/payment-label/payment-label.model';
import { IPlaceholder } from '../../../erp-pages/placeholder/placeholder.model';
import { CategoryTypes } from '../../../erp-common/enumerations/category-types.model';
import { IPaymentCalculation } from '../../../erp-pages/payments/payment-calculation/payment-calculation.model';

export interface IPaymentCategory {
  id?: number;
  categoryName?: string;
  categoryDescription?: string | null;
  categoryType?: CategoryTypes;
  fileUploadToken?: string | null;
  compilationToken?: string | null;
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
    public fileUploadToken?: string | null,
    public compilationToken?: string | null,
    public paymentLabels?: IPaymentLabel[] | null,
    public paymentCalculations?: IPaymentCalculation[] | null,
    public placeholders?: IPlaceholder[] | null
  ) {}
}

export function getPaymentCategoryIdentifier(paymentCategory: IPaymentCategory): number | undefined {
  return paymentCategory.id;
}
