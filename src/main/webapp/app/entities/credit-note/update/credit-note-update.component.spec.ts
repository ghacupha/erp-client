import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { CreditNoteFormService } from './credit-note-form.service';
import { CreditNoteService } from '../service/credit-note.service';
import { ICreditNote } from '../credit-note.model';
import { IPurchaseOrder } from 'app/entities/purchase-order/purchase-order.model';
import { PurchaseOrderService } from 'app/entities/purchase-order/service/purchase-order.service';
import { IPaymentInvoice } from 'app/entities/payment-invoice/payment-invoice.model';
import { PaymentInvoiceService } from 'app/entities/payment-invoice/service/payment-invoice.service';
import { IPaymentLabel } from 'app/entities/payment-label/payment-label.model';
import { PaymentLabelService } from 'app/entities/payment-label/service/payment-label.service';
import { IPlaceholder } from 'app/entities/erpService/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/erpService/placeholder/service/placeholder.service';
import { ISettlementCurrency } from 'app/entities/settlement-currency/settlement-currency.model';
import { SettlementCurrencyService } from 'app/entities/settlement-currency/service/settlement-currency.service';

import { CreditNoteUpdateComponent } from './credit-note-update.component';

describe('CreditNote Management Update Component', () => {
  let comp: CreditNoteUpdateComponent;
  let fixture: ComponentFixture<CreditNoteUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let creditNoteFormService: CreditNoteFormService;
  let creditNoteService: CreditNoteService;
  let purchaseOrderService: PurchaseOrderService;
  let paymentInvoiceService: PaymentInvoiceService;
  let paymentLabelService: PaymentLabelService;
  let placeholderService: PlaceholderService;
  let settlementCurrencyService: SettlementCurrencyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CreditNoteUpdateComponent],
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
      .overrideTemplate(CreditNoteUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CreditNoteUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    creditNoteFormService = TestBed.inject(CreditNoteFormService);
    creditNoteService = TestBed.inject(CreditNoteService);
    purchaseOrderService = TestBed.inject(PurchaseOrderService);
    paymentInvoiceService = TestBed.inject(PaymentInvoiceService);
    paymentLabelService = TestBed.inject(PaymentLabelService);
    placeholderService = TestBed.inject(PlaceholderService);
    settlementCurrencyService = TestBed.inject(SettlementCurrencyService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call PurchaseOrder query and add missing value', () => {
      const creditNote: ICreditNote = { id: 456 };
      const purchaseOrders: IPurchaseOrder[] = [{ id: 19973 }];
      creditNote.purchaseOrders = purchaseOrders;

      const purchaseOrderCollection: IPurchaseOrder[] = [{ id: 17039 }];
      jest.spyOn(purchaseOrderService, 'query').mockReturnValue(of(new HttpResponse({ body: purchaseOrderCollection })));
      const additionalPurchaseOrders = [...purchaseOrders];
      const expectedCollection: IPurchaseOrder[] = [...additionalPurchaseOrders, ...purchaseOrderCollection];
      jest.spyOn(purchaseOrderService, 'addPurchaseOrderToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ creditNote });
      comp.ngOnInit();

      expect(purchaseOrderService.query).toHaveBeenCalled();
      expect(purchaseOrderService.addPurchaseOrderToCollectionIfMissing).toHaveBeenCalledWith(
        purchaseOrderCollection,
        ...additionalPurchaseOrders.map(expect.objectContaining)
      );
      expect(comp.purchaseOrdersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call PaymentInvoice query and add missing value', () => {
      const creditNote: ICreditNote = { id: 456 };
      const invoices: IPaymentInvoice[] = [{ id: 73908 }];
      creditNote.invoices = invoices;

      const paymentInvoiceCollection: IPaymentInvoice[] = [{ id: 89167 }];
      jest.spyOn(paymentInvoiceService, 'query').mockReturnValue(of(new HttpResponse({ body: paymentInvoiceCollection })));
      const additionalPaymentInvoices = [...invoices];
      const expectedCollection: IPaymentInvoice[] = [...additionalPaymentInvoices, ...paymentInvoiceCollection];
      jest.spyOn(paymentInvoiceService, 'addPaymentInvoiceToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ creditNote });
      comp.ngOnInit();

      expect(paymentInvoiceService.query).toHaveBeenCalled();
      expect(paymentInvoiceService.addPaymentInvoiceToCollectionIfMissing).toHaveBeenCalledWith(
        paymentInvoiceCollection,
        ...additionalPaymentInvoices.map(expect.objectContaining)
      );
      expect(comp.paymentInvoicesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call PaymentLabel query and add missing value', () => {
      const creditNote: ICreditNote = { id: 456 };
      const paymentLabels: IPaymentLabel[] = [{ id: 81021 }];
      creditNote.paymentLabels = paymentLabels;

      const paymentLabelCollection: IPaymentLabel[] = [{ id: 19057 }];
      jest.spyOn(paymentLabelService, 'query').mockReturnValue(of(new HttpResponse({ body: paymentLabelCollection })));
      const additionalPaymentLabels = [...paymentLabels];
      const expectedCollection: IPaymentLabel[] = [...additionalPaymentLabels, ...paymentLabelCollection];
      jest.spyOn(paymentLabelService, 'addPaymentLabelToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ creditNote });
      comp.ngOnInit();

      expect(paymentLabelService.query).toHaveBeenCalled();
      expect(paymentLabelService.addPaymentLabelToCollectionIfMissing).toHaveBeenCalledWith(
        paymentLabelCollection,
        ...additionalPaymentLabels.map(expect.objectContaining)
      );
      expect(comp.paymentLabelsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Placeholder query and add missing value', () => {
      const creditNote: ICreditNote = { id: 456 };
      const placeholders: IPlaceholder[] = [{ id: 10335 }];
      creditNote.placeholders = placeholders;

      const placeholderCollection: IPlaceholder[] = [{ id: 40351 }];
      jest.spyOn(placeholderService, 'query').mockReturnValue(of(new HttpResponse({ body: placeholderCollection })));
      const additionalPlaceholders = [...placeholders];
      const expectedCollection: IPlaceholder[] = [...additionalPlaceholders, ...placeholderCollection];
      jest.spyOn(placeholderService, 'addPlaceholderToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ creditNote });
      comp.ngOnInit();

      expect(placeholderService.query).toHaveBeenCalled();
      expect(placeholderService.addPlaceholderToCollectionIfMissing).toHaveBeenCalledWith(
        placeholderCollection,
        ...additionalPlaceholders.map(expect.objectContaining)
      );
      expect(comp.placeholdersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call SettlementCurrency query and add missing value', () => {
      const creditNote: ICreditNote = { id: 456 };
      const settlementCurrency: ISettlementCurrency = { id: 72300 };
      creditNote.settlementCurrency = settlementCurrency;

      const settlementCurrencyCollection: ISettlementCurrency[] = [{ id: 60923 }];
      jest.spyOn(settlementCurrencyService, 'query').mockReturnValue(of(new HttpResponse({ body: settlementCurrencyCollection })));
      const additionalSettlementCurrencies = [settlementCurrency];
      const expectedCollection: ISettlementCurrency[] = [...additionalSettlementCurrencies, ...settlementCurrencyCollection];
      jest.spyOn(settlementCurrencyService, 'addSettlementCurrencyToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ creditNote });
      comp.ngOnInit();

      expect(settlementCurrencyService.query).toHaveBeenCalled();
      expect(settlementCurrencyService.addSettlementCurrencyToCollectionIfMissing).toHaveBeenCalledWith(
        settlementCurrencyCollection,
        ...additionalSettlementCurrencies.map(expect.objectContaining)
      );
      expect(comp.settlementCurrenciesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const creditNote: ICreditNote = { id: 456 };
      const purchaseOrders: IPurchaseOrder = { id: 37739 };
      creditNote.purchaseOrders = [purchaseOrders];
      const invoices: IPaymentInvoice = { id: 50581 };
      creditNote.invoices = [invoices];
      const paymentLabel: IPaymentLabel = { id: 54736 };
      creditNote.paymentLabels = [paymentLabel];
      const placeholder: IPlaceholder = { id: 15251 };
      creditNote.placeholders = [placeholder];
      const settlementCurrency: ISettlementCurrency = { id: 27178 };
      creditNote.settlementCurrency = settlementCurrency;

      activatedRoute.data = of({ creditNote });
      comp.ngOnInit();

      expect(comp.purchaseOrdersSharedCollection).toContain(purchaseOrders);
      expect(comp.paymentInvoicesSharedCollection).toContain(invoices);
      expect(comp.paymentLabelsSharedCollection).toContain(paymentLabel);
      expect(comp.placeholdersSharedCollection).toContain(placeholder);
      expect(comp.settlementCurrenciesSharedCollection).toContain(settlementCurrency);
      expect(comp.creditNote).toEqual(creditNote);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICreditNote>>();
      const creditNote = { id: 123 };
      jest.spyOn(creditNoteFormService, 'getCreditNote').mockReturnValue(creditNote);
      jest.spyOn(creditNoteService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ creditNote });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: creditNote }));
      saveSubject.complete();

      // THEN
      expect(creditNoteFormService.getCreditNote).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(creditNoteService.update).toHaveBeenCalledWith(expect.objectContaining(creditNote));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICreditNote>>();
      const creditNote = { id: 123 };
      jest.spyOn(creditNoteFormService, 'getCreditNote').mockReturnValue({ id: null });
      jest.spyOn(creditNoteService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ creditNote: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: creditNote }));
      saveSubject.complete();

      // THEN
      expect(creditNoteFormService.getCreditNote).toHaveBeenCalled();
      expect(creditNoteService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICreditNote>>();
      const creditNote = { id: 123 };
      jest.spyOn(creditNoteService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ creditNote });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(creditNoteService.update).toHaveBeenCalled();
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

    describe('comparePaymentInvoice', () => {
      it('Should forward to paymentInvoiceService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(paymentInvoiceService, 'comparePaymentInvoice');
        comp.comparePaymentInvoice(entity, entity2);
        expect(paymentInvoiceService.comparePaymentInvoice).toHaveBeenCalledWith(entity, entity2);
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

    describe('comparePlaceholder', () => {
      it('Should forward to placeholderService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(placeholderService, 'comparePlaceholder');
        comp.comparePlaceholder(entity, entity2);
        expect(placeholderService.comparePlaceholder).toHaveBeenCalledWith(entity, entity2);
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
  });
});
