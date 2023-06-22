///
/// Erp System - Mark IV No 1 (David Series) Client 1.4.0
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

import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { PaymentInvoiceFormService, PaymentInvoiceFormGroup } from './payment-invoice-form.service';
import { IPaymentInvoice } from '../payment-invoice.model';
import { PaymentInvoiceService } from '../service/payment-invoice.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { ISettlementCurrency } from '../../settlement-currency/settlement-currency.model';
import { IJobSheet } from '../../job-sheet/job-sheet.model';
import { IPaymentLabel } from '../../../erp-pages/payment-label/payment-label.model';
import { PaymentLabelService } from '../../../erp-pages/payment-label/service/payment-label.service';
import { IDeliveryNote } from '../../delivery-note/delivery-note.model';
import { PurchaseOrderService } from '../../purchase-order/service/purchase-order.service';
import { SettlementCurrencyService } from '../../settlement-currency/service/settlement-currency.service';
import { PlaceholderService } from '../../../erp-pages/placeholder/service/placeholder.service';
import { JobSheetService } from '../../job-sheet/service/job-sheet.service';
import { IDealer } from '../../../erp-pages/dealers/dealer/dealer.model';
import { IPlaceholder } from '../../../erp-pages/placeholder/placeholder.model';
import { IBusinessDocument } from '../../../erp-pages/business-document/business-document.model';
import { DeliveryNoteService } from '../../delivery-note/service/delivery-note.service';
import { DealerService } from '../../../erp-pages/dealers/dealer/service/dealer.service';
import { IPurchaseOrder } from '../../purchase-order/purchase-order.model';
import { BusinessDocumentService } from '../../../erp-pages/business-document/service/business-document.service';
import { SearchWithPagination } from '../../../../core/request/request.model';
import { UniversallyUniqueMappingService } from '../../../erp-pages/universally-unique-mapping/service/universally-unique-mapping.service';
import { ISettlement } from '../../settlement/settlement.model';

@Component({
  selector: 'jhi-payment-invoice-update',
  templateUrl: './payment-invoice-update.component.html',
})
export class PaymentInvoiceUpdateComponent implements OnInit {
  isSaving = false;
  paymentInvoice: IPaymentInvoice | null = null;

  purchaseOrdersSharedCollection: IPurchaseOrder[] = [];
  placeholdersSharedCollection: IPlaceholder[] = [];
  paymentLabelsSharedCollection: IPaymentLabel[] = [];
  settlementCurrenciesSharedCollection: ISettlementCurrency[] = [];
  dealersSharedCollection: IDealer[] = [];
  deliveryNotesSharedCollection: IDeliveryNote[] = [];
  jobSheetsSharedCollection: IJobSheet[] = [];
  businessDocumentsSharedCollection: IBusinessDocument[] = [];

