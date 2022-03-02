import { IPlaceholder } from '../../erp-common/models/placeholder.model';
import { BranchStatusType } from '../../erp-common/enumerations/branch-status-type.model';

export interface IOutletStatus {
  id?: number;
  branchStatusTypeCode?: string;
  branchStatusType?: BranchStatusType;
  branchStatusTypeDescription?: string | null;
  placeholders?: IPlaceholder[] | null;
}

export class OutletStatus implements IOutletStatus {
  constructor(
    public id?: number,
    public branchStatusTypeCode?: string,
    public branchStatusType?: BranchStatusType,
    public branchStatusTypeDescription?: string | null,
    public placeholders?: IPlaceholder[] | null
  ) {}
}

export function getOutletStatusIdentifier(outletStatus: IOutletStatus): number | undefined {
  return outletStatus.id;
}
