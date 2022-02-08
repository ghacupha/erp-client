import { IPaymentLabel } from '../../../erp-common/models/payment-label.model';
import { IPaymentCalculation } from 'app/erp/erp-settlements/payments/payment-calculation/payment-calculation.model';
import { IPlaceholder } from '../../../erp-common/models/placeholder.model';
import { CategoryTypes } from 'app/erp/erp-settlements/enumerations/category-types.model';

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
