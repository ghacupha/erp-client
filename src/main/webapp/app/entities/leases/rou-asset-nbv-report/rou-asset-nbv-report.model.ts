import * as dayjs from 'dayjs';
import { IFiscalMonth } from 'app/entities/system/fiscal-month/fiscal-month.model';
import { IApplicationUser } from 'app/entities/people/application-user/application-user.model';

export interface IRouAssetNBVReport {
  id?: number;
  requestId?: string;
  timeOfRequest?: dayjs.Dayjs | null;
  reportIsCompiled?: boolean | null;
  fileChecksum?: string | null;
  tampered?: boolean | null;
  filename?: string | null;
  reportParameters?: string | null;
  reportFileContentType?: string | null;
  reportFile?: string | null;
  fiscalReportingMonth?: IFiscalMonth;
  requestedBy?: IApplicationUser | null;
}

export class RouAssetNBVReport implements IRouAssetNBVReport {
  constructor(
    public id?: number,
    public requestId?: string,
    public timeOfRequest?: dayjs.Dayjs | null,
    public reportIsCompiled?: boolean | null,
    public fileChecksum?: string | null,
    public tampered?: boolean | null,
    public filename?: string | null,
    public reportParameters?: string | null,
    public reportFileContentType?: string | null,
    public reportFile?: string | null,
    public fiscalReportingMonth?: IFiscalMonth,
    public requestedBy?: IApplicationUser | null
  ) {
    this.reportIsCompiled = this.reportIsCompiled ?? false;
    this.tampered = this.tampered ?? false;
  }
}

export function getRouAssetNBVReportIdentifier(rouAssetNBVReport: IRouAssetNBVReport): number | undefined {
  return rouAssetNBVReport.id;
}
