import { IWorkInProgressRegistration } from 'app/entities/work-in-progress-registration/work-in-progress-registration.model';
import { IPlaceholder } from 'app/entities/erpService/placeholder/placeholder.model';
import { IBusinessDocument } from 'app/entities/business-document/business-document.model';

export interface IWorkInProgressTransfer {
  id?: number;
  description?: string | null;
  targetAssetNumber?: string | null;
  workInProgressRegistrations?: IWorkInProgressRegistration[] | null;
  placeholders?: IPlaceholder[] | null;
  businessDocuments?: IBusinessDocument[] | null;
}

export class WorkInProgressTransfer implements IWorkInProgressTransfer {
  constructor(
    public id?: number,
    public description?: string | null,
    public targetAssetNumber?: string | null,
    public workInProgressRegistrations?: IWorkInProgressRegistration[] | null,
    public placeholders?: IPlaceholder[] | null,
    public businessDocuments?: IBusinessDocument[] | null
  ) {}
}

export function getWorkInProgressTransferIdentifier(workInProgressTransfer: IWorkInProgressTransfer): number | undefined {
  return workInProgressTransfer.id;
}
