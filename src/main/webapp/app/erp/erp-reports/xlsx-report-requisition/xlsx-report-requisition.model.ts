import * as dayjs from 'dayjs';
import { IReportTemplate } from '../report-template/report-template.model';
import { IPlaceholder } from '../../erp-pages/placeholder/placeholder.model';
import { ReportStatusTypes } from '../../erp-common/enumerations/report-status-types.model';
import { IUniversallyUniqueMapping } from '../../erp-pages/universally-unique-mapping/universally-unique-mapping.model';

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
  reportFileChecksum?: string | null;
  parameters?: IUniversallyUniqueMapping[] | null;
  toString(): string;
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
    public reportAttachment?: string | null,
    public reportFileChecksum?: string | null,
    public parameters?: IUniversallyUniqueMapping[] | null,
  ) {}

  toString(): string {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return `id: ${this.id} name: ${this.reportName} Report: ${this.reportId} Params: ${this.parameters[0].toString()}`;
  }

}


export function getXlsxReportRequisitionIdentifier(xlsxReportRequisition: IXlsxReportRequisition): number | undefined {
  return xlsxReportRequisition.id;
}
