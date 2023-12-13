///
/// Erp System - Mark IX No 2 (Hilkiah Series) Client 1.6.3
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

import { CardPerformanceFlags } from 'app/entities/enumerations/card-performance-flags.model';

export interface ICardPerformanceFlag {
  id?: number;
  cardPerformanceFlag?: CardPerformanceFlags;
  cardPerformanceFlagDescription?: string;
  cardPerformanceFlagDetails?: string | null;
}

export class CardPerformanceFlag implements ICardPerformanceFlag {
  constructor(
    public id?: number,
    public cardPerformanceFlag?: CardPerformanceFlags,
    public cardPerformanceFlagDescription?: string,
    public cardPerformanceFlagDetails?: string | null
  ) {}
}

export function getCardPerformanceFlagIdentifier(cardPerformanceFlag: ICardPerformanceFlag): number | undefined {
  return cardPerformanceFlag.id;
}
