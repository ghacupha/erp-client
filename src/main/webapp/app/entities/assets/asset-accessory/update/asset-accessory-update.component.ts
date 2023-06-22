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

import { AssetAccessoryFormService, AssetAccessoryFormGroup } from './asset-accessory-form.service';
import { IAssetAccessory } from '../asset-accessory.model';
import { AssetAccessoryService } from '../service/asset-accessory.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { IAssetWarranty } from 'app/entities/assets/asset-warranty/asset-warranty.model';
import { AssetWarrantyService } from 'app/entities/assets/asset-warranty/service/asset-warranty.service';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/system/placeholder/service/placeholder.service';
import { IPaymentInvoice } from 'app/entities/settlement/payment-invoice/payment-invoice.model';
import { PaymentInvoiceService } from 'app/entities/settlement/payment-invoice/service/payment-invoice.service';
import { IServiceOutlet } from 'app/entities/data/service-outlet/service-outlet.model';
import { ServiceOutletService } from 'app/entities/data/service-outlet/service/service-outlet.service';
import { ISettlement } from 'app/entities/settlement/settlement/settlement.model';
import { SettlementService } from 'app/entities/settlement/settlement/service/settlement.service';
import { IAssetCategory } from 'app/entities/assets/asset-category/asset-category.model';
import { AssetCategoryService } from 'app/entities/assets/asset-category/service/asset-category.service';
import { IPurchaseOrder } from 'app/entities/settlement/purchase-order/purchase-order.model';
import { PurchaseOrderService } from 'app/entities/settlement/purchase-order/service/purchase-order.service';
import { IDeliveryNote } from 'app/entities/settlement/delivery-note/delivery-note.model';
import { DeliveryNoteService } from 'app/entities/settlement/delivery-note/service/delivery-note.service';
import { IJobSheet } from 'app/entities/settlement/job-sheet/job-sheet.model';
import { JobSheetService } from 'app/entities/settlement/job-sheet/service/job-sheet.service';
import { IDealer } from 'app/entities/people/dealer/dealer.model';
import { DealerService } from 'app/entities/people/dealer/service/dealer.service';
import { IBusinessDocument } from 'app/entities/documentation/business-document/business-document.model';
import { BusinessDocumentService } from 'app/entities/documentation/business-document/service/business-document.service';
import { IUniversallyUniqueMapping } from 'app/entities/system/universally-unique-mapping/universally-unique-mapping.model';
import { UniversallyUniqueMappingService } from 'app/entities/system/universally-unique-mapping/service/universally-unique-mapping.service';

@Component({
  selector: 'jhi-asset-accessory-update',
  templateUrl: './asset-accessory-update.component.html',
})
export class AssetAccessoryUpdateComponent implements OnInit {
  isSaving = false;
  assetAccessory: IAssetAccessory | null = null;

  assetWarrantiesSharedCollection: IAssetWarranty[] = [];
  placeholdersSharedCollection: IPlaceholder[] = [];
  paymentInvoicesSharedCollection: IPaymentInvoice[] = [];
  serviceOutletsSharedCollection: IServiceOutlet[] = [];
  settlementsSharedCollection: ISettlement[] = [];
  assetCategoriesSharedCollection: IAssetCategory[] = [];
  purchaseOrdersSharedCollection: IPurchaseOrder[] = [];
  deliveryNotesSharedCollection: IDeliveryNote[] = [];
  jobSheetsSharedCollection: IJobSheet[] = [];
  dealersSharedCollection: IDealer[] = [];
  businessDocumentsSharedCollection: IBusinessDocument[] = [];
  universallyUniqueMappingsSharedCollection: IUniversallyUniqueMapping[] = [];

