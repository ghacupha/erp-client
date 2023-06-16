import { IApplicationUser, NewApplicationUser } from './application-user.model';

export const sampleWithRequiredData: IApplicationUser = {
  id: 60827,
  designation: '2fdd81a4-bcf6-425c-9803-fcc9b5d863a3',
  applicationIdentity: 'Marketing Mobility',
};

export const sampleWithPartialData: IApplicationUser = {
  id: 71040,
  designation: '61c582a2-e2ff-450f-92cb-096a72d4e622',
  applicationIdentity: 'protocol',
};

export const sampleWithFullData: IApplicationUser = {
  id: 70614,
  designation: '1b1ce907-d201-4b7d-95a0-828f63c8f45d',
  applicationIdentity: 'facilitate Radial',
};

export const sampleWithNewData: NewApplicationUser = {
  designation: '2ea3648e-2eb6-49de-b690-8bd276ee3340',
  applicationIdentity: 'Marketing Metal Comoro',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
