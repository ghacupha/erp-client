import { IUniversallyUniqueMapping } from '../../erp-pages/universally-unique-mapping/universally-unique-mapping.model';
import { ISecurityClearance } from '../../erp-common/security-clearance/security-clearance.model';
import { IApplicationUser } from '../../erp-common/application-user/application-user.model';
import { IDealer } from '../../erp-common/models/dealer.model';
import { IPlaceholder } from '../../erp-pages/placeholder/placeholder.model';
import { ISystemModule } from '../../erp-common/system-module/system-module.model';

export interface IReportDesign {
  id?: number;
  catalogueNumber?: string;
  designation?: string;
  description?: string | null;
  notesContentType?: string | null;
  notes?: string | null;
  reportFileContentType?: string;
  reportFile?: string;
  parameters?: IUniversallyUniqueMapping[] | null;
  securityClearance?: ISecurityClearance;
  reportDesigner?: IApplicationUser;
  organization?: IDealer;
  department?: IDealer;
  placeholders?: IPlaceholder[] | null;
  systemModule?: ISystemModule;
}

export class ReportDesign implements IReportDesign {
  constructor(
    public id?: number,
    public catalogueNumber?: string,
    public designation?: string,
    public description?: string | null,
    public notesContentType?: string | null,
    public notes?: string | null,
    public reportFileContentType?: string,
    public reportFile?: string,
    public parameters?: IUniversallyUniqueMapping[] | null,
    public securityClearance?: ISecurityClearance,
    public reportDesigner?: IApplicationUser,
    public organization?: IDealer,
    public department?: IDealer,
    public placeholders?: IPlaceholder[] | null,
    public systemModule?: ISystemModule
  ) {}
}

export function getReportDesignIdentifier(reportDesign: IReportDesign): number | undefined {
  return reportDesign.id;
}
