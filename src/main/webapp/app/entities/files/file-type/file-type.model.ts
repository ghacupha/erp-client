import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { FileMediumTypes } from 'app/entities/enumerations/file-medium-types.model';
import { FileModelType } from 'app/entities/enumerations/file-model-type.model';

export interface IFileType {
  id: number;
  fileTypeName?: string | null;
  fileMediumType?: FileMediumTypes | null;
  description?: string | null;
  fileTemplate?: string | null;
  fileTemplateContentType?: string | null;
  fileType?: FileModelType | null;
  placeholders?: Pick<IPlaceholder, 'id' | 'description'>[] | null;
}

export type NewFileType = Omit<IFileType, 'id'> & { id: null };
