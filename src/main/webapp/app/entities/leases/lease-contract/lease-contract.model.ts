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
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { IUniversallyUniqueMapping } from 'app/entities/system/universally-unique-mapping/universally-unique-mapping.model';
import { IBusinessDocument } from 'app/entities/documentation/business-document/business-document.model';
import { IContractMetadata } from 'app/entities/contract/contract-metadata/contract-metadata.model';

export interface ILeaseContract {
  id: number;
  bookingId?: string | null;
  leaseTitle?: string | null;
  identifier?: string | null;
  description?: string | null;
  commencementDate?: dayjs.Dayjs | null;
  terminalDate?: dayjs.Dayjs | null;
  placeholders?: Pick<IPlaceholder, 'id' | 'description'>[] | null;
  systemMappings?: Pick<IUniversallyUniqueMapping, 'id' | 'mappedValue'>[] | null;
  businessDocuments?: Pick<IBusinessDocument, 'id' | 'documentTitle'>[] | null;
  contractMetadata?: Pick<IContractMetadata, 'id' | 'contractTitle'>[] | null;
}

export type NewLeaseContract = Omit<ILeaseContract, 'id'> & { id: null };
