export interface IUniversallyUniqueMapping {
  id?: number;
  universalKey?: string;
  mappedValue?: string | null;
}

export class UniversallyUniqueMapping implements IUniversallyUniqueMapping {
  constructor(public id?: number, public universalKey?: string, public mappedValue?: string | null) {}
}

export function getUniversallyUniqueMappingIdentifier(universallyUniqueMapping: IUniversallyUniqueMapping): number | undefined {
  return universallyUniqueMapping.id;
}
