import { IPlaceholder } from 'app/entities/erpService/placeholder/placeholder.model';

export interface ICustomerIDDocumentType {
  id: number;
  documentCode?: string | null;
  documentType?: string | null;
  documentTypeDescription?: string | null;
  placeholders?: Pick<IPlaceholder, 'id' | 'description'>[] | null;
}

export type NewCustomerIDDocumentType = Omit<ICustomerIDDocumentType, 'id'> & { id: null };
