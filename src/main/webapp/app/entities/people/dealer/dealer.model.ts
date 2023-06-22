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

import { IPaymentLabel } from 'app/entities/settlement/payment-label/payment-label.model';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';

export interface IDealer {
  id: number;
  dealerName?: string | null;
  taxNumber?: string | null;
  identificationDocumentNumber?: string | null;
  organizationName?: string | null;
  department?: string | null;
  position?: string | null;
  postalAddress?: string | null;
  physicalAddress?: string | null;
  accountName?: string | null;
  accountNumber?: string | null;
  bankersName?: string | null;
  bankersBranch?: string | null;
  bankersSwiftCode?: string | null;
  fileUploadToken?: string | null;
  compilationToken?: string | null;
  remarks?: string | null;
  otherNames?: string | null;
  paymentLabels?: Pick<IPaymentLabel, 'id' | 'description'>[] | null;
  dealerGroup?: Pick<IDealer, 'id' | 'dealerName'> | null;
  placeholders?: Pick<IPlaceholder, 'id'>[] | null;
}

export type NewDealer = Omit<IDealer, 'id'> & { id: null };
