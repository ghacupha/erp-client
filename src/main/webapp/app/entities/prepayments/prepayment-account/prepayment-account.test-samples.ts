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

import { IPrepaymentAccount, NewPrepaymentAccount } from './prepayment-account.model';

export const sampleWithRequiredData: IPrepaymentAccount = {
  id: 7037,
  catalogueNumber: 'invoice National deposit',
  particulars: 'utilize RSS',
};

export const sampleWithPartialData: IPrepaymentAccount = {
  id: 60801,
  catalogueNumber: 'bandwidth-monitored Gorgeous Operations',
  particulars: 'input',
  notes: '../fake-data/blob/hipster.txt',
  prepaymentAmount: 17244,
  prepaymentGuid: 'a64c7958-e243-4501-9b55-14de9e334127',
};

export const sampleWithFullData: IPrepaymentAccount = {
  id: 67140,
  catalogueNumber: 'SAS lime',
  particulars: 'Savings solutions state',
  notes: '../fake-data/blob/hipster.txt',
  prepaymentAmount: 61626,
  prepaymentGuid: '7c7f39dd-c16f-4da7-b29c-024ee15867cf',
};

export const sampleWithNewData: NewPrepaymentAccount = {
  catalogueNumber: 'Chair Dynamic transmitting',
  particulars: 'Card',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
