import * as dayjs from 'dayjs';
import { IPlaceholder } from '../../erp-pages/placeholder/placeholder.model';
import { IUniversallyUniqueMapping } from '../../erp-pages/universally-unique-mapping/universally-unique-mapping.model';
import { IReportStatus } from '../report-status/report-status.model';
import { ISecurityClearance } from '../../erp-common/security-clearance/security-clearance.model';
import { IApplicationUser } from '../../erp-common/application-user/application-user.model';
import { IDealer } from '../../erp-pages/dealers/dealer/dealer.model';
import { ISystemModule } from '../../erp-common/system-module/system-module.model';
import { IReportDesign } from '../report-design/report-design.model';
import { IAlgorithm } from '../../erp-common/algorithm/algorithm.model';

export interface IExcelReportExport {
  id?: number;
  reportName?: string;
  reportPassword?: string;
  reportNotesContentType?: string | null;
  reportNotes?: string | null;
  fileCheckSum?: string | null;
  reportFileContentType?: string | null;
  reportFile?: string | null;
  reportTimeStamp?: dayjs.Dayjs;
  reportId?: string;
  placeholders?: IPlaceholder[] | null;
  parameters?: IUniversallyUniqueMapping[] | null;
  reportStatus?: IReportStatus | null;
  securityClearance?: ISecurityClearance;
  reportCreator?: IApplicationUser;
  organization?: IDealer;
  department?: IDealer;
  systemModule?: ISystemModule;
  reportDesign?: IReportDesign;
  fileCheckSumAlgorithm?: IAlgorithm;
}

export class ExcelReportExport implements IExcelReportExport {
  constructor(
    public id?: number,
    public reportName?: string,
    public reportPassword?: string,
    public reportNotesContentType?: string | null,
    public reportNotes?: string | null,
    public fileCheckSum?: string | null,
    public reportFileContentType?: string | null,
    public reportFile?: string | null,
    public reportTimeStamp?: dayjs.Dayjs,
    public reportId?: string,
    public placeholders?: IPlaceholder[] | null,
    public parameters?: IUniversallyUniqueMapping[] | null,
    public reportStatus?: IReportStatus | null,
    public securityClearance?: ISecurityClearance,
    public reportCreator?: IApplicationUser,
    public organization?: IDealer,
    public department?: IDealer,
    public systemModule?: ISystemModule,
    public reportDesign?: IReportDesign,
    public fileCheckSumAlgorithm?: IAlgorithm
  ) {}
}

export function getExcelReportExportIdentifier(excelReportExport: IExcelReportExport): number | undefined {
  return excelReportExport.id;
}
