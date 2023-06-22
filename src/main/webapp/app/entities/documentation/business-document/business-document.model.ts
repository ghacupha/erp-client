import dayjs from 'dayjs/esm';
import { IApplicationUser } from 'app/entities/people/application-user/application-user.model';
import { IDealer } from 'app/entities/people/dealer/dealer.model';
import { IUniversallyUniqueMapping } from 'app/entities/system/universally-unique-mapping/universally-unique-mapping.model';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { IAlgorithm } from 'app/entities/system/algorithm/algorithm.model';
import { ISecurityClearance } from 'app/entities/people/security-clearance/security-clearance.model';

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
