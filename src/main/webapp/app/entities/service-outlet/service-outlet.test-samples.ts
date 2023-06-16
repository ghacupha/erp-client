import dayjs from 'dayjs/esm';

import { IServiceOutlet, NewServiceOutlet } from './service-outlet.model';

export const sampleWithRequiredData: IServiceOutlet = {
  id: 81660,
  outletCode: 'Senior XSS',
  outletName: 'Specialist',
};

export const sampleWithPartialData: IServiceOutlet = {
  id: 78619,
  outletCode: 'Operations Account',
  outletName: 'Plain services',
  parliamentaryConstituency: 'Togo',
  gpsCoordinates: 'Branding Identity',
  outletClosureDate: dayjs('2022-02-28'),
  licenseFeePayable: 10053,
};

export const sampleWithFullData: IServiceOutlet = {
  id: 69485,
  outletCode: 'Buckinghamshire Team-oriented',
  outletName: 'seamless mint',
  town: 'purple',
  parliamentaryConstituency: 'Passage hack ROI',
  gpsCoordinates: 'transition Investment',
  outletOpeningDate: dayjs('2022-03-01'),
  regulatorApprovalDate: dayjs('2022-03-01'),
  outletClosureDate: dayjs('2022-03-01'),
  dateLastModified: dayjs('2022-02-28'),
  licenseFeePayable: 7227,
};

export const sampleWithNewData: NewServiceOutlet = {
  outletCode: 'Outdoors Personal',
  outletName: 'Representative Tajikistan parse',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
