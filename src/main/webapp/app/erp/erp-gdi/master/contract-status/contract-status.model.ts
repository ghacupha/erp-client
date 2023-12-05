///
/// Erp System - Mark VIII No 3 (Hilkiah Series) Client 1.6.2
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

export interface IContractStatus {
  id?: number;
  contractStatusCode?: string;
  contractStatusType?: string;
  contractStatusTypeDescription?: string | null;
}

export class ContractStatus implements IContractStatus {
  constructor(
    public id?: number,
    public contractStatusCode?: string,
    public contractStatusType?: string,
    public contractStatusTypeDescription?: string | null
  ) {}
}

export function getContractStatusIdentifier(contractStatus: IContractStatus): number | undefined {
  return contractStatus.id;
}
