import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { WorkProjectRegisterFormService } from './work-project-register-form.service';
import { WorkProjectRegisterService } from '../service/work-project-register.service';
import { IWorkProjectRegister } from '../work-project-register.model';
import { IDealer } from 'app/entities/dealers/dealer/dealer.model';
import { DealerService } from 'app/entities/dealers/dealer/service/dealer.service';
import { ISettlementCurrency } from 'app/entities/settlement-currency/settlement-currency.model';
import { SettlementCurrencyService } from 'app/entities/settlement-currency/service/settlement-currency.service';
import { IPlaceholder } from 'app/entities/erpService/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/erpService/placeholder/service/placeholder.service';
import { IBusinessDocument } from 'app/entities/business-document/business-document.model';
import { BusinessDocumentService } from 'app/entities/business-document/service/business-document.service';

import { WorkProjectRegisterUpdateComponent } from './work-project-register-update.component';

describe('WorkProjectRegister Management Update Component', () => {
  let comp: WorkProjectRegisterUpdateComponent;
  let fixture: ComponentFixture<WorkProjectRegisterUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let workProjectRegisterFormService: WorkProjectRegisterFormService;
  let workProjectRegisterService: WorkProjectRegisterService;
  let dealerService: DealerService;
  let settlementCurrencyService: SettlementCurrencyService;
  let placeholderService: PlaceholderService;
  let businessDocumentService: BusinessDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [WorkProjectRegisterUpdateComponent],
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
      .overrideTemplate(WorkProjectRegisterUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(WorkProjectRegisterUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    workProjectRegisterFormService = TestBed.inject(WorkProjectRegisterFormService);
    workProjectRegisterService = TestBed.inject(WorkProjectRegisterService);
    dealerService = TestBed.inject(DealerService);
    settlementCurrencyService = TestBed.inject(SettlementCurrencyService);
    placeholderService = TestBed.inject(PlaceholderService);
    businessDocumentService = TestBed.inject(BusinessDocumentService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Dealer query and add missing value', () => {
      const workProjectRegister: IWorkProjectRegister = { id: 456 };
      const dealers: IDealer[] = [{ id: 59475 }];
      workProjectRegister.dealers = dealers;

      const dealerCollection: IDealer[] = [{ id: 39036 }];
      jest.spyOn(dealerService, 'query').mockReturnValue(of(new HttpResponse({ body: dealerCollection })));
      const additionalDealers = [...dealers];
      const expectedCollection: IDealer[] = [...additionalDealers, ...dealerCollection];
      jest.spyOn(dealerService, 'addDealerToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ workProjectRegister });
      comp.ngOnInit();

      expect(dealerService.query).toHaveBeenCalled();
      expect(dealerService.addDealerToCollectionIfMissing).toHaveBeenCalledWith(
        dealerCollection,
        ...additionalDealers.map(expect.objectContaining)
      );
      expect(comp.dealersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call SettlementCurrency query and add missing value', () => {
      const workProjectRegister: IWorkProjectRegister = { id: 456 };
      const settlementCurrency: ISettlementCurrency = { id: 12336 };
      workProjectRegister.settlementCurrency = settlementCurrency;

      const settlementCurrencyCollection: ISettlementCurrency[] = [{ id: 21064 }];
      jest.spyOn(settlementCurrencyService, 'query').mockReturnValue(of(new HttpResponse({ body: settlementCurrencyCollection })));
      const additionalSettlementCurrencies = [settlementCurrency];
      const expectedCollection: ISettlementCurrency[] = [...additionalSettlementCurrencies, ...settlementCurrencyCollection];
      jest.spyOn(settlementCurrencyService, 'addSettlementCurrencyToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ workProjectRegister });
      comp.ngOnInit();

      expect(settlementCurrencyService.query).toHaveBeenCalled();
      expect(settlementCurrencyService.addSettlementCurrencyToCollectionIfMissing).toHaveBeenCalledWith(
        settlementCurrencyCollection,
        ...additionalSettlementCurrencies.map(expect.objectContaining)
      );
      expect(comp.settlementCurrenciesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Placeholder query and add missing value', () => {
      const workProjectRegister: IWorkProjectRegister = { id: 456 };
      const placeholders: IPlaceholder[] = [{ id: 63089 }];
      workProjectRegister.placeholders = placeholders;

      const placeholderCollection: IPlaceholder[] = [{ id: 1509 }];
      jest.spyOn(placeholderService, 'query').mockReturnValue(of(new HttpResponse({ body: placeholderCollection })));
      const additionalPlaceholders = [...placeholders];
      const expectedCollection: IPlaceholder[] = [...additionalPlaceholders, ...placeholderCollection];
      jest.spyOn(placeholderService, 'addPlaceholderToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ workProjectRegister });
      comp.ngOnInit();

      expect(placeholderService.query).toHaveBeenCalled();
      expect(placeholderService.addPlaceholderToCollectionIfMissing).toHaveBeenCalledWith(
        placeholderCollection,
        ...additionalPlaceholders.map(expect.objectContaining)
      );
      expect(comp.placeholdersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call BusinessDocument query and add missing value', () => {
      const workProjectRegister: IWorkProjectRegister = { id: 456 };
      const businessDocuments: IBusinessDocument[] = [{ id: 55695 }];
      workProjectRegister.businessDocuments = businessDocuments;

      const businessDocumentCollection: IBusinessDocument[] = [{ id: 25329 }];
      jest.spyOn(businessDocumentService, 'query').mockReturnValue(of(new HttpResponse({ body: businessDocumentCollection })));
      const additionalBusinessDocuments = [...businessDocuments];
      const expectedCollection: IBusinessDocument[] = [...additionalBusinessDocuments, ...businessDocumentCollection];
      jest.spyOn(businessDocumentService, 'addBusinessDocumentToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ workProjectRegister });
      comp.ngOnInit();

      expect(businessDocumentService.query).toHaveBeenCalled();
      expect(businessDocumentService.addBusinessDocumentToCollectionIfMissing).toHaveBeenCalledWith(
        businessDocumentCollection,
        ...additionalBusinessDocuments.map(expect.objectContaining)
      );
      expect(comp.businessDocumentsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const workProjectRegister: IWorkProjectRegister = { id: 456 };
      const dealers: IDealer = { id: 32359 };
      workProjectRegister.dealers = [dealers];
      const settlementCurrency: ISettlementCurrency = { id: 91030 };
      workProjectRegister.settlementCurrency = settlementCurrency;
      const placeholder: IPlaceholder = { id: 97619 };
      workProjectRegister.placeholders = [placeholder];
      const businessDocument: IBusinessDocument = { id: 39744 };
      workProjectRegister.businessDocuments = [businessDocument];

      activatedRoute.data = of({ workProjectRegister });
      comp.ngOnInit();

      expect(comp.dealersSharedCollection).toContain(dealers);
      expect(comp.settlementCurrenciesSharedCollection).toContain(settlementCurrency);
      expect(comp.placeholdersSharedCollection).toContain(placeholder);
      expect(comp.businessDocumentsSharedCollection).toContain(businessDocument);
      expect(comp.workProjectRegister).toEqual(workProjectRegister);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IWorkProjectRegister>>();
      const workProjectRegister = { id: 123 };
      jest.spyOn(workProjectRegisterFormService, 'getWorkProjectRegister').mockReturnValue(workProjectRegister);
      jest.spyOn(workProjectRegisterService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ workProjectRegister });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: workProjectRegister }));
      saveSubject.complete();

      // THEN
      expect(workProjectRegisterFormService.getWorkProjectRegister).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(workProjectRegisterService.update).toHaveBeenCalledWith(expect.objectContaining(workProjectRegister));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IWorkProjectRegister>>();
      const workProjectRegister = { id: 123 };
      jest.spyOn(workProjectRegisterFormService, 'getWorkProjectRegister').mockReturnValue({ id: null });
      jest.spyOn(workProjectRegisterService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ workProjectRegister: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: workProjectRegister }));
      saveSubject.complete();

      // THEN
      expect(workProjectRegisterFormService.getWorkProjectRegister).toHaveBeenCalled();
      expect(workProjectRegisterService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IWorkProjectRegister>>();
      const workProjectRegister = { id: 123 };
      jest.spyOn(workProjectRegisterService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ workProjectRegister });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(workProjectRegisterService.update).toHaveBeenCalled();
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
