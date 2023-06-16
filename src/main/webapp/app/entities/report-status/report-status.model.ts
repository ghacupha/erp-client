import { IPlaceholder } from 'app/entities/erpService/placeholder/placeholder.model';
import { IProcessStatus } from 'app/entities/process-status/process-status.model';

export interface IReportStatus {
  id: number;
  reportName?: string | null;
  reportId?: string | null;
  placeholders?: Pick<IPlaceholder, 'id' | 'description'>[] | null;
  processStatus?: Pick<IProcessStatus, 'id' | 'statusCode'> | null;
}

export type NewReportStatus = Omit<IReportStatus, 'id'> & { id: null };
