import dayjs from 'dayjs/esm';
import { IPlaceholder } from 'app/entities/erpService/placeholder/placeholder.model';
import { IUniversallyUniqueMapping } from 'app/entities/universally-unique-mapping/universally-unique-mapping.model';
import { IReportTemplate } from 'app/entities/report-template/report-template.model';
import { IReportContentType } from 'app/entities/report-content-type/report-content-type.model';
import { ReportStatusTypes } from 'app/entities/enumerations/report-status-types.model';

export interface IReportRequisition {
  id: number;
  reportName?: string | null;
  reportRequestTime?: dayjs.Dayjs | null;
  reportPassword?: string | null;
  reportStatus?: ReportStatusTypes | null;
  reportId?: string | null;
  reportFileAttachment?: string | null;
  reportFileAttachmentContentType?: string | null;
  reportFileCheckSum?: string | null;
  reportNotes?: string | null;
  reportNotesContentType?: string | null;
  placeholders?: Pick<IPlaceholder, 'id' | 'description'>[] | null;
  parameters?: Pick<IUniversallyUniqueMapping, 'id' | 'mappedValue'>[] | null;
  reportTemplate?: Pick<IReportTemplate, 'id' | 'catalogueNumber'> | null;
  reportContentType?: Pick<IReportContentType, 'id' | 'reportTypeName'> | null;
}

export type NewReportRequisition = Omit<IReportRequisition, 'id'> & { id: null };
