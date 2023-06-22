///
/// Erp System - Mark IV No 1 (David Series) Client 1.4.0
/// Copyright © 2021 - 2023 Edwin Njeru (mailnjeru@gmail.com)
///
/// This program is free software: you can redistribute it and/or modify
/// it under the terms of the GNU General Public License as published by
/// the Free Software Foundation, either version 3 of the License, or
/// (at your option) any later version.
///
/// This program is distributed in the hope that it will be useful,
/// but WITHOUT ANY WARRANTY; without even the implied warranty of
/// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
/// GNU General Public License for more details.
///
/// You should have received a copy of the GNU General Public License
/// along with this program. If not, see <http://www.gnu.org/licenses/>.
///

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
