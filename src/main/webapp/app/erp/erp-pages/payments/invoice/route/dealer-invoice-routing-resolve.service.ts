import {Injectable} from "@angular/core";
import {InvoiceService} from "../service/invoice.service";
import {Resolve, Router} from "@angular/router";
import {Observable, of} from "rxjs";
import {select, Store} from "@ngrx/store";
import {State} from "../../../../store/global-store.definition";
import {DEFAULT_CONVERSION_RATE, DEFAULT_CURRENCY} from "../../payment/default-values.constants";
import {dealerInvoiceSelectedDealer} from "../../../../store/selectors/dealer-invoice-worklows-status.selectors";
import { IInvoice, Invoice } from '../invoice.model';
import { IDealer } from '../../../dealers/dealer/dealer.model';

@Injectable({ providedIn: 'root' })
export class DealerInvoiceRoutingResolveService implements Resolve<IInvoice>  {

  constructor(protected service: InvoiceService, protected router: Router, protected store: Store<State>) {}

  resolve(): Observable<IInvoice> | Observable<never> {

    const invoiceDealer: Observable<IDealer> = this.store.pipe(select(dealerInvoiceSelectedDealer)).pipe();

    let invoice = {
      ...new Invoice(),
      currency: DEFAULT_CURRENCY,
      conversionRate: DEFAULT_CONVERSION_RATE,
    }

    invoiceDealer.subscribe(dealer => {
      invoice = {
        ...invoice,
        dealerName: dealer.dealerName,
        paymentLabels: dealer.paymentLabels,
        placeholders: dealer.placeholders,
      }
    });

    return of(invoice);
  }
}
