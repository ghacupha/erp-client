import { Pipe, PipeTransform } from '@angular/core';
import { ILeaseModelMetadata } from '../../erp-leases/lease-model-metadata/lease-model-metadata.model';

@Pipe({
  name: 'formatLeaseModelMetadata',
})
export class FormatLeaseModelMetadataPipe implements PipeTransform {

  transform(value: ILeaseModelMetadata, args: any[]): string {

    let detail = '';

    if (value.modelTitle) {

      const limit = args.length > 0 ? parseInt(args[0], 10) : 30;
      const trail = args.length > 1 ? args[1] : '...';

      let desc = '';

      if (value.modelTitle.length > limit) {
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        desc = value.modelTitle.substring(0, limit) + trail;
      } else {
        desc = value.modelTitle;
      }

      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      detail = `id: ${value.id} | ${value.modelTitle} |${desc}`;
    }

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    return value ? detail :'';
  }
}
