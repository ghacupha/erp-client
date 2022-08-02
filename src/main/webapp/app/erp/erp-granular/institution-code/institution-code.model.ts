import { IPlaceholder } from '../../erp-common/models/placeholder.model';

export interface IInstitutionCode {
  id?: number;
  institutionCode?: string;
  institutionName?: string;
  shortName?: string | null;
  category?: string | null;
  institutionCategory?: string | null;
  placeholders?: IPlaceholder[] | null;
}

export class InstitutionCode implements IInstitutionCode {
  constructor(
    public id?: number,
    public institutionCode?: string,
    public institutionName?: string,
    public shortName?: string | null,
    public category?: string | null,
    public institutionCategory?: string | null,
    public placeholders?: IPlaceholder[] | null
  ) {}
}

export function getInstitutionCodeIdentifier(institutionCode: IInstitutionCode): number | undefined {
  return institutionCode.id;
}
