import dayjs from 'dayjs/esm';

import { ContractType } from 'app/entities/enumerations/contract-type.model';
import { ContractStatus } from 'app/entities/enumerations/contract-status.model';

import { IContractMetadata, NewContractMetadata } from './contract-metadata.model';

export const sampleWithRequiredData: IContractMetadata = {
  id: 26550,
  typeOfContract: ContractType['BUSINESS_PARTNER'],
  contractStatus: ContractStatus['TERMINATED'],
  startDate: dayjs('2023-03-21'),
  terminationDate: dayjs('2023-03-21'),
  contractTitle: 'Account Buckinghamshire',
  contractIdentifier: 'a689f963-111f-4613-b6ec-a80821d57c40',
  contractIdentifierShort: 'purple program Buckinghamshire',
};

export const sampleWithPartialData: IContractMetadata = {
  id: 35196,
  typeOfContract: ContractType['CUSTOMER'],
  contractStatus: ContractStatus['UNDER_RENEGOTIATION'],
  startDate: dayjs('2023-03-20'),
  terminationDate: dayjs('2023-03-20'),
  contractTitle: 'Directives Colombian',
  contractIdentifier: 'f3388b5e-9eba-42f5-a712-1a95a4bd069f',
  contractIdentifierShort: 'Rustic',
};

export const sampleWithFullData: IContractMetadata = {
  id: 62051,
  description: 'Factors',
  typeOfContract: ContractType['BUSINESS_PARTNER'],
  contractStatus: ContractStatus['INACTIVE'],
  startDate: dayjs('2023-03-21'),
  terminationDate: dayjs('2023-03-20'),
  commentsAndAttachment: '../fake-data/blob/hipster.txt',
  contractTitle: 'Prairie',
  contractIdentifier: '02c20d38-ddc8-4b4d-99ae-44e658b4a050',
  contractIdentifierShort: 'pixelX',
};

export const sampleWithNewData: NewContractMetadata = {
  typeOfContract: ContractType['STAFF'],
  contractStatus: ContractStatus['TERMINATED'],
  startDate: dayjs('2023-03-20'),
  terminationDate: dayjs('2023-03-21'),
  contractTitle: 'open Guinea open-source',
  contractIdentifier: 'abd95f79-31c6-4450-9101-5fed5cbcf373',
  contractIdentifierShort: 'zero reboot',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
