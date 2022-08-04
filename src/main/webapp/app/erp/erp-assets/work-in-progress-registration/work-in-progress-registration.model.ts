import { IJobSheet } from '../../erp-settlements/job-sheet/job-sheet.model';
import { IDeliveryNote } from '../../erp-settlements/delivery-note/delivery-note.model';
import { IServiceOutlet } from '../../erp-granular/service-outlet/service-outlet.model';
import { IPaymentInvoice } from '../../erp-settlements/payment-invoice/payment-invoice.model';
import { ISettlement } from '../../erp-settlements/settlement/settlement.model';
import { IPurchaseOrder } from '../../erp-settlements/purchase-order/purchase-order.model';
import { IPlaceholder } from '../../erp-pages/placeholder/placeholder.model';
import { IDealer } from '../../erp-pages/dealers/dealer/dealer.model';

export interface IWorkInProgressRegistration {
  id?: number;
  sequenceNumber?: string;
  particulars?: string | null;
  instalmentAmount?: number | null;
  commentsContentType?: string | null;
  comments?: string | null;
  placeholders?: IPlaceholder[] | null;
  paymentInvoices?: IPaymentInvoice[] | null;
  serviceOutlets?: IServiceOutlet[];
  settlements?: ISettlement[];
  purchaseOrders?: IPurchaseOrder[] | null;
  deliveryNotes?: IDeliveryNote[] | null;
  jobSheets?: IJobSheet[] | null;
  dealer?: IDealer;
}

export class WorkInProgressRegistration implements IWorkInProgressRegistration {
  constructor(
    public id?: number,
    public sequenceNumber?: string,
    public particulars?: string | null,
    public instalmentAmount?: number | null,
    public commentsContentType?: string | null,
    public comments?: string | null,
    public placeholders?: IPlaceholder[] | null,
    public paymentInvoices?: IPaymentInvoice[] | null,
    public serviceOutlets?: IServiceOutlet[],
    public settlements?: ISettlement[],
    public purchaseOrders?: IPurchaseOrder[] | null,
    public deliveryNotes?: IDeliveryNote[] | null,
    public jobSheets?: IJobSheet[] | null,
    public dealer?: IDealer
  ) {}
}

export function getWorkInProgressRegistrationIdentifier(workInProgressRegistration: IWorkInProgressRegistration): number | undefined {
  return workInProgressRegistration.id;
}
