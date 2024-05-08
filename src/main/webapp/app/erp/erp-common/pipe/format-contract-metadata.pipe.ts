///
/// Erp System - Mark X No 8 (Jehoiada Series) Client 1.7.6
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

import { Pipe, PipeTransform } from '@angular/core';
import { IContractMetadata } from '../../erp-pages/contract-metadata/contract-metadata.model';

@Pipe({
  name: 'formatContractMetadata',
})
export class FormatContractMetadataPipe implements PipeTransform {

  transform(value: IContractMetadata, args: any[]): string {

    let detail = '';

    if (value.contractTitle) {

      const limit = args.length > 0 ? parseInt(args[0], 10) : 30;
      const trail = args.length > 1 ? args[1] : '...';

      let desc = '';

      if (value.contractTitle.length > limit) {
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        desc = value.contractTitle.substring(0, limit) + trail;
      } else {
        desc = value.contractTitle;
      }

      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      detail = `id: ${value.id} |${desc} | #: ${value.contractPartner?.dealerName} `;
    }

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    return value ? detail :'';
  }
}
