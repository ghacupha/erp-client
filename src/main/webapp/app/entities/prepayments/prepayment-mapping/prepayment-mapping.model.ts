import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';

export interface IPrepaymentMapping {
  id: number;
  parameterKey?: string | null;
  parameterGuid?: string | null;
  parameter?: string | null;
  placeholders?: Pick<IPlaceholder, 'id' | 'description'>[] | null;
}

export type NewPrepaymentMapping = Omit<IPrepaymentMapping, 'id'> & { id: null };
