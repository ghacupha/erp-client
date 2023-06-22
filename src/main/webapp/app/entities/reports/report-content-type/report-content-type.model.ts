import { ISystemContentType } from 'app/entities/system/system-content-type/system-content-type.model';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';

export interface IReportContentType {
  id: number;
  reportTypeName?: string | null;
  reportFileExtension?: string | null;
  systemContentType?: Pick<ISystemContentType, 'id' | 'contentTypeName'> | null;
  placeholders?: Pick<IPlaceholder, 'id' | 'description'>[] | null;
}

export type NewReportContentType = Omit<IReportContentType, 'id'> & { id: null };
