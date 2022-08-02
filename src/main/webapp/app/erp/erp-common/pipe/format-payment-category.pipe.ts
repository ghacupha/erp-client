import { Pipe, PipeTransform } from '@angular/core';
import { IPaymentCategory } from '../models/payment-category.model';

@Pipe({
  name: 'formatPaymentCategory',
})
export class FormatPaymentCategoryPipe implements PipeTransform {

  transform(value: IPaymentCategory, args: any[]): string {

    let categoryDetail = '';


    if (value.categoryDescription) {

      const limit = args.length > 0 ? parseInt(args[0], 10) : 30;
      const trail = args.length > 1 ? args[1] : '...';

      let desc = '';

      if (value.categoryDescription.length > limit) {
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
         desc = value.categoryDescription.substring(0, limit) + trail;
      } else {
        desc = value.categoryDescription;
      }

      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      categoryDetail = `Id: ${value.id} | Name: ${value.categoryName} |${desc}`;
    }

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    return value ? categoryDetail :'';
  }
}
