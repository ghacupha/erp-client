import { IPlaceholder } from 'app/entities/erpService/placeholder/placeholder.model';

export interface IOutletType {
  id: number;
  outletTypeCode?: string | null;
  outletType?: string | null;
  outletTypeDetails?: string | null;
  placeholders?: Pick<IPlaceholder, 'id' | 'description'>[] | null;
}

export type NewOutletType = Omit<IOutletType, 'id'> & { id: null };
