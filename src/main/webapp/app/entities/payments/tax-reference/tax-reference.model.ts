import { IPlaceholder } from 'app/entities/erpService/placeholder/placeholder.model';
import { taxReferenceTypes } from 'app/entities/enumerations/tax-reference-types.model';

export interface ITaxReference {
  id: number;
  taxName?: string | null;
  taxDescription?: string | null;
  taxPercentage?: number | null;
  taxReferenceType?: taxReferenceTypes | null;
  fileUploadToken?: string | null;
  compilationToken?: string | null;
  placeholders?: Pick<IPlaceholder, 'id' | 'description'>[] | null;
}

export type NewTaxReference = Omit<ITaxReference, 'id'> & { id: null };
