///
/// Erp System - Mark X No 1 (Jehoiada Series) Client 1.7.1
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

import * as dayjs from 'dayjs';
import { IBankBranchCode } from '../../master/bank-branch-code/bank-branch-code.model';
import { ITerminalTypes } from '../../master/terminal-types/terminal-types.model';
import { IInstitutionCode } from '../../master/institution-code/institution-code.model';
import { ITerminalFunctions } from '../../master/terminal-functions/terminal-functions.model';
import { ICountySubCountyCode } from '../county-sub-county-code/county-sub-county-code.model';

export interface ITerminalsAndPOS {
  id?: number;
  reportingDate?: dayjs.Dayjs;
  terminalId?: string;
  merchantId?: string;
  terminalName?: string;
  terminalLocation?: string;
  iso6709Latitute?: number;
  iso6709Longitude?: number;
  terminalOpeningDate?: dayjs.Dayjs;
  terminalClosureDate?: dayjs.Dayjs | null;
  terminalType?: ITerminalTypes;
  terminalFunctionality?: ITerminalFunctions;
  physicalLocation?: ICountySubCountyCode;
  bankId?: IInstitutionCode;
  branchId?: IBankBranchCode;
}

export class TerminalsAndPOS implements ITerminalsAndPOS {
  constructor(
    public id?: number,
    public reportingDate?: dayjs.Dayjs,
    public terminalId?: string,
    public merchantId?: string,
    public terminalName?: string,
    public terminalLocation?: string,
    public iso6709Latitute?: number,
    public iso6709Longitude?: number,
    public terminalOpeningDate?: dayjs.Dayjs,
    public terminalClosureDate?: dayjs.Dayjs | null,
    public terminalType?: ITerminalTypes,
    public terminalFunctionality?: ITerminalFunctions,
    public physicalLocation?: ICountySubCountyCode,
    public bankId?: IInstitutionCode,
    public branchId?: IBankBranchCode
  ) {}
}

export function getTerminalsAndPOSIdentifier(terminalsAndPOS: ITerminalsAndPOS): number | undefined {
  return terminalsAndPOS.id;
}