  editForm: AssetAccessoryFormGroup = this.assetAccessoryFormService.createAssetAccessoryFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected assetAccessoryService: AssetAccessoryService,
    protected assetAccessoryFormService: AssetAccessoryFormService,
    protected assetWarrantyService: AssetWarrantyService,
    protected placeholderService: PlaceholderService,
    protected paymentInvoiceService: PaymentInvoiceService,
    protected serviceOutletService: ServiceOutletService,
    protected settlementService: SettlementService,
    protected assetCategoryService: AssetCategoryService,
    protected purchaseOrderService: PurchaseOrderService,
    protected deliveryNoteService: DeliveryNoteService,
    protected jobSheetService: JobSheetService,
    protected dealerService: DealerService,
    protected businessDocumentService: BusinessDocumentService,
    protected universallyUniqueMappingService: UniversallyUniqueMappingService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareAssetWarranty = (o1: IAssetWarranty | null, o2: IAssetWarranty | null): boolean =>
    this.assetWarrantyService.compareAssetWarranty(o1, o2);

  comparePlaceholder = (o1: IPlaceholder | null, o2: IPlaceholder | null): boolean => this.placeholderService.comparePlaceholder(o1, o2);

  comparePaymentInvoice = (o1: IPaymentInvoice | null, o2: IPaymentInvoice | null): boolean =>
    this.paymentInvoiceService.comparePaymentInvoice(o1, o2);

  compareServiceOutlet = (o1: IServiceOutlet | null, o2: IServiceOutlet | null): boolean =>
    this.serviceOutletService.compareServiceOutlet(o1, o2);

  compareSettlement = (o1: ISettlement | null, o2: ISettlement | null): boolean => this.settlementService.compareSettlement(o1, o2);

  compareAssetCategory = (o1: IAssetCategory | null, o2: IAssetCategory | null): boolean =>
    this.assetCategoryService.compareAssetCategory(o1, o2);

  comparePurchaseOrder = (o1: IPurchaseOrder | null, o2: IPurchaseOrder | null): boolean =>
    this.purchaseOrderService.comparePurchaseOrder(o1, o2);

  compareDeliveryNote = (o1: IDeliveryNote | null, o2: IDeliveryNote | null): boolean =>
    this.deliveryNoteService.compareDeliveryNote(o1, o2);

  compareJobSheet = (o1: IJobSheet | null, o2: IJobSheet | null): boolean => this.jobSheetService.compareJobSheet(o1, o2);

  compareDealer = (o1: IDealer | null, o2: IDealer | null): boolean => this.dealerService.compareDealer(o1, o2);

  compareBusinessDocument = (o1: IBusinessDocument | null, o2: IBusinessDocument | null): boolean =>
    this.businessDocumentService.compareBusinessDocument(o1, o2);

