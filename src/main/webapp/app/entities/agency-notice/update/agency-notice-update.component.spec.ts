jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { AgencyNoticeService } from '../service/agency-notice.service';
import { IAgencyNotice, AgencyNotice } from '../agency-notice.model';
import { IDealer } from 'app/entities/dealers/dealer/dealer.model';
import { DealerService } from 'app/entities/dealers/dealer/service/dealer.service';
import { ISettlementCurrency } from 'app/entities/settlement-currency/settlement-currency.model';
import { SettlementCurrencyService } from 'app/entities/settlement-currency/service/settlement-currency.service';

import { AgencyNoticeUpdateComponent } from './agency-notice-update.component';

describe('AgencyNotice Management Update Component', () => {
  let comp: AgencyNoticeUpdateComponent;
  let fixture: ComponentFixture<AgencyNoticeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let agencyNoticeService: AgencyNoticeService;
  let dealerService: DealerService;
  let settlementCurrencyService: SettlementCurrencyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [AgencyNoticeUpdateComponent],
      providers: [FormBuilder, ActivatedRoute],
    })
      .overrideTemplate(AgencyNoticeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AgencyNoticeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    agencyNoticeService = TestBed.inject(AgencyNoticeService);
    dealerService = TestBed.inject(DealerService);
    settlementCurrencyService = TestBed.inject(SettlementCurrencyService);

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
      expect(dealerService.addDealerToCollectionIfMissing).toHaveBeenCalledWith(dealerCollection, ...additionalDealers);
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
        ...additionalSettlementCurrencies
      );
      expect(comp.settlementCurrenciesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const agencyNotice: IAgencyNotice = { id: 456 };
      const correspondents: IDealer = { id: 84699 };
      agencyNotice.correspondents = [correspondents];
      const assessor: IDealer = { id: 66076 };
      agencyNotice.assessor = assessor;
      const settlementCurrency: ISettlementCurrency = { id: 13286 };
      agencyNotice.settlementCurrency = settlementCurrency;

      activatedRoute.data = of({ agencyNotice });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(agencyNotice));
      expect(comp.dealersSharedCollection).toContain(correspondents);
      expect(comp.dealersSharedCollection).toContain(assessor);
      expect(comp.settlementCurrenciesSharedCollection).toContain(settlementCurrency);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<AgencyNotice>>();
      const agencyNotice = { id: 123 };
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
      expect(comp.previousState).toHaveBeenCalled();
      expect(agencyNoticeService.update).toHaveBeenCalledWith(agencyNotice);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<AgencyNotice>>();
      const agencyNotice = new AgencyNotice();
      jest.spyOn(agencyNoticeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ agencyNotice });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: agencyNotice }));
      saveSubject.complete();

      // THEN
      expect(agencyNoticeService.create).toHaveBeenCalledWith(agencyNotice);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<AgencyNotice>>();
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
      expect(agencyNoticeService.update).toHaveBeenCalledWith(agencyNotice);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackDealerById', () => {
      it('Should return tracked Dealer primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackDealerById(0, entity);
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
  });

  describe('Getting selected relationships', () => {
    describe('getSelectedDealer', () => {
      it('Should return option if no Dealer is selected', () => {
        const option = { id: 123 };
        const result = comp.getSelectedDealer(option);
        expect(result === option).toEqual(true);
      });

      it('Should return selected Dealer for according option', () => {
        const option = { id: 123 };
        const selected = { id: 123 };
        const selected2 = { id: 456 };
        const result = comp.getSelectedDealer(option, [selected2, selected]);
        expect(result === selected).toEqual(true);
        expect(result === selected2).toEqual(false);
        expect(result === option).toEqual(false);
      });

      it('Should return option if this Dealer is not selected', () => {
        const option = { id: 123 };
        const selected = { id: 456 };
        const result = comp.getSelectedDealer(option, [selected]);
        expect(result === option).toEqual(true);
        expect(result === selected).toEqual(false);
      });
    });
  });
});
