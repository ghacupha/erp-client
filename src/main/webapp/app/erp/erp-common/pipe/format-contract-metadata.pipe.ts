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
