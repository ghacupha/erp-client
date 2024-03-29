///
/// Erp System - Mark VIII No 1 (Hilkiah Series) Client 1.5.9
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
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';
import { finalize, map} from 'rxjs/operators';

import { IWorkInProgressRegistration, WorkInProgressRegistration } from '../work-in-progress-registration.model';
import { WorkInProgressRegistrationService } from '../service/work-in-progress-registration.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { IJobSheet } from '../../../erp-settlements/job-sheet/job-sheet.model';
import { SettlementService } from '../../../erp-settlements/settlement/service/settlement.service';
import { IDeliveryNote } from '../../../erp-settlements/delivery-note/delivery-note.model';
import { PurchaseOrderService } from '../../../erp-settlements/purchase-order/service/purchase-order.service';
import { IServiceOutlet } from '../../../erp-granular/service-outlet/service-outlet.model';
import { PlaceholderService } from '../../../erp-pages/placeholder/service/placeholder.service';
import { JobSheetService } from '../../../erp-settlements/job-sheet/service/job-sheet.service';
import { IDealer } from '../../../erp-pages/dealers/dealer/dealer.model';
import { IPlaceholder } from '../../../erp-pages/placeholder/placeholder.model';
import { ServiceOutletService } from '../../../erp-granular/service-outlet/service/service-outlet.service';
import { DeliveryNoteService } from '../../../erp-settlements/delivery-note/service/delivery-note.service';
import { DealerService } from '../../../erp-pages/dealers/dealer/service/dealer.service';
import { IPurchaseOrder } from '../../../erp-settlements/purchase-order/purchase-order.model';
import { IPaymentInvoice } from '../../../erp-settlements/payment-invoice/payment-invoice.model';
import { ISettlement } from '../../../erp-settlements/settlement/settlement.model';
import { PaymentInvoiceService } from '../../../erp-settlements/payment-invoice/service/payment-invoice.service';
import { IPaymentLabel } from '../../../erp-pages/payment-label/payment-label.model';
import { IAssetWarranty } from '../../asset-warranty/asset-warranty.model';
import { IAssetAccessory } from '../../asset-accessory/asset-accessory.model';
import { AssetAccessoryService } from '../../asset-accessory/service/asset-accessory.service';
import { AssetWarrantyService } from '../../asset-warranty/service/asset-warranty.service';
import { select, Store } from '@ngrx/store';
import { State } from '../../../store/global-store.definition';
import {
  copyingWIPRegistrationStatus, creatingWIPRegistrationStatus, editingWIPRegistrationStatus,
  wipRegistrationUpdateSelectedInstance
} from '../../../store/selectors/wip-registration-workflow-status.selector';
import { wipRegistrationDataHasMutated } from '../../../store/actions/wip-registration-update-status.actions';
import { ISettlementCurrency } from '../../../erp-settlements/settlement-currency/settlement-currency.model';
import { IWorkProjectRegister } from '../../work-project-register/work-project-register.model';
import { IBusinessDocument } from '../../../erp-pages/business-document/business-document.model';
import { SettlementCurrencyService } from '../../../erp-settlements/settlement-currency/service/settlement-currency.service';
import { WorkProjectRegisterService } from '../../work-project-register/service/work-project-register.service';
import { BusinessDocumentService } from '../../../erp-pages/business-document/service/business-document.service';

@Component({
  selector: 'jhi-work-in-progress-registration-update',
  templateUrl: './work-in-progress-registration-update.component.html',
})
export class WorkInProgressRegistrationUpdateComponent implements OnInit {
  isSaving = false;

  placeholdersSharedCollection: IPlaceholder[] = [];
  workInProgressRegistrationsSharedCollection: IWorkInProgressRegistration[] = [];
  settlementCurrenciesSharedCollection: ISettlementCurrency[] = [];
  workProjectRegistersSharedCollection: IWorkProjectRegister[] = [];
  businessDocumentsSharedCollection: IBusinessDocument[] = [];
  assetAccessoriesSharedCollection: IAssetAccessory[] = [];
  assetWarrantiesSharedCollection: IAssetWarranty[] = [];
  paymentInvoicesSharedCollection: IPaymentInvoice[] = [];
  serviceOutletsSharedCollection: IServiceOutlet[] = [];
  settlementsSharedCollection: ISettlement[] = [];
  purchaseOrdersSharedCollection: IPurchaseOrder[] = [];
  deliveryNotesSharedCollection: IDeliveryNote[] = [];
  jobSheetsSharedCollection: IJobSheet[] = [];
  dealersSharedCollection: IDealer[] = [];

