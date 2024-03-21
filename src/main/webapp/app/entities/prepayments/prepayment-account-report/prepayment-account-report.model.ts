export interface IPrepaymentAccountReport {
  id?: number;
  prepaymentAccount?: string | null;
  prepaymentAmount?: number | null;
  amortisedAmount?: number | null;
  outstandingAmount?: number | null;
  numberOfPrepaymentAccounts?: number | null;
  numberOfAmortisedItems?: number | null;
}

export class PrepaymentAccountReport implements IPrepaymentAccountReport {
  constructor(
    public id?: number,
    public prepaymentAccount?: string | null,
    public prepaymentAmount?: number | null,
    public amortisedAmount?: number | null,
    public outstandingAmount?: number | null,
    public numberOfPrepaymentAccounts?: number | null,
    public numberOfAmortisedItems?: number | null
  ) {}
}

export function getPrepaymentAccountReportIdentifier(prepaymentAccountReport: IPrepaymentAccountReport): number | undefined {
  return prepaymentAccountReport.id;
}
