import { IPlaceholder } from 'app/entities/erpService/placeholder/placeholder.model';

export interface ITaxRule {
  id?: number;
  telcoExciseDuty?: number | null;
  valueAddedTax?: number | null;
  withholdingVAT?: number | null;
  withholdingTaxConsultancy?: number | null;
  withholdingTaxRent?: number | null;
  cateringLevy?: number | null;
  serviceCharge?: number | null;
  withholdingTaxImportedService?: number | null;
  fileUploadToken?: string | null;
  compilationToken?: string | null;
  placeholders?: IPlaceholder[] | null;
}

export class TaxRule implements ITaxRule {
  constructor(
    public id?: number,
    public telcoExciseDuty?: number | null,
    public valueAddedTax?: number | null,
    public withholdingVAT?: number | null,
    public withholdingTaxConsultancy?: number | null,
    public withholdingTaxRent?: number | null,
    public cateringLevy?: number | null,
    public serviceCharge?: number | null,
    public withholdingTaxImportedService?: number | null,
    public fileUploadToken?: string | null,
    public compilationToken?: string | null,
    public placeholders?: IPlaceholder[] | null
  ) {}
}

export function getTaxRuleIdentifier(taxRule: ITaxRule): number | undefined {
  return taxRule.id;
}
