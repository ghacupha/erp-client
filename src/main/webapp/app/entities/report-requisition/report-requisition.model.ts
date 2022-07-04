import * as dayjs from 'dayjs';
import { IPlaceholder } from 'app/entities/erpService/placeholder/placeholder.model';
import { IUniversallyUniqueMapping } from 'app/entities/universally-unique-mapping/universally-unique-mapping.model';
import { IReportTemplate } from 'app/entities/report-template/report-template.model';
import { IReportContentType } from 'app/entities/report-content-type/report-content-type.model';
import { ReportStatusTypes } from 'app/entities/enumerations/report-status-types.model';

export interface IReportRequisition {
  id?: number;
  reportName?: string;
  reportRequestTime?: dayjs.Dayjs;
  reportPassword?: string;
  reportStatus?: ReportStatusTypes | null;
  reportId?: string;
  reportFileAttachmentContentType?: string | null;
  reportFileAttachment?: string | null;
  reportFileCheckSum?: string | null;
  reportNotesContentType?: string | null;
  reportNotes?: string | null;
  placeholders?: IPlaceholder[] | null;
  parameters?: IUniversallyUniqueMapping[] | null;
  reportTemplate?: IReportTemplate;
  reportContentType?: IReportContentType;
}

export class ReportRequisition implements IReportRequisition {
  constructor(
    public id?: number,
    public reportName?: string,
    public reportRequestTime?: dayjs.Dayjs,
    public reportPassword?: string,
    public reportStatus?: ReportStatusTypes | null,
    public reportId?: string,
    public reportFileAttachmentContentType?: string | null,
    public reportFileAttachment?: string | null,
    public reportFileCheckSum?: string | null,
    public reportNotesContentType?: string | null,
    public reportNotes?: string | null,
    public placeholders?: IPlaceholder[] | null,
    public parameters?: IUniversallyUniqueMapping[] | null,
    public reportTemplate?: IReportTemplate,
    public reportContentType?: IReportContentType
  ) {}
}

export function getReportRequisitionIdentifier(reportRequisition: IReportRequisition): number | undefined {
  return reportRequisition.id;
}
