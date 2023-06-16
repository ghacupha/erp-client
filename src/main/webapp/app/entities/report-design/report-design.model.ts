import { IUniversallyUniqueMapping } from 'app/entities/universally-unique-mapping/universally-unique-mapping.model';
import { ISecurityClearance } from 'app/entities/security-clearance/security-clearance.model';
import { IApplicationUser } from 'app/entities/application-user/application-user.model';
import { IDealer } from 'app/entities/dealers/dealer/dealer.model';
import { IPlaceholder } from 'app/entities/erpService/placeholder/placeholder.model';
import { ISystemModule } from 'app/entities/system-module/system-module.model';
import { IAlgorithm } from 'app/entities/algorithm/algorithm.model';

export interface IReportDesign {
  id?: number;
  catalogueNumber?: string;
  designation?: string;
  description?: string | null;
  notesContentType?: string | null;
  notes?: string | null;
  reportFileContentType?: string | null;
  reportFile?: string | null;
  reportFileChecksum?: string | null;
  parameters?: IUniversallyUniqueMapping[] | null;
  securityClearance?: ISecurityClearance;
  reportDesigner?: IApplicationUser;
  organization?: IDealer;
  department?: IDealer;
  placeholders?: IPlaceholder[] | null;
  systemModule?: ISystemModule;
  fileCheckSumAlgorithm?: IAlgorithm;
}

export class ReportDesign implements IReportDesign {
  constructor(
    public id?: number,
    public catalogueNumber?: string,
    public designation?: string,
    public description?: string | null,
    public notesContentType?: string | null,
    public notes?: string | null,
    public reportFileContentType?: string | null,
    public reportFile?: string | null,
    public reportFileChecksum?: string | null,
    public parameters?: IUniversallyUniqueMapping[] | null,
    public securityClearance?: ISecurityClearance,
    public reportDesigner?: IApplicationUser,
    public organization?: IDealer,
    public department?: IDealer,
    public placeholders?: IPlaceholder[] | null,
    public systemModule?: ISystemModule,
    public fileCheckSumAlgorithm?: IAlgorithm
  ) {}
}

export function getReportDesignIdentifier(reportDesign: IReportDesign): number | undefined {
  return reportDesign.id;
}
