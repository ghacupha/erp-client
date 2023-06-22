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

import dayjs from 'dayjs/esm';

import { IAmortizationSequence, NewAmortizationSequence } from './amortization-sequence.model';

export const sampleWithRequiredData: IAmortizationSequence = {
  id: 2813,
  prepaymentAccountGuid: '43bdd746-e9d2-4617-9a3b-e0079db09903',
  recurrenceGuid: 'f76edc14-142c-4458-a341-615fbbde50a2',
  sequenceNumber: 71079,
  currentAmortizationDate: dayjs('2022-08-01'),
  isCommencementSequence: false,
  isTerminalSequence: true,
  amortizationAmount: 45972,
  sequenceGuid: '2fe9b1d1-669f-4e31-9f50-0aee0c2432c0',
};

export const sampleWithPartialData: IAmortizationSequence = {
  id: 93715,
  prepaymentAccountGuid: '81bc0b37-57cc-4c45-abb6-012949c948e9',
  recurrenceGuid: 'b9462703-c393-4004-ae0e-f817bddd90ba',
  sequenceNumber: 32547,
  particulars: 'Gorgeous e-business Factors',
  currentAmortizationDate: dayjs('2022-08-02'),
  previousAmortizationDate: dayjs('2022-08-01'),
  isCommencementSequence: false,
  isTerminalSequence: false,
  amortizationAmount: 10275,
  sequenceGuid: '4bb672b7-b8a6-4a1d-a756-15d02e54cb95',
};

export const sampleWithFullData: IAmortizationSequence = {
  id: 74080,
  prepaymentAccountGuid: '7046cd1c-0ef4-4ca3-9340-bac6722732cb',
  recurrenceGuid: '6af41f8e-1538-4400-83c8-544dcc1ece56',
  sequenceNumber: 55821,
  particulars: 'navigating',
  currentAmortizationDate: dayjs('2022-08-01'),
  previousAmortizationDate: dayjs('2022-08-02'),
  nextAmortizationDate: dayjs('2022-08-01'),
  isCommencementSequence: false,
  isTerminalSequence: false,
  amortizationAmount: 45358,
  sequenceGuid: '324441d9-dffb-4898-9c9e-2ece7a247053',
};

export const sampleWithNewData: NewAmortizationSequence = {
  prepaymentAccountGuid: '7915fa6b-b756-475e-b2c8-c7cfca7cdf5b',
  recurrenceGuid: '6ac147be-d58f-4783-a172-583d654430f3',
  sequenceNumber: 39530,
  currentAmortizationDate: dayjs('2022-08-02'),
  isCommencementSequence: true,
  isTerminalSequence: true,
  amortizationAmount: 75480,
  sequenceGuid: '369a4b0f-04f1-4f9b-96d7-761cbeea1c59',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
