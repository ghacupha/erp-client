import dayjs from 'dayjs/esm';
import { IPlaceholder } from 'app/entities/erpService/placeholder/placeholder.model';
import { IUniversallyUniqueMapping } from 'app/entities/universally-unique-mapping/universally-unique-mapping.model';
import { IBusinessDocument } from 'app/entities/business-document/business-document.model';
import { IContractMetadata } from 'app/entities/contract-metadata/contract-metadata.model';

export interface ILeaseContract {
  id: number;
  bookingId?: string | null;
  leaseTitle?: string | null;
  identifier?: string | null;
  description?: string | null;
  commencementDate?: dayjs.Dayjs | null;
  terminalDate?: dayjs.Dayjs | null;
  placeholders?: Pick<IPlaceholder, 'id' | 'description'>[] | null;
  systemMappings?: Pick<IUniversallyUniqueMapping, 'id' | 'mappedValue'>[] | null;
  businessDocuments?: Pick<IBusinessDocument, 'id' | 'documentTitle'>[] | null;
  contractMetadata?: Pick<IContractMetadata, 'id' | 'contractTitle'>[] | null;
}

export type NewLeaseContract = Omit<ILeaseContract, 'id'> & { id: null };
