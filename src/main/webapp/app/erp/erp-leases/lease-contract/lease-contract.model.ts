import * as dayjs from 'dayjs';
import { IPlaceholder } from '../../erp-pages/placeholder/placeholder.model';
import { IBusinessDocument } from '../../erp-pages/business-document/business-document.model';
import { IContractMetadata } from '../../erp-pages/contract-metadata/contract-metadata.model';
import { IUniversallyUniqueMapping } from '../../erp-pages/universally-unique-mapping/universally-unique-mapping.model';

export interface ILeaseContract {
  id?: number;
  bookingId?: string;
  leaseTitle?: string;
  identifier?: string;
  description?: string | null;
  commencementDate?: dayjs.Dayjs;
  terminalDate?: dayjs.Dayjs;
  placeholders?: IPlaceholder[] | null;
  systemMappings?: IUniversallyUniqueMapping[] | null;
  businessDocuments?: IBusinessDocument[] | null;
  contractMetadata?: IContractMetadata[] | null;
}

export class LeaseContract implements ILeaseContract {
  constructor(
    public id?: number,
    public bookingId?: string,
    public leaseTitle?: string,
    public identifier?: string,
    public description?: string | null,
    public commencementDate?: dayjs.Dayjs,
    public terminalDate?: dayjs.Dayjs,
    public placeholders?: IPlaceholder[] | null,
    public systemMappings?: IUniversallyUniqueMapping[] | null,
    public businessDocuments?: IBusinessDocument[] | null,
    public contractMetadata?: IContractMetadata[] | null
  ) {}
}

export function getLeaseContractIdentifier(leaseContract: ILeaseContract): number | undefined {
  return leaseContract.id;
}
