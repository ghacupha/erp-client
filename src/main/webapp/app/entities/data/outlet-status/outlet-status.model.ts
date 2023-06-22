import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { BranchStatusType } from 'app/entities/enumerations/branch-status-type.model';

export interface IOutletStatus {
  id: number;
  branchStatusTypeCode?: string | null;
  branchStatusType?: BranchStatusType | null;
  branchStatusTypeDescription?: string | null;
  placeholders?: Pick<IPlaceholder, 'id' | 'description'>[] | null;
}

export type NewOutletStatus = Omit<IOutletStatus, 'id'> & { id: null };
