import * as dayjs from 'dayjs';
import { IPlaceholder } from '../placeholder/placeholder.model';
import { IApplicationUser } from '../application-user/application-user.model';
import { IUniversallyUniqueMapping } from '../universally-unique-mapping/universally-unique-mapping.model';
import { IDealer } from '../dealers/dealer/dealer.model';

export interface IBusinessDocument {
  id?: number;
  documentTitle?: string;
  description?: string | null;
  documentSerial?: string;
  lastModified?: dayjs.Dayjs | null;
  attachmentFilePath?: string;
  createdBy?: IApplicationUser;
  lastModifiedBy?: IApplicationUser | null;
  originatingDepartment?: IDealer;
  applicationMappings?: IUniversallyUniqueMapping[] | null;
  placeholders?: IPlaceholder[] | null;
}

export class BusinessDocument implements IBusinessDocument {
  constructor(
    public id?: number,
    public documentTitle?: string,
    public description?: string | null,
    public documentSerial?: string,
    public lastModified?: dayjs.Dayjs | null,
    public attachmentFilePath?: string,
    public createdBy?: IApplicationUser,
    public lastModifiedBy?: IApplicationUser | null,
    public originatingDepartment?: IDealer,
    public applicationMappings?: IUniversallyUniqueMapping[] | null,
    public placeholders?: IPlaceholder[] | null
  ) {}
}

export function getBusinessDocumentIdentifier(businessDocument: IBusinessDocument): number | undefined {
  return businessDocument.id;
}
