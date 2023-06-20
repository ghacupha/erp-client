import { IPlaceholder } from 'app/entities/erpService/placeholder/placeholder.model';
import { IUniversallyUniqueMapping } from 'app/entities/universally-unique-mapping/universally-unique-mapping.model';
import { SystemContentTypeAvailability } from 'app/entities/enumerations/system-content-type-availability.model';

export interface ISystemContentType {
  id: number;
  contentTypeName?: string | null;
  contentTypeHeader?: string | null;
  comments?: string | null;
  availability?: SystemContentTypeAvailability | null;
  placeholders?: Pick<IPlaceholder, 'id' | 'description'>[] | null;
  sysMaps?: Pick<IUniversallyUniqueMapping, 'id' | 'mappedValue'>[] | null;
}

export type NewSystemContentType = Omit<ISystemContentType, 'id'> & { id: null };
