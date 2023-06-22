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

import { SettlementFormService } from './settlement-form.service';
import { SettlementService } from '../service/settlement.service';
import { ISettlement } from '../settlement.model';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/system/placeholder/service/placeholder.service';
import { ISettlementCurrency } from 'app/entities/settlement/settlement-currency/settlement-currency.model';
import { SettlementCurrencyService } from 'app/entities/settlement/settlement-currency/service/settlement-currency.service';
import { IPaymentLabel } from 'app/entities/settlement/payment-label/payment-label.model';
import { PaymentLabelService } from 'app/entities/settlement/payment-label/service/payment-label.service';
import { IPaymentCategory } from 'app/entities/settlement/payment-category/payment-category.model';
import { PaymentCategoryService } from 'app/entities/settlement/payment-category/service/payment-category.service';
import { IDealer } from 'app/entities/people/dealer/dealer.model';
import { DealerService } from 'app/entities/people/dealer/service/dealer.service';
import { IPaymentInvoice } from 'app/entities/settlement/payment-invoice/payment-invoice.model';
import { PaymentInvoiceService } from 'app/entities/settlement/payment-invoice/service/payment-invoice.service';
import { IBusinessDocument } from 'app/entities/documentation/business-document/business-document.model';
import { BusinessDocumentService } from 'app/entities/documentation/business-document/service/business-document.service';

import { SettlementUpdateComponent } from './settlement-update.component';

