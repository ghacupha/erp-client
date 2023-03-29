import * as dayjs from 'dayjs';
import { IPlaceholder } from '../../erp-pages/placeholder/placeholder.model';
import { ISettlementCurrency } from '../../erp-settlements/settlement-currency/settlement-currency.model';
import { IBusinessDocument } from '../../erp-pages/business-document/business-document.model';
import { ITransactionAccount } from '../../erp-accounts/transaction-account/transaction-account.model';
import { ISecurityClearance } from '../../erp-pages/security-clearance/security-clearance.model';
import { IUniversallyUniqueMapping } from '../../erp-pages/universally-unique-mapping/universally-unique-mapping.model';
import { ILeaseContract } from '../lease-contract/lease-contract.model';

export interface ILeaseModelMetadata {
  id?: number;
  modelTitle?: string;
  modelVersion?: number;
  description?: string | null;
  modelNotesContentType?: string | null;
  modelNotes?: string | null;
  annualDiscountingRate?: number;
  commencementDate?: dayjs.Dayjs;
  terminalDate?: dayjs.Dayjs;
  totalReportingPeriods?: number | null;
  reportingPeriodsPerYear?: number | null;
  settlementPeriodsPerYear?: number | null;
  initialLiabilityAmount?: number | null;
  initialROUAmount?: number | null;
  totalDepreciationPeriods?: number | null;
  placeholders?: IPlaceholder[] | null;
  leaseMappings?: IUniversallyUniqueMapping[] | null;
  leaseContract?: ILeaseContract;
  predecessor?: ILeaseModelMetadata | null;
  liabilityCurrency?: ISettlementCurrency;
  rouAssetCurrency?: ISettlementCurrency;
  modelAttachments?: IBusinessDocument | null;
  securityClearance?: ISecurityClearance | null;
  leaseLiabilityAccount?: ITransactionAccount | null;
  interestPayableAccount?: ITransactionAccount | null;
  interestExpenseAccount?: ITransactionAccount | null;
  rouAssetAccount?: ITransactionAccount | null;
  rouDepreciationAccount?: ITransactionAccount | null;
  accruedDepreciationAccount?: ITransactionAccount | null;
}

export class LeaseModelMetadata implements ILeaseModelMetadata {
  constructor(
    public id?: number,
    public modelTitle?: string,
    public modelVersion?: number,
    public description?: string | null,
    public modelNotesContentType?: string | null,
    public modelNotes?: string | null,
    public annualDiscountingRate?: number,
    public commencementDate?: dayjs.Dayjs,
    public terminalDate?: dayjs.Dayjs,
    public totalReportingPeriods?: number | null,
    public reportingPeriodsPerYear?: number | null,
    public settlementPeriodsPerYear?: number | null,
    public initialLiabilityAmount?: number | null,
    public initialROUAmount?: number | null,
    public totalDepreciationPeriods?: number | null,
    public placeholders?: IPlaceholder[] | null,
    public leaseMappings?: IUniversallyUniqueMapping[] | null,
    public leaseContract?: ILeaseContract,
    public predecessor?: ILeaseModelMetadata | null,
    public liabilityCurrency?: ISettlementCurrency,
    public rouAssetCurrency?: ISettlementCurrency,
    public modelAttachments?: IBusinessDocument | null,
    public securityClearance?: ISecurityClearance | null,
    public leaseLiabilityAccount?: ITransactionAccount | null,
    public interestPayableAccount?: ITransactionAccount | null,
    public interestExpenseAccount?: ITransactionAccount | null,
    public rouAssetAccount?: ITransactionAccount | null,
    public rouDepreciationAccount?: ITransactionAccount | null,
    public accruedDepreciationAccount?: ITransactionAccount | null
  ) {}
}

export function getLeaseModelMetadataIdentifier(leaseModelMetadata: ILeaseModelMetadata): number | undefined {
  return leaseModelMetadata.id;
}