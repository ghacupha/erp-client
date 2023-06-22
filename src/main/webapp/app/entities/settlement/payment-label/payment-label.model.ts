import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';

export interface IPaymentLabel {
  id: number;
  description?: string | null;
  comments?: string | null;
  fileUploadToken?: string | null;
  compilationToken?: string | null;
  remarks?: string | null;
  containingPaymentLabel?: Pick<IPaymentLabel, 'id' | 'description'> | null;
  placeholders?: Pick<IPlaceholder, 'id' | 'description'>[] | null;
}

export type NewPaymentLabel = Omit<IPaymentLabel, 'id'> & { id: null };
