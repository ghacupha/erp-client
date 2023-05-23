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

import { IPlaceholder } from 'app/entities/erpService/placeholder/placeholder.model';
import { IUniversallyUniqueMapping } from 'app/entities/universally-unique-mapping/universally-unique-mapping.model';
import { SystemContentTypeAvailability } from 'app/entities/enumerations/system-content-type-availability.model';

export interface ISystemContentType {
  id?: number;
  contentTypeName?: string;
  contentTypeHeader?: string;
  comments?: string | null;
  availability?: SystemContentTypeAvailability;
  placeholders?: IPlaceholder[] | null;
  sysMaps?: IUniversallyUniqueMapping[] | null;
}

export class SystemContentType implements ISystemContentType {
  constructor(
    public id?: number,
    public contentTypeName?: string,
    public contentTypeHeader?: string,
    public comments?: string | null,
    public availability?: SystemContentTypeAvailability,
    public placeholders?: IPlaceholder[] | null,
    public sysMaps?: IUniversallyUniqueMapping[] | null
  ) {}
}

export function getSystemContentTypeIdentifier(systemContentType: ISystemContentType): number | undefined {
  return systemContentType.id;
}
