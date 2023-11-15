///
/// Erp System - Mark VII No 5 (Gideon Series) Client 1.5.7
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

export interface IExecutiveCategoryType {
  id?: number;
  directorCategoryTypeCode?: string;
  directorCategoryType?: string;
  directorCategoryTypeDetails?: string | null;
}

export class ExecutiveCategoryType implements IExecutiveCategoryType {
  constructor(
    public id?: number,
    public directorCategoryTypeCode?: string,
    public directorCategoryType?: string,
    public directorCategoryTypeDetails?: string | null
  ) {}
}

export function getExecutiveCategoryTypeIdentifier(executiveCategoryType: IExecutiveCategoryType): number | undefined {
  return executiveCategoryType.id;
}
