import dayjs from 'dayjs/esm';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';

export interface IFileUpload {
  id: number;
  description?: string | null;
  fileName?: string | null;
  periodFrom?: dayjs.Dayjs | null;
  periodTo?: dayjs.Dayjs | null;
  fileTypeId?: number | null;
  dataFile?: string | null;
  dataFileContentType?: string | null;
  uploadSuccessful?: boolean | null;
  uploadProcessed?: boolean | null;
  uploadToken?: string | null;
  placeholders?: Pick<IPlaceholder, 'id' | 'description'>[] | null;
}

export type NewFileUpload = Omit<IFileUpload, 'id'> & { id: null };
