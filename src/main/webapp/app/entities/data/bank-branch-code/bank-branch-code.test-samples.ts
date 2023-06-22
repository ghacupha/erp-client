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

import { IBankBranchCode, NewBankBranchCode } from './bank-branch-code.model';

export const sampleWithRequiredData: IBankBranchCode = {
  id: 68336,
  bankName: 'Function-based International',
};

export const sampleWithPartialData: IBankBranchCode = {
  id: 78527,
  bankCode: 'Chair',
  bankName: 'Ports Books',
  branchName: 'Division',
};

export const sampleWithFullData: IBankBranchCode = {
  id: 31539,
  bankCode: 'system heuristic',
  bankName: 'Personal',
  branchCode: 'Orchestrator Unbranded',
  branchName: 'Handmade Towels back',
  notes: 'Practical Latvia',
};

export const sampleWithNewData: NewBankBranchCode = {
  bankName: 'Branding',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
