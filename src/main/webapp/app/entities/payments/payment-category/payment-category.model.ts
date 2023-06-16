import { IPaymentLabel } from 'app/entities/payment-label/payment-label.model';
import { IPlaceholder } from 'app/entities/erpService/placeholder/placeholder.model';
import { CategoryTypes } from 'app/entities/enumerations/category-types.model';

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
