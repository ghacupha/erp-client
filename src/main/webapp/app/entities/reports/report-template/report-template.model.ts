import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';

export interface IReportTemplate {
  id: number;
  catalogueNumber?: string | null;
  description?: string | null;
  notes?: string | null;
  notesContentType?: string | null;
  reportFile?: string | null;
  reportFileContentType?: string | null;
  compileReportFile?: string | null;
  compileReportFileContentType?: string | null;
  placeholders?: Pick<IPlaceholder, 'id' | 'description'>[] | null;
}

export type NewReportTemplate = Omit<IReportTemplate, 'id'> & { id: null };
