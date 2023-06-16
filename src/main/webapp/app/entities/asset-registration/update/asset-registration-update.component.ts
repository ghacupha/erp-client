import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { AssetRegistrationFormService, AssetRegistrationFormGroup } from './asset-registration-form.service';
import { IAssetRegistration } from '../asset-registration.model';
import { AssetRegistrationService } from '../service/asset-registration.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { IPlaceholder } from 'app/entities/erpService/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/erpService/placeholder/service/placeholder.service';
import { IPaymentInvoice } from 'app/entities/payment-invoice/payment-invoice.model';
import { PaymentInvoiceService } from 'app/entities/payment-invoice/service/payment-invoice.service';
import { IServiceOutlet } from 'app/entities/service-outlet/service-outlet.model';
import { ServiceOutletService } from 'app/entities/service-outlet/service/service-outlet.service';
import { ISettlement } from 'app/entities/settlement/settlement.model';
import { SettlementService } from 'app/entities/settlement/service/settlement.service';
import { IAssetCategory } from 'app/entities/asset-category/asset-category.model';
import { AssetCategoryService } from 'app/entities/asset-category/service/asset-category.service';
import { IPurchaseOrder } from 'app/entities/purchase-order/purchase-order.model';
import { PurchaseOrderService } from 'app/entities/purchase-order/service/purchase-order.service';
import { IDeliveryNote } from 'app/entities/delivery-note/delivery-note.model';
import { DeliveryNoteService } from 'app/entities/delivery-note/service/delivery-note.service';
import { IJobSheet } from 'app/entities/job-sheet/job-sheet.model';
import { JobSheetService } from 'app/entities/job-sheet/service/job-sheet.service';
import { IDealer } from 'app/entities/dealers/dealer/dealer.model';
import { DealerService } from 'app/entities/dealers/dealer/service/dealer.service';
import { ISettlementCurrency } from 'app/entities/settlement-currency/settlement-currency.model';
import { SettlementCurrencyService } from 'app/entities/settlement-currency/service/settlement-currency.service';
import { IBusinessDocument } from 'app/entities/business-document/business-document.model';
import { BusinessDocumentService } from 'app/entities/business-document/service/business-document.service';
import { IAssetWarranty } from 'app/entities/asset-warranty/asset-warranty.model';
import { AssetWarrantyService } from 'app/entities/asset-warranty/service/asset-warranty.service';
import { IUniversallyUniqueMapping } from 'app/entities/universally-unique-mapping/universally-unique-mapping.model';
import { UniversallyUniqueMappingService } from 'app/entities/universally-unique-mapping/service/universally-unique-mapping.service';
import { IAssetAccessory } from 'app/entities/asset-accessory/asset-accessory.model';
import { AssetAccessoryService } from 'app/entities/asset-accessory/service/asset-accessory.service';

@Component({
  selector: 'jhi-asset-registration-update',
  templateUrl: './asset-registration-update.component.html',
})
export class AssetRegistrationUpdateComponent implements OnInit {
  isSaving = false;
  assetRegistration: IAssetRegistration | null = null;

  placeholdersSharedCollection: IPlaceholder[] = [];
  paymentInvoicesSharedCollection: IPaymentInvoice[] = [];
  serviceOutletsSharedCollection: IServiceOutlet[] = [];
  settlementsSharedCollection: ISettlement[] = [];
  assetCategoriesSharedCollection: IAssetCategory[] = [];
  purchaseOrdersSharedCollection: IPurchaseOrder[] = [];
  deliveryNotesSharedCollection: IDeliveryNote[] = [];
  jobSheetsSharedCollection: IJobSheet[] = [];
  dealersSharedCollection: IDealer[] = [];
  settlementCurrenciesSharedCollection: ISettlementCurrency[] = [];
  businessDocumentsSharedCollection: IBusinessDocument[] = [];
  assetWarrantiesSharedCollection: IAssetWarranty[] = [];
  universallyUniqueMappingsSharedCollection: IUniversallyUniqueMapping[] = [];
  assetAccessoriesSharedCollection: IAssetAccessory[] = [];

