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

import { AgencyNoticeFormService } from './agency-notice-form.service';
import { AgencyNoticeService } from '../service/agency-notice.service';
import { IAgencyNotice } from '../agency-notice.model';

import { AgencyNoticeUpdateComponent } from './agency-notice-update.component';
import { ISettlementCurrency } from '../../../erp-settlements/settlement-currency/settlement-currency.model';
import { IPlaceholder } from '../../../erp-pages/placeholder/placeholder.model';
import { IBusinessDocument } from '../../../erp-pages/business-document/business-document.model';
import { DealerService } from '../../../erp-pages/dealers/dealer/service/dealer.service';
import { BusinessDocumentService } from '../../../erp-pages/business-document/service/business-document.service';
import { SettlementCurrencyService } from '../../../erp-settlements/settlement-currency/service/settlement-currency.service';
import { PlaceholderService } from '../../../erp-pages/placeholder/service/placeholder.service';
import { IDealer } from '../../../erp-pages/dealers/dealer/dealer.model';

describe('AgencyNotice Management Update Component', () => {
  let comp: AgencyNoticeUpdateComponent;
  let fixture: ComponentFixture<AgencyNoticeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let agencyNoticeFormService: AgencyNoticeFormService;
  let agencyNoticeService: AgencyNoticeService;
  let dealerService: DealerService;
  let settlementCurrencyService: SettlementCurrencyService;
  let placeholderService: PlaceholderService;
  let businessDocumentService: BusinessDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [AgencyNoticeUpdateComponent],
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
      .overrideTemplate(AgencyNoticeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AgencyNoticeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    agencyNoticeFormService = TestBed.inject(AgencyNoticeFormService);
    agencyNoticeService = TestBed.inject(AgencyNoticeService);
    dealerService = TestBed.inject(DealerService);
    settlementCurrencyService = TestBed.inject(SettlementCurrencyService);
    placeholderService = TestBed.inject(PlaceholderService);
    businessDocumentService = TestBed.inject(BusinessDocumentService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Dealer query and add missing value', () => {
      const agencyNotice: IAgencyNotice = { id: 456 };
      const correspondents: IDealer[] = [{ id: 57711 }];
      agencyNotice.correspondents = correspondents;
      const assessor: IDealer = { id: 17478 };
      agencyNotice.assessor = assessor;

      const dealerCollection: IDealer[] = [{ id: 4059 }];
      jest.spyOn(dealerService, 'query').mockReturnValue(of(new HttpResponse({ body: dealerCollection })));
      const additionalDealers = [...correspondents, assessor];
      const expectedCollection: IDealer[] = [...additionalDealers, ...dealerCollection];
      jest.spyOn(dealerService, 'addDealerToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ agencyNotice });
      comp.ngOnInit();

      expect(dealerService.query).toHaveBeenCalled();
      expect(dealerService.addDealerToCollectionIfMissing).toHaveBeenCalledWith(
        dealerCollection,
        ...additionalDealers.map(expect.objectContaining)
      );
      expect(comp.dealersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call SettlementCurrency query and add missing value', () => {
      const agencyNotice: IAgencyNotice = { id: 456 };
      const settlementCurrency: ISettlementCurrency = { id: 58717 };
      agencyNotice.settlementCurrency = settlementCurrency;

      const settlementCurrencyCollection: ISettlementCurrency[] = [{ id: 89939 }];
      jest.spyOn(settlementCurrencyService, 'query').mockReturnValue(of(new HttpResponse({ body: settlementCurrencyCollection })));
      const additionalSettlementCurrencies = [settlementCurrency];
      const expectedCollection: ISettlementCurrency[] = [...additionalSettlementCurrencies, ...settlementCurrencyCollection];
      jest.spyOn(settlementCurrencyService, 'addSettlementCurrencyToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ agencyNotice });
      comp.ngOnInit();

      expect(settlementCurrencyService.query).toHaveBeenCalled();
      expect(settlementCurrencyService.addSettlementCurrencyToCollectionIfMissing).toHaveBeenCalledWith(
        settlementCurrencyCollection,
        ...additionalSettlementCurrencies.map(expect.objectContaining)
      );
      expect(comp.settlementCurrenciesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Placeholder query and add missing value', () => {
      const agencyNotice: IAgencyNotice = { id: 456 };
      const placeholders: IPlaceholder[] = [{ id: 77689 }];
      agencyNotice.placeholders = placeholders;

      const placeholderCollection: IPlaceholder[] = [{ id: 44127 }];
      jest.spyOn(placeholderService, 'query').mockReturnValue(of(new HttpResponse({ body: placeholderCollection })));
      const additionalPlaceholders = [...placeholders];
      const expectedCollection: IPlaceholder[] = [...additionalPlaceholders, ...placeholderCollection];
      jest.spyOn(placeholderService, 'addPlaceholderToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ agencyNotice });
      comp.ngOnInit();

      expect(placeholderService.query).toHaveBeenCalled();
      expect(placeholderService.addPlaceholderToCollectionIfMissing).toHaveBeenCalledWith(
        placeholderCollection,
        ...additionalPlaceholders.map(expect.objectContaining)
      );
      expect(comp.placeholdersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call BusinessDocument query and add missing value', () => {
      const agencyNotice: IAgencyNotice = { id: 456 };
      const businessDocuments: IBusinessDocument[] = [{ id: 39711 }];
      agencyNotice.businessDocuments = businessDocuments;

      const businessDocumentCollection: IBusinessDocument[] = [{ id: 62146 }];
      jest.spyOn(businessDocumentService, 'query').mockReturnValue(of(new HttpResponse({ body: businessDocumentCollection })));
      const additionalBusinessDocuments = [...businessDocuments];
      const expectedCollection: IBusinessDocument[] = [...additionalBusinessDocuments, ...businessDocumentCollection];
      jest.spyOn(businessDocumentService, 'addBusinessDocumentToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ agencyNotice });
      comp.ngOnInit();

      expect(businessDocumentService.query).toHaveBeenCalled();
      expect(businessDocumentService.addBusinessDocumentToCollectionIfMissing).toHaveBeenCalledWith(
        businessDocumentCollection,
        ...additionalBusinessDocuments.map(expect.objectContaining)
      );
      expect(comp.businessDocumentsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const agencyNotice: IAgencyNotice = { id: 456 };
      const correspondents: IDealer = { id: 84699 };
      agencyNotice.correspondents = [correspondents];
      const assessor: IDealer = { id: 66076 };
      agencyNotice.assessor = assessor;
      const settlementCurrency: ISettlementCurrency = { id: 13286 };
      agencyNotice.settlementCurrency = settlementCurrency;
      const placeholder: IPlaceholder = { id: 23210 };
      agencyNotice.placeholders = [placeholder];
      const businessDocument: IBusinessDocument = { id: 22693 };
      agencyNotice.businessDocuments = [businessDocument];

      activatedRoute.data = of({ agencyNotice });
      comp.ngOnInit();

      expect(comp.dealersSharedCollection).toContain(correspondents);
      expect(comp.dealersSharedCollection).toContain(assessor);
      expect(comp.settlementCurrenciesSharedCollection).toContain(settlementCurrency);
      expect(comp.placeholdersSharedCollection).toContain(placeholder);
      expect(comp.businessDocumentsSharedCollection).toContain(businessDocument);
      expect(comp.agencyNotice).toEqual(agencyNotice);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAgencyNotice>>();
      const agencyNotice = { id: 123 };
      jest.spyOn(agencyNoticeFormService, 'getAgencyNotice').mockReturnValue(agencyNotice);
      jest.spyOn(agencyNoticeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ agencyNotice });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: agencyNotice }));
      saveSubject.complete();

      // THEN
      expect(agencyNoticeFormService.getAgencyNotice).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(agencyNoticeService.update).toHaveBeenCalledWith(expect.objectContaining(agencyNotice));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAgencyNotice>>();
      const agencyNotice = { id: 123 };
      jest.spyOn(agencyNoticeFormService, 'getAgencyNotice').mockReturnValue({ id: null });
      jest.spyOn(agencyNoticeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ agencyNotice: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: agencyNotice }));
      saveSubject.complete();

      // THEN
      expect(agencyNoticeFormService.getAgencyNotice).toHaveBeenCalled();
      expect(agencyNoticeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAgencyNotice>>();
      const agencyNotice = { id: 123 };
      jest.spyOn(agencyNoticeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ agencyNotice });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(agencyNoticeService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
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

    describe('comparePlaceholder', () => {
      it('Should forward to placeholderService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(placeholderService, 'comparePlaceholder');
        comp.comparePlaceholder(entity, entity2);
        expect(placeholderService.comparePlaceholder).toHaveBeenCalledWith(entity, entity2);
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
