///
/// Erp System - Mark VI No 1 (Phoebe Series) Client 1.5.3
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

import { ControlTypes } from '../../erp-common/enumerations/control-types.model';
import { IPlaceholder } from '../../erp-pages/placeholder/placeholder.model';
import { IUniversallyUniqueMapping } from '../../erp-pages/universally-unique-mapping/universally-unique-mapping.model';

export interface IQuestionBase {
  id?: number;
  context?: string;
  serial?: string;
  questionBaseValue?: string | null;
  questionBaseKey?: string;
  questionBaseLabel?: string;
  required?: boolean | null;
  order?: number;
  controlType?: ControlTypes;
  placeholder?: string | null;
  iterable?: boolean | null;
  parameters?: IUniversallyUniqueMapping[] | null;
  placeholderItems?: IPlaceholder[] | null;
}

export class QuestionBase implements IQuestionBase {
  constructor(
    public id?: number,
    public context?: string,
    public serial?: string,
    public questionBaseValue?: string | null,
    public questionBaseKey?: string,
    public questionBaseLabel?: string,
    public required?: boolean | null,
    public order?: number,
    public controlType?: ControlTypes,
    public placeholder?: string | null,
    public iterable?: boolean | null,
    public parameters?: IUniversallyUniqueMapping[] | null,
    public placeholderItems?: IPlaceholder[] | null
  ) {
    this.required = this.required ?? false;
    this.iterable = this.iterable ?? false;
  }
}

export function getQuestionBaseIdentifier(questionBase: IQuestionBase): number | undefined {
  return questionBase.id;
}
