import { IUniversallyUniqueMapping } from 'app/entities/universally-unique-mapping/universally-unique-mapping.model';
import { ISecurityClearance } from 'app/entities/security-clearance/security-clearance.model';
import { IApplicationUser } from 'app/entities/application-user/application-user.model';
import { IDealer } from 'app/entities/dealers/dealer/dealer.model';
import { IPlaceholder } from 'app/entities/erpService/placeholder/placeholder.model';
import { ISystemModule } from 'app/entities/system-module/system-module.model';
import { IAlgorithm } from 'app/entities/algorithm/algorithm.model';

export interface IReportDesign {
  id: number;
  catalogueNumber?: string | null;
  designation?: string | null;
  description?: string | null;
  notes?: string | null;
  notesContentType?: string | null;
  reportFile?: string | null;
  reportFileContentType?: string | null;
  reportFileChecksum?: string | null;
  parameters?: Pick<IUniversallyUniqueMapping, 'id' | 'mappedValue'>[] | null;
  securityClearance?: Pick<ISecurityClearance, 'id' | 'clearanceLevel'> | null;
  reportDesigner?: Pick<IApplicationUser, 'id' | 'applicationIdentity'> | null;
  organization?: Pick<IDealer, 'id' | 'dealerName'> | null;
  department?: Pick<IDealer, 'id' | 'dealerName'> | null;
  placeholders?: Pick<IPlaceholder, 'id' | 'description'>[] | null;
  systemModule?: Pick<ISystemModule, 'id' | 'moduleName'> | null;
  fileCheckSumAlgorithm?: Pick<IAlgorithm, 'id' | 'name'> | null;
}

export type NewReportDesign = Omit<IReportDesign, 'id'> & { id: null };
