import * as dayjs from 'dayjs';
import { IReportTemplate } from 'app/entities/report-template/report-template.model';
import { IPlaceholder } from 'app/entities/erpService/placeholder/placeholder.model';
import { ReportStatusTypes } from 'app/entities/enumerations/report-status-types.model';

export interface IPdfReportRequisition {
  id?: number;
  reportName?: string;
  reportDate?: dayjs.Dayjs | null;
  userPassword?: string | null;
  ownerPassword?: string;
  reportStatus?: ReportStatusTypes | null;
  reportId?: string;
  reportTemplate?: IReportTemplate;
  placeholders?: IPlaceholder[] | null;
}

export class PdfReportRequisition implements IPdfReportRequisition {
  constructor(
    public id?: number,
    public reportName?: string,
    public reportDate?: dayjs.Dayjs | null,
    public userPassword?: string | null,
    public ownerPassword?: string,
    public reportStatus?: ReportStatusTypes | null,
    public reportId?: string,
    public reportTemplate?: IReportTemplate,
    public placeholders?: IPlaceholder[] | null
  ) {}
}

export function getPdfReportRequisitionIdentifier(pdfReportRequisition: IPdfReportRequisition): number | undefined {
  return pdfReportRequisition.id;
}
