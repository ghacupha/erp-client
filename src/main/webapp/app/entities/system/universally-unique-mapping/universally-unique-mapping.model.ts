export interface IUniversallyUniqueMapping {
  id: number;
  universalKey?: string | null;
  mappedValue?: string | null;
}

export type NewUniversallyUniqueMapping = Omit<IUniversallyUniqueMapping, 'id'> & { id: null };
