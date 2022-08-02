import { Injectable } from '@angular/core';
import { IPaymentCategory } from '../../payments/payment-category/payment-category.model';
import { Observable, of } from 'rxjs';
import { UniversallyUniqueMappingService } from '../../../erp-pages/universally-unique-mapping/service/universally-unique-mapping.service';
import { CategoryTypes } from '../../../erp-common/enumerations/category-types.model';

@Injectable({ providedIn: 'root' })
export class PaymentCalculatorService {

  constructor(protected universallyUniqueMappingService: UniversallyUniqueMappingService) {
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  calculatePayableAmount(settlementAmount: number, category: IPaymentCategory): Observable<number> {

    const VAT_RATE = 0.16;
    const WITHHOLDING_VAT_RATE = 0.02
    const CONSULTANCY_WITHHOLDING_TAX = 0.05;

    if (category.categoryType === CategoryTypes.CATEGORY2) {
      return of(
        Math.round(
        settlementAmount - (
          (settlementAmount/(1 + VAT_RATE) * WITHHOLDING_VAT_RATE) +
          (settlementAmount/(1 + VAT_RATE) * CONSULTANCY_WITHHOLDING_TAX)
        ))
      );
    }

    if (category.categoryType === CategoryTypes.CATEGORY0) {
      return of(Math.round(settlementAmount));
    }


    if (category.categoryType === CategoryTypes.CATEGORY1) {
      return of(Math.round(settlementAmount - (settlementAmount/(1 + VAT_RATE) * WITHHOLDING_VAT_RATE)));
    }

    return of(0);
  }
}
