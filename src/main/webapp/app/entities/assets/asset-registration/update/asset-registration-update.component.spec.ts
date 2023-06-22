import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { AssetRegistrationFormService } from './asset-registration-form.service';
import { AssetRegistrationService } from '../service/asset-registration.service';
import { IAssetRegistration } from '../asset-registration.model';
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
import { ISettlementCurrency } from 'app/entities/settlement/settlement-currency/settlement-currency.model';
import { SettlementCurrencyService } from 'app/entities/settlement/settlement-currency/service/settlement-currency.service';
import { IBusinessDocument } from 'app/entities/documentation/business-document/business-document.model';
import { BusinessDocumentService } from 'app/entities/documentation/business-document/service/business-document.service';
import { IAssetWarranty } from 'app/entities/assets/asset-warranty/asset-warranty.model';
import { AssetWarrantyService } from 'app/entities/assets/asset-warranty/service/asset-warranty.service';
import { IUniversallyUniqueMapping } from 'app/entities/system/universally-unique-mapping/universally-unique-mapping.model';
import { UniversallyUniqueMappingService } from 'app/entities/system/universally-unique-mapping/service/universally-unique-mapping.service';
import { IAssetAccessory } from 'app/entities/assets/asset-accessory/asset-accessory.model';
import { AssetAccessoryService } from 'app/entities/assets/asset-accessory/service/asset-accessory.service';

import { AssetRegistrationUpdateComponent } from './asset-registration-update.component';

