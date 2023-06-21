import { IPaymentLabel } from '../../../erp-pages/payment-label/payment-label.model';
import { IPlaceholder } from '../../../erp-pages/placeholder/placeholder.model';
import { CategoryTypes } from '../../../erp-common/enumerations/category-types.model';

export interface IPaymentCategory {
  id: number;
  categoryName?: string | null;
  categoryDescription?: string | null;
  categoryType?: CategoryTypes | null;
  fileUploadToken?: string | null;
  compilationToken?: string | null;
  paymentLabels?: Pick<IPaymentLabel, 'id' | 'description'>[] | null;
  placeholders?: Pick<IPlaceholder, 'id' | 'description'>[] | null;
}

export type NewPaymentCategory = Omit<IPaymentCategory, 'id'> & { id: null };
