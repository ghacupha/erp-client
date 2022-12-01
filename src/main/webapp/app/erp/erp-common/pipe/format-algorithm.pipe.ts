///
/// Erp System - Mark III No 4 (Caleb Series) Client 0.3.0-SNAPSHOT
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

import { Pipe, PipeTransform } from '@angular/core';
import { IAlgorithm } from '../../erp-pages/algorithm/algorithm.model';

/**
 * Formatting for inline presentation of algorithm instances
 */
@Pipe({
  name: 'formatAlgorithm',
})
export class FormatAlgorithmPipe implements PipeTransform {

  transform(value: IAlgorithm): string {

    const accountDetail = `Selected Algorithm Id: ${value.id} | Name: ${value.name}`;

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    return value ? accountDetail :'';
  }
}
