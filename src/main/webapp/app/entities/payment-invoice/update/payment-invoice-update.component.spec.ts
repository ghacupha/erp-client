import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { PaymentInvoiceFormService } from './payment-invoice-form.service';
import { PaymentInvoiceService } from '../service/payment-invoice.service';
import { IPaymentInvoice } from '../payment-invoice.model';
import { IPurchaseOrder } from 'app/entities/purchase-order/purchase-order.model';
import { PurchaseOrderService } from 'app/entities/purchase-order/service/purchase-order.service';
import { IPlaceholder } from 'app/entities/erpService/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/erpService/placeholder/service/placeholder.service';
import { IPaymentLabel } from 'app/entities/payment-label/payment-label.model';
import { PaymentLabelService } from 'app/entities/payment-label/service/payment-label.service';
import { ISettlementCurrency } from 'app/entities/settlement-currency/settlement-currency.model';
import { SettlementCurrencyService } from 'app/entities/settlement-currency/service/settlement-currency.service';
import { IDealer } from 'app/entities/dealers/dealer/dealer.model';
import { DealerService } from 'app/entities/dealers/dealer/service/dealer.service';
import { IDeliveryNote } from 'app/entities/delivery-note/delivery-note.model';
import { DeliveryNoteService } from 'app/entities/delivery-note/service/delivery-note.service';
import { IJobSheet } from 'app/entities/job-sheet/job-sheet.model';
import { JobSheetService } from 'app/entities/job-sheet/service/job-sheet.service';
import { IBusinessDocument } from 'app/entities/business-document/business-document.model';
import { BusinessDocumentService } from 'app/entities/business-document/service/business-document.service';

import { PaymentInvoiceUpdateComponent } from './payment-invoice-update.component';