describe('Settlement Management Update Component', () => {
  let comp: SettlementUpdateComponent;
  let fixture: ComponentFixture<SettlementUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let settlementFormService: SettlementFormService;
  let settlementService: SettlementService;
  let placeholderService: PlaceholderService;
  let settlementCurrencyService: SettlementCurrencyService;
  let paymentLabelService: PaymentLabelService;
  let paymentCategoryService: PaymentCategoryService;
  let dealerService: DealerService;
  let paymentInvoiceService: PaymentInvoiceService;
  let businessDocumentService: BusinessDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [SettlementUpdateComponent],
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
      .overrideTemplate(SettlementUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SettlementUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    settlementFormService = TestBed.inject(SettlementFormService);
    settlementService = TestBed.inject(SettlementService);
    placeholderService = TestBed.inject(PlaceholderService);
    settlementCurrencyService = TestBed.inject(SettlementCurrencyService);
    paymentLabelService = TestBed.inject(PaymentLabelService);
    paymentCategoryService = TestBed.inject(PaymentCategoryService);
    dealerService = TestBed.inject(DealerService);
    paymentInvoiceService = TestBed.inject(PaymentInvoiceService);
    businessDocumentService = TestBed.inject(BusinessDocumentService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Placeholder query and add missing value', () => {
      const settlement: ISettlement = { id: 456 };
      const placeholders: IPlaceholder[] = [{ id: 9050 }];
      settlement.placeholders = placeholders;

      const placeholderCollection: IPlaceholder[] = [{ id: 4974 }];
      jest.spyOn(placeholderService, 'query').mockReturnValue(of(new HttpResponse({ body: placeholderCollection })));
      const additionalPlaceholders = [...placeholders];
      const expectedCollection: IPlaceholder[] = [...additionalPlaceholders, ...placeholderCollection];
      jest.spyOn(placeholderService, 'addPlaceholderToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ settlement });
      comp.ngOnInit();

      expect(placeholderService.query).toHaveBeenCalled();
      expect(placeholderService.addPlaceholderToCollectionIfMissing).toHaveBeenCalledWith(
        placeholderCollection,
        ...additionalPlaceholders.map(expect.objectContaining)
      );
      expect(comp.placeholdersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call SettlementCurrency query and add missing value', () => {
      const settlement: ISettlement = { id: 456 };
      const settlementCurrency: ISettlementCurrency = { id: 80549 };
      settlement.settlementCurrency = settlementCurrency;

      const settlementCurrencyCollection: ISettlementCurrency[] = [{ id: 40289 }];
      jest.spyOn(settlementCurrencyService, 'query').mockReturnValue(of(new HttpResponse({ body: settlementCurrencyCollection })));
      const additionalSettlementCurrencies = [settlementCurrency];
      const expectedCollection: ISettlementCurrency[] = [...additionalSettlementCurrencies, ...settlementCurrencyCollection];
      jest.spyOn(settlementCurrencyService, 'addSettlementCurrencyToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ settlement });
      comp.ngOnInit();

      expect(settlementCurrencyService.query).toHaveBeenCalled();
      expect(settlementCurrencyService.addSettlementCurrencyToCollectionIfMissing).toHaveBeenCalledWith(
        settlementCurrencyCollection,
        ...additionalSettlementCurrencies.map(expect.objectContaining)
      );
      expect(comp.settlementCurrenciesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call PaymentLabel query and add missing value', () => {
      const settlement: ISettlement = { id: 456 };
      const paymentLabels: IPaymentLabel[] = [{ id: 39337 }];
      settlement.paymentLabels = paymentLabels;

      const paymentLabelCollection: IPaymentLabel[] = [{ id: 8138 }];
      jest.spyOn(paymentLabelService, 'query').mockReturnValue(of(new HttpResponse({ body: paymentLabelCollection })));
      const additionalPaymentLabels = [...paymentLabels];
      const expectedCollection: IPaymentLabel[] = [...additionalPaymentLabels, ...paymentLabelCollection];
      jest.spyOn(paymentLabelService, 'addPaymentLabelToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ settlement });
      comp.ngOnInit();

      expect(paymentLabelService.query).toHaveBeenCalled();
      expect(paymentLabelService.addPaymentLabelToCollectionIfMissing).toHaveBeenCalledWith(
        paymentLabelCollection,
        ...additionalPaymentLabels.map(expect.objectContaining)
      );
      expect(comp.paymentLabelsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call PaymentCategory query and add missing value', () => {
      const settlement: ISettlement = { id: 456 };
      const paymentCategory: IPaymentCategory = { id: 96211 };
      settlement.paymentCategory = paymentCategory;

      const paymentCategoryCollection: IPaymentCategory[] = [{ id: 28357 }];
      jest.spyOn(paymentCategoryService, 'query').mockReturnValue(of(new HttpResponse({ body: paymentCategoryCollection })));
      const additionalPaymentCategories = [paymentCategory];
      const expectedCollection: IPaymentCategory[] = [...additionalPaymentCategories, ...paymentCategoryCollection];
      jest.spyOn(paymentCategoryService, 'addPaymentCategoryToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ settlement });
      comp.ngOnInit();

      expect(paymentCategoryService.query).toHaveBeenCalled();
      expect(paymentCategoryService.addPaymentCategoryToCollectionIfMissing).toHaveBeenCalledWith(
        paymentCategoryCollection,
        ...additionalPaymentCategories.map(expect.objectContaining)
      );
      expect(comp.paymentCategoriesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Settlement query and add missing value', () => {
      const settlement: ISettlement = { id: 456 };
      const groupSettlement: ISettlement = { id: 39563 };
      settlement.groupSettlement = groupSettlement;

      const settlementCollection: ISettlement[] = [{ id: 24641 }];
      jest.spyOn(settlementService, 'query').mockReturnValue(of(new HttpResponse({ body: settlementCollection })));
      const additionalSettlements = [groupSettlement];
      const expectedCollection: ISettlement[] = [...additionalSettlements, ...settlementCollection];
      jest.spyOn(settlementService, 'addSettlementToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ settlement });
      comp.ngOnInit();

      expect(settlementService.query).toHaveBeenCalled();
      expect(settlementService.addSettlementToCollectionIfMissing).toHaveBeenCalledWith(
        settlementCollection,
        ...additionalSettlements.map(expect.objectContaining)
      );
      expect(comp.settlementsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Dealer query and add missing value', () => {
      const settlement: ISettlement = { id: 456 };
      const biller: IDealer = { id: 1844 };
      settlement.biller = biller;
      const signatories: IDealer[] = [{ id: 38725 }];
      settlement.signatories = signatories;

      const dealerCollection: IDealer[] = [{ id: 99671 }];
      jest.spyOn(dealerService, 'query').mockReturnValue(of(new HttpResponse({ body: dealerCollection })));
      const additionalDealers = [biller, ...signatories];
      const expectedCollection: IDealer[] = [...additionalDealers, ...dealerCollection];
      jest.spyOn(dealerService, 'addDealerToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ settlement });
      comp.ngOnInit();

      expect(dealerService.query).toHaveBeenCalled();
      expect(dealerService.addDealerToCollectionIfMissing).toHaveBeenCalledWith(
        dealerCollection,
        ...additionalDealers.map(expect.objectContaining)
      );
      expect(comp.dealersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call PaymentInvoice query and add missing value', () => {
      const settlement: ISettlement = { id: 456 };
      const paymentInvoices: IPaymentInvoice[] = [{ id: 435 }];
      settlement.paymentInvoices = paymentInvoices;

      const paymentInvoiceCollection: IPaymentInvoice[] = [{ id: 67209 }];
      jest.spyOn(paymentInvoiceService, 'query').mockReturnValue(of(new HttpResponse({ body: paymentInvoiceCollection })));
      const additionalPaymentInvoices = [...paymentInvoices];
      const expectedCollection: IPaymentInvoice[] = [...additionalPaymentInvoices, ...paymentInvoiceCollection];
      jest.spyOn(paymentInvoiceService, 'addPaymentInvoiceToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ settlement });
      comp.ngOnInit();

      expect(paymentInvoiceService.query).toHaveBeenCalled();
      expect(paymentInvoiceService.addPaymentInvoiceToCollectionIfMissing).toHaveBeenCalledWith(
        paymentInvoiceCollection,
        ...additionalPaymentInvoices.map(expect.objectContaining)
      );
      expect(comp.paymentInvoicesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call BusinessDocument query and add missing value', () => {
      const settlement: ISettlement = { id: 456 };
      const businessDocuments: IBusinessDocument[] = [{ id: 178 }];
      settlement.businessDocuments = businessDocuments;

      const businessDocumentCollection: IBusinessDocument[] = [{ id: 31818 }];
      jest.spyOn(businessDocumentService, 'query').mockReturnValue(of(new HttpResponse({ body: businessDocumentCollection })));
      const additionalBusinessDocuments = [...businessDocuments];
      const expectedCollection: IBusinessDocument[] = [...additionalBusinessDocuments, ...businessDocumentCollection];
      jest.spyOn(businessDocumentService, 'addBusinessDocumentToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ settlement });
      comp.ngOnInit();

      expect(businessDocumentService.query).toHaveBeenCalled();
      expect(businessDocumentService.addBusinessDocumentToCollectionIfMissing).toHaveBeenCalledWith(
        businessDocumentCollection,
        ...additionalBusinessDocuments.map(expect.objectContaining)
      );
      expect(comp.businessDocumentsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const settlement: ISettlement = { id: 456 };
      const placeholder: IPlaceholder = { id: 41050 };
      settlement.placeholders = [placeholder];
      const settlementCurrency: ISettlementCurrency = { id: 46314 };
      settlement.settlementCurrency = settlementCurrency;
      const paymentLabel: IPaymentLabel = { id: 89836 };
      settlement.paymentLabels = [paymentLabel];
      const paymentCategory: IPaymentCategory = { id: 41328 };
      settlement.paymentCategory = paymentCategory;
      const groupSettlement: ISettlement = { id: 295 };
      settlement.groupSettlement = groupSettlement;
      const biller: IDealer = { id: 9124 };
      settlement.biller = biller;
      const signatories: IDealer = { id: 26842 };
      settlement.signatories = [signatories];
      const paymentInvoice: IPaymentInvoice = { id: 35911 };
      settlement.paymentInvoices = [paymentInvoice];
      const businessDocument: IBusinessDocument = { id: 28629 };
      settlement.businessDocuments = [businessDocument];

      activatedRoute.data = of({ settlement });
      comp.ngOnInit();

      expect(comp.placeholdersSharedCollection).toContain(placeholder);
      expect(comp.settlementCurrenciesSharedCollection).toContain(settlementCurrency);
      expect(comp.paymentLabelsSharedCollection).toContain(paymentLabel);
      expect(comp.paymentCategoriesSharedCollection).toContain(paymentCategory);
      expect(comp.settlementsSharedCollection).toContain(groupSettlement);
      expect(comp.dealersSharedCollection).toContain(biller);
      expect(comp.dealersSharedCollection).toContain(signatories);
      expect(comp.paymentInvoicesSharedCollection).toContain(paymentInvoice);
      expect(comp.businessDocumentsSharedCollection).toContain(businessDocument);
      expect(comp.settlement).toEqual(settlement);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISettlement>>();
      const settlement = { id: 123 };
      jest.spyOn(settlementFormService, 'getSettlement').mockReturnValue(settlement);
      jest.spyOn(settlementService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ settlement });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: settlement }));
      saveSubject.complete();

      // THEN
      expect(settlementFormService.getSettlement).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(settlementService.update).toHaveBeenCalledWith(expect.objectContaining(settlement));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISettlement>>();
      const settlement = { id: 123 };
      jest.spyOn(settlementFormService, 'getSettlement').mockReturnValue({ id: null });
      jest.spyOn(settlementService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ settlement: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: settlement }));
      saveSubject.complete();

      // THEN
      expect(settlementFormService.getSettlement).toHaveBeenCalled();
      expect(settlementService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISettlement>>();
      const settlement = { id: 123 };
      jest.spyOn(settlementService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ settlement });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(settlementService.update).toHaveBeenCalled();
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

    describe('compareSettlementCurrency', () => {
      it('Should forward to settlementCurrencyService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(settlementCurrencyService, 'compareSettlementCurrency');
        comp.compareSettlementCurrency(entity, entity2);
        expect(settlementCurrencyService.compareSettlementCurrency).toHaveBeenCalledWith(entity, entity2);
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

    describe('comparePaymentCategory', () => {
      it('Should forward to paymentCategoryService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(paymentCategoryService, 'comparePaymentCategory');
        comp.comparePaymentCategory(entity, entity2);
        expect(paymentCategoryService.comparePaymentCategory).toHaveBeenCalledWith(entity, entity2);
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

    describe('compareDealer', () => {
      it('Should forward to dealerService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(dealerService, 'compareDealer');
        comp.compareDealer(entity, entity2);
        expect(dealerService.compareDealer).toHaveBeenCalledWith(entity, entity2);
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
