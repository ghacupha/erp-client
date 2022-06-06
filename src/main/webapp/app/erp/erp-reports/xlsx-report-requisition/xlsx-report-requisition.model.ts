import * as dayjs from 'dayjs';
import { IReportTemplate } from '../report-template/report-template.model';
import { IPlaceholder } from '../../erp-pages/placeholder/placeholder.model';
import { ReportStatusTypes } from '../../erp-common/enumerations/report-status-types.model';

export interface IXlsxReportRequisition {
  id?: number;
  reportName?: string;
  reportDate?: dayjs.Dayjs | null;
  userPassword?: string | null;
  reportStatus?: ReportStatusTypes | null;
  reportId?: string;
  reportTemplate?: IReportTemplate;
  placeholders?: IPlaceholder[] | null;
  reportAttachment?: string | null;
}

export class XlsxReportRequisition implements IXlsxReportRequisition {
  constructor(
    public id?: number,
    public reportName?: string,
    public reportDate?: dayjs.Dayjs | null,
    public userPassword?: string | null,
    public reportStatus?: ReportStatusTypes | null,
    public reportId?: string,
    public reportTemplate?: IReportTemplate,
    public placeholders?: IPlaceholder[] | null,
    public reportAttachment?: string | null
  ) {}
}

export function getXlsxReportRequisitionIdentifier(xlsxReportRequisition: IXlsxReportRequisition): number | undefined {
  return xlsxReportRequisition.id;
}
