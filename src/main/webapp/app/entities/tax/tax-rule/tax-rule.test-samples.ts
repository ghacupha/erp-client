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

import { ITaxRule, NewTaxRule } from './tax-rule.model';

export const sampleWithRequiredData: ITaxRule = {
  id: 25321,
};

export const sampleWithPartialData: ITaxRule = {
  id: 61136,
  telcoExciseDuty: 21396,
  valueAddedTax: 88221,
  withholdingVAT: 63139,
  withholdingTaxConsultancy: 92919,
  withholdingTaxImportedService: 76705,
  compilationToken: 'evolve',
};

export const sampleWithFullData: ITaxRule = {
  id: 26077,
  telcoExciseDuty: 31483,
  valueAddedTax: 98075,
  withholdingVAT: 38343,
  withholdingTaxConsultancy: 83432,
  withholdingTaxRent: 789,
  cateringLevy: 89213,
  serviceCharge: 18890,
  withholdingTaxImportedService: 45761,
  fileUploadToken: 'Savings',
  compilationToken: 'Texas',
};

export const sampleWithNewData: NewTaxRule = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
