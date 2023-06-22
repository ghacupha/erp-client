import { IPaymentLabel } from 'app/entities/settlement/payment-label/payment-label.model';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';

export interface IDealer {
  id: number;
  dealerName?: string | null;
  taxNumber?: string | null;
  identificationDocumentNumber?: string | null;
  organizationName?: string | null;
  department?: string | null;
  position?: string | null;
  postalAddress?: string | null;
  physicalAddress?: string | null;
  accountName?: string | null;
  accountNumber?: string | null;
  bankersName?: string | null;
  bankersBranch?: string | null;
  bankersSwiftCode?: string | null;
  fileUploadToken?: string | null;
  compilationToken?: string | null;
  remarks?: string | null;
  otherNames?: string | null;
  paymentLabels?: Pick<IPaymentLabel, 'id' | 'description'>[] | null;
  dealerGroup?: Pick<IDealer, 'id' | 'dealerName'> | null;
  placeholders?: Pick<IPlaceholder, 'id'>[] | null;
}

export type NewDealer = Omit<IDealer, 'id'> & { id: null };
