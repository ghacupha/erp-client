///
/// Erp System - Mark IX No 2 (Iddo Series) Client 1.6.3
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

import { CardStateFlagTypes } from '../../../erp-common/enumerations/card-state-flag-types.model';

export interface ICardState {
  id?: number;
  cardStateFlag?: CardStateFlagTypes;
  cardStateFlagDetails?: string;
  cardStateFlagDescription?: string | null;
}

export class CardState implements ICardState {
  constructor(
    public id?: number,
    public cardStateFlag?: CardStateFlagTypes,
    public cardStateFlagDetails?: string,
    public cardStateFlagDescription?: string | null
  ) {}
}

export function getCardStateIdentifier(cardState: ICardState): number | undefined {
  return cardState.id;
}
