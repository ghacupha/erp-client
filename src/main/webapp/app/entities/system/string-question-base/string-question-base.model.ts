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

import { IUniversallyUniqueMapping } from 'app/entities/system/universally-unique-mapping/universally-unique-mapping.model';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { ControlTypes } from 'app/entities/enumerations/control-types.model';

export interface IStringQuestionBase {
  id: number;
  value?: string | null;
  key?: string | null;
  label?: string | null;
  required?: boolean | null;
  order?: number | null;
  controlType?: ControlTypes | null;
  placeholder?: string | null;
  iterable?: boolean | null;
  parameters?: Pick<IUniversallyUniqueMapping, 'id' | 'universalKey'>[] | null;
  placeholderItems?: Pick<IPlaceholder, 'id' | 'description'>[] | null;
}

export type NewStringQuestionBase = Omit<IStringQuestionBase, 'id'> & { id: null };
