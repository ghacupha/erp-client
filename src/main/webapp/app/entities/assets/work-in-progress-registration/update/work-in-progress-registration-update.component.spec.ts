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

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { WorkInProgressRegistrationFormService } from './work-in-progress-registration-form.service';
import { WorkInProgressRegistrationService } from '../service/work-in-progress-registration.service';
import { IWorkInProgressRegistration } from '../work-in-progress-registration.model';
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

import { WorkInProgressRegistrationUpdateComponent } from './work-in-progress-registration-update.component';

describe('WorkInProgressRegistration Management Update Component', () => {
  let comp: WorkInProgressRegistrationUpdateComponent;
  let fixture: ComponentFixture<WorkInProgressRegistrationUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let workInProgressRegistrationFormService: WorkInProgressRegistrationFormService;
  let workInProgressRegistrationService: WorkInProgressRegistrationService;
  let placeholderService: PlaceholderService;
  let paymentInvoiceService: PaymentInvoiceService;
  let serviceOutletService: ServiceOutletService;
  let settlementService: SettlementService;
  let purchaseOrderService: PurchaseOrderService;
  let deliveryNoteService: DeliveryNoteService;
  let jobSheetService: JobSheetService;
  let dealerService: DealerService;
  let settlementCurrencyService: SettlementCurrencyService;
  let workProjectRegisterService: WorkProjectRegisterService;
  let businessDocumentService: BusinessDocumentService;
  let assetAccessoryService: AssetAccessoryService;
  let assetWarrantyService: AssetWarrantyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [WorkInProgressRegistrationUpdateComponent],
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
      .overrideTemplate(WorkInProgressRegistrationUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(WorkInProgressRegistrationUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    workInProgressRegistrationFormService = TestBed.inject(WorkInProgressRegistrationFormService);
    workInProgressRegistrationService = TestBed.inject(WorkInProgressRegistrationService);
    placeholderService = TestBed.inject(PlaceholderService);
    paymentInvoiceService = TestBed.inject(PaymentInvoiceService);
    serviceOutletService = TestBed.inject(ServiceOutletService);
    settlementService = TestBed.inject(SettlementService);
    purchaseOrderService = TestBed.inject(PurchaseOrderService);
    deliveryNoteService = TestBed.inject(DeliveryNoteService);
    jobSheetService = TestBed.inject(JobSheetService);
    dealerService = TestBed.inject(DealerService);
    settlementCurrencyService = TestBed.inject(SettlementCurrencyService);
    workProjectRegisterService = TestBed.inject(WorkProjectRegisterService);
    businessDocumentService = TestBed.inject(BusinessDocumentService);
    assetAccessoryService = TestBed.inject(AssetAccessoryService);
    assetWarrantyService = TestBed.inject(AssetWarrantyService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Placeholder query and add missing value', () => {
      const workInProgressRegistration: IWorkInProgressRegistration = { id: 456 };
      const placeholders: IPlaceholder[] = [{ id: 75425 }];
      workInProgressRegistration.placeholders = placeholders;

      const placeholderCollection: IPlaceholder[] = [{ id: 98879 }];
      jest.spyOn(placeholderService, 'query').mockReturnValue(of(new HttpResponse({ body: placeholderCollection })));
      const additionalPlaceholders = [...placeholders];
      const expectedCollection: IPlaceholder[] = [...additionalPlaceholders, ...placeholderCollection];
      jest.spyOn(placeholderService, 'addPlaceholderToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ workInProgressRegistration });
      comp.ngOnInit();

      expect(placeholderService.query).toHaveBeenCalled();
      expect(placeholderService.addPlaceholderToCollectionIfMissing).toHaveBeenCalledWith(
        placeholderCollection,
        ...additionalPlaceholders.map(expect.objectContaining)
      );
      expect(comp.placeholdersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call PaymentInvoice query and add missing value', () => {
      const workInProgressRegistration: IWorkInProgressRegistration = { id: 456 };
      const paymentInvoices: IPaymentInvoice[] = [{ id: 43949 }];
      workInProgressRegistration.paymentInvoices = paymentInvoices;

      const paymentInvoiceCollection: IPaymentInvoice[] = [{ id: 82569 }];
      jest.spyOn(paymentInvoiceService, 'query').mockReturnValue(of(new HttpResponse({ body: paymentInvoiceCollection })));
      const additionalPaymentInvoices = [...paymentInvoices];
      const expectedCollection: IPaymentInvoice[] = [...additionalPaymentInvoices, ...paymentInvoiceCollection];
      jest.spyOn(paymentInvoiceService, 'addPaymentInvoiceToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ workInProgressRegistration });
      comp.ngOnInit();

      expect(paymentInvoiceService.query).toHaveBeenCalled();
      expect(paymentInvoiceService.addPaymentInvoiceToCollectionIfMissing).toHaveBeenCalledWith(
        paymentInvoiceCollection,
        ...additionalPaymentInvoices.map(expect.objectContaining)
      );
      expect(comp.paymentInvoicesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call ServiceOutlet query and add missing value', () => {
      const workInProgressRegistration: IWorkInProgressRegistration = { id: 456 };
      const serviceOutlets: IServiceOutlet[] = [{ id: 67412 }];
      workInProgressRegistration.serviceOutlets = serviceOutlets;

      const serviceOutletCollection: IServiceOutlet[] = [{ id: 95747 }];
      jest.spyOn(serviceOutletService, 'query').mockReturnValue(of(new HttpResponse({ body: serviceOutletCollection })));
      const additionalServiceOutlets = [...serviceOutlets];
      const expectedCollection: IServiceOutlet[] = [...additionalServiceOutlets, ...serviceOutletCollection];
      jest.spyOn(serviceOutletService, 'addServiceOutletToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ workInProgressRegistration });
      comp.ngOnInit();

      expect(serviceOutletService.query).toHaveBeenCalled();
      expect(serviceOutletService.addServiceOutletToCollectionIfMissing).toHaveBeenCalledWith(
        serviceOutletCollection,
        ...additionalServiceOutlets.map(expect.objectContaining)
      );
      expect(comp.serviceOutletsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Settlement query and add missing value', () => {
      const workInProgressRegistration: IWorkInProgressRegistration = { id: 456 };
      const settlements: ISettlement[] = [{ id: 39775 }];
      workInProgressRegistration.settlements = settlements;

      const settlementCollection: ISettlement[] = [{ id: 62235 }];
      jest.spyOn(settlementService, 'query').mockReturnValue(of(new HttpResponse({ body: settlementCollection })));
      const additionalSettlements = [...settlements];
      const expectedCollection: ISettlement[] = [...additionalSettlements, ...settlementCollection];
      jest.spyOn(settlementService, 'addSettlementToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ workInProgressRegistration });
      comp.ngOnInit();

      expect(settlementService.query).toHaveBeenCalled();
      expect(settlementService.addSettlementToCollectionIfMissing).toHaveBeenCalledWith(
        settlementCollection,
        ...additionalSettlements.map(expect.objectContaining)
      );
      expect(comp.settlementsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call PurchaseOrder query and add missing value', () => {
      const workInProgressRegistration: IWorkInProgressRegistration = { id: 456 };
      const purchaseOrders: IPurchaseOrder[] = [{ id: 71163 }];
      workInProgressRegistration.purchaseOrders = purchaseOrders;

      const purchaseOrderCollection: IPurchaseOrder[] = [{ id: 89194 }];
      jest.spyOn(purchaseOrderService, 'query').mockReturnValue(of(new HttpResponse({ body: purchaseOrderCollection })));
      const additionalPurchaseOrders = [...purchaseOrders];
      const expectedCollection: IPurchaseOrder[] = [...additionalPurchaseOrders, ...purchaseOrderCollection];
      jest.spyOn(purchaseOrderService, 'addPurchaseOrderToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ workInProgressRegistration });
      comp.ngOnInit();

      expect(purchaseOrderService.query).toHaveBeenCalled();
      expect(purchaseOrderService.addPurchaseOrderToCollectionIfMissing).toHaveBeenCalledWith(
        purchaseOrderCollection,
        ...additionalPurchaseOrders.map(expect.objectContaining)
      );
      expect(comp.purchaseOrdersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call DeliveryNote query and add missing value', () => {
      const workInProgressRegistration: IWorkInProgressRegistration = { id: 456 };
      const deliveryNotes: IDeliveryNote[] = [{ id: 799 }];
      workInProgressRegistration.deliveryNotes = deliveryNotes;

      const deliveryNoteCollection: IDeliveryNote[] = [{ id: 32388 }];
      jest.spyOn(deliveryNoteService, 'query').mockReturnValue(of(new HttpResponse({ body: deliveryNoteCollection })));
      const additionalDeliveryNotes = [...deliveryNotes];
      const expectedCollection: IDeliveryNote[] = [...additionalDeliveryNotes, ...deliveryNoteCollection];
      jest.spyOn(deliveryNoteService, 'addDeliveryNoteToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ workInProgressRegistration });
      comp.ngOnInit();

      expect(deliveryNoteService.query).toHaveBeenCalled();
      expect(deliveryNoteService.addDeliveryNoteToCollectionIfMissing).toHaveBeenCalledWith(
        deliveryNoteCollection,
        ...additionalDeliveryNotes.map(expect.objectContaining)
      );
      expect(comp.deliveryNotesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call JobSheet query and add missing value', () => {
      const workInProgressRegistration: IWorkInProgressRegistration = { id: 456 };
      const jobSheets: IJobSheet[] = [{ id: 22913 }];
      workInProgressRegistration.jobSheets = jobSheets;

      const jobSheetCollection: IJobSheet[] = [{ id: 73120 }];
      jest.spyOn(jobSheetService, 'query').mockReturnValue(of(new HttpResponse({ body: jobSheetCollection })));
      const additionalJobSheets = [...jobSheets];
      const expectedCollection: IJobSheet[] = [...additionalJobSheets, ...jobSheetCollection];
      jest.spyOn(jobSheetService, 'addJobSheetToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ workInProgressRegistration });
      comp.ngOnInit();

      expect(jobSheetService.query).toHaveBeenCalled();
      expect(jobSheetService.addJobSheetToCollectionIfMissing).toHaveBeenCalledWith(
        jobSheetCollection,
        ...additionalJobSheets.map(expect.objectContaining)
      );
      expect(comp.jobSheetsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Dealer query and add missing value', () => {
      const workInProgressRegistration: IWorkInProgressRegistration = { id: 456 };
      const dealer: IDealer = { id: 99615 };
      workInProgressRegistration.dealer = dealer;

      const dealerCollection: IDealer[] = [{ id: 45619 }];
      jest.spyOn(dealerService, 'query').mockReturnValue(of(new HttpResponse({ body: dealerCollection })));
      const additionalDealers = [dealer];
      const expectedCollection: IDealer[] = [...additionalDealers, ...dealerCollection];
      jest.spyOn(dealerService, 'addDealerToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ workInProgressRegistration });
      comp.ngOnInit();

      expect(dealerService.query).toHaveBeenCalled();
      expect(dealerService.addDealerToCollectionIfMissing).toHaveBeenCalledWith(
        dealerCollection,
        ...additionalDealers.map(expect.objectContaining)
      );
      expect(comp.dealersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call WorkInProgressRegistration query and add missing value', () => {
      const workInProgressRegistration: IWorkInProgressRegistration = { id: 456 };
      const workInProgressGroup: IWorkInProgressRegistration = { id: 71550 };
      workInProgressRegistration.workInProgressGroup = workInProgressGroup;

      const workInProgressRegistrationCollection: IWorkInProgressRegistration[] = [{ id: 19737 }];
      jest
        .spyOn(workInProgressRegistrationService, 'query')
        .mockReturnValue(of(new HttpResponse({ body: workInProgressRegistrationCollection })));
      const additionalWorkInProgressRegistrations = [workInProgressGroup];
      const expectedCollection: IWorkInProgressRegistration[] = [
        ...additionalWorkInProgressRegistrations,
        ...workInProgressRegistrationCollection,
      ];
      jest
        .spyOn(workInProgressRegistrationService, 'addWorkInProgressRegistrationToCollectionIfMissing')
        .mockReturnValue(expectedCollection);

      activatedRoute.data = of({ workInProgressRegistration });
      comp.ngOnInit();

      expect(workInProgressRegistrationService.query).toHaveBeenCalled();
      expect(workInProgressRegistrationService.addWorkInProgressRegistrationToCollectionIfMissing).toHaveBeenCalledWith(
        workInProgressRegistrationCollection,
        ...additionalWorkInProgressRegistrations.map(expect.objectContaining)
      );
      expect(comp.workInProgressRegistrationsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call SettlementCurrency query and add missing value', () => {
      const workInProgressRegistration: IWorkInProgressRegistration = { id: 456 };
      const settlementCurrency: ISettlementCurrency = { id: 88925 };
      workInProgressRegistration.settlementCurrency = settlementCurrency;

      const settlementCurrencyCollection: ISettlementCurrency[] = [{ id: 48153 }];
      jest.spyOn(settlementCurrencyService, 'query').mockReturnValue(of(new HttpResponse({ body: settlementCurrencyCollection })));
      const additionalSettlementCurrencies = [settlementCurrency];
      const expectedCollection: ISettlementCurrency[] = [...additionalSettlementCurrencies, ...settlementCurrencyCollection];
      jest.spyOn(settlementCurrencyService, 'addSettlementCurrencyToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ workInProgressRegistration });
      comp.ngOnInit();

      expect(settlementCurrencyService.query).toHaveBeenCalled();
      expect(settlementCurrencyService.addSettlementCurrencyToCollectionIfMissing).toHaveBeenCalledWith(
        settlementCurrencyCollection,
        ...additionalSettlementCurrencies.map(expect.objectContaining)
      );
      expect(comp.settlementCurrenciesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call WorkProjectRegister query and add missing value', () => {
      const workInProgressRegistration: IWorkInProgressRegistration = { id: 456 };
      const workProjectRegister: IWorkProjectRegister = { id: 55547 };
      workInProgressRegistration.workProjectRegister = workProjectRegister;

      const workProjectRegisterCollection: IWorkProjectRegister[] = [{ id: 5036 }];
      jest.spyOn(workProjectRegisterService, 'query').mockReturnValue(of(new HttpResponse({ body: workProjectRegisterCollection })));
      const additionalWorkProjectRegisters = [workProjectRegister];
      const expectedCollection: IWorkProjectRegister[] = [...additionalWorkProjectRegisters, ...workProjectRegisterCollection];
      jest.spyOn(workProjectRegisterService, 'addWorkProjectRegisterToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ workInProgressRegistration });
      comp.ngOnInit();

      expect(workProjectRegisterService.query).toHaveBeenCalled();
      expect(workProjectRegisterService.addWorkProjectRegisterToCollectionIfMissing).toHaveBeenCalledWith(
        workProjectRegisterCollection,
        ...additionalWorkProjectRegisters.map(expect.objectContaining)
      );
      expect(comp.workProjectRegistersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call BusinessDocument query and add missing value', () => {
      const workInProgressRegistration: IWorkInProgressRegistration = { id: 456 };
      const businessDocuments: IBusinessDocument[] = [{ id: 96779 }];
      workInProgressRegistration.businessDocuments = businessDocuments;

      const businessDocumentCollection: IBusinessDocument[] = [{ id: 50202 }];
      jest.spyOn(businessDocumentService, 'query').mockReturnValue(of(new HttpResponse({ body: businessDocumentCollection })));
      const additionalBusinessDocuments = [...businessDocuments];
      const expectedCollection: IBusinessDocument[] = [...additionalBusinessDocuments, ...businessDocumentCollection];
      jest.spyOn(businessDocumentService, 'addBusinessDocumentToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ workInProgressRegistration });
      comp.ngOnInit();

      expect(businessDocumentService.query).toHaveBeenCalled();
      expect(businessDocumentService.addBusinessDocumentToCollectionIfMissing).toHaveBeenCalledWith(
        businessDocumentCollection,
        ...additionalBusinessDocuments.map(expect.objectContaining)
      );
      expect(comp.businessDocumentsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call AssetAccessory query and add missing value', () => {
      const workInProgressRegistration: IWorkInProgressRegistration = { id: 456 };
      const assetAccessories: IAssetAccessory[] = [{ id: 36726 }];
      workInProgressRegistration.assetAccessories = assetAccessories;

      const assetAccessoryCollection: IAssetAccessory[] = [{ id: 28409 }];
      jest.spyOn(assetAccessoryService, 'query').mockReturnValue(of(new HttpResponse({ body: assetAccessoryCollection })));
      const additionalAssetAccessories = [...assetAccessories];
      const expectedCollection: IAssetAccessory[] = [...additionalAssetAccessories, ...assetAccessoryCollection];
      jest.spyOn(assetAccessoryService, 'addAssetAccessoryToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ workInProgressRegistration });
      comp.ngOnInit();

      expect(assetAccessoryService.query).toHaveBeenCalled();
      expect(assetAccessoryService.addAssetAccessoryToCollectionIfMissing).toHaveBeenCalledWith(
        assetAccessoryCollection,
        ...additionalAssetAccessories.map(expect.objectContaining)
      );
      expect(comp.assetAccessoriesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call AssetWarranty query and add missing value', () => {
      const workInProgressRegistration: IWorkInProgressRegistration = { id: 456 };
      const assetWarranties: IAssetWarranty[] = [{ id: 21548 }];
      workInProgressRegistration.assetWarranties = assetWarranties;

      const assetWarrantyCollection: IAssetWarranty[] = [{ id: 35876 }];
      jest.spyOn(assetWarrantyService, 'query').mockReturnValue(of(new HttpResponse({ body: assetWarrantyCollection })));
      const additionalAssetWarranties = [...assetWarranties];
      const expectedCollection: IAssetWarranty[] = [...additionalAssetWarranties, ...assetWarrantyCollection];
      jest.spyOn(assetWarrantyService, 'addAssetWarrantyToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ workInProgressRegistration });
      comp.ngOnInit();

      expect(assetWarrantyService.query).toHaveBeenCalled();
      expect(assetWarrantyService.addAssetWarrantyToCollectionIfMissing).toHaveBeenCalledWith(
        assetWarrantyCollection,
        ...additionalAssetWarranties.map(expect.objectContaining)
      );
      expect(comp.assetWarrantiesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const workInProgressRegistration: IWorkInProgressRegistration = { id: 456 };
      const placeholder: IPlaceholder = { id: 54597 };
      workInProgressRegistration.placeholders = [placeholder];
      const paymentInvoices: IPaymentInvoice = { id: 54139 };
      workInProgressRegistration.paymentInvoices = [paymentInvoices];
      const serviceOutlet: IServiceOutlet = { id: 42315 };
      workInProgressRegistration.serviceOutlets = [serviceOutlet];
      const settlement: ISettlement = { id: 47612 };
      workInProgressRegistration.settlements = [settlement];
      const purchaseOrder: IPurchaseOrder = { id: 75479 };
      workInProgressRegistration.purchaseOrders = [purchaseOrder];
      const deliveryNote: IDeliveryNote = { id: 99737 };
      workInProgressRegistration.deliveryNotes = [deliveryNote];
      const jobSheet: IJobSheet = { id: 65563 };
      workInProgressRegistration.jobSheets = [jobSheet];
      const dealer: IDealer = { id: 30945 };
      workInProgressRegistration.dealer = dealer;
      const workInProgressGroup: IWorkInProgressRegistration = { id: 39161 };
      workInProgressRegistration.workInProgressGroup = workInProgressGroup;
      const settlementCurrency: ISettlementCurrency = { id: 47782 };
      workInProgressRegistration.settlementCurrency = settlementCurrency;
      const workProjectRegister: IWorkProjectRegister = { id: 74342 };
      workInProgressRegistration.workProjectRegister = workProjectRegister;
      const businessDocument: IBusinessDocument = { id: 65752 };
      workInProgressRegistration.businessDocuments = [businessDocument];
      const assetAccessory: IAssetAccessory = { id: 17611 };
      workInProgressRegistration.assetAccessories = [assetAccessory];
      const assetWarranty: IAssetWarranty = { id: 48566 };
      workInProgressRegistration.assetWarranties = [assetWarranty];

      activatedRoute.data = of({ workInProgressRegistration });
      comp.ngOnInit();

      expect(comp.placeholdersSharedCollection).toContain(placeholder);
      expect(comp.paymentInvoicesSharedCollection).toContain(paymentInvoices);
      expect(comp.serviceOutletsSharedCollection).toContain(serviceOutlet);
      expect(comp.settlementsSharedCollection).toContain(settlement);
      expect(comp.purchaseOrdersSharedCollection).toContain(purchaseOrder);
      expect(comp.deliveryNotesSharedCollection).toContain(deliveryNote);
      expect(comp.jobSheetsSharedCollection).toContain(jobSheet);
      expect(comp.dealersSharedCollection).toContain(dealer);
      expect(comp.workInProgressRegistrationsSharedCollection).toContain(workInProgressGroup);
      expect(comp.settlementCurrenciesSharedCollection).toContain(settlementCurrency);
      expect(comp.workProjectRegistersSharedCollection).toContain(workProjectRegister);
      expect(comp.businessDocumentsSharedCollection).toContain(businessDocument);
      expect(comp.assetAccessoriesSharedCollection).toContain(assetAccessory);
      expect(comp.assetWarrantiesSharedCollection).toContain(assetWarranty);
      expect(comp.workInProgressRegistration).toEqual(workInProgressRegistration);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IWorkInProgressRegistration>>();
      const workInProgressRegistration = { id: 123 };
      jest.spyOn(workInProgressRegistrationFormService, 'getWorkInProgressRegistration').mockReturnValue(workInProgressRegistration);
      jest.spyOn(workInProgressRegistrationService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ workInProgressRegistration });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: workInProgressRegistration }));
      saveSubject.complete();

      // THEN
      expect(workInProgressRegistrationFormService.getWorkInProgressRegistration).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(workInProgressRegistrationService.update).toHaveBeenCalledWith(expect.objectContaining(workInProgressRegistration));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IWorkInProgressRegistration>>();
      const workInProgressRegistration = { id: 123 };
      jest.spyOn(workInProgressRegistrationFormService, 'getWorkInProgressRegistration').mockReturnValue({ id: null });
      jest.spyOn(workInProgressRegistrationService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ workInProgressRegistration: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: workInProgressRegistration }));
      saveSubject.complete();

      // THEN
      expect(workInProgressRegistrationFormService.getWorkInProgressRegistration).toHaveBeenCalled();
      expect(workInProgressRegistrationService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IWorkInProgressRegistration>>();
      const workInProgressRegistration = { id: 123 };
      jest.spyOn(workInProgressRegistrationService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ workInProgressRegistration });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(workInProgressRegistrationService.update).toHaveBeenCalled();
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

    describe('compareWorkInProgressRegistration', () => {
      it('Should forward to workInProgressRegistrationService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(workInProgressRegistrationService, 'compareWorkInProgressRegistration');
        comp.compareWorkInProgressRegistration(entity, entity2);
        expect(workInProgressRegistrationService.compareWorkInProgressRegistration).toHaveBeenCalledWith(entity, entity2);
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

    describe('compareWorkProjectRegister', () => {
      it('Should forward to workProjectRegisterService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(workProjectRegisterService, 'compareWorkProjectRegister');
        comp.compareWorkProjectRegister(entity, entity2);
        expect(workProjectRegisterService.compareWorkProjectRegister).toHaveBeenCalledWith(entity, entity2);
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

    describe('compareAssetAccessory', () => {
      it('Should forward to assetAccessoryService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(assetAccessoryService, 'compareAssetAccessory');
        comp.compareAssetAccessory(entity, entity2);
        expect(assetAccessoryService.compareAssetAccessory).toHaveBeenCalledWith(entity, entity2);
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
  });
});
