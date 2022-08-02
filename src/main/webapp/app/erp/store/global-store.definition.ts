import {PaymentsFormState} from "./reducers/update-menu-status.reducer";
import {DealerWorkflowState} from "./reducers/dealer-workflows-status.reducer";
import {DealerInvoiceWorkflowState} from "./reducers/dealer-invoice-workflows-status.reducer";

export interface State {
  paymentsFormState: PaymentsFormState,
  dealerWorkflowState: DealerWorkflowState
  dealerInvoiceWorkflowState: DealerInvoiceWorkflowState
}

export const initialState: State = {
  paymentsFormState: {
    selectedPayment: {},
    weAreCopying: false,
    weAreEditing: false,
    weAreCreating: false,
  },
  dealerWorkflowState: {
    selectedDealer: {},
    dealerPayment: {},
    paymentDealerCategory: {},
    weArePayingADealer: false,
    errorMessage: '',
  },
  dealerInvoiceWorkflowState: {
    invoiceDealer: {},
    selectedInvoice: {},
    invoicePayment: {},
    selectedInvoiceLabels: [],
    selectedInvoicePlaceholders: [],
    weArePayingAnInvoiceDealer: false,
    errorMessage: '',
  }
}
