import { ISystemContentType } from 'app/entities/system-content-type/system-content-type.model';
import { IPlaceholder } from 'app/entities/erpService/placeholder/placeholder.model';

export interface IReportContentType {
  id: number;
  reportTypeName?: string | null;
  reportFileExtension?: string | null;
  systemContentType?: Pick<ISystemContentType, 'id' | 'contentTypeName'> | null;
  placeholders?: Pick<IPlaceholder, 'id' | 'description'>[] | null;
}

export type NewReportContentType = Omit<IReportContentType, 'id'> & { id: null };