describe('PaymentInvoice Management Update Component', () => {
  let comp: PaymentInvoiceUpdateComponent;
  let fixture: ComponentFixture<PaymentInvoiceUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let paymentInvoiceFormService: PaymentInvoiceFormService;
  let paymentInvoiceService: PaymentInvoiceService;
  let purchaseOrderService: PurchaseOrderService;
  let placeholderService: PlaceholderService;
  let paymentLabelService: PaymentLabelService;
  let settlementCurrencyService: SettlementCurrencyService;
  let dealerService: DealerService;
  let deliveryNoteService: DeliveryNoteService;
  let jobSheetService: JobSheetService;
  let businessDocumentService: BusinessDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [PaymentInvoiceUpdateComponent],
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
      .overrideTemplate(PaymentInvoiceUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PaymentInvoiceUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    paymentInvoiceFormService = TestBed.inject(PaymentInvoiceFormService);
    paymentInvoiceService = TestBed.inject(PaymentInvoiceService);
    purchaseOrderService = TestBed.inject(PurchaseOrderService);
    placeholderService = TestBed.inject(PlaceholderService);
    paymentLabelService = TestBed.inject(PaymentLabelService);
    settlementCurrencyService = TestBed.inject(SettlementCurrencyService);
    dealerService = TestBed.inject(DealerService);
    deliveryNoteService = TestBed.inject(DeliveryNoteService);
    jobSheetService = TestBed.inject(JobSheetService);
    businessDocumentService = TestBed.inject(BusinessDocumentService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call PurchaseOrder query and add missing value', () => {
      const paymentInvoice: IPaymentInvoice = { id: 456 };
      const purchaseOrders: IPurchaseOrder[] = [{ id: 37390 }];
      paymentInvoice.purchaseOrders = purchaseOrders;

      const purchaseOrderCollection: IPurchaseOrder[] = [{ id: 64230 }];
      jest.spyOn(purchaseOrderService, 'query').mockReturnValue(of(new HttpResponse({ body: purchaseOrderCollection })));
      const additionalPurchaseOrders = [...purchaseOrders];
      const expectedCollection: IPurchaseOrder[] = [...additionalPurchaseOrders, ...purchaseOrderCollection];
      jest.spyOn(purchaseOrderService, 'addPurchaseOrderToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ paymentInvoice });
      comp.ngOnInit();

      expect(purchaseOrderService.query).toHaveBeenCalled();
      expect(purchaseOrderService.addPurchaseOrderToCollectionIfMissing).toHaveBeenCalledWith(
        purchaseOrderCollection,
        ...additionalPurchaseOrders.map(expect.objectContaining)
      );
      expect(comp.purchaseOrdersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Placeholder query and add missing value', () => {
      const paymentInvoice: IPaymentInvoice = { id: 456 };
      const placeholders: IPlaceholder[] = [{ id: 35975 }];
      paymentInvoice.placeholders = placeholders;

      const placeholderCollection: IPlaceholder[] = [{ id: 99217 }];
      jest.spyOn(placeholderService, 'query').mockReturnValue(of(new HttpResponse({ body: placeholderCollection })));
      const additionalPlaceholders = [...placeholders];
      const expectedCollection: IPlaceholder[] = [...additionalPlaceholders, ...placeholderCollection];
      jest.spyOn(placeholderService, 'addPlaceholderToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ paymentInvoice });
      comp.ngOnInit();

      expect(placeholderService.query).toHaveBeenCalled();
      expect(placeholderService.addPlaceholderToCollectionIfMissing).toHaveBeenCalledWith(
        placeholderCollection,
        ...additionalPlaceholders.map(expect.objectContaining)
      );
      expect(comp.placeholdersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call PaymentLabel query and add missing value', () => {
      const paymentInvoice: IPaymentInvoice = { id: 456 };
      const paymentLabels: IPaymentLabel[] = [{ id: 8658 }];
      paymentInvoice.paymentLabels = paymentLabels;

      const paymentLabelCollection: IPaymentLabel[] = [{ id: 94266 }];
      jest.spyOn(paymentLabelService, 'query').mockReturnValue(of(new HttpResponse({ body: paymentLabelCollection })));
      const additionalPaymentLabels = [...paymentLabels];
      const expectedCollection: IPaymentLabel[] = [...additionalPaymentLabels, ...paymentLabelCollection];
      jest.spyOn(paymentLabelService, 'addPaymentLabelToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ paymentInvoice });
      comp.ngOnInit();

      expect(paymentLabelService.query).toHaveBeenCalled();
      expect(paymentLabelService.addPaymentLabelToCollectionIfMissing).toHaveBeenCalledWith(
        paymentLabelCollection,
        ...additionalPaymentLabels.map(expect.objectContaining)
      );
      expect(comp.paymentLabelsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call SettlementCurrency query and add missing value', () => {
      const paymentInvoice: IPaymentInvoice = { id: 456 };
      const settlementCurrency: ISettlementCurrency = { id: 90456 };
      paymentInvoice.settlementCurrency = settlementCurrency;

      const settlementCurrencyCollection: ISettlementCurrency[] = [{ id: 37541 }];
      jest.spyOn(settlementCurrencyService, 'query').mockReturnValue(of(new HttpResponse({ body: settlementCurrencyCollection })));
      const additionalSettlementCurrencies = [settlementCurrency];
      const expectedCollection: ISettlementCurrency[] = [...additionalSettlementCurrencies, ...settlementCurrencyCollection];
      jest.spyOn(settlementCurrencyService, 'addSettlementCurrencyToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ paymentInvoice });
      comp.ngOnInit();

      expect(settlementCurrencyService.query).toHaveBeenCalled();
      expect(settlementCurrencyService.addSettlementCurrencyToCollectionIfMissing).toHaveBeenCalledWith(
        settlementCurrencyCollection,
        ...additionalSettlementCurrencies.map(expect.objectContaining)
      );
      expect(comp.settlementCurrenciesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Dealer query and add missing value', () => {
      const paymentInvoice: IPaymentInvoice = { id: 456 };
      const biller: IDealer = { id: 60282 };
      paymentInvoice.biller = biller;

      const dealerCollection: IDealer[] = [{ id: 2613 }];
      jest.spyOn(dealerService, 'query').mockReturnValue(of(new HttpResponse({ body: dealerCollection })));
      const additionalDealers = [biller];
      const expectedCollection: IDealer[] = [...additionalDealers, ...dealerCollection];
      jest.spyOn(dealerService, 'addDealerToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ paymentInvoice });
      comp.ngOnInit();

      expect(dealerService.query).toHaveBeenCalled();
      expect(dealerService.addDealerToCollectionIfMissing).toHaveBeenCalledWith(
        dealerCollection,
        ...additionalDealers.map(expect.objectContaining)
      );
      expect(comp.dealersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call DeliveryNote query and add missing value', () => {
      const paymentInvoice: IPaymentInvoice = { id: 456 };
      const deliveryNotes: IDeliveryNote[] = [{ id: 29346 }];
      paymentInvoice.deliveryNotes = deliveryNotes;

      const deliveryNoteCollection: IDeliveryNote[] = [{ id: 12280 }];
      jest.spyOn(deliveryNoteService, 'query').mockReturnValue(of(new HttpResponse({ body: deliveryNoteCollection })));
      const additionalDeliveryNotes = [...deliveryNotes];
      const expectedCollection: IDeliveryNote[] = [...additionalDeliveryNotes, ...deliveryNoteCollection];
      jest.spyOn(deliveryNoteService, 'addDeliveryNoteToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ paymentInvoice });
      comp.ngOnInit();

      expect(deliveryNoteService.query).toHaveBeenCalled();
      expect(deliveryNoteService.addDeliveryNoteToCollectionIfMissing).toHaveBeenCalledWith(
        deliveryNoteCollection,
        ...additionalDeliveryNotes.map(expect.objectContaining)
      );
      expect(comp.deliveryNotesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call JobSheet query and add missing value', () => {
      const paymentInvoice: IPaymentInvoice = { id: 456 };
      const jobSheets: IJobSheet[] = [{ id: 83209 }];
      paymentInvoice.jobSheets = jobSheets;

      const jobSheetCollection: IJobSheet[] = [{ id: 3205 }];
      jest.spyOn(jobSheetService, 'query').mockReturnValue(of(new HttpResponse({ body: jobSheetCollection })));
      const additionalJobSheets = [...jobSheets];
      const expectedCollection: IJobSheet[] = [...additionalJobSheets, ...jobSheetCollection];
      jest.spyOn(jobSheetService, 'addJobSheetToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ paymentInvoice });
      comp.ngOnInit();

      expect(jobSheetService.query).toHaveBeenCalled();
      expect(jobSheetService.addJobSheetToCollectionIfMissing).toHaveBeenCalledWith(
        jobSheetCollection,
        ...additionalJobSheets.map(expect.objectContaining)
      );
      expect(comp.jobSheetsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call BusinessDocument query and add missing value', () => {
      const paymentInvoice: IPaymentInvoice = { id: 456 };
      const businessDocuments: IBusinessDocument[] = [{ id: 79935 }];
      paymentInvoice.businessDocuments = businessDocuments;

      const businessDocumentCollection: IBusinessDocument[] = [{ id: 92869 }];
      jest.spyOn(businessDocumentService, 'query').mockReturnValue(of(new HttpResponse({ body: businessDocumentCollection })));
      const additionalBusinessDocuments = [...businessDocuments];
      const expectedCollection: IBusinessDocument[] = [...additionalBusinessDocuments, ...businessDocumentCollection];
      jest.spyOn(businessDocumentService, 'addBusinessDocumentToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ paymentInvoice });
      comp.ngOnInit();

      expect(businessDocumentService.query).toHaveBeenCalled();
      expect(businessDocumentService.addBusinessDocumentToCollectionIfMissing).toHaveBeenCalledWith(
        businessDocumentCollection,
        ...additionalBusinessDocuments.map(expect.objectContaining)
      );
      expect(comp.businessDocumentsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const paymentInvoice: IPaymentInvoice = { id: 456 };
      const purchaseOrder: IPurchaseOrder = { id: 92226 };
      paymentInvoice.purchaseOrders = [purchaseOrder];
      const placeholder: IPlaceholder = { id: 83467 };
      paymentInvoice.placeholders = [placeholder];
      const paymentLabel: IPaymentLabel = { id: 58006 };
      paymentInvoice.paymentLabels = [paymentLabel];
      const settlementCurrency: ISettlementCurrency = { id: 20996 };
      paymentInvoice.settlementCurrency = settlementCurrency;
      const biller: IDealer = { id: 64409 };
      paymentInvoice.biller = biller;
      const deliveryNote: IDeliveryNote = { id: 28117 };
      paymentInvoice.deliveryNotes = [deliveryNote];
      const jobSheet: IJobSheet = { id: 34466 };
      paymentInvoice.jobSheets = [jobSheet];
      const businessDocument: IBusinessDocument = { id: 70777 };
      paymentInvoice.businessDocuments = [businessDocument];

      activatedRoute.data = of({ paymentInvoice });
      comp.ngOnInit();

      expect(comp.purchaseOrdersSharedCollection).toContain(purchaseOrder);
      expect(comp.placeholdersSharedCollection).toContain(placeholder);
      expect(comp.paymentLabelsSharedCollection).toContain(paymentLabel);
      expect(comp.settlementCurrenciesSharedCollection).toContain(settlementCurrency);
      expect(comp.dealersSharedCollection).toContain(biller);
      expect(comp.deliveryNotesSharedCollection).toContain(deliveryNote);
      expect(comp.jobSheetsSharedCollection).toContain(jobSheet);
      expect(comp.businessDocumentsSharedCollection).toContain(businessDocument);
      expect(comp.paymentInvoice).toEqual(paymentInvoice);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPaymentInvoice>>();
      const paymentInvoice = { id: 123 };
      jest.spyOn(paymentInvoiceFormService, 'getPaymentInvoice').mockReturnValue(paymentInvoice);
      jest.spyOn(paymentInvoiceService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ paymentInvoice });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: paymentInvoice }));
      saveSubject.complete();

      // THEN
      expect(paymentInvoiceFormService.getPaymentInvoice).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(paymentInvoiceService.update).toHaveBeenCalledWith(expect.objectContaining(paymentInvoice));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPaymentInvoice>>();
      const paymentInvoice = { id: 123 };
      jest.spyOn(paymentInvoiceFormService, 'getPaymentInvoice').mockReturnValue({ id: null });
      jest.spyOn(paymentInvoiceService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ paymentInvoice: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: paymentInvoice }));
      saveSubject.complete();

      // THEN
      expect(paymentInvoiceFormService.getPaymentInvoice).toHaveBeenCalled();
      expect(paymentInvoiceService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPaymentInvoice>>();
      const paymentInvoice = { id: 123 };
      jest.spyOn(paymentInvoiceService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ paymentInvoice });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(paymentInvoiceService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('comparePurchaseOrder', () => {
      it('Should forward to purchaseOrderService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(purchaseOrderService, 'comparePurchaseOrder');
        comp.comparePurchaseOrder(entity, entity2);
        expect(purchaseOrderService.comparePurchaseOrder).toHaveBeenCalledWith(entity, entity2);
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

    describe('comparePaymentLabel', () => {
      it('Should forward to paymentLabelService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(paymentLabelService, 'comparePaymentLabel');
        comp.comparePaymentLabel(entity, entity2);
        expect(paymentLabelService.comparePaymentLabel).toHaveBeenCalledWith(entity, entity2);
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

    describe('compareDealer', () => {
      it('Should forward to dealerService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(dealerService, 'compareDealer');
        comp.compareDealer(entity, entity2);
        expect(dealerService.compareDealer).toHaveBeenCalledWith(entity, entity2);
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

    describe('compareBusinessDocument', () => {
      it('Should forward to businessDocumentService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(businessDocumentService, 'compareBusinessDocument');
        comp.compareBusinessDocument(entity, entity2);
        expect(businessDocumentService.compareBusinessDocument).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
