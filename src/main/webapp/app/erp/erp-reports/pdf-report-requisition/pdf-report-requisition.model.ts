import * as dayjs from 'dayjs';
import { IReportTemplate } from '../report-template/report-template.model';
import { IPlaceholder } from '../../erp-pages/placeholder/placeholder.model';
import { ReportStatusTypes } from '../../erp-common/enumerations/report-status-types.model';
import { IUniversallyUniqueMapping } from '../../erp-pages/universally-unique-mapping/universally-unique-mapping.model';

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
  reportAttachment?: string | null;
  reportFileChecksum?: string | null;
  parameters?: IUniversallyUniqueMapping[] | null;
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
    public placeholders?: IPlaceholder[] | null,
    public reportAttachment?: string | null,
    public reportFileChecksum?: string | null,
    public parameters?: IUniversallyUniqueMapping[] | null,
  ) {}
}

export function getPdfReportRequisitionIdentifier(pdfReportRequisition: IPdfReportRequisition): number | undefined {
  return pdfReportRequisition.id;
}
