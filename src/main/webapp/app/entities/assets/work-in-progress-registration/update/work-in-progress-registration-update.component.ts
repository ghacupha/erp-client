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

import { WorkInProgressRegistrationFormService, WorkInProgressRegistrationFormGroup } from './work-in-progress-registration-form.service';
import { IWorkInProgressRegistration } from '../work-in-progress-registration.model';
import { WorkInProgressRegistrationService } from '../service/work-in-progress-registration.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/system/placeholder/service/placeholder.service';
import { IPaymentInvoice } from 'app/entities/settlement/payment-invoice/payment-invoice.model';
import { PaymentInvoiceService } from 'app/entities/settlement/payment-invoice/service/payment-invoice.service';
import { IServiceOutlet } from 'app/entities/data/service-outlet/service-outlet.model';
import { ServiceOutletService } from 'app/entities/data/service-outlet/service/service-outlet.service';
import { ISettlement } from 'app/entities/settlement/settlement/settlement.model';
import { SettlementService } from 'app/entities/settlement/settlement/service/settlement.service';
import { IPurchaseOrder } from 'app/entities/settlement/purchase-order/purchase-order.model';
import { PurchaseOrderService } from 'app/entities/settlement/purchase-order/service/purchase-order.service';
import { IDeliveryNote } from 'app/entities/settlement/delivery-note/delivery-note.model';
import { DeliveryNoteService } from 'app/entities/settlement/delivery-note/service/delivery-note.service';
import { IJobSheet } from 'app/entities/settlement/job-sheet/job-sheet.model';
import { JobSheetService } from 'app/entities/settlement/job-sheet/service/job-sheet.service';
import { IDealer } from 'app/entities/people/dealer/dealer.model';
import { DealerService } from 'app/entities/people/dealer/service/dealer.service';
import { ISettlementCurrency } from 'app/entities/settlement/settlement-currency/settlement-currency.model';
import { SettlementCurrencyService } from 'app/entities/settlement/settlement-currency/service/settlement-currency.service';
import { IWorkProjectRegister } from 'app/entities/assets/work-project-register/work-project-register.model';
import { WorkProjectRegisterService } from 'app/entities/assets/work-project-register/service/work-project-register.service';
import { IBusinessDocument } from 'app/entities/documentation/business-document/business-document.model';
import { BusinessDocumentService } from 'app/entities/documentation/business-document/service/business-document.service';
import { IAssetAccessory } from 'app/entities/assets/asset-accessory/asset-accessory.model';
import { AssetAccessoryService } from 'app/entities/assets/asset-accessory/service/asset-accessory.service';
import { IAssetWarranty } from 'app/entities/assets/asset-warranty/asset-warranty.model';
import { AssetWarrantyService } from 'app/entities/assets/asset-warranty/service/asset-warranty.service';

@Component({
  selector: 'jhi-work-in-progress-registration-update',
  templateUrl: './work-in-progress-registration-update.component.html',
})
export class WorkInProgressRegistrationUpdateComponent implements OnInit {
  isSaving = false;
  workInProgressRegistration: IWorkInProgressRegistration | null = null;

  placeholdersSharedCollection: IPlaceholder[] = [];
  paymentInvoicesSharedCollection: IPaymentInvoice[] = [];
  serviceOutletsSharedCollection: IServiceOutlet[] = [];
  settlementsSharedCollection: ISettlement[] = [];
  purchaseOrdersSharedCollection: IPurchaseOrder[] = [];
  deliveryNotesSharedCollection: IDeliveryNote[] = [];
  jobSheetsSharedCollection: IJobSheet[] = [];
  dealersSharedCollection: IDealer[] = [];
  workInProgressRegistrationsSharedCollection: IWorkInProgressRegistration[] = [];
  settlementCurrenciesSharedCollection: ISettlementCurrency[] = [];
  workProjectRegistersSharedCollection: IWorkProjectRegister[] = [];
  businessDocumentsSharedCollection: IBusinessDocument[] = [];
  assetAccessoriesSharedCollection: IAssetAccessory[] = [];
  assetWarrantiesSharedCollection: IAssetWarranty[] = [];

