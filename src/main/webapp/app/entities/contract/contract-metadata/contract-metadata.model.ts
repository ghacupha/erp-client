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
import { IDealer } from 'app/entities/people/dealer/dealer.model';
import { IApplicationUser } from 'app/entities/people/application-user/application-user.model';
import { ISecurityClearance } from 'app/entities/people/security-clearance/security-clearance.model';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { IBusinessDocument } from 'app/entities/documentation/business-document/business-document.model';
import { IUniversallyUniqueMapping } from 'app/entities/system/universally-unique-mapping/universally-unique-mapping.model';
import { ContractType } from 'app/entities/enumerations/contract-type.model';
import { ContractStatus } from 'app/entities/enumerations/contract-status.model';

export interface IContractMetadata {
  id: number;
  description?: string | null;
  typeOfContract?: ContractType | null;
  contractStatus?: ContractStatus | null;
  startDate?: dayjs.Dayjs | null;
  terminationDate?: dayjs.Dayjs | null;
  commentsAndAttachment?: string | null;
  contractTitle?: string | null;
  contractIdentifier?: string | null;
  contractIdentifierShort?: string | null;
  relatedContracts?: Pick<IContractMetadata, 'id' | 'description'>[] | null;
  department?: Pick<IDealer, 'id' | 'dealerName'> | null;
  contractPartner?: Pick<IDealer, 'id' | 'dealerName'> | null;
  responsiblePerson?: Pick<IApplicationUser, 'id' | 'applicationIdentity'> | null;
  signatories?: Pick<IApplicationUser, 'id' | 'applicationIdentity'>[] | null;
  securityClearance?: Pick<ISecurityClearance, 'id' | 'clearanceLevel'> | null;
  placeholders?: Pick<IPlaceholder, 'id' | 'description'>[] | null;
  contractDocumentFiles?: Pick<IBusinessDocument, 'id' | 'documentTitle'>[] | null;
  contractMappings?: Pick<IUniversallyUniqueMapping, 'id' | 'universalKey'>[] | null;
}

export type NewContractMetadata = Omit<IContractMetadata, 'id'> & { id: null };
