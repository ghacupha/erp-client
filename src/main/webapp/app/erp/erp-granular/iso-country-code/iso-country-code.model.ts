import { IPlaceholder } from '../../erp-common/models/placeholder.model';

export interface IIsoCountryCode {
  id?: number;
  countryCode?: string | null;
  countryDescription?: string | null;
  placeholders?: IPlaceholder[] | null;
}

export class IsoCountryCode implements IIsoCountryCode {
  constructor(
    public id?: number,
    public countryCode?: string | null,
    public countryDescription?: string | null,
    public placeholders?: IPlaceholder[] | null
  ) {}
}

export function getIsoCountryCodeIdentifier(isoCountryCode: IIsoCountryCode): number | undefined {
  return isoCountryCode.id;
}
