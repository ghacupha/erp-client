import { ICountyCode, NewCountyCode } from './county-code.model';

export const sampleWithRequiredData: ICountyCode = {
  id: 3983,
  countyCode: 99982,
  countyName: 'Towels',
  subCountyCode: 72083,
  subCountyName: 'Developer Stravenue Uganda',
};

export const sampleWithPartialData: ICountyCode = {
  id: 13188,
  countyCode: 10814,
  countyName: 'Dynamic',
  subCountyCode: 43335,
  subCountyName: 'tan Configuration',
};

export const sampleWithFullData: ICountyCode = {
  id: 49980,
  countyCode: 18258,
  countyName: 'heuristic value-added',
  subCountyCode: 19122,
  subCountyName: 'invoice',
};

export const sampleWithNewData: NewCountyCode = {
  countyCode: 81717,
  countyName: 'matrix XML',
  subCountyCode: 16629,
  subCountyName: 'infomediaries implement up',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
