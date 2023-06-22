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

import { IPurchaseOrder, NewPurchaseOrder } from './purchase-order.model';

export const sampleWithRequiredData: IPurchaseOrder = {
  id: 1775,
  purchaseOrderNumber: 'orchid violet',
};

export const sampleWithPartialData: IPurchaseOrder = {
  id: 59739,
  purchaseOrderNumber: 'lime',
  purchaseOrderDate: dayjs('2022-02-02'),
  compilationToken: 'Freeway Bedfordshire',
};

export const sampleWithFullData: IPurchaseOrder = {
  id: 60703,
  purchaseOrderNumber: 'programming synthesize',
  purchaseOrderDate: dayjs('2022-02-02'),
  purchaseOrderAmount: 26356,
  description: 'Soft Franc Wooden',
  notes: 'neural Greece',
  fileUploadToken: 'hack',
  compilationToken: 'bluetooth Regional Assurance',
  remarks: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewPurchaseOrder = {
  purchaseOrderNumber: 'Lead real-time',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
