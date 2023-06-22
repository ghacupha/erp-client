import { IWorkInProgressRegistration } from 'app/entities/assets/work-in-progress-registration/work-in-progress-registration.model';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { IBusinessDocument } from 'app/entities/documentation/business-document/business-document.model';

export interface IWorkInProgressTransfer {
  id: number;
  description?: string | null;
  targetAssetNumber?: string | null;
  workInProgressRegistrations?: Pick<IWorkInProgressRegistration, 'id'>[] | null;
  placeholders?: Pick<IPlaceholder, 'id' | 'description'>[] | null;
  businessDocuments?: Pick<IBusinessDocument, 'id' | 'documentTitle'>[] | null;
}

export type NewWorkInProgressTransfer = Omit<IWorkInProgressTransfer, 'id'> & { id: null };
