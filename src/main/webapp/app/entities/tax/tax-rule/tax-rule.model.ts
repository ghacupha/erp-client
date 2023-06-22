import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';

export interface ITaxRule {
  id: number;
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
  placeholders?: Pick<IPlaceholder, 'id' | 'description'>[] | null;
}

export type NewTaxRule = Omit<ITaxRule, 'id'> & { id: null };