  editForm: PaymentInvoiceFormGroup = this.paymentInvoiceFormService.createPaymentInvoiceFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected paymentInvoiceService: PaymentInvoiceService,
    protected paymentInvoiceFormService: PaymentInvoiceFormService,
    protected purchaseOrderService: PurchaseOrderService,
    protected placeholderService: PlaceholderService,
    protected paymentLabelService: PaymentLabelService,
    protected settlementCurrencyService: SettlementCurrencyService,
    protected dealerService: DealerService,
    protected deliveryNoteService: DeliveryNoteService,
    protected jobSheetService: JobSheetService,
    protected businessDocumentService: BusinessDocumentService,
    protected activatedRoute: ActivatedRoute,
    protected universallyUniqueMappingService: UniversallyUniqueMappingService,
  ) {}

  comparePurchaseOrder = (o1: IPurchaseOrder | null, o2: IPurchaseOrder | null): boolean =>
    this.purchaseOrderService.comparePurchaseOrder(o1, o2);

  comparePlaceholder = (o1: IPlaceholder | null, o2: IPlaceholder | null): boolean => this.placeholderService.comparePlaceholder(o1, o2);

  comparePaymentLabel = (o1: IPaymentLabel | null, o2: IPaymentLabel | null): boolean =>
    this.paymentLabelService.comparePaymentLabel(o1, o2);

  compareSettlementCurrency = (o1: ISettlementCurrency | null, o2: ISettlementCurrency | null): boolean =>
    this.settlementCurrencyService.compareSettlementCurrency(o1, o2);

  compareDealer = (o1: IDealer | null, o2: IDealer | null): boolean => this.dealerService.compareDealer(o1, o2);

  compareDeliveryNote = (o1: IDeliveryNote | null, o2: IDeliveryNote | null): boolean =>
    this.deliveryNoteService.compareDeliveryNote(o1, o2);

  compareJobSheet = (o1: IJobSheet | null, o2: IJobSheet | null): boolean => this.jobSheetService.compareJobSheet(o1, o2);

  compareBusinessDocument = (o1: IBusinessDocument | null, o2: IBusinessDocument | null): boolean =>
    this.businessDocumentService.compareBusinessDocument(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ paymentInvoice }) => {
      this.paymentInvoice = paymentInvoice;
      if (paymentInvoice) {
        this.updateForm(paymentInvoice);
      }

      this.loadRelationshipsOptions();
    });

    this.updatePreferredCurrency();
    this.updatePreferredPaymentLabels();
    this.updateInputsGivenPurchaseOrder();
  }

  updateSettlementCurrency(update: ISettlementCurrency): void {
    this.editForm.patchValue({
      settlementCurrency: update
    });
  }

  updatePurchaseOrders(update: IPurchaseOrder[]): void {
    this.editForm.patchValue({
      purchaseOrders: [...update]
    });
  }

  updatePlaceholders(update: IPlaceholder[]): void {
    this.editForm.patchValue({
      placeholders: [...update]
    });
  }

  updatePaymentLabels(update: IPaymentLabel[]): void {
    this.editForm.patchValue({
      paymentLabels: [...update]
    });
  }

  updateBiller(update: IDealer): void {
    this.editForm.patchValue({
      biller: update
    });
  }

  updateDeliveryNotes(update: IDeliveryNote[]): void {
    this.editForm.patchValue({
      deliveryNotes: [...update]
    });
  }

  updateJobSheets(update: IJobSheet[]): void {
    this.editForm.patchValue({
      jobSheets: [...update]
    });
  }

  updateBusinessDocuments(update: IBusinessDocument[]): void {
    this.editForm.patchValue({
      businessDocuments: [...update]
    });
  }

  updateInputsGivenPurchaseOrder(): void {
    this.editForm.get(['purchaseOrders'])?.valueChanges.subscribe((orders) => {
      const p_labels: IPaymentLabel[] = [];
      let p_amount: number | null | undefined = 0;
      orders.forEach((ordered: IPurchaseOrder) => {
        ({ purchaseOrderAmount: p_amount } = ordered);
      });

      this.editForm.patchValue({
        invoiceAmount: p_amount,
        biller: orders[0].vendor,
        remarks: orders[0].remarks,
        settlementCurrency: orders[0].settlementCurrency
      })

      const labels = [...this.editForm.get(['paymentLabels'])?.value, ...p_labels];
      this.editForm.get(['paymentLabels'])?.setValue(labels)
    });
  }

  updatePreferredCurrency(): void {
    this.universallyUniqueMappingService.search({
      page: 0,
      size: 0,
      sort: [],
      query: "globallyPreferredSettlementIso4217CurrencyCode"
    })
      .subscribe(({ body }) => {
        if (body!.length > 0) {
          if (body) {
            this.settlementCurrencyService.search(<SearchWithPagination>{
              page: 0,
              size: 0,
              sort: [],
              query: body[0].mappedValue
            })
              .subscribe(({ body: currencies }) => {
                if (currencies) {
                  this.editForm.get(['settlementCurrency'])?.setValue(currencies[0]);
                }
              });
          }
        }
      });
  }

  updatePreferredPaymentLabels(): void {
    this.universallyUniqueMappingService.search({ page: 0, size: 0, sort: [], query: "globallyPreferredSettlementUpdatePaymentLabel"})
      .subscribe(({ body }) => {
        if (body!.length > 0) {
          if (body) {
            this.paymentLabelService.search(<SearchWithPagination>{ page: 0, size: 0, sort: [], query: body[0].mappedValue })
              .subscribe(({ body: vals }) => {
                if (vals) {
                  this.editForm.patchValue({
                    paymentLabels: [...vals]
                  });
                }
              });
          }
        }
      });
  }

    byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe({
      error: (err: FileLoadError) =>
        this.eventManager.broadcast(new EventWithContent<AlertError>('erpSystemApp.error', { message: err.message })),
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const paymentInvoice = this.paymentInvoiceFormService.getPaymentInvoice(this.editForm);
    if (paymentInvoice.id !== null) {
      this.subscribeToSaveResponse(this.paymentInvoiceService.update(paymentInvoice));
    } else {
      this.subscribeToSaveResponse(this.paymentInvoiceService.create(paymentInvoice));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPaymentInvoice>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(paymentInvoice: IPaymentInvoice): void {
    this.paymentInvoice = paymentInvoice;
    this.paymentInvoiceFormService.resetForm(this.editForm, paymentInvoice);

    this.purchaseOrdersSharedCollection = this.purchaseOrderService.addPurchaseOrderToCollectionIfMissing<IPurchaseOrder>(
      this.purchaseOrdersSharedCollection,
      ...(paymentInvoice.purchaseOrders ?? [])
    );
    this.placeholdersSharedCollection = this.placeholderService.addPlaceholderToCollectionIfMissing<IPlaceholder>(
      this.placeholdersSharedCollection,
      ...(paymentInvoice.placeholders ?? [])
    );
    this.paymentLabelsSharedCollection = this.paymentLabelService.addPaymentLabelToCollectionIfMissing<IPaymentLabel>(
      this.paymentLabelsSharedCollection,
      ...(paymentInvoice.paymentLabels ?? [])
    );
    this.settlementCurrenciesSharedCollection =
      this.settlementCurrencyService.addSettlementCurrencyToCollectionIfMissing<ISettlementCurrency>(
        this.settlementCurrenciesSharedCollection,
        paymentInvoice.settlementCurrency
      );
    this.dealersSharedCollection = this.dealerService.addDealerToCollectionIfMissing<IDealer>(
      this.dealersSharedCollection,
      paymentInvoice.biller
    );
    this.deliveryNotesSharedCollection = this.deliveryNoteService.addDeliveryNoteToCollectionIfMissing<IDeliveryNote>(
      this.deliveryNotesSharedCollection,
      ...(paymentInvoice.deliveryNotes ?? [])
    );
    this.jobSheetsSharedCollection = this.jobSheetService.addJobSheetToCollectionIfMissing<IJobSheet>(
      this.jobSheetsSharedCollection,
      ...(paymentInvoice.jobSheets ?? [])
    );
    this.businessDocumentsSharedCollection = this.businessDocumentService.addBusinessDocumentToCollectionIfMissing<IBusinessDocument>(
      this.businessDocumentsSharedCollection,
      ...(paymentInvoice.businessDocuments ?? [])
    );
  }

  protected loadRelationshipsOptions(): void {
    this.purchaseOrderService
      .query()
      .pipe(map((res: HttpResponse<IPurchaseOrder[]>) => res.body ?? []))
      .pipe(
        map((purchaseOrders: IPurchaseOrder[]) =>
          this.purchaseOrderService.addPurchaseOrderToCollectionIfMissing<IPurchaseOrder>(
            purchaseOrders,
            ...(this.paymentInvoice?.purchaseOrders ?? [])
          )
        )
      )
      .subscribe((purchaseOrders: IPurchaseOrder[]) => (this.purchaseOrdersSharedCollection = purchaseOrders));

    this.placeholderService
      .query()
      .pipe(map((res: HttpResponse<IPlaceholder[]>) => res.body ?? []))
      .pipe(
        map((placeholders: IPlaceholder[]) =>
          this.placeholderService.addPlaceholderToCollectionIfMissing<IPlaceholder>(
            placeholders,
            ...(this.paymentInvoice?.placeholders ?? [])
          )
        )
      )
      .subscribe((placeholders: IPlaceholder[]) => (this.placeholdersSharedCollection = placeholders));

    this.paymentLabelService
      .query()
      .pipe(map((res: HttpResponse<IPaymentLabel[]>) => res.body ?? []))
      .pipe(
        map((paymentLabels: IPaymentLabel[]) =>
          this.paymentLabelService.addPaymentLabelToCollectionIfMissing<IPaymentLabel>(
            paymentLabels,
            ...(this.paymentInvoice?.paymentLabels ?? [])
          )
        )
      )
      .subscribe((paymentLabels: IPaymentLabel[]) => (this.paymentLabelsSharedCollection = paymentLabels));

    this.settlementCurrencyService
      .query()
      .pipe(map((res: HttpResponse<ISettlementCurrency[]>) => res.body ?? []))
      .pipe(
        map((settlementCurrencies: ISettlementCurrency[]) =>
          this.settlementCurrencyService.addSettlementCurrencyToCollectionIfMissing<ISettlementCurrency>(
            settlementCurrencies,
            this.paymentInvoice?.settlementCurrency
          )
        )
      )
      .subscribe((settlementCurrencies: ISettlementCurrency[]) => (this.settlementCurrenciesSharedCollection = settlementCurrencies));

    this.dealerService
      .query()
      .pipe(map((res: HttpResponse<IDealer[]>) => res.body ?? []))
      .pipe(map((dealers: IDealer[]) => this.dealerService.addDealerToCollectionIfMissing<IDealer>(dealers, this.paymentInvoice?.biller)))
      .subscribe((dealers: IDealer[]) => (this.dealersSharedCollection = dealers));

    this.deliveryNoteService
      .query()
      .pipe(map((res: HttpResponse<IDeliveryNote[]>) => res.body ?? []))
      .pipe(
        map((deliveryNotes: IDeliveryNote[]) =>
          this.deliveryNoteService.addDeliveryNoteToCollectionIfMissing<IDeliveryNote>(
            deliveryNotes,
            ...(this.paymentInvoice?.deliveryNotes ?? [])
          )
        )
      )
      .subscribe((deliveryNotes: IDeliveryNote[]) => (this.deliveryNotesSharedCollection = deliveryNotes));

    this.jobSheetService
      .query()
      .pipe(map((res: HttpResponse<IJobSheet[]>) => res.body ?? []))
      .pipe(
        map((jobSheets: IJobSheet[]) =>
          this.jobSheetService.addJobSheetToCollectionIfMissing<IJobSheet>(jobSheets, ...(this.paymentInvoice?.jobSheets ?? []))
        )
      )
      .subscribe((jobSheets: IJobSheet[]) => (this.jobSheetsSharedCollection = jobSheets));

    this.businessDocumentService
      .query()
      .pipe(map((res: HttpResponse<IBusinessDocument[]>) => res.body ?? []))
      .pipe(
        map((businessDocuments: IBusinessDocument[]) =>
          this.businessDocumentService.addBusinessDocumentToCollectionIfMissing<IBusinessDocument>(
            businessDocuments,
            ...(this.paymentInvoice?.businessDocuments ?? [])
          )
        )
      )
      .subscribe((businessDocuments: IBusinessDocument[]) => (this.businessDocumentsSharedCollection = businessDocuments));
  }
}
