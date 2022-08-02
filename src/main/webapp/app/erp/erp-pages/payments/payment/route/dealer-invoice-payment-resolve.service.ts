import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {State} from "../../../../store/global-store.definition";
import {Resolve} from "@angular/router";
import {Observable, of} from "rxjs";
import {
  dealerInvoiceSelected,
  dealerInvoiceSelectedDealer,
} from "../../../../store/selectors/dealer-invoice-worklows-status.selectors";
import {
  DEFAULT_DATE,
  DEFAULT_DESCRIPTION,
} from "../default-values.constants";
import {dealerAcquiredForInvoicedPayment} from "../../../../store/actions/dealer-invoice-workflows-status.actions";
import { IPayment, Payment } from '../../../../erp-common/models/payment.model';
import { IInvoice } from '../../../../erp-common/models/invoice.model';
import { IDealer } from '../../../../erp-common/models/dealer.model';

@Injectable({ providedIn: 'root' })
export class DealerInvoicePaymentResolveService implements Resolve<IPayment>  {

  constructor(protected store: Store<State>) {}

  resolve(): Observable<IPayment> | Promise<IPayment> | IPayment {

    // UPDATE DEFAULT VALUES
    let payment: IPayment = {
      ...new Payment(),
      paymentDate: DEFAULT_DATE,
      description: DEFAULT_DESCRIPTION
    };

    const invoice: Observable<IInvoice> = this.store.select<IInvoice>(dealerInvoiceSelected);

    const dealer: Observable<IDealer> = this.store.select<IDealer>(dealerInvoiceSelectedDealer);

    // TODO ownedInvoices in the store

    // UPDATE VALUES FROM THE INVOICE
    invoice.subscribe(inv => {
      payment = {
        ...payment,
        invoicedAmount: inv.invoiceAmount,
        settlementCurrency: inv.currency,
        paymentAmount: inv.invoiceAmount,
        paymentLabels: [...(inv.paymentLabels ?? [])],
        placeholders: [...(inv.placeholders ?? [])],
      }
    });

    // UPDATE WITH VALUES FROM THE DEALER
    dealer.subscribe(dealr => {
      payment = {
        ...payment,
        dealerName: dealr.dealerName,
        paymentLabels: dealr.paymentLabels,
        placeholders: dealr.placeholders,
      };

      if (dealr.paymentLabels && dealr.placeholders) {
        this.store.dispatch(dealerAcquiredForInvoicedPayment({
          paymentLabels: dealr.paymentLabels,
          placeholders: dealr.placeholders,
        }));
      }
    });

    return of(payment)
  }


}
