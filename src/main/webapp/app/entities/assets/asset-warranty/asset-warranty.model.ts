import dayjs from 'dayjs/esm';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { IUniversallyUniqueMapping } from 'app/entities/system/universally-unique-mapping/universally-unique-mapping.model';
import { IDealer } from 'app/entities/people/dealer/dealer.model';
import { IBusinessDocument } from 'app/entities/documentation/business-document/business-document.model';

export interface IAssetWarranty {
  id: number;
  assetTag?: string | null;
  description?: string | null;
  modelNumber?: string | null;
  serialNumber?: string | null;
  expiryDate?: dayjs.Dayjs | null;
  placeholders?: Pick<IPlaceholder, 'id' | 'description'>[] | null;
  universallyUniqueMappings?: Pick<IUniversallyUniqueMapping, 'id' | 'universalKey'>[] | null;
  dealer?: Pick<IDealer, 'id' | 'dealerName'> | null;
  warrantyAttachments?: Pick<IBusinessDocument, 'id' | 'documentTitle'>[] | null;
}

export type NewAssetWarranty = Omit<IAssetWarranty, 'id'> & { id: null };
