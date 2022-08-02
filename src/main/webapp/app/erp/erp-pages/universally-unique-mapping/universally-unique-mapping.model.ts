export interface IUniversallyUniqueMapping {
  id?: number;
  universalKey?: string;
  mappedValue?: string | null;
  toString(): string;
}

export class UniversallyUniqueMapping implements IUniversallyUniqueMapping {
  constructor(public id?: number, public universalKey?: string, public mappedValue?: string | null) {}

  toString(): string {
    return `Key: ${this.universalKey} Mapped Val: ${this.mappedValue}`;
  }
}

export function getUniversallyUniqueMappingIdentifier(universallyUniqueMapping: IUniversallyUniqueMapping): number | undefined {
  return universallyUniqueMapping.id;
}
