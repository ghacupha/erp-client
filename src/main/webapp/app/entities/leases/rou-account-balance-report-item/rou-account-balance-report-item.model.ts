import * as dayjs from 'dayjs';

export interface IRouAccountBalanceReportItem {
  id?: number;
  assetAccountName?: string | null;
  assetAccountNumber?: string | null;
  depreciationAccountNumber?: string | null;
  netBookValue?: number | null;
  fiscalMonthEndDate?: dayjs.Dayjs | null;
}

export class RouAccountBalanceReportItem implements IRouAccountBalanceReportItem {
  constructor(
    public id?: number,
    public assetAccountName?: string | null,
    public assetAccountNumber?: string | null,
    public depreciationAccountNumber?: string | null,
    public netBookValue?: number | null,
    public fiscalMonthEndDate?: dayjs.Dayjs | null
  ) {}
}

export function getRouAccountBalanceReportItemIdentifier(rouAccountBalanceReportItem: IRouAccountBalanceReportItem): number | undefined {
  return rouAccountBalanceReportItem.id;
}
