///
/// Erp System - Mark III No 3 (Caleb Series) Client 0.2.0-SNAPSHOT
/// Copyright © 2021 - 2022 Edwin Njeru (mailnjeru@gmail.com)
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

import { IUniversallyUniqueMapping } from '../../erp-pages/universally-unique-mapping/universally-unique-mapping.model';
import { IPlaceholder } from '../../erp-pages/placeholder/placeholder.model';

/**
 * Base representation of information about a form-control that we are trying to construct
 * dynamically at runtime. Each instance of this object consists information enough to form
 * a form-control. A collection of form-controls consist a form-group.
 */
export interface IQuestionBase<T> {
  id?: number;
  value?: T | null | undefined;
  key?: string;
  label?: string;
  required?: boolean | null;
  order?: number;
  controlType?: string;
  placeholder?: string | null;
  iterable?: boolean | null;
  parameters?: IUniversallyUniqueMapping[] | null;
  placeholderItems?: IPlaceholder[] | null;
}

export class QuestionBase<T> implements IQuestionBase<T> {

  constructor(
    public id?: number,
    public value?: T | null | undefined,
    public key?: string,
    public label?: string,
    public required?: boolean | null,
    public order?: number,
    public controlType?: string,
    public placeholder?: string | null,
    public iterable?: boolean | null,
    public parameters?: IUniversallyUniqueMapping[] | null,
    public placeholderItems?: IPlaceholder[] | null
  ) {
    this.required = this.required ?? false;
    this.iterable = this.iterable ?? false;
  }
}

export function getQuestionBaseIdentifier(questionBase: IQuestionBase<any>): number | undefined {
  return questionBase.id;
}

export class DropdownQuestion<T> extends QuestionBase<T> {

  controlType = 'dropdown';

  constructor(
    public id?: number,
    public value?: T | null | undefined,
    public key?: string,
    public label?: string,
    public options?: { key: string, value: string }[],
    public required?: boolean | null,
    public order?: number,
    public placeholder?: string | null,
    public iterable?: boolean | null,
    public parameters?: IUniversallyUniqueMapping[] | null,
    public placeholderItems?: IPlaceholder[] | null,
  ) {
    super(
      id,
      value,
      key,
      label,
      required,
      order,
      'dropdown',
      placeholder,
      iterable,
      parameters,
      placeholderItems
    );
  }
}

export class TextareaQuestion<T> extends QuestionBase<T> {
  controlType = 'textarea';

  constructor(
    public id?: number,
    public value?: T | null | undefined,
    public key?: string,
    public label?: string,
    public required?: boolean | null,
    public order?: number,
    public placeholder?: string | null,
    public iterable?: boolean | null,
    public parameters?: IUniversallyUniqueMapping[] | null,
    public placeholderItems?: IPlaceholder[] | null,
    public cols: number = 0,
    public rows: number = 0,
    public maxlength: number = 0,
    public minlength: number = 0
  ) {
    super(
      id,
      value,
      key,
      label,
      required,
      order,
      'textarea',
      placeholder,
      iterable,
      parameters,
      placeholderItems
    );
  }
}

export class TextboxQuestion<T> extends QuestionBase<T> {
  controlType = 'textbox';

  constructor(
    public id?: number,
    public value?: T | null | undefined,
    public key?: string,
    public label?: string,
    public required?: boolean | null,
    public order?: number,
    public placeholder?: string | null,
    public iterable?: boolean | null,
    public parameters?: IUniversallyUniqueMapping[] | null,
    public placeholderItems?: IPlaceholder[] | null,
    public type: string = 'textbox',
    public min: number | string = 0,
    public max: number | string = 0,
    public pattern?: string,
  ) {
    super(
      id,
      value,
      key,
      label,
      required,
      order,
      'textbox',
      placeholder,
      iterable,
      parameters,
      placeholderItems
    );
  }
}