  compareUniversallyUniqueMapping = (o1: IUniversallyUniqueMapping | null, o2: IUniversallyUniqueMapping | null): boolean =>
    this.universallyUniqueMappingService.compareUniversallyUniqueMapping(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ assetAccessory }) => {
      this.assetAccessory = assetAccessory;
      if (assetAccessory) {
        this.updateForm(assetAccessory);
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
    const assetAccessory = this.assetAccessoryFormService.getAssetAccessory(this.editForm);
    if (assetAccessory.id !== null) {
      this.subscribeToSaveResponse(this.assetAccessoryService.update(assetAccessory));
    } else {
      this.subscribeToSaveResponse(this.assetAccessoryService.create(assetAccessory));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAssetAccessory>>): void {
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

  protected updateForm(assetAccessory: IAssetAccessory): void {
    this.assetAccessory = assetAccessory;
    this.assetAccessoryFormService.resetForm(this.editForm, assetAccessory);

    this.assetWarrantiesSharedCollection = this.assetWarrantyService.addAssetWarrantyToCollectionIfMissing<IAssetWarranty>(
      this.assetWarrantiesSharedCollection,
      ...(assetAccessory.assetWarranties ?? [])
    );
    this.placeholdersSharedCollection = this.placeholderService.addPlaceholderToCollectionIfMissing<IPlaceholder>(
      this.placeholdersSharedCollection,
      ...(assetAccessory.placeholders ?? [])
    );
    this.paymentInvoicesSharedCollection = this.paymentInvoiceService.addPaymentInvoiceToCollectionIfMissing<IPaymentInvoice>(
      this.paymentInvoicesSharedCollection,
      ...(assetAccessory.paymentInvoices ?? [])
    );
    this.serviceOutletsSharedCollection = this.serviceOutletService.addServiceOutletToCollectionIfMissing<IServiceOutlet>(
      this.serviceOutletsSharedCollection,
      assetAccessory.serviceOutlet
    );
    this.settlementsSharedCollection = this.settlementService.addSettlementToCollectionIfMissing<ISettlement>(
      this.settlementsSharedCollection,
      ...(assetAccessory.settlements ?? [])
    );
    this.assetCategoriesSharedCollection = this.assetCategoryService.addAssetCategoryToCollectionIfMissing<IAssetCategory>(
      this.assetCategoriesSharedCollection,
      assetAccessory.assetCategory
    );
    this.purchaseOrdersSharedCollection = this.purchaseOrderService.addPurchaseOrderToCollectionIfMissing<IPurchaseOrder>(
      this.purchaseOrdersSharedCollection,
      ...(assetAccessory.purchaseOrders ?? [])
    );
    this.deliveryNotesSharedCollection = this.deliveryNoteService.addDeliveryNoteToCollectionIfMissing<IDeliveryNote>(
      this.deliveryNotesSharedCollection,
      ...(assetAccessory.deliveryNotes ?? [])
    );
    this.jobSheetsSharedCollection = this.jobSheetService.addJobSheetToCollectionIfMissing<IJobSheet>(
      this.jobSheetsSharedCollection,
      ...(assetAccessory.jobSheets ?? [])
    );
    this.dealersSharedCollection = this.dealerService.addDealerToCollectionIfMissing<IDealer>(
      this.dealersSharedCollection,
      assetAccessory.dealer,
      ...(assetAccessory.designatedUsers ?? [])
    );
    this.businessDocumentsSharedCollection = this.businessDocumentService.addBusinessDocumentToCollectionIfMissing<IBusinessDocument>(
      this.businessDocumentsSharedCollection,
      ...(assetAccessory.businessDocuments ?? [])
    );
    this.universallyUniqueMappingsSharedCollection =
      this.universallyUniqueMappingService.addUniversallyUniqueMappingToCollectionIfMissing<IUniversallyUniqueMapping>(
        this.universallyUniqueMappingsSharedCollection,
        ...(assetAccessory.universallyUniqueMappings ?? [])
      );
  }

  protected loadRelationshipsOptions(): void {
    this.assetWarrantyService
      .query()
      .pipe(map((res: HttpResponse<IAssetWarranty[]>) => res.body ?? []))
      .pipe(
        map((assetWarranties: IAssetWarranty[]) =>
          this.assetWarrantyService.addAssetWarrantyToCollectionIfMissing<IAssetWarranty>(
            assetWarranties,
            ...(this.assetAccessory?.assetWarranties ?? [])
          )
        )
      )
      .subscribe((assetWarranties: IAssetWarranty[]) => (this.assetWarrantiesSharedCollection = assetWarranties));

    this.placeholderService
      .query()
      .pipe(map((res: HttpResponse<IPlaceholder[]>) => res.body ?? []))
      .pipe(
        map((placeholders: IPlaceholder[]) =>
          this.placeholderService.addPlaceholderToCollectionIfMissing<IPlaceholder>(
            placeholders,
            ...(this.assetAccessory?.placeholders ?? [])
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
            ...(this.assetAccessory?.paymentInvoices ?? [])
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
            this.assetAccessory?.serviceOutlet
          )
        )
      )
      .subscribe((serviceOutlets: IServiceOutlet[]) => (this.serviceOutletsSharedCollection = serviceOutlets));

    this.settlementService
      .query()
      .pipe(map((res: HttpResponse<ISettlement[]>) => res.body ?? []))
      .pipe(
        map((settlements: ISettlement[]) =>
          this.settlementService.addSettlementToCollectionIfMissing<ISettlement>(settlements, ...(this.assetAccessory?.settlements ?? []))
        )
      )
      .subscribe((settlements: ISettlement[]) => (this.settlementsSharedCollection = settlements));

    this.assetCategoryService
      .query()
      .pipe(map((res: HttpResponse<IAssetCategory[]>) => res.body ?? []))
      .pipe(
        map((assetCategories: IAssetCategory[]) =>
          this.assetCategoryService.addAssetCategoryToCollectionIfMissing<IAssetCategory>(
            assetCategories,
            this.assetAccessory?.assetCategory
          )
        )
      )
      .subscribe((assetCategories: IAssetCategory[]) => (this.assetCategoriesSharedCollection = assetCategories));

    this.purchaseOrderService
      .query()
      .pipe(map((res: HttpResponse<IPurchaseOrder[]>) => res.body ?? []))
      .pipe(
        map((purchaseOrders: IPurchaseOrder[]) =>
          this.purchaseOrderService.addPurchaseOrderToCollectionIfMissing<IPurchaseOrder>(
            purchaseOrders,
            ...(this.assetAccessory?.purchaseOrders ?? [])
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
            ...(this.assetAccessory?.deliveryNotes ?? [])
          )
        )
      )
      .subscribe((deliveryNotes: IDeliveryNote[]) => (this.deliveryNotesSharedCollection = deliveryNotes));

    this.jobSheetService
      .query()
      .pipe(map((res: HttpResponse<IJobSheet[]>) => res.body ?? []))
      .pipe(
        map((jobSheets: IJobSheet[]) =>
          this.jobSheetService.addJobSheetToCollectionIfMissing<IJobSheet>(jobSheets, ...(this.assetAccessory?.jobSheets ?? []))
        )
      )
      .subscribe((jobSheets: IJobSheet[]) => (this.jobSheetsSharedCollection = jobSheets));

    this.dealerService
      .query()
      .pipe(map((res: HttpResponse<IDealer[]>) => res.body ?? []))
      .pipe(
        map((dealers: IDealer[]) =>
          this.dealerService.addDealerToCollectionIfMissing<IDealer>(
            dealers,
            this.assetAccessory?.dealer,
            ...(this.assetAccessory?.designatedUsers ?? [])
          )
        )
      )
      .subscribe((dealers: IDealer[]) => (this.dealersSharedCollection = dealers));

    this.businessDocumentService
      .query()
      .pipe(map((res: HttpResponse<IBusinessDocument[]>) => res.body ?? []))
      .pipe(
        map((businessDocuments: IBusinessDocument[]) =>
          this.businessDocumentService.addBusinessDocumentToCollectionIfMissing<IBusinessDocument>(
            businessDocuments,
            ...(this.assetAccessory?.businessDocuments ?? [])
          )
        )
      )
      .subscribe((businessDocuments: IBusinessDocument[]) => (this.businessDocumentsSharedCollection = businessDocuments));

    this.universallyUniqueMappingService
      .query()
      .pipe(map((res: HttpResponse<IUniversallyUniqueMapping[]>) => res.body ?? []))
      .pipe(
        map((universallyUniqueMappings: IUniversallyUniqueMapping[]) =>
          this.universallyUniqueMappingService.addUniversallyUniqueMappingToCollectionIfMissing<IUniversallyUniqueMapping>(
            universallyUniqueMappings,
            ...(this.assetAccessory?.universallyUniqueMappings ?? [])
          )
        )
      )
      .subscribe(
        (universallyUniqueMappings: IUniversallyUniqueMapping[]) =>
          (this.universallyUniqueMappingsSharedCollection = universallyUniqueMappings)
      );
  }
}
