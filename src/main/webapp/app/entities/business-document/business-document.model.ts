import * as dayjs from 'dayjs';
import { IApplicationUser } from 'app/entities/application-user/application-user.model';
import { IDealer } from 'app/entities/dealers/dealer/dealer.model';
import { IUniversallyUniqueMapping } from 'app/entities/universally-unique-mapping/universally-unique-mapping.model';
import { IPlaceholder } from 'app/entities/erpService/placeholder/placeholder.model';
import { IAlgorithm } from 'app/entities/algorithm/algorithm.model';
import { ISecurityClearance } from 'app/entities/security-clearance/security-clearance.model';

export interface IBusinessDocument {
  id?: number;
  documentTitle?: string;
  description?: string | null;
  documentSerial?: string;
  lastModified?: dayjs.Dayjs | null;
  attachmentFilePath?: string;
  documentFileContentType?: string;
  documentFile?: string;
  fileTampered?: boolean | null;
  documentFileChecksum?: string;
  createdBy?: IApplicationUser;
  lastModifiedBy?: IApplicationUser | null;
  originatingDepartment?: IDealer;
  applicationMappings?: IUniversallyUniqueMapping[] | null;
  placeholders?: IPlaceholder[] | null;
  fileChecksumAlgorithm?: IAlgorithm;
  securityClearance?: ISecurityClearance;
}

export class BusinessDocument implements IBusinessDocument {
  constructor(
    public id?: number,
    public documentTitle?: string,
    public description?: string | null,
    public documentSerial?: string,
    public lastModified?: dayjs.Dayjs | null,
    public attachmentFilePath?: string,
    public documentFileContentType?: string,
    public documentFile?: string,
    public fileTampered?: boolean | null,
    public documentFileChecksum?: string,
    public createdBy?: IApplicationUser,
    public lastModifiedBy?: IApplicationUser | null,
    public originatingDepartment?: IDealer,
    public applicationMappings?: IUniversallyUniqueMapping[] | null,
    public placeholders?: IPlaceholder[] | null,
    public fileChecksumAlgorithm?: IAlgorithm,
    public securityClearance?: ISecurityClearance
  ) {
    this.fileTampered = this.fileTampered ?? false;
  }
}

export function getBusinessDocumentIdentifier(businessDocument: IBusinessDocument): number | undefined {
  return businessDocument.id;
}
