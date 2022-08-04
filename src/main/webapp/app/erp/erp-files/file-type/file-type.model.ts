import { FileMediumTypes } from '../../erp-common/enumerations/file-medium-types.model';
import { FileModelType } from '../../erp-common/enumerations/file-model-type.model';
import { IPlaceholder } from '../../erp-pages/placeholder/placeholder.model';

export interface IFileType {
  id?: number;
  fileTypeName?: string;
  fileMediumType?: FileMediumTypes;
  description?: string | null;
  fileTemplateContentType?: string | null;
  fileTemplate?: string | null;
  fileType?: FileModelType | null;
  placeholders?: IPlaceholder[] | null;
}

export class FileType implements IFileType {
  constructor(
    public id?: number,
    public fileTypeName?: string,
    public fileMediumType?: FileMediumTypes,
    public description?: string | null,
    public fileTemplateContentType?: string | null,
    public fileTemplate?: string | null,
    public fileType?: FileModelType | null,
    public placeholders?: IPlaceholder[] | null
  ) {}
}

export function getFileTypeIdentifier(fileType: IFileType): number | undefined {
  return fileType.id;
}
