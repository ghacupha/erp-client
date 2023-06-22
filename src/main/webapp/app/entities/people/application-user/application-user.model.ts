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

import { IDealer } from 'app/entities/people/dealer/dealer.model';
import { ISecurityClearance } from 'app/entities/people/security-clearance/security-clearance.model';
import { IUser } from 'app/entities/user/user.model';
import { IUniversallyUniqueMapping } from 'app/entities/system/universally-unique-mapping/universally-unique-mapping.model';

export interface IApplicationUser {
  id: number;
  designation?: string | null;
  applicationIdentity?: string | null;
  organization?: Pick<IDealer, 'id' | 'dealerName'> | null;
  department?: Pick<IDealer, 'id' | 'dealerName'> | null;
  securityClearance?: Pick<ISecurityClearance, 'id' | 'clearanceLevel'> | null;
  systemIdentity?: Pick<IUser, 'id' | 'login'> | null;
  userProperties?: Pick<IUniversallyUniqueMapping, 'id' | 'mappedValue'>[] | null;
  dealerIdentity?: Pick<IDealer, 'id' | 'dealerName'> | null;
}

export type NewApplicationUser = Omit<IApplicationUser, 'id'> & { id: null };
