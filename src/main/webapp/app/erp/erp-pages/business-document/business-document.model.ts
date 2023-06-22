import dayjs from 'dayjs/esm';
import { IApplicationUser } from '../application-user/application-user.model';
import { IPlaceholder } from '../placeholder/placeholder.model';
import { IAlgorithm } from '../algorithm/algorithm.model';
import { ISecurityClearance } from '../security-clearance/security-clearance.model';
import { IUniversallyUniqueMapping } from '../universally-unique-mapping/universally-unique-mapping.model';
import { IDealer } from '../dealers/dealer/dealer.model';

export interface IBusinessDocument {
  id: number;
  documentTitle?: string | null;
  description?: string | null;
  documentSerial?: string | null;
  lastModified?: dayjs.Dayjs | null;
  attachmentFilePath?: string | null;
  documentFile?: string | null;
  documentFileContentType?: string | null;
  fileTampered?: boolean | null;
  documentFileChecksum?: string | null;
  createdBy?: Pick<IApplicationUser, 'id' | 'applicationIdentity'> | null;
  lastModifiedBy?: Pick<IApplicationUser, 'id' | 'applicationIdentity'> | null;
  originatingDepartment?: Pick<IDealer, 'id' | 'dealerName'> | null;
  applicationMappings?: Pick<IUniversallyUniqueMapping, 'id' | 'universalKey'>[] | null;
  placeholders?: Pick<IPlaceholder, 'id' | 'description'>[] | null;
  fileChecksumAlgorithm?: Pick<IAlgorithm, 'id' | 'name'> | null;
  securityClearance?: Pick<ISecurityClearance, 'id' | 'clearanceLevel'> | null;
}

export type NewBusinessDocument = Omit<IBusinessDocument, 'id'> & { id: null };
