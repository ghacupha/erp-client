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

import { ISettlementCurrency, NewSettlementCurrency } from './settlement-currency.model';

export const sampleWithRequiredData: ISettlementCurrency = {
  id: 85808,
  iso4217CurrencyCode: 'blu',
  currencyName: 'Argentine Peso',
  country: 'Papua New Guinea',
};

export const sampleWithPartialData: ISettlementCurrency = {
  id: 54952,
  iso4217CurrencyCode: 'Chi',
  currencyName: 'Uganda Shilling',
  country: 'Paraguay',
  fileUploadToken: 'Caicos Islands connecting',
  compilationToken: 'Gloves Books',
};

export const sampleWithFullData: ISettlementCurrency = {
  id: 43214,
  iso4217CurrencyCode: 'str',
  currencyName: 'Rupiah',
  country: 'Bangladesh',
  numericCode: 'Cheese Silver',
  minorUnit: 'Small magenta',
  fileUploadToken: 'channels Paradigm',
  compilationToken: 'interfaces',
};

export const sampleWithNewData: NewSettlementCurrency = {
  iso4217CurrencyCode: 'Hai',
  currencyName: 'Libyan Dinar',
  country: 'France',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
