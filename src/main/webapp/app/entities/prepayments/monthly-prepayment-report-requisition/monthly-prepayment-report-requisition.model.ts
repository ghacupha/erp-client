import { IFiscalYear } from 'app/entities/system/fiscal-year/fiscal-year.model';

export interface IMonthlyPrepaymentReportRequisition {
  id?: number;
  fiscalYear?: IFiscalYear;
}

export class MonthlyPrepaymentReportRequisition implements IMonthlyPrepaymentReportRequisition {
  constructor(public id?: number, public fiscalYear?: IFiscalYear) {}
}

export function getMonthlyPrepaymentReportRequisitionIdentifier(
  monthlyPrepaymentReportRequisition: IMonthlyPrepaymentReportRequisition
): number | undefined {
  return monthlyPrepaymentReportRequisition.id;
}
