import { SystemContentTypeAvailability } from '../../erp-common/enumerations/system-content-type-availability.model';
import { IPlaceholder } from '../../erp-pages/placeholder/placeholder.model';
import { IUniversallyUniqueMapping } from '../../erp-pages/universally-unique-mapping/universally-unique-mapping.model';

export interface ISystemContentType {
  id?: number;
  contentTypeName?: string;
  contentTypeHeader?: string;
  comments?: string | null;
  availability?: SystemContentTypeAvailability;
  placeholders?: IPlaceholder[] | null;
  sysMaps?: IUniversallyUniqueMapping[] | null;
}

export class SystemContentType implements ISystemContentType {
  constructor(
    public id?: number,
    public contentTypeName?: string,
    public contentTypeHeader?: string,
    public comments?: string | null,
    public availability?: SystemContentTypeAvailability,
    public placeholders?: IPlaceholder[] | null,
    public sysMaps?: IUniversallyUniqueMapping[] | null
  ) {}
}

export function getSystemContentTypeIdentifier(systemContentType: ISystemContentType): number | undefined {
  return systemContentType.id;
}
