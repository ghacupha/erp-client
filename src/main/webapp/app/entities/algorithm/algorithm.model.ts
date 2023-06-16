import { IPlaceholder } from 'app/entities/erpService/placeholder/placeholder.model';
import { IUniversallyUniqueMapping } from 'app/entities/universally-unique-mapping/universally-unique-mapping.model';

export interface IAlgorithm {
  id?: number;
  name?: string;
  placeholders?: IPlaceholder[] | null;
  parameters?: IUniversallyUniqueMapping[] | null;
}

export class Algorithm implements IAlgorithm {
  constructor(
    public id?: number,
    public name?: string,
    public placeholders?: IPlaceholder[] | null,
    public parameters?: IUniversallyUniqueMapping[] | null
  ) {}
}

export function getAlgorithmIdentifier(algorithm: IAlgorithm): number | undefined {
  return algorithm.id;
}
