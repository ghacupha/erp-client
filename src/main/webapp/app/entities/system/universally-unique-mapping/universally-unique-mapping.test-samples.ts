import { IUniversallyUniqueMapping, NewUniversallyUniqueMapping } from './universally-unique-mapping.model';

export const sampleWithRequiredData: IUniversallyUniqueMapping = {
  id: 32019,
  universalKey: 'Fish',
};

export const sampleWithPartialData: IUniversallyUniqueMapping = {
  id: 61311,
  universalKey: 'XML Gorgeous transmitting',
};

export const sampleWithFullData: IUniversallyUniqueMapping = {
  id: 80716,
  universalKey: 'Cambridgeshire',
  mappedValue: 'open Account exploit',
};

export const sampleWithNewData: NewUniversallyUniqueMapping = {
  universalKey: 'Vatu deposit',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
