jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { WorkInProgressRegistrationService } from '../service/work-in-progress-registration.service';
import { IWorkInProgressRegistration, WorkInProgressRegistration } from '../work-in-progress-registration.model';
import { IPlaceholder } from 'app/entities/erpService/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/erpService/placeholder/service/placeholder.service';
import { IPaymentInvoice } from 'app/entities/payment-invoice/payment-invoice.model';
import { PaymentInvoiceService } from 'app/entities/payment-invoice/service/payment-invoice.service';
import { IServiceOutlet } from 'app/entities/service-outlet/service-outlet.model';
import { ServiceOutletService } from 'app/entities/service-outlet/service/service-outlet.service';
import { ISettlement } from 'app/entities/settlement/settlement.model';
import { SettlementService } from 'app/entities/settlement/service/settlement.service';
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
import { IWorkProjectRegister } from 'app/entities/work-project-register/work-project-register.model';
import { WorkProjectRegisterService } from 'app/entities/work-project-register/service/work-project-register.service';

import { WorkInProgressRegistrationUpdateComponent } from './work-in-progress-registration-update.component';

describe('WorkInProgressRegistration Management Update Component', () => {
  let comp: WorkInProgressRegistrationUpdateComponent;
  let fixture: ComponentFixture<WorkInProgressRegistrationUpdateComponent>;
  let activatedRoute: ActivatedRoute;
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [WorkInProgressRegistrationUpdateComponent],
      providers: [FormBuilder, ActivatedRoute],
    })
      .overrideTemplate(WorkInProgressRegistrationUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(WorkInProgressRegistrationUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
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
      expect(placeholderService.addPlaceholderToCollectionIfMissing).toHaveBeenCalledWith(placeholderCollection, ...additionalPlaceholders);
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
        ...additionalPaymentInvoices
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
        ...additionalServiceOutlets
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
      expect(settlementService.addSettlementToCollectionIfMissing).toHaveBeenCalledWith(settlementCollection, ...additionalSettlements);
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
        ...additionalPurchaseOrders
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
        ...additionalDeliveryNotes
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
      expect(jobSheetService.addJobSheetToCollectionIfMissing).toHaveBeenCalledWith(jobSheetCollection, ...additionalJobSheets);
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
      expect(dealerService.addDealerToCollectionIfMissing).toHaveBeenCalledWith(dealerCollection, ...additionalDealers);
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
        ...additionalWorkInProgressRegistrations
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
        ...additionalSettlementCurrencies
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
        ...additionalWorkProjectRegisters
      );
      expect(comp.workProjectRegistersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const workInProgressRegistration: IWorkInProgressRegistration = { id: 456 };
      const placeholders: IPlaceholder = { id: 54597 };
      workInProgressRegistration.placeholders = [placeholders];
      const paymentInvoices: IPaymentInvoice = { id: 54139 };
      workInProgressRegistration.paymentInvoices = [paymentInvoices];
      const serviceOutlets: IServiceOutlet = { id: 42315 };
      workInProgressRegistration.serviceOutlets = [serviceOutlets];
      const settlements: ISettlement = { id: 47612 };
      workInProgressRegistration.settlements = [settlements];
      const purchaseOrders: IPurchaseOrder = { id: 75479 };
      workInProgressRegistration.purchaseOrders = [purchaseOrders];
      const deliveryNotes: IDeliveryNote = { id: 99737 };
      workInProgressRegistration.deliveryNotes = [deliveryNotes];
      const jobSheets: IJobSheet = { id: 65563 };
      workInProgressRegistration.jobSheets = [jobSheets];
      const dealer: IDealer = { id: 30945 };
      workInProgressRegistration.dealer = dealer;
      const workInProgressGroup: IWorkInProgressRegistration = { id: 39161 };
      workInProgressRegistration.workInProgressGroup = workInProgressGroup;
      const settlementCurrency: ISettlementCurrency = { id: 47782 };
      workInProgressRegistration.settlementCurrency = settlementCurrency;
      const workProjectRegister: IWorkProjectRegister = { id: 74342 };
      workInProgressRegistration.workProjectRegister = workProjectRegister;

      activatedRoute.data = of({ workInProgressRegistration });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(workInProgressRegistration));
      expect(comp.placeholdersSharedCollection).toContain(placeholders);
      expect(comp.paymentInvoicesSharedCollection).toContain(paymentInvoices);
      expect(comp.serviceOutletsSharedCollection).toContain(serviceOutlets);
      expect(comp.settlementsSharedCollection).toContain(settlements);
      expect(comp.purchaseOrdersSharedCollection).toContain(purchaseOrders);
      expect(comp.deliveryNotesSharedCollection).toContain(deliveryNotes);
      expect(comp.jobSheetsSharedCollection).toContain(jobSheets);
      expect(comp.dealersSharedCollection).toContain(dealer);
      expect(comp.workInProgressRegistrationsSharedCollection).toContain(workInProgressGroup);
      expect(comp.settlementCurrenciesSharedCollection).toContain(settlementCurrency);
      expect(comp.workProjectRegistersSharedCollection).toContain(workProjectRegister);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<WorkInProgressRegistration>>();
      const workInProgressRegistration = { id: 123 };
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
      expect(comp.previousState).toHaveBeenCalled();
      expect(workInProgressRegistrationService.update).toHaveBeenCalledWith(workInProgressRegistration);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<WorkInProgressRegistration>>();
      const workInProgressRegistration = new WorkInProgressRegistration();
      jest.spyOn(workInProgressRegistrationService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ workInProgressRegistration });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: workInProgressRegistration }));
      saveSubject.complete();

      // THEN
      expect(workInProgressRegistrationService.create).toHaveBeenCalledWith(workInProgressRegistration);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<WorkInProgressRegistration>>();
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
      expect(workInProgressRegistrationService.update).toHaveBeenCalledWith(workInProgressRegistration);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackPlaceholderById', () => {
      it('Should return tracked Placeholder primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackPlaceholderById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackPaymentInvoiceById', () => {
      it('Should return tracked PaymentInvoice primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackPaymentInvoiceById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackServiceOutletById', () => {
      it('Should return tracked ServiceOutlet primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackServiceOutletById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackSettlementById', () => {
      it('Should return tracked Settlement primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackSettlementById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackPurchaseOrderById', () => {
      it('Should return tracked PurchaseOrder primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackPurchaseOrderById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackDeliveryNoteById', () => {
      it('Should return tracked DeliveryNote primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackDeliveryNoteById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackJobSheetById', () => {
      it('Should return tracked JobSheet primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackJobSheetById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackDealerById', () => {
      it('Should return tracked Dealer primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackDealerById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackWorkInProgressRegistrationById', () => {
      it('Should return tracked WorkInProgressRegistration primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackWorkInProgressRegistrationById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackSettlementCurrencyById', () => {
      it('Should return tracked SettlementCurrency primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackSettlementCurrencyById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackWorkProjectRegisterById', () => {
      it('Should return tracked WorkProjectRegister primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackWorkProjectRegisterById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });

  describe('Getting selected relationships', () => {
    describe('getSelectedPlaceholder', () => {
      it('Should return option if no Placeholder is selected', () => {
        const option = { id: 123 };
        const result = comp.getSelectedPlaceholder(option);
        expect(result === option).toEqual(true);
      });

      it('Should return selected Placeholder for according option', () => {
        const option = { id: 123 };
        const selected = { id: 123 };
        const selected2 = { id: 456 };
        const result = comp.getSelectedPlaceholder(option, [selected2, selected]);
        expect(result === selected).toEqual(true);
        expect(result === selected2).toEqual(false);
        expect(result === option).toEqual(false);
      });

      it('Should return option if this Placeholder is not selected', () => {
        const option = { id: 123 };
        const selected = { id: 456 };
        const result = comp.getSelectedPlaceholder(option, [selected]);
        expect(result === option).toEqual(true);
        expect(result === selected).toEqual(false);
      });
    });

    describe('getSelectedPaymentInvoice', () => {
      it('Should return option if no PaymentInvoice is selected', () => {
        const option = { id: 123 };
        const result = comp.getSelectedPaymentInvoice(option);
        expect(result === option).toEqual(true);
      });

      it('Should return selected PaymentInvoice for according option', () => {
        const option = { id: 123 };
        const selected = { id: 123 };
        const selected2 = { id: 456 };
        const result = comp.getSelectedPaymentInvoice(option, [selected2, selected]);
        expect(result === selected).toEqual(true);
        expect(result === selected2).toEqual(false);
        expect(result === option).toEqual(false);
      });

      it('Should return option if this PaymentInvoice is not selected', () => {
        const option = { id: 123 };
        const selected = { id: 456 };
        const result = comp.getSelectedPaymentInvoice(option, [selected]);
        expect(result === option).toEqual(true);
        expect(result === selected).toEqual(false);
      });
    });

    describe('getSelectedServiceOutlet', () => {
      it('Should return option if no ServiceOutlet is selected', () => {
        const option = { id: 123 };
        const result = comp.getSelectedServiceOutlet(option);
        expect(result === option).toEqual(true);
      });

      it('Should return selected ServiceOutlet for according option', () => {
        const option = { id: 123 };
        const selected = { id: 123 };
        const selected2 = { id: 456 };
        const result = comp.getSelectedServiceOutlet(option, [selected2, selected]);
        expect(result === selected).toEqual(true);
        expect(result === selected2).toEqual(false);
        expect(result === option).toEqual(false);
      });

      it('Should return option if this ServiceOutlet is not selected', () => {
        const option = { id: 123 };
        const selected = { id: 456 };
        const result = comp.getSelectedServiceOutlet(option, [selected]);
        expect(result === option).toEqual(true);
        expect(result === selected).toEqual(false);
      });
    });

    describe('getSelectedSettlement', () => {
      it('Should return option if no Settlement is selected', () => {
        const option = { id: 123 };
        const result = comp.getSelectedSettlement(option);
        expect(result === option).toEqual(true);
      });

      it('Should return selected Settlement for according option', () => {
        const option = { id: 123 };
        const selected = { id: 123 };
        const selected2 = { id: 456 };
        const result = comp.getSelectedSettlement(option, [selected2, selected]);
        expect(result === selected).toEqual(true);
        expect(result === selected2).toEqual(false);
        expect(result === option).toEqual(false);
      });

      it('Should return option if this Settlement is not selected', () => {
        const option = { id: 123 };
        const selected = { id: 456 };
        const result = comp.getSelectedSettlement(option, [selected]);
        expect(result === option).toEqual(true);
        expect(result === selected).toEqual(false);
      });
    });

    describe('getSelectedPurchaseOrder', () => {
      it('Should return option if no PurchaseOrder is selected', () => {
        const option = { id: 123 };
        const result = comp.getSelectedPurchaseOrder(option);
        expect(result === option).toEqual(true);
      });

      it('Should return selected PurchaseOrder for according option', () => {
        const option = { id: 123 };
        const selected = { id: 123 };
        const selected2 = { id: 456 };
        const result = comp.getSelectedPurchaseOrder(option, [selected2, selected]);
        expect(result === selected).toEqual(true);
        expect(result === selected2).toEqual(false);
        expect(result === option).toEqual(false);
      });

      it('Should return option if this PurchaseOrder is not selected', () => {
        const option = { id: 123 };
        const selected = { id: 456 };
        const result = comp.getSelectedPurchaseOrder(option, [selected]);
        expect(result === option).toEqual(true);
        expect(result === selected).toEqual(false);
      });
    });

    describe('getSelectedDeliveryNote', () => {
      it('Should return option if no DeliveryNote is selected', () => {
        const option = { id: 123 };
        const result = comp.getSelectedDeliveryNote(option);
        expect(result === option).toEqual(true);
      });

      it('Should return selected DeliveryNote for according option', () => {
        const option = { id: 123 };
        const selected = { id: 123 };
        const selected2 = { id: 456 };
        const result = comp.getSelectedDeliveryNote(option, [selected2, selected]);
        expect(result === selected).toEqual(true);
        expect(result === selected2).toEqual(false);
        expect(result === option).toEqual(false);
      });

      it('Should return option if this DeliveryNote is not selected', () => {
        const option = { id: 123 };
        const selected = { id: 456 };
        const result = comp.getSelectedDeliveryNote(option, [selected]);
        expect(result === option).toEqual(true);
        expect(result === selected).toEqual(false);
      });
    });

    describe('getSelectedJobSheet', () => {
      it('Should return option if no JobSheet is selected', () => {
        const option = { id: 123 };
        const result = comp.getSelectedJobSheet(option);
        expect(result === option).toEqual(true);
      });

      it('Should return selected JobSheet for according option', () => {
        const option = { id: 123 };
        const selected = { id: 123 };
        const selected2 = { id: 456 };
        const result = comp.getSelectedJobSheet(option, [selected2, selected]);
        expect(result === selected).toEqual(true);
        expect(result === selected2).toEqual(false);
        expect(result === option).toEqual(false);
      });

      it('Should return option if this JobSheet is not selected', () => {
        const option = { id: 123 };
        const selected = { id: 456 };
        const result = comp.getSelectedJobSheet(option, [selected]);
        expect(result === option).toEqual(true);
        expect(result === selected).toEqual(false);
      });
    });
  });
});