  editForm: AssetRegistrationFormGroup = this.assetRegistrationFormService.createAssetRegistrationFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected assetRegistrationService: AssetRegistrationService,
    protected assetRegistrationFormService: AssetRegistrationFormService,
    protected placeholderService: PlaceholderService,
    protected paymentInvoiceService: PaymentInvoiceService,
    protected serviceOutletService: ServiceOutletService,
    protected settlementService: SettlementService,
    protected assetCategoryService: AssetCategoryService,
    protected purchaseOrderService: PurchaseOrderService,
    protected deliveryNoteService: DeliveryNoteService,
    protected jobSheetService: JobSheetService,
    protected dealerService: DealerService,
    protected settlementCurrencyService: SettlementCurrencyService,
    protected businessDocumentService: BusinessDocumentService,
    protected assetWarrantyService: AssetWarrantyService,
    protected universallyUniqueMappingService: UniversallyUniqueMappingService,
    protected assetAccessoryService: AssetAccessoryService,
    protected activatedRoute: ActivatedRoute
  ) {}

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

  compareSettlementCurrency = (o1: ISettlementCurrency | null, o2: ISettlementCurrency | null): boolean =>
    this.settlementCurrencyService.compareSettlementCurrency(o1, o2);

  compareBusinessDocument = (o1: IBusinessDocument | null, o2: IBusinessDocument | null): boolean =>
    this.businessDocumentService.compareBusinessDocument(o1, o2);

  compareAssetWarranty = (o1: IAssetWarranty | null, o2: IAssetWarranty | null): boolean =>
    this.assetWarrantyService.compareAssetWarranty(o1, o2);

  compareUniversallyUniqueMapping = (o1: IUniversallyUniqueMapping | null, o2: IUniversallyUniqueMapping | null): boolean =>
    this.universallyUniqueMappingService.compareUniversallyUniqueMapping(o1, o2);

  compareAssetAccessory = (o1: IAssetAccessory | null, o2: IAssetAccessory | null): boolean =>
    this.assetAccessoryService.compareAssetAccessory(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ assetRegistration }) => {
      this.assetRegistration = assetRegistration;
      if (assetRegistration) {
        this.updateForm(assetRegistration);
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
    const assetRegistration = this.assetRegistrationFormService.getAssetRegistration(this.editForm);
    if (assetRegistration.id !== null) {
      this.subscribeToSaveResponse(this.assetRegistrationService.update(assetRegistration));
    } else {
      this.subscribeToSaveResponse(this.assetRegistrationService.create(assetRegistration));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAssetRegistration>>): void {
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

  protected updateForm(assetRegistration: IAssetRegistration): void {
    this.assetRegistration = assetRegistration;
    this.assetRegistrationFormService.resetForm(this.editForm, assetRegistration);

    this.placeholdersSharedCollection = this.placeholderService.addPlaceholderToCollectionIfMissing<IPlaceholder>(
      this.placeholdersSharedCollection,
      ...(assetRegistration.placeholders ?? [])
    );
    this.paymentInvoicesSharedCollection = this.paymentInvoiceService.addPaymentInvoiceToCollectionIfMissing<IPaymentInvoice>(
      this.paymentInvoicesSharedCollection,
      ...(assetRegistration.paymentInvoices ?? [])
    );
    this.serviceOutletsSharedCollection = this.serviceOutletService.addServiceOutletToCollectionIfMissing<IServiceOutlet>(
      this.serviceOutletsSharedCollection,
      assetRegistration.mainServiceOutlet,
      ...(assetRegistration.serviceOutlets ?? [])
    );
    this.settlementsSharedCollection = this.settlementService.addSettlementToCollectionIfMissing<ISettlement>(
      this.settlementsSharedCollection,
      ...(assetRegistration.settlements ?? [])
    );
    this.assetCategoriesSharedCollection = this.assetCategoryService.addAssetCategoryToCollectionIfMissing<IAssetCategory>(
      this.assetCategoriesSharedCollection,
      assetRegistration.assetCategory
    );
    this.purchaseOrdersSharedCollection = this.purchaseOrderService.addPurchaseOrderToCollectionIfMissing<IPurchaseOrder>(
      this.purchaseOrdersSharedCollection,
      ...(assetRegistration.purchaseOrders ?? [])
    );
    this.deliveryNotesSharedCollection = this.deliveryNoteService.addDeliveryNoteToCollectionIfMissing<IDeliveryNote>(
      this.deliveryNotesSharedCollection,
      ...(assetRegistration.deliveryNotes ?? [])
    );
    this.jobSheetsSharedCollection = this.jobSheetService.addJobSheetToCollectionIfMissing<IJobSheet>(
      this.jobSheetsSharedCollection,
      ...(assetRegistration.jobSheets ?? [])
    );
    this.dealersSharedCollection = this.dealerService.addDealerToCollectionIfMissing<IDealer>(
      this.dealersSharedCollection,
      assetRegistration.dealer,
      ...(assetRegistration.designatedUsers ?? [])
    );
    this.settlementCurrenciesSharedCollection =
      this.settlementCurrencyService.addSettlementCurrencyToCollectionIfMissing<ISettlementCurrency>(
        this.settlementCurrenciesSharedCollection,
        assetRegistration.settlementCurrency
      );
    this.businessDocumentsSharedCollection = this.businessDocumentService.addBusinessDocumentToCollectionIfMissing<IBusinessDocument>(
      this.businessDocumentsSharedCollection,
      ...(assetRegistration.businessDocuments ?? [])
    );
    this.assetWarrantiesSharedCollection = this.assetWarrantyService.addAssetWarrantyToCollectionIfMissing<IAssetWarranty>(
      this.assetWarrantiesSharedCollection,
      ...(assetRegistration.assetWarranties ?? [])
    );
    this.universallyUniqueMappingsSharedCollection =
      this.universallyUniqueMappingService.addUniversallyUniqueMappingToCollectionIfMissing<IUniversallyUniqueMapping>(
        this.universallyUniqueMappingsSharedCollection,
        ...(assetRegistration.universallyUniqueMappings ?? [])
      );
    this.assetAccessoriesSharedCollection = this.assetAccessoryService.addAssetAccessoryToCollectionIfMissing<IAssetAccessory>(
      this.assetAccessoriesSharedCollection,
      ...(assetRegistration.assetAccessories ?? [])
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
            ...(this.assetRegistration?.placeholders ?? [])
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
            ...(this.assetRegistration?.paymentInvoices ?? [])
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
            this.assetRegistration?.mainServiceOutlet,
            ...(this.assetRegistration?.serviceOutlets ?? [])
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
            ...(this.assetRegistration?.settlements ?? [])
          )
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
            this.assetRegistration?.assetCategory
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
            ...(this.assetRegistration?.purchaseOrders ?? [])
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
            ...(this.assetRegistration?.deliveryNotes ?? [])
          )
        )
      )
      .subscribe((deliveryNotes: IDeliveryNote[]) => (this.deliveryNotesSharedCollection = deliveryNotes));

    this.jobSheetService
      .query()
      .pipe(map((res: HttpResponse<IJobSheet[]>) => res.body ?? []))
      .pipe(
        map((jobSheets: IJobSheet[]) =>
          this.jobSheetService.addJobSheetToCollectionIfMissing<IJobSheet>(jobSheets, ...(this.assetRegistration?.jobSheets ?? []))
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
            this.assetRegistration?.dealer,
            ...(this.assetRegistration?.designatedUsers ?? [])
          )
        )
      )
      .subscribe((dealers: IDealer[]) => (this.dealersSharedCollection = dealers));

    this.settlementCurrencyService
      .query()
      .pipe(map((res: HttpResponse<ISettlementCurrency[]>) => res.body ?? []))
      .pipe(
        map((settlementCurrencies: ISettlementCurrency[]) =>
          this.settlementCurrencyService.addSettlementCurrencyToCollectionIfMissing<ISettlementCurrency>(
            settlementCurrencies,
            this.assetRegistration?.settlementCurrency
          )
        )
      )
      .subscribe((settlementCurrencies: ISettlementCurrency[]) => (this.settlementCurrenciesSharedCollection = settlementCurrencies));

    this.businessDocumentService
      .query()
      .pipe(map((res: HttpResponse<IBusinessDocument[]>) => res.body ?? []))
      .pipe(
        map((businessDocuments: IBusinessDocument[]) =>
          this.businessDocumentService.addBusinessDocumentToCollectionIfMissing<IBusinessDocument>(
            businessDocuments,
            ...(this.assetRegistration?.businessDocuments ?? [])
          )
        )
      )
      .subscribe((businessDocuments: IBusinessDocument[]) => (this.businessDocumentsSharedCollection = businessDocuments));

    this.assetWarrantyService
      .query()
      .pipe(map((res: HttpResponse<IAssetWarranty[]>) => res.body ?? []))
      .pipe(
        map((assetWarranties: IAssetWarranty[]) =>
          this.assetWarrantyService.addAssetWarrantyToCollectionIfMissing<IAssetWarranty>(
            assetWarranties,
            ...(this.assetRegistration?.assetWarranties ?? [])
          )
        )
      )
      .subscribe((assetWarranties: IAssetWarranty[]) => (this.assetWarrantiesSharedCollection = assetWarranties));

    this.universallyUniqueMappingService
      .query()
      .pipe(map((res: HttpResponse<IUniversallyUniqueMapping[]>) => res.body ?? []))
      .pipe(
        map((universallyUniqueMappings: IUniversallyUniqueMapping[]) =>
          this.universallyUniqueMappingService.addUniversallyUniqueMappingToCollectionIfMissing<IUniversallyUniqueMapping>(
            universallyUniqueMappings,
            ...(this.assetRegistration?.universallyUniqueMappings ?? [])
          )
        )
      )
      .subscribe(
        (universallyUniqueMappings: IUniversallyUniqueMapping[]) =>
          (this.universallyUniqueMappingsSharedCollection = universallyUniqueMappings)
      );

    this.assetAccessoryService
      .query()
      .pipe(map((res: HttpResponse<IAssetAccessory[]>) => res.body ?? []))
      .pipe(
        map((assetAccessories: IAssetAccessory[]) =>
          this.assetAccessoryService.addAssetAccessoryToCollectionIfMissing<IAssetAccessory>(
            assetAccessories,
            ...(this.assetRegistration?.assetAccessories ?? [])
          )
        )
      )
      .subscribe((assetAccessories: IAssetAccessory[]) => (this.assetAccessoriesSharedCollection = assetAccessories));
  }
}
