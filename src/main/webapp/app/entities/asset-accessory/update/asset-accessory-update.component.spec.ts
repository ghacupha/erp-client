import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { AssetAccessoryFormService } from './asset-accessory-form.service';
import { AssetAccessoryService } from '../service/asset-accessory.service';
import { IAssetAccessory } from '../asset-accessory.model';
import { IAssetWarranty } from 'app/entities/asset-warranty/asset-warranty.model';
import { AssetWarrantyService } from 'app/entities/asset-warranty/service/asset-warranty.service';
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
import { IBusinessDocument } from 'app/entities/business-document/business-document.model';
import { BusinessDocumentService } from 'app/entities/business-document/service/business-document.service';
import { IUniversallyUniqueMapping } from 'app/entities/universally-unique-mapping/universally-unique-mapping.model';
import { UniversallyUniqueMappingService } from 'app/entities/universally-unique-mapping/service/universally-unique-mapping.service';

import { AssetAccessoryUpdateComponent } from './asset-accessory-update.component';

describe('AssetAccessory Management Update Component', () => {
  let comp: AssetAccessoryUpdateComponent;
  let fixture: ComponentFixture<AssetAccessoryUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let assetAccessoryFormService: AssetAccessoryFormService;
  let assetAccessoryService: AssetAccessoryService;
  let assetWarrantyService: AssetWarrantyService;
  let placeholderService: PlaceholderService;
  let paymentInvoiceService: PaymentInvoiceService;
  let serviceOutletService: ServiceOutletService;
  let settlementService: SettlementService;
  let assetCategoryService: AssetCategoryService;
  let purchaseOrderService: PurchaseOrderService;
  let deliveryNoteService: DeliveryNoteService;
  let jobSheetService: JobSheetService;
  let dealerService: DealerService;
  let businessDocumentService: BusinessDocumentService;
  let universallyUniqueMappingService: UniversallyUniqueMappingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [AssetAccessoryUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(AssetAccessoryUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AssetAccessoryUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    assetAccessoryFormService = TestBed.inject(AssetAccessoryFormService);
    assetAccessoryService = TestBed.inject(AssetAccessoryService);
    assetWarrantyService = TestBed.inject(AssetWarrantyService);
    placeholderService = TestBed.inject(PlaceholderService);
    paymentInvoiceService = TestBed.inject(PaymentInvoiceService);
    serviceOutletService = TestBed.inject(ServiceOutletService);
    settlementService = TestBed.inject(SettlementService);
    assetCategoryService = TestBed.inject(AssetCategoryService);
    purchaseOrderService = TestBed.inject(PurchaseOrderService);
    deliveryNoteService = TestBed.inject(DeliveryNoteService);
    jobSheetService = TestBed.inject(JobSheetService);
    dealerService = TestBed.inject(DealerService);
    businessDocumentService = TestBed.inject(BusinessDocumentService);
    universallyUniqueMappingService = TestBed.inject(UniversallyUniqueMappingService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call AssetWarranty query and add missing value', () => {
      const assetAccessory: IAssetAccessory = { id: 456 };
      const assetWarranties: IAssetWarranty[] = [{ id: 53648 }];
      assetAccessory.assetWarranties = assetWarranties;

      const assetWarrantyCollection: IAssetWarranty[] = [{ id: 52634 }];
      jest.spyOn(assetWarrantyService, 'query').mockReturnValue(of(new HttpResponse({ body: assetWarrantyCollection })));
      const additionalAssetWarranties = [...assetWarranties];
      const expectedCollection: IAssetWarranty[] = [...additionalAssetWarranties, ...assetWarrantyCollection];
      jest.spyOn(assetWarrantyService, 'addAssetWarrantyToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ assetAccessory });
      comp.ngOnInit();

      expect(assetWarrantyService.query).toHaveBeenCalled();
      expect(assetWarrantyService.addAssetWarrantyToCollectionIfMissing).toHaveBeenCalledWith(
        assetWarrantyCollection,
        ...additionalAssetWarranties.map(expect.objectContaining)
      );
      expect(comp.assetWarrantiesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Placeholder query and add missing value', () => {
      const assetAccessory: IAssetAccessory = { id: 456 };
      const placeholders: IPlaceholder[] = [{ id: 25316 }];
      assetAccessory.placeholders = placeholders;

      const placeholderCollection: IPlaceholder[] = [{ id: 27607 }];
      jest.spyOn(placeholderService, 'query').mockReturnValue(of(new HttpResponse({ body: placeholderCollection })));
      const additionalPlaceholders = [...placeholders];
      const expectedCollection: IPlaceholder[] = [...additionalPlaceholders, ...placeholderCollection];
      jest.spyOn(placeholderService, 'addPlaceholderToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ assetAccessory });
      comp.ngOnInit();

      expect(placeholderService.query).toHaveBeenCalled();
      expect(placeholderService.addPlaceholderToCollectionIfMissing).toHaveBeenCalledWith(
        placeholderCollection,
        ...additionalPlaceholders.map(expect.objectContaining)
      );
      expect(comp.placeholdersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call PaymentInvoice query and add missing value', () => {
      const assetAccessory: IAssetAccessory = { id: 456 };
      const paymentInvoices: IPaymentInvoice[] = [{ id: 27409 }];
      assetAccessory.paymentInvoices = paymentInvoices;

      const paymentInvoiceCollection: IPaymentInvoice[] = [{ id: 80605 }];
      jest.spyOn(paymentInvoiceService, 'query').mockReturnValue(of(new HttpResponse({ body: paymentInvoiceCollection })));
      const additionalPaymentInvoices = [...paymentInvoices];
      const expectedCollection: IPaymentInvoice[] = [...additionalPaymentInvoices, ...paymentInvoiceCollection];
      jest.spyOn(paymentInvoiceService, 'addPaymentInvoiceToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ assetAccessory });
      comp.ngOnInit();

      expect(paymentInvoiceService.query).toHaveBeenCalled();
      expect(paymentInvoiceService.addPaymentInvoiceToCollectionIfMissing).toHaveBeenCalledWith(
        paymentInvoiceCollection,
        ...additionalPaymentInvoices.map(expect.objectContaining)
      );
      expect(comp.paymentInvoicesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call ServiceOutlet query and add missing value', () => {
      const assetAccessory: IAssetAccessory = { id: 456 };
      const serviceOutlet: IServiceOutlet = { id: 9184 };
      assetAccessory.serviceOutlet = serviceOutlet;

      const serviceOutletCollection: IServiceOutlet[] = [{ id: 42194 }];
      jest.spyOn(serviceOutletService, 'query').mockReturnValue(of(new HttpResponse({ body: serviceOutletCollection })));
      const additionalServiceOutlets = [serviceOutlet];
      const expectedCollection: IServiceOutlet[] = [...additionalServiceOutlets, ...serviceOutletCollection];
      jest.spyOn(serviceOutletService, 'addServiceOutletToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ assetAccessory });
      comp.ngOnInit();

      expect(serviceOutletService.query).toHaveBeenCalled();
      expect(serviceOutletService.addServiceOutletToCollectionIfMissing).toHaveBeenCalledWith(
        serviceOutletCollection,
        ...additionalServiceOutlets.map(expect.objectContaining)
      );
      expect(comp.serviceOutletsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Settlement query and add missing value', () => {
      const assetAccessory: IAssetAccessory = { id: 456 };
      const settlements: ISettlement[] = [{ id: 56784 }];
      assetAccessory.settlements = settlements;

      const settlementCollection: ISettlement[] = [{ id: 7068 }];
      jest.spyOn(settlementService, 'query').mockReturnValue(of(new HttpResponse({ body: settlementCollection })));
      const additionalSettlements = [...settlements];
      const expectedCollection: ISettlement[] = [...additionalSettlements, ...settlementCollection];
      jest.spyOn(settlementService, 'addSettlementToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ assetAccessory });
      comp.ngOnInit();

      expect(settlementService.query).toHaveBeenCalled();
      expect(settlementService.addSettlementToCollectionIfMissing).toHaveBeenCalledWith(
        settlementCollection,
        ...additionalSettlements.map(expect.objectContaining)
      );
      expect(comp.settlementsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call AssetCategory query and add missing value', () => {
      const assetAccessory: IAssetAccessory = { id: 456 };
      const assetCategory: IAssetCategory = { id: 86963 };
      assetAccessory.assetCategory = assetCategory;

      const assetCategoryCollection: IAssetCategory[] = [{ id: 14687 }];
      jest.spyOn(assetCategoryService, 'query').mockReturnValue(of(new HttpResponse({ body: assetCategoryCollection })));
      const additionalAssetCategories = [assetCategory];
      const expectedCollection: IAssetCategory[] = [...additionalAssetCategories, ...assetCategoryCollection];
      jest.spyOn(assetCategoryService, 'addAssetCategoryToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ assetAccessory });
      comp.ngOnInit();

      expect(assetCategoryService.query).toHaveBeenCalled();
      expect(assetCategoryService.addAssetCategoryToCollectionIfMissing).toHaveBeenCalledWith(
        assetCategoryCollection,
        ...additionalAssetCategories.map(expect.objectContaining)
      );
      expect(comp.assetCategoriesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call PurchaseOrder query and add missing value', () => {
      const assetAccessory: IAssetAccessory = { id: 456 };
      const purchaseOrders: IPurchaseOrder[] = [{ id: 11201 }];
      assetAccessory.purchaseOrders = purchaseOrders;

      const purchaseOrderCollection: IPurchaseOrder[] = [{ id: 89287 }];
      jest.spyOn(purchaseOrderService, 'query').mockReturnValue(of(new HttpResponse({ body: purchaseOrderCollection })));
      const additionalPurchaseOrders = [...purchaseOrders];
      const expectedCollection: IPurchaseOrder[] = [...additionalPurchaseOrders, ...purchaseOrderCollection];
      jest.spyOn(purchaseOrderService, 'addPurchaseOrderToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ assetAccessory });
      comp.ngOnInit();

      expect(purchaseOrderService.query).toHaveBeenCalled();
      expect(purchaseOrderService.addPurchaseOrderToCollectionIfMissing).toHaveBeenCalledWith(
        purchaseOrderCollection,
        ...additionalPurchaseOrders.map(expect.objectContaining)
      );
      expect(comp.purchaseOrdersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call DeliveryNote query and add missing value', () => {
      const assetAccessory: IAssetAccessory = { id: 456 };
      const deliveryNotes: IDeliveryNote[] = [{ id: 4899 }];
      assetAccessory.deliveryNotes = deliveryNotes;

      const deliveryNoteCollection: IDeliveryNote[] = [{ id: 32019 }];
      jest.spyOn(deliveryNoteService, 'query').mockReturnValue(of(new HttpResponse({ body: deliveryNoteCollection })));
      const additionalDeliveryNotes = [...deliveryNotes];
      const expectedCollection: IDeliveryNote[] = [...additionalDeliveryNotes, ...deliveryNoteCollection];
      jest.spyOn(deliveryNoteService, 'addDeliveryNoteToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ assetAccessory });
      comp.ngOnInit();

      expect(deliveryNoteService.query).toHaveBeenCalled();
      expect(deliveryNoteService.addDeliveryNoteToCollectionIfMissing).toHaveBeenCalledWith(
        deliveryNoteCollection,
        ...additionalDeliveryNotes.map(expect.objectContaining)
      );
      expect(comp.deliveryNotesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call JobSheet query and add missing value', () => {
      const assetAccessory: IAssetAccessory = { id: 456 };
      const jobSheets: IJobSheet[] = [{ id: 3572 }];
      assetAccessory.jobSheets = jobSheets;

      const jobSheetCollection: IJobSheet[] = [{ id: 75594 }];
      jest.spyOn(jobSheetService, 'query').mockReturnValue(of(new HttpResponse({ body: jobSheetCollection })));
      const additionalJobSheets = [...jobSheets];
      const expectedCollection: IJobSheet[] = [...additionalJobSheets, ...jobSheetCollection];
      jest.spyOn(jobSheetService, 'addJobSheetToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ assetAccessory });
      comp.ngOnInit();

      expect(jobSheetService.query).toHaveBeenCalled();
      expect(jobSheetService.addJobSheetToCollectionIfMissing).toHaveBeenCalledWith(
        jobSheetCollection,
        ...additionalJobSheets.map(expect.objectContaining)
      );
      expect(comp.jobSheetsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Dealer query and add missing value', () => {
      const assetAccessory: IAssetAccessory = { id: 456 };
      const dealer: IDealer = { id: 6339 };
      assetAccessory.dealer = dealer;
      const designatedUsers: IDealer[] = [{ id: 21385 }];
      assetAccessory.designatedUsers = designatedUsers;

      const dealerCollection: IDealer[] = [{ id: 67207 }];
      jest.spyOn(dealerService, 'query').mockReturnValue(of(new HttpResponse({ body: dealerCollection })));
      const additionalDealers = [dealer, ...designatedUsers];
      const expectedCollection: IDealer[] = [...additionalDealers, ...dealerCollection];
      jest.spyOn(dealerService, 'addDealerToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ assetAccessory });
      comp.ngOnInit();

      expect(dealerService.query).toHaveBeenCalled();
      expect(dealerService.addDealerToCollectionIfMissing).toHaveBeenCalledWith(
        dealerCollection,
        ...additionalDealers.map(expect.objectContaining)
      );
      expect(comp.dealersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call BusinessDocument query and add missing value', () => {
      const assetAccessory: IAssetAccessory = { id: 456 };
      const businessDocuments: IBusinessDocument[] = [{ id: 96268 }];
      assetAccessory.businessDocuments = businessDocuments;

      const businessDocumentCollection: IBusinessDocument[] = [{ id: 64327 }];
      jest.spyOn(businessDocumentService, 'query').mockReturnValue(of(new HttpResponse({ body: businessDocumentCollection })));
      const additionalBusinessDocuments = [...businessDocuments];
      const expectedCollection: IBusinessDocument[] = [...additionalBusinessDocuments, ...businessDocumentCollection];
      jest.spyOn(businessDocumentService, 'addBusinessDocumentToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ assetAccessory });
      comp.ngOnInit();

      expect(businessDocumentService.query).toHaveBeenCalled();
      expect(businessDocumentService.addBusinessDocumentToCollectionIfMissing).toHaveBeenCalledWith(
        businessDocumentCollection,
        ...additionalBusinessDocuments.map(expect.objectContaining)
      );
      expect(comp.businessDocumentsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call UniversallyUniqueMapping query and add missing value', () => {
      const assetAccessory: IAssetAccessory = { id: 456 };
      const universallyUniqueMappings: IUniversallyUniqueMapping[] = [{ id: 38781 }];
      assetAccessory.universallyUniqueMappings = universallyUniqueMappings;

      const universallyUniqueMappingCollection: IUniversallyUniqueMapping[] = [{ id: 70096 }];
      jest
        .spyOn(universallyUniqueMappingService, 'query')
        .mockReturnValue(of(new HttpResponse({ body: universallyUniqueMappingCollection })));
      const additionalUniversallyUniqueMappings = [...universallyUniqueMappings];
      const expectedCollection: IUniversallyUniqueMapping[] = [
        ...additionalUniversallyUniqueMappings,
        ...universallyUniqueMappingCollection,
      ];
      jest.spyOn(universallyUniqueMappingService, 'addUniversallyUniqueMappingToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ assetAccessory });
      comp.ngOnInit();

      expect(universallyUniqueMappingService.query).toHaveBeenCalled();
      expect(universallyUniqueMappingService.addUniversallyUniqueMappingToCollectionIfMissing).toHaveBeenCalledWith(
        universallyUniqueMappingCollection,
        ...additionalUniversallyUniqueMappings.map(expect.objectContaining)
      );
      expect(comp.universallyUniqueMappingsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const assetAccessory: IAssetAccessory = { id: 456 };
      const assetWarranty: IAssetWarranty = { id: 76781 };
      assetAccessory.assetWarranties = [assetWarranty];
      const placeholder: IPlaceholder = { id: 71731 };
      assetAccessory.placeholders = [placeholder];
      const paymentInvoices: IPaymentInvoice = { id: 15323 };
      assetAccessory.paymentInvoices = [paymentInvoices];
      const serviceOutlet: IServiceOutlet = { id: 18389 };
      assetAccessory.serviceOutlet = serviceOutlet;
      const settlement: ISettlement = { id: 7422 };
      assetAccessory.settlements = [settlement];
      const assetCategory: IAssetCategory = { id: 53139 };
      assetAccessory.assetCategory = assetCategory;
      const purchaseOrder: IPurchaseOrder = { id: 12965 };
      assetAccessory.purchaseOrders = [purchaseOrder];
      const deliveryNote: IDeliveryNote = { id: 36290 };
      assetAccessory.deliveryNotes = [deliveryNote];
      const jobSheet: IJobSheet = { id: 63356 };
      assetAccessory.jobSheets = [jobSheet];
      const dealer: IDealer = { id: 40159 };
      assetAccessory.dealer = dealer;
      const designatedUsers: IDealer = { id: 98263 };
      assetAccessory.designatedUsers = [designatedUsers];
      const businessDocument: IBusinessDocument = { id: 82834 };
      assetAccessory.businessDocuments = [businessDocument];
      const universallyUniqueMapping: IUniversallyUniqueMapping = { id: 64758 };
      assetAccessory.universallyUniqueMappings = [universallyUniqueMapping];

      activatedRoute.data = of({ assetAccessory });
      comp.ngOnInit();

      expect(comp.assetWarrantiesSharedCollection).toContain(assetWarranty);
      expect(comp.placeholdersSharedCollection).toContain(placeholder);
      expect(comp.paymentInvoicesSharedCollection).toContain(paymentInvoices);
      expect(comp.serviceOutletsSharedCollection).toContain(serviceOutlet);
      expect(comp.settlementsSharedCollection).toContain(settlement);
      expect(comp.assetCategoriesSharedCollection).toContain(assetCategory);
      expect(comp.purchaseOrdersSharedCollection).toContain(purchaseOrder);
      expect(comp.deliveryNotesSharedCollection).toContain(deliveryNote);
      expect(comp.jobSheetsSharedCollection).toContain(jobSheet);
      expect(comp.dealersSharedCollection).toContain(dealer);
      expect(comp.dealersSharedCollection).toContain(designatedUsers);
      expect(comp.businessDocumentsSharedCollection).toContain(businessDocument);
      expect(comp.universallyUniqueMappingsSharedCollection).toContain(universallyUniqueMapping);
      expect(comp.assetAccessory).toEqual(assetAccessory);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAssetAccessory>>();
      const assetAccessory = { id: 123 };
      jest.spyOn(assetAccessoryFormService, 'getAssetAccessory').mockReturnValue(assetAccessory);
      jest.spyOn(assetAccessoryService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ assetAccessory });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: assetAccessory }));
      saveSubject.complete();

      // THEN
      expect(assetAccessoryFormService.getAssetAccessory).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(assetAccessoryService.update).toHaveBeenCalledWith(expect.objectContaining(assetAccessory));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAssetAccessory>>();
      const assetAccessory = { id: 123 };
      jest.spyOn(assetAccessoryFormService, 'getAssetAccessory').mockReturnValue({ id: null });
      jest.spyOn(assetAccessoryService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ assetAccessory: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: assetAccessory }));
      saveSubject.complete();

      // THEN
      expect(assetAccessoryFormService.getAssetAccessory).toHaveBeenCalled();
      expect(assetAccessoryService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAssetAccessory>>();
      const assetAccessory = { id: 123 };
      jest.spyOn(assetAccessoryService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ assetAccessory });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(assetAccessoryService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareAssetWarranty', () => {
      it('Should forward to assetWarrantyService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(assetWarrantyService, 'compareAssetWarranty');
        comp.compareAssetWarranty(entity, entity2);
        expect(assetWarrantyService.compareAssetWarranty).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('comparePlaceholder', () => {
      it('Should forward to placeholderService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(placeholderService, 'comparePlaceholder');
        comp.comparePlaceholder(entity, entity2);
        expect(placeholderService.comparePlaceholder).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('comparePaymentInvoice', () => {
      it('Should forward to paymentInvoiceService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(paymentInvoiceService, 'comparePaymentInvoice');
        comp.comparePaymentInvoice(entity, entity2);
        expect(paymentInvoiceService.comparePaymentInvoice).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareServiceOutlet', () => {
      it('Should forward to serviceOutletService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(serviceOutletService, 'compareServiceOutlet');
        comp.compareServiceOutlet(entity, entity2);
        expect(serviceOutletService.compareServiceOutlet).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareSettlement', () => {
      it('Should forward to settlementService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(settlementService, 'compareSettlement');
        comp.compareSettlement(entity, entity2);
        expect(settlementService.compareSettlement).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareAssetCategory', () => {
      it('Should forward to assetCategoryService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(assetCategoryService, 'compareAssetCategory');
        comp.compareAssetCategory(entity, entity2);
        expect(assetCategoryService.compareAssetCategory).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('comparePurchaseOrder', () => {
      it('Should forward to purchaseOrderService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(purchaseOrderService, 'comparePurchaseOrder');
        comp.comparePurchaseOrder(entity, entity2);
        expect(purchaseOrderService.comparePurchaseOrder).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareDeliveryNote', () => {
      it('Should forward to deliveryNoteService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(deliveryNoteService, 'compareDeliveryNote');
        comp.compareDeliveryNote(entity, entity2);
        expect(deliveryNoteService.compareDeliveryNote).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareJobSheet', () => {
      it('Should forward to jobSheetService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(jobSheetService, 'compareJobSheet');
        comp.compareJobSheet(entity, entity2);
        expect(jobSheetService.compareJobSheet).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareDealer', () => {
      it('Should forward to dealerService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(dealerService, 'compareDealer');
        comp.compareDealer(entity, entity2);
        expect(dealerService.compareDealer).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareBusinessDocument', () => {
      it('Should forward to businessDocumentService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(businessDocumentService, 'compareBusinessDocument');
        comp.compareBusinessDocument(entity, entity2);
        expect(businessDocumentService.compareBusinessDocument).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareUniversallyUniqueMapping', () => {
      it('Should forward to universallyUniqueMappingService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(universallyUniqueMappingService, 'compareUniversallyUniqueMapping');
        comp.compareUniversallyUniqueMapping(entity, entity2);
        expect(universallyUniqueMappingService.compareUniversallyUniqueMapping).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
