///
/// Erp System - Mark VIII No 2 (Hilkiah Series) Client 1.6.1
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

export interface IAgriculturalEnterpriseActivityType {
  id?: number;
  agriculturalEnterpriseActivityTypeCode?: string;
  agriculturalEnterpriseActivityType?: string;
  agriculturalEnterpriseActivityTypeDescription?: string | null;
}

export class AgriculturalEnterpriseActivityType implements IAgriculturalEnterpriseActivityType {
  constructor(
    public id?: number,
    public agriculturalEnterpriseActivityTypeCode?: string,
    public agriculturalEnterpriseActivityType?: string,
    public agriculturalEnterpriseActivityTypeDescription?: string | null
  ) {}
}

export function getAgriculturalEnterpriseActivityTypeIdentifier(
  agriculturalEnterpriseActivityType: IAgriculturalEnterpriseActivityType
): number | undefined {
  return agriculturalEnterpriseActivityType.id;
}