describe('AssetRegistration Management Update Component', () => {
  let comp: AssetRegistrationUpdateComponent;
  let fixture: ComponentFixture<AssetRegistrationUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let assetRegistrationFormService: AssetRegistrationFormService;
  let assetRegistrationService: AssetRegistrationService;
  let placeholderService: PlaceholderService;
  let paymentInvoiceService: PaymentInvoiceService;
  let serviceOutletService: ServiceOutletService;
  let settlementService: SettlementService;
  let assetCategoryService: AssetCategoryService;
  let purchaseOrderService: PurchaseOrderService;
  let deliveryNoteService: DeliveryNoteService;
  let jobSheetService: JobSheetService;
  let dealerService: DealerService;
  let settlementCurrencyService: SettlementCurrencyService;
  let businessDocumentService: BusinessDocumentService;
  let assetWarrantyService: AssetWarrantyService;
  let universallyUniqueMappingService: UniversallyUniqueMappingService;
  let assetAccessoryService: AssetAccessoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [AssetRegistrationUpdateComponent],
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
      .overrideTemplate(AssetRegistrationUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AssetRegistrationUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    assetRegistrationFormService = TestBed.inject(AssetRegistrationFormService);
    assetRegistrationService = TestBed.inject(AssetRegistrationService);
    placeholderService = TestBed.inject(PlaceholderService);
    paymentInvoiceService = TestBed.inject(PaymentInvoiceService);
    serviceOutletService = TestBed.inject(ServiceOutletService);
    settlementService = TestBed.inject(SettlementService);
    assetCategoryService = TestBed.inject(AssetCategoryService);
    purchaseOrderService = TestBed.inject(PurchaseOrderService);
    deliveryNoteService = TestBed.inject(DeliveryNoteService);
    jobSheetService = TestBed.inject(JobSheetService);
    dealerService = TestBed.inject(DealerService);
    settlementCurrencyService = TestBed.inject(SettlementCurrencyService);
    businessDocumentService = TestBed.inject(BusinessDocumentService);
    assetWarrantyService = TestBed.inject(AssetWarrantyService);
    universallyUniqueMappingService = TestBed.inject(UniversallyUniqueMappingService);
    assetAccessoryService = TestBed.inject(AssetAccessoryService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Placeholder query and add missing value', () => {
      const assetRegistration: IAssetRegistration = { id: 456 };
      const placeholders: IPlaceholder[] = [{ id: 25051 }];
      assetRegistration.placeholders = placeholders;

      const placeholderCollection: IPlaceholder[] = [{ id: 84381 }];
      jest.spyOn(placeholderService, 'query').mockReturnValue(of(new HttpResponse({ body: placeholderCollection })));
      const additionalPlaceholders = [...placeholders];
      const expectedCollection: IPlaceholder[] = [...additionalPlaceholders, ...placeholderCollection];
      jest.spyOn(placeholderService, 'addPlaceholderToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ assetRegistration });
      comp.ngOnInit();

      expect(placeholderService.query).toHaveBeenCalled();
      expect(placeholderService.addPlaceholderToCollectionIfMissing).toHaveBeenCalledWith(
        placeholderCollection,
        ...additionalPlaceholders.map(expect.objectContaining)
      );
      expect(comp.placeholdersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call PaymentInvoice query and add missing value', () => {
      const assetRegistration: IAssetRegistration = { id: 456 };
      const paymentInvoices: IPaymentInvoice[] = [{ id: 45457 }];
      assetRegistration.paymentInvoices = paymentInvoices;

      const paymentInvoiceCollection: IPaymentInvoice[] = [{ id: 30575 }];
      jest.spyOn(paymentInvoiceService, 'query').mockReturnValue(of(new HttpResponse({ body: paymentInvoiceCollection })));
      const additionalPaymentInvoices = [...paymentInvoices];
      const expectedCollection: IPaymentInvoice[] = [...additionalPaymentInvoices, ...paymentInvoiceCollection];
      jest.spyOn(paymentInvoiceService, 'addPaymentInvoiceToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ assetRegistration });
      comp.ngOnInit();

      expect(paymentInvoiceService.query).toHaveBeenCalled();
      expect(paymentInvoiceService.addPaymentInvoiceToCollectionIfMissing).toHaveBeenCalledWith(
        paymentInvoiceCollection,
        ...additionalPaymentInvoices.map(expect.objectContaining)
      );
      expect(comp.paymentInvoicesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call ServiceOutlet query and add missing value', () => {
      const assetRegistration: IAssetRegistration = { id: 456 };
      const mainServiceOutlet: IServiceOutlet = { id: 10495 };
      assetRegistration.mainServiceOutlet = mainServiceOutlet;
      const serviceOutlets: IServiceOutlet[] = [{ id: 12055 }];
      assetRegistration.serviceOutlets = serviceOutlets;

      const serviceOutletCollection: IServiceOutlet[] = [{ id: 40506 }];
      jest.spyOn(serviceOutletService, 'query').mockReturnValue(of(new HttpResponse({ body: serviceOutletCollection })));
      const additionalServiceOutlets = [mainServiceOutlet, ...serviceOutlets];
      const expectedCollection: IServiceOutlet[] = [...additionalServiceOutlets, ...serviceOutletCollection];
      jest.spyOn(serviceOutletService, 'addServiceOutletToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ assetRegistration });
      comp.ngOnInit();

      expect(serviceOutletService.query).toHaveBeenCalled();
      expect(serviceOutletService.addServiceOutletToCollectionIfMissing).toHaveBeenCalledWith(
        serviceOutletCollection,
        ...additionalServiceOutlets.map(expect.objectContaining)
      );
      expect(comp.serviceOutletsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Settlement query and add missing value', () => {
      const assetRegistration: IAssetRegistration = { id: 456 };
      const settlements: ISettlement[] = [{ id: 6062 }];
      assetRegistration.settlements = settlements;

      const settlementCollection: ISettlement[] = [{ id: 63020 }];
      jest.spyOn(settlementService, 'query').mockReturnValue(of(new HttpResponse({ body: settlementCollection })));
      const additionalSettlements = [...settlements];
      const expectedCollection: ISettlement[] = [...additionalSettlements, ...settlementCollection];
      jest.spyOn(settlementService, 'addSettlementToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ assetRegistration });
      comp.ngOnInit();

      expect(settlementService.query).toHaveBeenCalled();
      expect(settlementService.addSettlementToCollectionIfMissing).toHaveBeenCalledWith(
        settlementCollection,
        ...additionalSettlements.map(expect.objectContaining)
      );
      expect(comp.settlementsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call AssetCategory query and add missing value', () => {
      const assetRegistration: IAssetRegistration = { id: 456 };
      const assetCategory: IAssetCategory = { id: 21835 };
      assetRegistration.assetCategory = assetCategory;

      const assetCategoryCollection: IAssetCategory[] = [{ id: 71839 }];
      jest.spyOn(assetCategoryService, 'query').mockReturnValue(of(new HttpResponse({ body: assetCategoryCollection })));
      const additionalAssetCategories = [assetCategory];
      const expectedCollection: IAssetCategory[] = [...additionalAssetCategories, ...assetCategoryCollection];
      jest.spyOn(assetCategoryService, 'addAssetCategoryToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ assetRegistration });
      comp.ngOnInit();

      expect(assetCategoryService.query).toHaveBeenCalled();
      expect(assetCategoryService.addAssetCategoryToCollectionIfMissing).toHaveBeenCalledWith(
        assetCategoryCollection,
        ...additionalAssetCategories.map(expect.objectContaining)
      );
      expect(comp.assetCategoriesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call PurchaseOrder query and add missing value', () => {
      const assetRegistration: IAssetRegistration = { id: 456 };
      const purchaseOrders: IPurchaseOrder[] = [{ id: 49980 }];
      assetRegistration.purchaseOrders = purchaseOrders;

      const purchaseOrderCollection: IPurchaseOrder[] = [{ id: 73732 }];
      jest.spyOn(purchaseOrderService, 'query').mockReturnValue(of(new HttpResponse({ body: purchaseOrderCollection })));
      const additionalPurchaseOrders = [...purchaseOrders];
      const expectedCollection: IPurchaseOrder[] = [...additionalPurchaseOrders, ...purchaseOrderCollection];
      jest.spyOn(purchaseOrderService, 'addPurchaseOrderToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ assetRegistration });
      comp.ngOnInit();

      expect(purchaseOrderService.query).toHaveBeenCalled();
      expect(purchaseOrderService.addPurchaseOrderToCollectionIfMissing).toHaveBeenCalledWith(
        purchaseOrderCollection,
        ...additionalPurchaseOrders.map(expect.objectContaining)
      );
      expect(comp.purchaseOrdersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call DeliveryNote query and add missing value', () => {
      const assetRegistration: IAssetRegistration = { id: 456 };
      const deliveryNotes: IDeliveryNote[] = [{ id: 10951 }];
      assetRegistration.deliveryNotes = deliveryNotes;

      const deliveryNoteCollection: IDeliveryNote[] = [{ id: 66367 }];
      jest.spyOn(deliveryNoteService, 'query').mockReturnValue(of(new HttpResponse({ body: deliveryNoteCollection })));
      const additionalDeliveryNotes = [...deliveryNotes];
      const expectedCollection: IDeliveryNote[] = [...additionalDeliveryNotes, ...deliveryNoteCollection];
      jest.spyOn(deliveryNoteService, 'addDeliveryNoteToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ assetRegistration });
      comp.ngOnInit();

      expect(deliveryNoteService.query).toHaveBeenCalled();
      expect(deliveryNoteService.addDeliveryNoteToCollectionIfMissing).toHaveBeenCalledWith(
        deliveryNoteCollection,
        ...additionalDeliveryNotes.map(expect.objectContaining)
      );
      expect(comp.deliveryNotesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call JobSheet query and add missing value', () => {
      const assetRegistration: IAssetRegistration = { id: 456 };
      const jobSheets: IJobSheet[] = [{ id: 55109 }];
      assetRegistration.jobSheets = jobSheets;

      const jobSheetCollection: IJobSheet[] = [{ id: 87250 }];
      jest.spyOn(jobSheetService, 'query').mockReturnValue(of(new HttpResponse({ body: jobSheetCollection })));
      const additionalJobSheets = [...jobSheets];
      const expectedCollection: IJobSheet[] = [...additionalJobSheets, ...jobSheetCollection];
      jest.spyOn(jobSheetService, 'addJobSheetToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ assetRegistration });
      comp.ngOnInit();

      expect(jobSheetService.query).toHaveBeenCalled();
      expect(jobSheetService.addJobSheetToCollectionIfMissing).toHaveBeenCalledWith(
        jobSheetCollection,
        ...additionalJobSheets.map(expect.objectContaining)
      );
      expect(comp.jobSheetsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Dealer query and add missing value', () => {
      const assetRegistration: IAssetRegistration = { id: 456 };
      const dealer: IDealer = { id: 96972 };
      assetRegistration.dealer = dealer;
      const designatedUsers: IDealer[] = [{ id: 8695 }];
      assetRegistration.designatedUsers = designatedUsers;

      const dealerCollection: IDealer[] = [{ id: 6655 }];
      jest.spyOn(dealerService, 'query').mockReturnValue(of(new HttpResponse({ body: dealerCollection })));
      const additionalDealers = [dealer, ...designatedUsers];
      const expectedCollection: IDealer[] = [...additionalDealers, ...dealerCollection];
      jest.spyOn(dealerService, 'addDealerToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ assetRegistration });
      comp.ngOnInit();

      expect(dealerService.query).toHaveBeenCalled();
      expect(dealerService.addDealerToCollectionIfMissing).toHaveBeenCalledWith(
        dealerCollection,
        ...additionalDealers.map(expect.objectContaining)
      );
      expect(comp.dealersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call SettlementCurrency query and add missing value', () => {
      const assetRegistration: IAssetRegistration = { id: 456 };
      const settlementCurrency: ISettlementCurrency = { id: 59048 };
      assetRegistration.settlementCurrency = settlementCurrency;

      const settlementCurrencyCollection: ISettlementCurrency[] = [{ id: 70043 }];
      jest.spyOn(settlementCurrencyService, 'query').mockReturnValue(of(new HttpResponse({ body: settlementCurrencyCollection })));
      const additionalSettlementCurrencies = [settlementCurrency];
      const expectedCollection: ISettlementCurrency[] = [...additionalSettlementCurrencies, ...settlementCurrencyCollection];
      jest.spyOn(settlementCurrencyService, 'addSettlementCurrencyToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ assetRegistration });
      comp.ngOnInit();

      expect(settlementCurrencyService.query).toHaveBeenCalled();
      expect(settlementCurrencyService.addSettlementCurrencyToCollectionIfMissing).toHaveBeenCalledWith(
        settlementCurrencyCollection,
        ...additionalSettlementCurrencies.map(expect.objectContaining)
      );
      expect(comp.settlementCurrenciesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call BusinessDocument query and add missing value', () => {
      const assetRegistration: IAssetRegistration = { id: 456 };
      const businessDocuments: IBusinessDocument[] = [{ id: 85070 }];
      assetRegistration.businessDocuments = businessDocuments;

      const businessDocumentCollection: IBusinessDocument[] = [{ id: 69317 }];
      jest.spyOn(businessDocumentService, 'query').mockReturnValue(of(new HttpResponse({ body: businessDocumentCollection })));
      const additionalBusinessDocuments = [...businessDocuments];
      const expectedCollection: IBusinessDocument[] = [...additionalBusinessDocuments, ...businessDocumentCollection];
      jest.spyOn(businessDocumentService, 'addBusinessDocumentToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ assetRegistration });
      comp.ngOnInit();

      expect(businessDocumentService.query).toHaveBeenCalled();
      expect(businessDocumentService.addBusinessDocumentToCollectionIfMissing).toHaveBeenCalledWith(
        businessDocumentCollection,
        ...additionalBusinessDocuments.map(expect.objectContaining)
      );
      expect(comp.businessDocumentsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call AssetWarranty query and add missing value', () => {
      const assetRegistration: IAssetRegistration = { id: 456 };
      const assetWarranties: IAssetWarranty[] = [{ id: 22327 }];
      assetRegistration.assetWarranties = assetWarranties;

      const assetWarrantyCollection: IAssetWarranty[] = [{ id: 8018 }];
      jest.spyOn(assetWarrantyService, 'query').mockReturnValue(of(new HttpResponse({ body: assetWarrantyCollection })));
      const additionalAssetWarranties = [...assetWarranties];
      const expectedCollection: IAssetWarranty[] = [...additionalAssetWarranties, ...assetWarrantyCollection];
      jest.spyOn(assetWarrantyService, 'addAssetWarrantyToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ assetRegistration });
      comp.ngOnInit();

      expect(assetWarrantyService.query).toHaveBeenCalled();
      expect(assetWarrantyService.addAssetWarrantyToCollectionIfMissing).toHaveBeenCalledWith(
        assetWarrantyCollection,
        ...additionalAssetWarranties.map(expect.objectContaining)
      );
      expect(comp.assetWarrantiesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call UniversallyUniqueMapping query and add missing value', () => {
      const assetRegistration: IAssetRegistration = { id: 456 };
      const universallyUniqueMappings: IUniversallyUniqueMapping[] = [{ id: 30947 }];
      assetRegistration.universallyUniqueMappings = universallyUniqueMappings;

      const universallyUniqueMappingCollection: IUniversallyUniqueMapping[] = [{ id: 64874 }];
      jest
        .spyOn(universallyUniqueMappingService, 'query')
        .mockReturnValue(of(new HttpResponse({ body: universallyUniqueMappingCollection })));
      const additionalUniversallyUniqueMappings = [...universallyUniqueMappings];
      const expectedCollection: IUniversallyUniqueMapping[] = [
        ...additionalUniversallyUniqueMappings,
        ...universallyUniqueMappingCollection,
      ];
      jest.spyOn(universallyUniqueMappingService, 'addUniversallyUniqueMappingToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ assetRegistration });
      comp.ngOnInit();

      expect(universallyUniqueMappingService.query).toHaveBeenCalled();
      expect(universallyUniqueMappingService.addUniversallyUniqueMappingToCollectionIfMissing).toHaveBeenCalledWith(
        universallyUniqueMappingCollection,
        ...additionalUniversallyUniqueMappings.map(expect.objectContaining)
      );
      expect(comp.universallyUniqueMappingsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call AssetAccessory query and add missing value', () => {
      const assetRegistration: IAssetRegistration = { id: 456 };
      const assetAccessories: IAssetAccessory[] = [{ id: 53192 }];
      assetRegistration.assetAccessories = assetAccessories;

      const assetAccessoryCollection: IAssetAccessory[] = [{ id: 46584 }];
      jest.spyOn(assetAccessoryService, 'query').mockReturnValue(of(new HttpResponse({ body: assetAccessoryCollection })));
      const additionalAssetAccessories = [...assetAccessories];
      const expectedCollection: IAssetAccessory[] = [...additionalAssetAccessories, ...assetAccessoryCollection];
      jest.spyOn(assetAccessoryService, 'addAssetAccessoryToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ assetRegistration });
      comp.ngOnInit();

      expect(assetAccessoryService.query).toHaveBeenCalled();
      expect(assetAccessoryService.addAssetAccessoryToCollectionIfMissing).toHaveBeenCalledWith(
        assetAccessoryCollection,
        ...additionalAssetAccessories.map(expect.objectContaining)
      );
      expect(comp.assetAccessoriesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const assetRegistration: IAssetRegistration = { id: 456 };
      const placeholder: IPlaceholder = { id: 78776 };
      assetRegistration.placeholders = [placeholder];
      const paymentInvoices: IPaymentInvoice = { id: 92454 };
      assetRegistration.paymentInvoices = [paymentInvoices];
      const mainServiceOutlet: IServiceOutlet = { id: 53824 };
      assetRegistration.mainServiceOutlet = mainServiceOutlet;
      const serviceOutlet: IServiceOutlet = { id: 72754 };
      assetRegistration.serviceOutlets = [serviceOutlet];
      const settlement: ISettlement = { id: 26803 };
      assetRegistration.settlements = [settlement];
      const assetCategory: IAssetCategory = { id: 64108 };
      assetRegistration.assetCategory = assetCategory;
      const purchaseOrder: IPurchaseOrder = { id: 76982 };
      assetRegistration.purchaseOrders = [purchaseOrder];
      const deliveryNote: IDeliveryNote = { id: 16266 };
      assetRegistration.deliveryNotes = [deliveryNote];
      const jobSheet: IJobSheet = { id: 76060 };
      assetRegistration.jobSheets = [jobSheet];
      const dealer: IDealer = { id: 59931 };
      assetRegistration.dealer = dealer;
      const designatedUsers: IDealer = { id: 28507 };
      assetRegistration.designatedUsers = [designatedUsers];
      const settlementCurrency: ISettlementCurrency = { id: 34313 };
      assetRegistration.settlementCurrency = settlementCurrency;
      const businessDocument: IBusinessDocument = { id: 72895 };
      assetRegistration.businessDocuments = [businessDocument];
      const assetWarranty: IAssetWarranty = { id: 40730 };
      assetRegistration.assetWarranties = [assetWarranty];
      const universallyUniqueMapping: IUniversallyUniqueMapping = { id: 7146 };
      assetRegistration.universallyUniqueMappings = [universallyUniqueMapping];
      const assetAccessory: IAssetAccessory = { id: 45463 };
      assetRegistration.assetAccessories = [assetAccessory];

      activatedRoute.data = of({ assetRegistration });
      comp.ngOnInit();

      expect(comp.placeholdersSharedCollection).toContain(placeholder);
      expect(comp.paymentInvoicesSharedCollection).toContain(paymentInvoices);
      expect(comp.serviceOutletsSharedCollection).toContain(mainServiceOutlet);
      expect(comp.serviceOutletsSharedCollection).toContain(serviceOutlet);
      expect(comp.settlementsSharedCollection).toContain(settlement);
      expect(comp.assetCategoriesSharedCollection).toContain(assetCategory);
      expect(comp.purchaseOrdersSharedCollection).toContain(purchaseOrder);
      expect(comp.deliveryNotesSharedCollection).toContain(deliveryNote);
      expect(comp.jobSheetsSharedCollection).toContain(jobSheet);
      expect(comp.dealersSharedCollection).toContain(dealer);
      expect(comp.dealersSharedCollection).toContain(designatedUsers);
      expect(comp.settlementCurrenciesSharedCollection).toContain(settlementCurrency);
      expect(comp.businessDocumentsSharedCollection).toContain(businessDocument);
      expect(comp.assetWarrantiesSharedCollection).toContain(assetWarranty);
      expect(comp.universallyUniqueMappingsSharedCollection).toContain(universallyUniqueMapping);
      expect(comp.assetAccessoriesSharedCollection).toContain(assetAccessory);
      expect(comp.assetRegistration).toEqual(assetRegistration);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAssetRegistration>>();
      const assetRegistration = { id: 123 };
      jest.spyOn(assetRegistrationFormService, 'getAssetRegistration').mockReturnValue(assetRegistration);
      jest.spyOn(assetRegistrationService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ assetRegistration });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: assetRegistration }));
      saveSubject.complete();

      // THEN
      expect(assetRegistrationFormService.getAssetRegistration).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(assetRegistrationService.update).toHaveBeenCalledWith(expect.objectContaining(assetRegistration));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAssetRegistration>>();
      const assetRegistration = { id: 123 };
      jest.spyOn(assetRegistrationFormService, 'getAssetRegistration').mockReturnValue({ id: null });
      jest.spyOn(assetRegistrationService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ assetRegistration: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: assetRegistration }));
      saveSubject.complete();

      // THEN
      expect(assetRegistrationFormService.getAssetRegistration).toHaveBeenCalled();
      expect(assetRegistrationService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAssetRegistration>>();
      const assetRegistration = { id: 123 };
      jest.spyOn(assetRegistrationService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ assetRegistration });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(assetRegistrationService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
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

    describe('compareSettlementCurrency', () => {
      it('Should forward to settlementCurrencyService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(settlementCurrencyService, 'compareSettlementCurrency');
        comp.compareSettlementCurrency(entity, entity2);
        expect(settlementCurrencyService.compareSettlementCurrency).toHaveBeenCalledWith(entity, entity2);
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

    describe('compareAssetWarranty', () => {
      it('Should forward to assetWarrantyService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(assetWarrantyService, 'compareAssetWarranty');
        comp.compareAssetWarranty(entity, entity2);
        expect(assetWarrantyService.compareAssetWarranty).toHaveBeenCalledWith(entity, entity2);
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

    describe('compareAssetAccessory', () => {
      it('Should forward to assetAccessoryService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(assetAccessoryService, 'compareAssetAccessory');
        comp.compareAssetAccessory(entity, entity2);
        expect(assetAccessoryService.compareAssetAccessory).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
