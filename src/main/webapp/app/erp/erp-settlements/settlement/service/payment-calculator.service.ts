import { Injectable } from '@angular/core';
import { IPaymentCategory } from '../../payments/payment-category/payment-category.model';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PaymentCalculatorService {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  calculatePayableAmount(settlementAmount: number, category: IPaymentCategory): Observable<number> {

    return of(settlementAmount);
  }
}
