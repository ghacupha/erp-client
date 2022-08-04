import { IWorkInProgressRegistration } from 'app/erp/erp-assets/work-in-progress-registration/work-in-progress-registration.model';
import { IPlaceholder } from '../../erp-pages/placeholder/placeholder.model';

export interface IWorkInProgressTransfer {
  id?: number;
  description?: string | null;
  targetAssetNumber?: string | null;
  workInProgressRegistrations?: IWorkInProgressRegistration[] | null;
  placeholders?: IPlaceholder[] | null;
}

export class WorkInProgressTransfer implements IWorkInProgressTransfer {
  constructor(
    public id?: number,
    public description?: string | null,
    public targetAssetNumber?: string | null,
    public workInProgressRegistrations?: IWorkInProgressRegistration[] | null,
    public placeholders?: IPlaceholder[] | null
  ) {}
}

export function getWorkInProgressTransferIdentifier(workInProgressTransfer: IWorkInProgressTransfer): number | undefined {
  return workInProgressTransfer.id;
}
