///
/// Erp System - Mark III No 15 (Caleb Series) Client 1.3.4
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

import {IPlaceholder} from '../../placeholder/placeholder.model';
import { taxReferenceTypes } from '../../../erp-common/enumerations/tax-reference-types.model';

export interface ITaxReference {
  id?: number;
  taxName?: string | null;
  taxDescription?: string | null;
  taxPercentage?: number;
  taxReferenceType?: taxReferenceTypes;
  placeholders?: IPlaceholder[] | null;
}

export class TaxReference implements ITaxReference {
  constructor(
    public id?: number,
    public taxName?: string | null,
    public taxDescription?: string | null,
    public taxPercentage?: number,
    public taxReferenceType?: taxReferenceTypes,
    public placeholders?: IPlaceholder[] | null
  ) {}
}

export function getTaxReferenceIdentifier(taxReference: ITaxReference): number | undefined {
  return taxReference.id;
}
