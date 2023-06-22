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

import { ITransactionAccount, NewTransactionAccount } from './transaction-account.model';

export const sampleWithRequiredData: ITransactionAccount = {
  id: 71775,
  accountNumber: 'orchestrate Orchestrator',
  accountName: 'Home Loan Account',
};

export const sampleWithPartialData: ITransactionAccount = {
  id: 14795,
  accountNumber: 'back-end',
  accountName: 'Money Market Account',
};

export const sampleWithFullData: ITransactionAccount = {
  id: 86036,
  accountNumber: 'infrastructures Metrics Developer',
  accountName: 'Home Loan Account',
  notes: '../fake-data/blob/hipster.png',
  notesContentType: 'unknown',
};

export const sampleWithNewData: NewTransactionAccount = {
  accountNumber: 'bandwidth Pike deposit',
  accountName: 'Money Market Account',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
