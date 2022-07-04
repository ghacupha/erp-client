import { IDealer } from 'app/entities/dealers/dealer/dealer.model';
import { ISettlementCurrency } from 'app/entities/settlement-currency/settlement-currency.model';
import { IPlaceholder } from 'app/entities/erpService/placeholder/placeholder.model';

export interface IWorkProjectRegister {
  id?: number;
  catalogueNumber?: string;
  description?: string;
  detailsContentType?: string | null;
  details?: string | null;
  totalProjectCost?: number | null;
  additionalNotesContentType?: string | null;
  additionalNotes?: string | null;
  dealers?: IDealer[];
  settlementCurrency?: ISettlementCurrency | null;
  placeholders?: IPlaceholder[] | null;
}

export class WorkProjectRegister implements IWorkProjectRegister {
  constructor(
    public id?: number,
    public catalogueNumber?: string,
    public description?: string,
    public detailsContentType?: string | null,
    public details?: string | null,
    public totalProjectCost?: number | null,
    public additionalNotesContentType?: string | null,
    public additionalNotes?: string | null,
    public dealers?: IDealer[],
    public settlementCurrency?: ISettlementCurrency | null,
    public placeholders?: IPlaceholder[] | null
  ) {}
}

export function getWorkProjectRegisterIdentifier(workProjectRegister: IWorkProjectRegister): number | undefined {
  return workProjectRegister.id;
}