  editForm: WorkInProgressRegistrationFormGroup = this.workInProgressRegistrationFormService.createWorkInProgressRegistrationFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected workInProgressRegistrationService: WorkInProgressRegistrationService,
    protected workInProgressRegistrationFormService: WorkInProgressRegistrationFormService,
    protected placeholderService: PlaceholderService,
    protected paymentInvoiceService: PaymentInvoiceService,
    protected serviceOutletService: ServiceOutletService,
    protected settlementService: SettlementService,
    protected purchaseOrderService: PurchaseOrderService,
    protected deliveryNoteService: DeliveryNoteService,
    protected jobSheetService: JobSheetService,
    protected dealerService: DealerService,
    protected settlementCurrencyService: SettlementCurrencyService,
    protected workProjectRegisterService: WorkProjectRegisterService,
    protected businessDocumentService: BusinessDocumentService,
    protected assetAccessoryService: AssetAccessoryService,
    protected assetWarrantyService: AssetWarrantyService,
    protected activatedRoute: ActivatedRoute
  ) {}

  comparePlaceholder = (o1: IPlaceholder | null, o2: IPlaceholder | null): boolean => this.placeholderService.comparePlaceholder(o1, o2);

  comparePaymentInvoice = (o1: IPaymentInvoice | null, o2: IPaymentInvoice | null): boolean =>
    this.paymentInvoiceService.comparePaymentInvoice(o1, o2);

  compareServiceOutlet = (o1: IServiceOutlet | null, o2: IServiceOutlet | null): boolean =>
    this.serviceOutletService.compareServiceOutlet(o1, o2);

  compareSettlement = (o1: ISettlement | null, o2: ISettlement | null): boolean => this.settlementService.compareSettlement(o1, o2);

  comparePurchaseOrder = (o1: IPurchaseOrder | null, o2: IPurchaseOrder | null): boolean =>
    this.purchaseOrderService.comparePurchaseOrder(o1, o2);

  compareDeliveryNote = (o1: IDeliveryNote | null, o2: IDeliveryNote | null): boolean =>
    this.deliveryNoteService.compareDeliveryNote(o1, o2);

  compareJobSheet = (o1: IJobSheet | null, o2: IJobSheet | null): boolean => this.jobSheetService.compareJobSheet(o1, o2);

  compareDealer = (o1: IDealer | null, o2: IDealer | null): boolean => this.dealerService.compareDealer(o1, o2);

  compareWorkInProgressRegistration = (o1: IWorkInProgressRegistration | null, o2: IWorkInProgressRegistration | null): boolean =>
    this.workInProgressRegistrationService.compareWorkInProgressRegistration(o1, o2);

  compareSettlementCurrency = (o1: ISettlementCurrency | null, o2: ISettlementCurrency | null): boolean =>
    this.settlementCurrencyService.compareSettlementCurrency(o1, o2);

  compareWorkProjectRegister = (o1: IWorkProjectRegister | null, o2: IWorkProjectRegister | null): boolean =>
    this.workProjectRegisterService.compareWorkProjectRegister(o1, o2);

  compareBusinessDocument = (o1: IBusinessDocument | null, o2: IBusinessDocument | null): boolean =>
    this.businessDocumentService.compareBusinessDocument(o1, o2);

  compareAssetAccessory = (o1: IAssetAccessory | null, o2: IAssetAccessory | null): boolean =>
    this.assetAccessoryService.compareAssetAccessory(o1, o2);

  compareAssetWarranty = (o1: IAssetWarranty | null, o2: IAssetWarranty | null): boolean =>
    this.assetWarrantyService.compareAssetWarranty(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ workInProgressRegistration }) => {
      this.workInProgressRegistration = workInProgressRegistration;
      if (workInProgressRegistration) {
        this.updateForm(workInProgressRegistration);
      }

      this.loadRelationshipsOptions();
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
    const workInProgressRegistration = this.workInProgressRegistrationFormService.getWorkInProgressRegistration(this.editForm);
    if (workInProgressRegistration.id !== null) {
      this.subscribeToSaveResponse(this.workInProgressRegistrationService.update(workInProgressRegistration));
    } else {
      this.subscribeToSaveResponse(this.workInProgressRegistrationService.create(workInProgressRegistration));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IWorkInProgressRegistration>>): void {
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

  protected updateForm(workInProgressRegistration: IWorkInProgressRegistration): void {
    this.workInProgressRegistration = workInProgressRegistration;
    this.workInProgressRegistrationFormService.resetForm(this.editForm, workInProgressRegistration);

    this.placeholdersSharedCollection = this.placeholderService.addPlaceholderToCollectionIfMissing<IPlaceholder>(
      this.placeholdersSharedCollection,
      ...(workInProgressRegistration.placeholders ?? [])
    );
    this.paymentInvoicesSharedCollection = this.paymentInvoiceService.addPaymentInvoiceToCollectionIfMissing<IPaymentInvoice>(
      this.paymentInvoicesSharedCollection,
      ...(workInProgressRegistration.paymentInvoices ?? [])
    );
    this.serviceOutletsSharedCollection = this.serviceOutletService.addServiceOutletToCollectionIfMissing<IServiceOutlet>(
      this.serviceOutletsSharedCollection,
      ...(workInProgressRegistration.serviceOutlets ?? [])
    );
    this.settlementsSharedCollection = this.settlementService.addSettlementToCollectionIfMissing<ISettlement>(
      this.settlementsSharedCollection,
      ...(workInProgressRegistration.settlements ?? [])
    );
    this.purchaseOrdersSharedCollection = this.purchaseOrderService.addPurchaseOrderToCollectionIfMissing<IPurchaseOrder>(
      this.purchaseOrdersSharedCollection,
      ...(workInProgressRegistration.purchaseOrders ?? [])
    );
    this.deliveryNotesSharedCollection = this.deliveryNoteService.addDeliveryNoteToCollectionIfMissing<IDeliveryNote>(
      this.deliveryNotesSharedCollection,
      ...(workInProgressRegistration.deliveryNotes ?? [])
    );
    this.jobSheetsSharedCollection = this.jobSheetService.addJobSheetToCollectionIfMissing<IJobSheet>(
      this.jobSheetsSharedCollection,
      ...(workInProgressRegistration.jobSheets ?? [])
    );
    this.dealersSharedCollection = this.dealerService.addDealerToCollectionIfMissing<IDealer>(
      this.dealersSharedCollection,
      workInProgressRegistration.dealer
    );
    this.workInProgressRegistrationsSharedCollection =
      this.workInProgressRegistrationService.addWorkInProgressRegistrationToCollectionIfMissing<IWorkInProgressRegistration>(
        this.workInProgressRegistrationsSharedCollection,
        workInProgressRegistration.workInProgressGroup
      );
    this.settlementCurrenciesSharedCollection =
      this.settlementCurrencyService.addSettlementCurrencyToCollectionIfMissing<ISettlementCurrency>(
        this.settlementCurrenciesSharedCollection,
        workInProgressRegistration.settlementCurrency
      );
    this.workProjectRegistersSharedCollection =
      this.workProjectRegisterService.addWorkProjectRegisterToCollectionIfMissing<IWorkProjectRegister>(
        this.workProjectRegistersSharedCollection,
        workInProgressRegistration.workProjectRegister
      );
    this.businessDocumentsSharedCollection = this.businessDocumentService.addBusinessDocumentToCollectionIfMissing<IBusinessDocument>(
      this.businessDocumentsSharedCollection,
      ...(workInProgressRegistration.businessDocuments ?? [])
    );
    this.assetAccessoriesSharedCollection = this.assetAccessoryService.addAssetAccessoryToCollectionIfMissing<IAssetAccessory>(
      this.assetAccessoriesSharedCollection,
      ...(workInProgressRegistration.assetAccessories ?? [])
    );
    this.assetWarrantiesSharedCollection = this.assetWarrantyService.addAssetWarrantyToCollectionIfMissing<IAssetWarranty>(
      this.assetWarrantiesSharedCollection,
      ...(workInProgressRegistration.assetWarranties ?? [])
    );
  }

  protected loadRelationshipsOptions(): void {
    this.placeholderService
      .query()
      .pipe(map((res: HttpResponse<IPlaceholder[]>) => res.body ?? []))
      .pipe(
        map((placeholders: IPlaceholder[]) =>
          this.placeholderService.addPlaceholderToCollectionIfMissing<IPlaceholder>(
            placeholders,
            ...(this.workInProgressRegistration?.placeholders ?? [])
          )
        )
      )
      .subscribe((placeholders: IPlaceholder[]) => (this.placeholdersSharedCollection = placeholders));

    this.paymentInvoiceService
      .query()
      .pipe(map((res: HttpResponse<IPaymentInvoice[]>) => res.body ?? []))
      .pipe(
        map((paymentInvoices: IPaymentInvoice[]) =>
          this.paymentInvoiceService.addPaymentInvoiceToCollectionIfMissing<IPaymentInvoice>(
            paymentInvoices,
            ...(this.workInProgressRegistration?.paymentInvoices ?? [])
          )
        )
      )
      .subscribe((paymentInvoices: IPaymentInvoice[]) => (this.paymentInvoicesSharedCollection = paymentInvoices));

    this.serviceOutletService
      .query()
      .pipe(map((res: HttpResponse<IServiceOutlet[]>) => res.body ?? []))
      .pipe(
        map((serviceOutlets: IServiceOutlet[]) =>
          this.serviceOutletService.addServiceOutletToCollectionIfMissing<IServiceOutlet>(
            serviceOutlets,
            ...(this.workInProgressRegistration?.serviceOutlets ?? [])
          )
        )
      )
      .subscribe((serviceOutlets: IServiceOutlet[]) => (this.serviceOutletsSharedCollection = serviceOutlets));

    this.settlementService
      .query()
      .pipe(map((res: HttpResponse<ISettlement[]>) => res.body ?? []))
      .pipe(
        map((settlements: ISettlement[]) =>
          this.settlementService.addSettlementToCollectionIfMissing<ISettlement>(
            settlements,
            ...(this.workInProgressRegistration?.settlements ?? [])
          )
        )
      )
      .subscribe((settlements: ISettlement[]) => (this.settlementsSharedCollection = settlements));

    this.purchaseOrderService
      .query()
      .pipe(map((res: HttpResponse<IPurchaseOrder[]>) => res.body ?? []))
      .pipe(
        map((purchaseOrders: IPurchaseOrder[]) =>
          this.purchaseOrderService.addPurchaseOrderToCollectionIfMissing<IPurchaseOrder>(
            purchaseOrders,
            ...(this.workInProgressRegistration?.purchaseOrders ?? [])
          )
        )
      )
      .subscribe((purchaseOrders: IPurchaseOrder[]) => (this.purchaseOrdersSharedCollection = purchaseOrders));

    this.deliveryNoteService
      .query()
      .pipe(map((res: HttpResponse<IDeliveryNote[]>) => res.body ?? []))
      .pipe(
        map((deliveryNotes: IDeliveryNote[]) =>
          this.deliveryNoteService.addDeliveryNoteToCollectionIfMissing<IDeliveryNote>(
            deliveryNotes,
            ...(this.workInProgressRegistration?.deliveryNotes ?? [])
          )
        )
      )
      .subscribe((deliveryNotes: IDeliveryNote[]) => (this.deliveryNotesSharedCollection = deliveryNotes));

    this.jobSheetService
      .query()
      .pipe(map((res: HttpResponse<IJobSheet[]>) => res.body ?? []))
      .pipe(
        map((jobSheets: IJobSheet[]) =>
          this.jobSheetService.addJobSheetToCollectionIfMissing<IJobSheet>(jobSheets, ...(this.workInProgressRegistration?.jobSheets ?? []))
        )
      )
      .subscribe((jobSheets: IJobSheet[]) => (this.jobSheetsSharedCollection = jobSheets));

    this.dealerService
      .query()
      .pipe(map((res: HttpResponse<IDealer[]>) => res.body ?? []))
      .pipe(
        map((dealers: IDealer[]) =>
          this.dealerService.addDealerToCollectionIfMissing<IDealer>(dealers, this.workInProgressRegistration?.dealer)
        )
      )
      .subscribe((dealers: IDealer[]) => (this.dealersSharedCollection = dealers));

    this.workInProgressRegistrationService
      .query()
      .pipe(map((res: HttpResponse<IWorkInProgressRegistration[]>) => res.body ?? []))
      .pipe(
        map((workInProgressRegistrations: IWorkInProgressRegistration[]) =>
          this.workInProgressRegistrationService.addWorkInProgressRegistrationToCollectionIfMissing<IWorkInProgressRegistration>(
            workInProgressRegistrations,
            this.workInProgressRegistration?.workInProgressGroup
          )
        )
      )
      .subscribe(
        (workInProgressRegistrations: IWorkInProgressRegistration[]) =>
          (this.workInProgressRegistrationsSharedCollection = workInProgressRegistrations)
      );

    this.settlementCurrencyService
      .query()
      .pipe(map((res: HttpResponse<ISettlementCurrency[]>) => res.body ?? []))
      .pipe(
        map((settlementCurrencies: ISettlementCurrency[]) =>
          this.settlementCurrencyService.addSettlementCurrencyToCollectionIfMissing<ISettlementCurrency>(
            settlementCurrencies,
            this.workInProgressRegistration?.settlementCurrency
          )
        )
      )
      .subscribe((settlementCurrencies: ISettlementCurrency[]) => (this.settlementCurrenciesSharedCollection = settlementCurrencies));

    this.workProjectRegisterService
      .query()
      .pipe(map((res: HttpResponse<IWorkProjectRegister[]>) => res.body ?? []))
      .pipe(
        map((workProjectRegisters: IWorkProjectRegister[]) =>
          this.workProjectRegisterService.addWorkProjectRegisterToCollectionIfMissing<IWorkProjectRegister>(
            workProjectRegisters,
            this.workInProgressRegistration?.workProjectRegister
          )
        )
      )
      .subscribe((workProjectRegisters: IWorkProjectRegister[]) => (this.workProjectRegistersSharedCollection = workProjectRegisters));

    this.businessDocumentService
      .query()
      .pipe(map((res: HttpResponse<IBusinessDocument[]>) => res.body ?? []))
      .pipe(
        map((businessDocuments: IBusinessDocument[]) =>
          this.businessDocumentService.addBusinessDocumentToCollectionIfMissing<IBusinessDocument>(
            businessDocuments,
            ...(this.workInProgressRegistration?.businessDocuments ?? [])
          )
        )
      )
      .subscribe((businessDocuments: IBusinessDocument[]) => (this.businessDocumentsSharedCollection = businessDocuments));

    this.assetAccessoryService
      .query()
      .pipe(map((res: HttpResponse<IAssetAccessory[]>) => res.body ?? []))
      .pipe(
        map((assetAccessories: IAssetAccessory[]) =>
          this.assetAccessoryService.addAssetAccessoryToCollectionIfMissing<IAssetAccessory>(
            assetAccessories,
            ...(this.workInProgressRegistration?.assetAccessories ?? [])
          )
        )
      )
      .subscribe((assetAccessories: IAssetAccessory[]) => (this.assetAccessoriesSharedCollection = assetAccessories));

    this.assetWarrantyService
      .query()
      .pipe(map((res: HttpResponse<IAssetWarranty[]>) => res.body ?? []))
      .pipe(
        map((assetWarranties: IAssetWarranty[]) =>
          this.assetWarrantyService.addAssetWarrantyToCollectionIfMissing<IAssetWarranty>(
            assetWarranties,
            ...(this.workInProgressRegistration?.assetWarranties ?? [])
          )
        )
      )
      .subscribe((assetWarranties: IAssetWarranty[]) => (this.assetWarrantiesSharedCollection = assetWarranties));
  }
}