  editForm = this.fb.group({
    id: [],
    sequenceNumber: [null, [Validators.required]],
    particulars: [],
    instalmentAmount: [],
    comments: [],
    commentsContentType: [],
    levelOfCompletion: [],
    completed: [],
    placeholders: [],
    workInProgressGroup: [],
    settlementCurrency: [],
    workProjectRegister: [],
    businessDocuments: [],
    assetAccessories: [],
    assetWarranties: [],
    invoice: [],
    outletCode: [],
    settlementTransaction: [],
    purchaseOrder: [],
    deliveryNote: [],
    jobSheet: [],
    dealer: [],
  });

  minAccountLengthTerm = 3;

  placeholdersLoading = false;
  placeholderControlInput$ = new Subject<string>();
  placeholderLookups$: Observable<IPlaceholder[]> = of([]);

  paymentInvoicesLoading = false;

  settlementsLoading = false;

  purchaseOrdersLoading = false;

  serviceOutletsLoading = false;

  assetCategoriesLoading = false;

  deliveryNotesLoading = false;

  // Setting up default form states
  weAreCopying = false;
  weAreEditing = false;
  weAreCreating = false;
  selectedItem = {...new WorkInProgressRegistration()}

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected workInProgressRegistrationService: WorkInProgressRegistrationService,
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
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder,
    protected store: Store<State>,
  ) {
    this.store.pipe(select(copyingWIPRegistrationStatus)).subscribe(stat => this.weAreCopying = stat);
    this.store.pipe(select(editingWIPRegistrationStatus)).subscribe(stat => this.weAreEditing = stat);
    this.store.pipe(select(creatingWIPRegistrationStatus)).subscribe(stat => this.weAreCreating = stat);
    this.store.pipe(select(wipRegistrationUpdateSelectedInstance)).subscribe(copied => this.selectedItem = copied);
  }

  ngOnInit(): void {
    if (this.weAreEditing) {
      this.updateForm(this.selectedItem);
    }

    if (this.weAreCopying) {
      this.copyForm(this.selectedItem)
    }

    if (this.weAreCreating) {
      this.loadRelationshipsOptions();
    }
  }

  updatePlaceholders(updated: IPlaceholder[]): void {
    this.editForm.patchValue({ placeholders: [...updated] });
  }
  updateDealer(updated: IDealer): void {
    this.editForm.patchValue({ dealer: updated });
  }
  updateJobSheet(updated: IJobSheet): void {
    this.editForm.patchValue({ jobSheet: updated });
  }
  updateDeliveryNote(updated: IDeliveryNote): void {
    this.editForm.patchValue({ deliveryNote: updated });
  }
  updatePurchaseOrder(updated: IPurchaseOrder): void {
    this.editForm.patchValue({ purchaseOrder: updated });
  }
  updateSettlementTransaction(updated: ISettlement): void {
    this.editForm.patchValue({ settlementTransaction: updated });
  }
  updateOutletCode(updated: IServiceOutlet): void {
    this.editForm.patchValue({ outletCode: updated });
  }
  updateInvoice(updated: IPaymentInvoice): void {
    this.editForm.patchValue({ invoice: updated });
  }
  updateAssetWarranties(updated: IAssetWarranty[]): void {
    this.editForm.patchValue({ assetWarranties: [...updated] });
  }

  updateAssetAccessories(updated: IAssetAccessory[]): void  {
    this.editForm.patchValue({ assetAccessories: [...updated]});
  }

  updateBusinessDocuments(updated: IBusinessDocument[]): void  {
    this.editForm.patchValue({ businessDocuments: [...updated]});
  }

  updateCurrency(updated: ISettlementCurrency): void  {
    this.editForm.patchValue({ settlementCurrency: updated});
  }

  updateWorkInProgressGroup(updated: IWorkInProgressRegistration): void  {
    this.editForm.patchValue({ workInProgressGroup: updated});
  }

  updateWorkProjectRegister(updated: IWorkProjectRegister): void  {
    this.editForm.patchValue({ workProjectRegister: updated});
  }

  trackWorkInProgressRegistrationById(index: number, item: IWorkInProgressRegistration): number {
    return item.id!;
  }

  trackSettlementCurrencyById(index: number, item: ISettlementCurrency): number {
    return item.id!;
  }

  trackWorkProjectRegisterById(index: number, item: IWorkProjectRegister): number {
    return item.id!;
  }

  trackBusinessDocumentById(index: number, item: IBusinessDocument): number {
    return item.id!;
  }

  trackAssetAccessoryById(index: number, item: IAssetAccessory): number {
    return item.id!;
  }

  trackAssetWarrantyById(index: number, item: IAssetWarranty): number {
    return item.id!;
  }

  trackPaymentInvoiceByFn(item: IPaymentInvoice): number {
    return item.id!;
  }

  trackPlaceholdersByFn(item: IPaymentLabel): number {
    return item.id!;
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
    this.store.dispatch(wipRegistrationDataHasMutated());
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    this.subscribeToSaveResponse(this.workInProgressRegistrationService.create(this.createFromForm()));
  }

  edit(): void {
    this.isSaving = true;
    this.subscribeToSaveResponse(this.workInProgressRegistrationService.update(this.createFromForm()));
  }

  copy(): void {
    this.isSaving = true;
    this.subscribeToSaveResponse(this.workInProgressRegistrationService.create(this.copyFromForm()));
  }

  trackPlaceholderById(index: number, item: IPlaceholder): number {
    return item.id!;
  }

  trackPaymentInvoiceById(index: number, item: IPaymentInvoice): number {
    return item.id!;
  }

  trackServiceOutletById(index: number, item: IServiceOutlet): number {
    return item.id!;
  }

  trackSettlementById(index: number, item: ISettlement): number {
    return item.id!;
  }

  trackPurchaseOrderById(index: number, item: IPurchaseOrder): number {
    return item.id!;
  }

  trackDeliveryNoteById(index: number, item: IDeliveryNote): number {
    return item.id!;
  }

  trackJobSheetById(index: number, item: IJobSheet): number {
    return item.id!;
  }

  trackDealerById(index: number, item: IDealer): number {
    return item.id!;
  }

  getSelectedPlaceholder(option: IPlaceholder, selectedVals?: IPlaceholder[]): IPlaceholder {
    if (selectedVals) {
      for (const selectedVal of selectedVals) {
        if (option.id === selectedVal.id) {
          return selectedVal;
        }
      }
    }
    return option;
  }

  getSelectedPaymentInvoice(option: IPaymentInvoice, selectedVals?: IPaymentInvoice[]): IPaymentInvoice {
    if (selectedVals) {
      for (const selectedVal of selectedVals) {
        if (option.id === selectedVal.id) {
          return selectedVal;
        }
      }
    }
    return option;
  }

  getSelectedServiceOutlet(option: IServiceOutlet, selectedVals?: IServiceOutlet[]): IServiceOutlet {
    if (selectedVals) {
      for (const selectedVal of selectedVals) {
        if (option.id === selectedVal.id) {
          return selectedVal;
        }
      }
    }
    return option;
  }

  getSelectedSettlement(option: ISettlement, selectedVals?: ISettlement[]): ISettlement {
    if (selectedVals) {
      for (const selectedVal of selectedVals) {
        if (option.id === selectedVal.id) {
          return selectedVal;
        }
      }
    }
    return option;
  }

  getSelectedPurchaseOrder(option: IPurchaseOrder, selectedVals?: IPurchaseOrder[]): IPurchaseOrder {
    if (selectedVals) {
      for (const selectedVal of selectedVals) {
        if (option.id === selectedVal.id) {
          return selectedVal;
        }
      }
    }
    return option;
  }

  getSelectedDeliveryNote(option: IDeliveryNote, selectedVals?: IDeliveryNote[]): IDeliveryNote {
    if (selectedVals) {
      for (const selectedVal of selectedVals) {
        if (option.id === selectedVal.id) {
          return selectedVal;
        }
      }
    }
    return option;
  }

  getSelectedJobSheet(option: IJobSheet, selectedVals?: IJobSheet[]): IJobSheet {
    if (selectedVals) {
      for (const selectedVal of selectedVals) {
        if (option.id === selectedVal.id) {
          return selectedVal;
        }
      }
    }
    return option;
  }

  getSelectedBusinessDocument(option: IBusinessDocument, selectedVals?: IBusinessDocument[]): IBusinessDocument {
    if (selectedVals) {
      for (const selectedVal of selectedVals) {
        if (option.id === selectedVal.id) {
          return selectedVal;
        }
      }
    }
    return option;
  }

  getSelectedAssetAccessory(option: IAssetAccessory, selectedVals?: IAssetAccessory[]): IAssetAccessory {
    if (selectedVals) {
      for (const selectedVal of selectedVals) {
        if (option.id === selectedVal.id) {
          return selectedVal;
        }
      }
    }
    return option;
  }

  getSelectedAssetWarranty(option: IAssetWarranty, selectedVals?: IAssetWarranty[]): IAssetWarranty {
    if (selectedVals) {
      for (const selectedVal of selectedVals) {
        if (option.id === selectedVal.id) {
          return selectedVal;
        }
      }
    }
    return option;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IWorkInProgressRegistration>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
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
    this.editForm.patchValue({
      id: workInProgressRegistration.id,
      sequenceNumber: workInProgressRegistration.sequenceNumber,
      particulars: workInProgressRegistration.particulars,
      instalmentAmount: workInProgressRegistration.instalmentAmount,
      comments: workInProgressRegistration.comments,
      commentsContentType: workInProgressRegistration.commentsContentType,
      levelOfCompletion: workInProgressRegistration.levelOfCompletion,
      completed: workInProgressRegistration.completed,
      placeholders: workInProgressRegistration.placeholders,
      workInProgressGroup: workInProgressRegistration.workInProgressGroup,
      settlementCurrency: workInProgressRegistration.settlementCurrency,
      workProjectRegister: workInProgressRegistration.workProjectRegister,
      businessDocuments: workInProgressRegistration.businessDocuments,
      assetAccessories: workInProgressRegistration.assetAccessories,
      assetWarranties: workInProgressRegistration.assetWarranties,
      invoice: workInProgressRegistration.invoice,
      outletCode: workInProgressRegistration.outletCode,
      settlementTransaction: workInProgressRegistration.settlementTransaction,
      purchaseOrder: workInProgressRegistration.purchaseOrder,
      deliveryNote: workInProgressRegistration.deliveryNote,
      jobSheet: workInProgressRegistration.jobSheet,
      dealer: workInProgressRegistration.dealer,
    });

    this.placeholdersSharedCollection = this.placeholderService.addPlaceholderToCollectionIfMissing(
      this.placeholdersSharedCollection,
      ...(workInProgressRegistration.placeholders ?? [])
    );
    this.workInProgressRegistrationsSharedCollection =
      this.workInProgressRegistrationService.addWorkInProgressRegistrationToCollectionIfMissing(
        this.workInProgressRegistrationsSharedCollection,
        workInProgressRegistration.workInProgressGroup
      );
    this.settlementCurrenciesSharedCollection = this.settlementCurrencyService.addSettlementCurrencyToCollectionIfMissing(
      this.settlementCurrenciesSharedCollection,
      workInProgressRegistration.settlementCurrency
    );
    this.workProjectRegistersSharedCollection = this.workProjectRegisterService.addWorkProjectRegisterToCollectionIfMissing(
      this.workProjectRegistersSharedCollection,
      workInProgressRegistration.workProjectRegister
    );
    this.businessDocumentsSharedCollection = this.businessDocumentService.addBusinessDocumentToCollectionIfMissing(
      this.businessDocumentsSharedCollection,
      ...(workInProgressRegistration.businessDocuments ?? [])
    );
    this.assetAccessoriesSharedCollection = this.assetAccessoryService.addAssetAccessoryToCollectionIfMissing(
      this.assetAccessoriesSharedCollection,
      ...(workInProgressRegistration.assetAccessories ?? [])
    );
    this.assetWarrantiesSharedCollection = this.assetWarrantyService.addAssetWarrantyToCollectionIfMissing(
      this.assetWarrantiesSharedCollection,
      ...(workInProgressRegistration.assetWarranties ?? [])
    );
    this.paymentInvoicesSharedCollection = this.paymentInvoiceService.addPaymentInvoiceToCollectionIfMissing(
      this.paymentInvoicesSharedCollection,
      workInProgressRegistration.invoice
    );
    this.serviceOutletsSharedCollection = this.serviceOutletService.addServiceOutletToCollectionIfMissing(
      this.serviceOutletsSharedCollection,
      workInProgressRegistration.outletCode
    );
    this.settlementsSharedCollection = this.settlementService.addSettlementToCollectionIfMissing(
      this.settlementsSharedCollection,
      workInProgressRegistration.settlementTransaction
    );
    this.purchaseOrdersSharedCollection = this.purchaseOrderService.addPurchaseOrderToCollectionIfMissing(
      this.purchaseOrdersSharedCollection,
      workInProgressRegistration.purchaseOrder
    );
    this.deliveryNotesSharedCollection = this.deliveryNoteService.addDeliveryNoteToCollectionIfMissing(
      this.deliveryNotesSharedCollection,
      workInProgressRegistration.deliveryNote
    );
    this.jobSheetsSharedCollection = this.jobSheetService.addJobSheetToCollectionIfMissing(
      this.jobSheetsSharedCollection,
      workInProgressRegistration.jobSheet
    );
    this.dealersSharedCollection = this.dealerService.addDealerToCollectionIfMissing(
      this.dealersSharedCollection,
      workInProgressRegistration.dealer
    );
  }

  protected copyForm(workInProgressRegistration: IWorkInProgressRegistration): void {
    this.editForm.patchValue({
      id: workInProgressRegistration.id,
      sequenceNumber: workInProgressRegistration.sequenceNumber,
      particulars: workInProgressRegistration.particulars,
      instalmentAmount: workInProgressRegistration.instalmentAmount,
      comments: workInProgressRegistration.comments,
      commentsContentType: workInProgressRegistration.commentsContentType,
      levelOfCompletion: workInProgressRegistration.levelOfCompletion,
      completed: workInProgressRegistration.completed,
      placeholders: workInProgressRegistration.placeholders,
      workInProgressGroup: workInProgressRegistration.workInProgressGroup,
      settlementCurrency: workInProgressRegistration.settlementCurrency,
      workProjectRegister: workInProgressRegistration.workProjectRegister,
      businessDocuments: workInProgressRegistration.businessDocuments,
      assetAccessories: workInProgressRegistration.assetAccessories,
      assetWarranties: workInProgressRegistration.assetWarranties,
      invoice: workInProgressRegistration.invoice,
      outletCode: workInProgressRegistration.outletCode,
      settlementTransaction: workInProgressRegistration.settlementTransaction,
      purchaseOrder: workInProgressRegistration.purchaseOrder,
      deliveryNote: workInProgressRegistration.deliveryNote,
      jobSheet: workInProgressRegistration.jobSheet,
      dealer: workInProgressRegistration.dealer,
    });

    this.placeholdersSharedCollection = this.placeholderService.addPlaceholderToCollectionIfMissing(
      this.placeholdersSharedCollection,
      ...(workInProgressRegistration.placeholders ?? [])
    );
    this.workInProgressRegistrationsSharedCollection =
      this.workInProgressRegistrationService.addWorkInProgressRegistrationToCollectionIfMissing(
        this.workInProgressRegistrationsSharedCollection,
        workInProgressRegistration.workInProgressGroup
      );
    this.settlementCurrenciesSharedCollection = this.settlementCurrencyService.addSettlementCurrencyToCollectionIfMissing(
      this.settlementCurrenciesSharedCollection,
      workInProgressRegistration.settlementCurrency
    );
    this.workProjectRegistersSharedCollection = this.workProjectRegisterService.addWorkProjectRegisterToCollectionIfMissing(
      this.workProjectRegistersSharedCollection,
      workInProgressRegistration.workProjectRegister
    );
    this.businessDocumentsSharedCollection = this.businessDocumentService.addBusinessDocumentToCollectionIfMissing(
      this.businessDocumentsSharedCollection,
      ...(workInProgressRegistration.businessDocuments ?? [])
    );
    this.assetAccessoriesSharedCollection = this.assetAccessoryService.addAssetAccessoryToCollectionIfMissing(
      this.assetAccessoriesSharedCollection,
      ...(workInProgressRegistration.assetAccessories ?? [])
    );
    this.assetWarrantiesSharedCollection = this.assetWarrantyService.addAssetWarrantyToCollectionIfMissing(
      this.assetWarrantiesSharedCollection,
      ...(workInProgressRegistration.assetWarranties ?? [])
    );
    this.paymentInvoicesSharedCollection = this.paymentInvoiceService.addPaymentInvoiceToCollectionIfMissing(
      this.paymentInvoicesSharedCollection,
      workInProgressRegistration.invoice
    );
    this.serviceOutletsSharedCollection = this.serviceOutletService.addServiceOutletToCollectionIfMissing(
      this.serviceOutletsSharedCollection,
      workInProgressRegistration.outletCode
    );
    this.settlementsSharedCollection = this.settlementService.addSettlementToCollectionIfMissing(
      this.settlementsSharedCollection,
      workInProgressRegistration.settlementTransaction
    );
    this.purchaseOrdersSharedCollection = this.purchaseOrderService.addPurchaseOrderToCollectionIfMissing(
      this.purchaseOrdersSharedCollection,
      workInProgressRegistration.purchaseOrder
    );
    this.deliveryNotesSharedCollection = this.deliveryNoteService.addDeliveryNoteToCollectionIfMissing(
      this.deliveryNotesSharedCollection,
      workInProgressRegistration.deliveryNote
    );
    this.jobSheetsSharedCollection = this.jobSheetService.addJobSheetToCollectionIfMissing(
      this.jobSheetsSharedCollection,
      workInProgressRegistration.jobSheet
    );
    this.dealersSharedCollection = this.dealerService.addDealerToCollectionIfMissing(
      this.dealersSharedCollection,
      workInProgressRegistration.dealer
    );
  }

  protected loadRelationshipsOptions(): void {
    this.placeholderService
      .query()
      .pipe(map((res: HttpResponse<IPlaceholder[]>) => res.body ?? []))
      .pipe(
        map((placeholders: IPlaceholder[]) =>
          this.placeholderService.addPlaceholderToCollectionIfMissing(placeholders, ...(this.editForm.get('placeholders')!.value ?? []))
        )
      )
      .subscribe((placeholders: IPlaceholder[]) => (this.placeholdersSharedCollection = placeholders));

    this.paymentInvoiceService
      .query()
      .pipe(map((res: HttpResponse<IPaymentInvoice[]>) => res.body ?? []))
      .pipe(
        map((paymentInvoices: IPaymentInvoice[]) =>
          this.paymentInvoiceService.addPaymentInvoiceToCollectionIfMissing(
            paymentInvoices,
            ...(this.editForm.get('paymentInvoices')!.value ?? [])
          )
        )
      )
      .subscribe((paymentInvoices: IPaymentInvoice[]) => (this.paymentInvoicesSharedCollection = paymentInvoices));

    this.serviceOutletService
      .query()
      .pipe(map((res: HttpResponse<IServiceOutlet[]>) => res.body ?? []))
      .pipe(
        map((serviceOutlets: IServiceOutlet[]) =>
          this.serviceOutletService.addServiceOutletToCollectionIfMissing(
            serviceOutlets,
            ...(this.editForm.get('serviceOutlets')!.value ?? [])
          )
        )
      )
      .subscribe((serviceOutlets: IServiceOutlet[]) => (this.serviceOutletsSharedCollection = serviceOutlets));

    this.settlementService
      .query()
      .pipe(map((res: HttpResponse<ISettlement[]>) => res.body ?? []))
      .pipe(
        map((settlements: ISettlement[]) =>
          this.settlementService.addSettlementToCollectionIfMissing(settlements, ...(this.editForm.get('settlements')!.value ?? []))
        )
      )
      .subscribe((settlements: ISettlement[]) => (this.settlementsSharedCollection = settlements));

    this.purchaseOrderService
      .query()
      .pipe(map((res: HttpResponse<IPurchaseOrder[]>) => res.body ?? []))
      .pipe(
        map((purchaseOrders: IPurchaseOrder[]) =>
          this.purchaseOrderService.addPurchaseOrderToCollectionIfMissing(
            purchaseOrders,
            ...(this.editForm.get('purchaseOrders')!.value ?? [])
          )
        )
      )
      .subscribe((purchaseOrders: IPurchaseOrder[]) => (this.purchaseOrdersSharedCollection = purchaseOrders));

    this.deliveryNoteService
      .query()
      .pipe(map((res: HttpResponse<IDeliveryNote[]>) => res.body ?? []))
      .pipe(
        map((deliveryNotes: IDeliveryNote[]) =>
          this.deliveryNoteService.addDeliveryNoteToCollectionIfMissing(deliveryNotes, ...(this.editForm.get('deliveryNotes')!.value ?? []))
        )
      )
      .subscribe((deliveryNotes: IDeliveryNote[]) => (this.deliveryNotesSharedCollection = deliveryNotes));

    this.jobSheetService
      .query()
      .pipe(map((res: HttpResponse<IJobSheet[]>) => res.body ?? []))
      .pipe(
        map((jobSheets: IJobSheet[]) =>
          this.jobSheetService.addJobSheetToCollectionIfMissing(jobSheets, ...(this.editForm.get('jobSheets')!.value ?? []))
        )
      )
      .subscribe((jobSheets: IJobSheet[]) => (this.jobSheetsSharedCollection = jobSheets));

    this.dealerService
      .query()
      .pipe(map((res: HttpResponse<IDealer[]>) => res.body ?? []))
      .pipe(map((dealers: IDealer[]) => this.dealerService.addDealerToCollectionIfMissing(dealers, this.editForm.get('dealer')!.value)))
      .subscribe((dealers: IDealer[]) => (this.dealersSharedCollection = dealers));

    this.workInProgressRegistrationService
      .query()
      .pipe(map((res: HttpResponse<IWorkInProgressRegistration[]>) => res.body ?? []))
      .pipe(
        map((workInProgressRegistrations: IWorkInProgressRegistration[]) =>
          this.workInProgressRegistrationService.addWorkInProgressRegistrationToCollectionIfMissing(
            workInProgressRegistrations,
            this.editForm.get('workInProgressGroup')!.value
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
          this.settlementCurrencyService.addSettlementCurrencyToCollectionIfMissing(
            settlementCurrencies,
            this.editForm.get('settlementCurrency')!.value
          )
        )
      )
      .subscribe((settlementCurrencies: ISettlementCurrency[]) => (this.settlementCurrenciesSharedCollection = settlementCurrencies));

    this.workProjectRegisterService
      .query()
      .pipe(map((res: HttpResponse<IWorkProjectRegister[]>) => res.body ?? []))
      .pipe(
        map((workProjectRegisters: IWorkProjectRegister[]) =>
          this.workProjectRegisterService.addWorkProjectRegisterToCollectionIfMissing(
            workProjectRegisters,
            this.editForm.get('workProjectRegister')!.value
          )
        )
      )
      .subscribe((workProjectRegisters: IWorkProjectRegister[]) => (this.workProjectRegistersSharedCollection = workProjectRegisters));

    this.businessDocumentService
      .query()
      .pipe(map((res: HttpResponse<IBusinessDocument[]>) => res.body ?? []))
      .pipe(
        map((businessDocuments: IBusinessDocument[]) =>
          this.businessDocumentService.addBusinessDocumentToCollectionIfMissing(
            businessDocuments,
            ...(this.editForm.get('businessDocuments')!.value ?? [])
          )
        )
      )
      .subscribe((businessDocuments: IBusinessDocument[]) => (this.businessDocumentsSharedCollection = businessDocuments));

    this.assetAccessoryService
      .query()
      .pipe(map((res: HttpResponse<IAssetAccessory[]>) => res.body ?? []))
      .pipe(
        map((assetAccessories: IAssetAccessory[]) =>
          this.assetAccessoryService.addAssetAccessoryToCollectionIfMissing(
            assetAccessories,
            ...(this.editForm.get('assetAccessories')!.value ?? [])
          )
        )
      )
      .subscribe((assetAccessories: IAssetAccessory[]) => (this.assetAccessoriesSharedCollection = assetAccessories));

    this.assetWarrantyService
      .query()
      .pipe(map((res: HttpResponse<IAssetWarranty[]>) => res.body ?? []))
      .pipe(
        map((assetWarranties: IAssetWarranty[]) =>
          this.assetWarrantyService.addAssetWarrantyToCollectionIfMissing(
            assetWarranties,
            ...(this.editForm.get('assetWarranties')!.value ?? [])
          )
        )
      )
      .subscribe((assetWarranties: IAssetWarranty[]) => (this.assetWarrantiesSharedCollection = assetWarranties));
  }

  protected createFromForm(): IWorkInProgressRegistration {
    return {
      ...new WorkInProgressRegistration(),
      id: this.editForm.get(['id'])!.value,
      sequenceNumber: this.editForm.get(['sequenceNumber'])!.value,
      particulars: this.editForm.get(['particulars'])!.value,
      instalmentAmount: this.editForm.get(['instalmentAmount'])!.value,
      commentsContentType: this.editForm.get(['commentsContentType'])!.value,
      comments: this.editForm.get(['comments'])!.value,
      levelOfCompletion: this.editForm.get(['levelOfCompletion'])!.value,
      completed: this.editForm.get(['completed'])!.value,
      placeholders: this.editForm.get(['placeholders'])!.value,
      workInProgressGroup: this.editForm.get(['workInProgressGroup'])!.value,
      settlementCurrency: this.editForm.get(['settlementCurrency'])!.value,
      workProjectRegister: this.editForm.get(['workProjectRegister'])!.value,
      businessDocuments: this.editForm.get(['businessDocuments'])!.value,
      assetAccessories: this.editForm.get(['assetAccessories'])!.value,
      assetWarranties: this.editForm.get(['assetWarranties'])!.value,
      invoice: this.editForm.get(['invoice'])!.value,
      outletCode: this.editForm.get(['outletCode'])!.value,
      settlementTransaction: this.editForm.get(['settlementTransaction'])!.value,
      purchaseOrder: this.editForm.get(['purchaseOrder'])!.value,
      deliveryNote: this.editForm.get(['deliveryNote'])!.value,
      jobSheet: this.editForm.get(['jobSheet'])!.value,
      dealer: this.editForm.get(['dealer'])!.value,
    };
  }

  protected copyFromForm(): IWorkInProgressRegistration {
    return {
      ...new WorkInProgressRegistration(),
      // id: this.editForm.get(['id'])!.value,
      sequenceNumber: this.editForm.get(['sequenceNumber'])!.value,
      particulars: this.editForm.get(['particulars'])!.value,
      instalmentAmount: this.editForm.get(['instalmentAmount'])!.value,
      commentsContentType: this.editForm.get(['commentsContentType'])!.value,
      comments: this.editForm.get(['comments'])!.value,
      levelOfCompletion: this.editForm.get(['levelOfCompletion'])!.value,
      completed: this.editForm.get(['completed'])!.value,
      placeholders: this.editForm.get(['placeholders'])!.value,
      workInProgressGroup: this.editForm.get(['workInProgressGroup'])!.value,
      settlementCurrency: this.editForm.get(['settlementCurrency'])!.value,
      workProjectRegister: this.editForm.get(['workProjectRegister'])!.value,
      businessDocuments: this.editForm.get(['businessDocuments'])!.value,
      assetAccessories: this.editForm.get(['assetAccessories'])!.value,
      assetWarranties: this.editForm.get(['assetWarranties'])!.value,
      invoice: this.editForm.get(['invoice'])!.value,
      outletCode: this.editForm.get(['outletCode'])!.value,
      settlementTransaction: this.editForm.get(['settlementTransaction'])!.value,
      purchaseOrder: this.editForm.get(['purchaseOrder'])!.value,
      deliveryNote: this.editForm.get(['deliveryNote'])!.value,
      jobSheet: this.editForm.get(['jobSheet'])!.value,
      dealer: this.editForm.get(['dealer'])!.value,
    };
  }
}
