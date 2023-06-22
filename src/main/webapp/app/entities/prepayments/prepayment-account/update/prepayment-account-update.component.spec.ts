import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { PrepaymentAccountFormService } from './prepayment-account-form.service';
import { PrepaymentAccountService } from '../service/prepayment-account.service';
import { IPrepaymentAccount } from '../prepayment-account.model';
import { ISettlementCurrency } from 'app/entities/settlement/settlement-currency/settlement-currency.model';
import { SettlementCurrencyService } from 'app/entities/settlement/settlement-currency/service/settlement-currency.service';
import { ISettlement } from 'app/entities/settlement/settlement/settlement.model';
import { SettlementService } from 'app/entities/settlement/settlement/service/settlement.service';
import { IServiceOutlet } from 'app/entities/data/service-outlet/service-outlet.model';
import { ServiceOutletService } from 'app/entities/data/service-outlet/service/service-outlet.service';
import { IDealer } from 'app/entities/people/dealer/dealer.model';
import { DealerService } from 'app/entities/people/dealer/service/dealer.service';
import { ITransactionAccount } from 'app/entities/accounting/transaction-account/transaction-account.model';
import { TransactionAccountService } from 'app/entities/accounting/transaction-account/service/transaction-account.service';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/system/placeholder/service/placeholder.service';
import { IUniversallyUniqueMapping } from 'app/entities/system/universally-unique-mapping/universally-unique-mapping.model';
import { UniversallyUniqueMappingService } from 'app/entities/system/universally-unique-mapping/service/universally-unique-mapping.service';
import { IPrepaymentMapping } from 'app/entities/prepayments/prepayment-mapping/prepayment-mapping.model';
import { PrepaymentMappingService } from 'app/entities/prepayments/prepayment-mapping/service/prepayment-mapping.service';
import { IBusinessDocument } from 'app/entities/documentation/business-document/business-document.model';
import { BusinessDocumentService } from 'app/entities/documentation/business-document/service/business-document.service';

import { PrepaymentAccountUpdateComponent } from './prepayment-account-update.component';

describe('PrepaymentAccount Management Update Component', () => {
  let comp: PrepaymentAccountUpdateComponent;
  let fixture: ComponentFixture<PrepaymentAccountUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let prepaymentAccountFormService: PrepaymentAccountFormService;
  let prepaymentAccountService: PrepaymentAccountService;
  let settlementCurrencyService: SettlementCurrencyService;
  let settlementService: SettlementService;
  let serviceOutletService: ServiceOutletService;
  let dealerService: DealerService;
  let transactionAccountService: TransactionAccountService;
  let placeholderService: PlaceholderService;
  let universallyUniqueMappingService: UniversallyUniqueMappingService;
  let prepaymentMappingService: PrepaymentMappingService;
  let businessDocumentService: BusinessDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [PrepaymentAccountUpdateComponent],
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
      .overrideTemplate(PrepaymentAccountUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PrepaymentAccountUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    prepaymentAccountFormService = TestBed.inject(PrepaymentAccountFormService);
    prepaymentAccountService = TestBed.inject(PrepaymentAccountService);
    settlementCurrencyService = TestBed.inject(SettlementCurrencyService);
    settlementService = TestBed.inject(SettlementService);
    serviceOutletService = TestBed.inject(ServiceOutletService);
    dealerService = TestBed.inject(DealerService);
    transactionAccountService = TestBed.inject(TransactionAccountService);
    placeholderService = TestBed.inject(PlaceholderService);
    universallyUniqueMappingService = TestBed.inject(UniversallyUniqueMappingService);
    prepaymentMappingService = TestBed.inject(PrepaymentMappingService);
    businessDocumentService = TestBed.inject(BusinessDocumentService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call SettlementCurrency query and add missing value', () => {
      const prepaymentAccount: IPrepaymentAccount = { id: 456 };
      const settlementCurrency: ISettlementCurrency = { id: 78898 };
      prepaymentAccount.settlementCurrency = settlementCurrency;

      const settlementCurrencyCollection: ISettlementCurrency[] = [{ id: 5442 }];
      jest.spyOn(settlementCurrencyService, 'query').mockReturnValue(of(new HttpResponse({ body: settlementCurrencyCollection })));
      const additionalSettlementCurrencies = [settlementCurrency];
      const expectedCollection: ISettlementCurrency[] = [...additionalSettlementCurrencies, ...settlementCurrencyCollection];
      jest.spyOn(settlementCurrencyService, 'addSettlementCurrencyToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ prepaymentAccount });
      comp.ngOnInit();

      expect(settlementCurrencyService.query).toHaveBeenCalled();
      expect(settlementCurrencyService.addSettlementCurrencyToCollectionIfMissing).toHaveBeenCalledWith(
        settlementCurrencyCollection,
        ...additionalSettlementCurrencies.map(expect.objectContaining)
      );
      expect(comp.settlementCurrenciesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Settlement query and add missing value', () => {
      const prepaymentAccount: IPrepaymentAccount = { id: 456 };
      const prepaymentTransaction: ISettlement = { id: 29183 };
      prepaymentAccount.prepaymentTransaction = prepaymentTransaction;

      const settlementCollection: ISettlement[] = [{ id: 16053 }];
      jest.spyOn(settlementService, 'query').mockReturnValue(of(new HttpResponse({ body: settlementCollection })));
      const additionalSettlements = [prepaymentTransaction];
      const expectedCollection: ISettlement[] = [...additionalSettlements, ...settlementCollection];
      jest.spyOn(settlementService, 'addSettlementToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ prepaymentAccount });
      comp.ngOnInit();

      expect(settlementService.query).toHaveBeenCalled();
      expect(settlementService.addSettlementToCollectionIfMissing).toHaveBeenCalledWith(
        settlementCollection,
        ...additionalSettlements.map(expect.objectContaining)
      );
      expect(comp.settlementsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call ServiceOutlet query and add missing value', () => {
      const prepaymentAccount: IPrepaymentAccount = { id: 456 };
      const serviceOutlet: IServiceOutlet = { id: 27846 };
      prepaymentAccount.serviceOutlet = serviceOutlet;

      const serviceOutletCollection: IServiceOutlet[] = [{ id: 93653 }];
      jest.spyOn(serviceOutletService, 'query').mockReturnValue(of(new HttpResponse({ body: serviceOutletCollection })));
      const additionalServiceOutlets = [serviceOutlet];
      const expectedCollection: IServiceOutlet[] = [...additionalServiceOutlets, ...serviceOutletCollection];
      jest.spyOn(serviceOutletService, 'addServiceOutletToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ prepaymentAccount });
      comp.ngOnInit();

      expect(serviceOutletService.query).toHaveBeenCalled();
      expect(serviceOutletService.addServiceOutletToCollectionIfMissing).toHaveBeenCalledWith(
        serviceOutletCollection,
        ...additionalServiceOutlets.map(expect.objectContaining)
      );
      expect(comp.serviceOutletsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Dealer query and add missing value', () => {
      const prepaymentAccount: IPrepaymentAccount = { id: 456 };
      const dealer: IDealer = { id: 11029 };
      prepaymentAccount.dealer = dealer;

      const dealerCollection: IDealer[] = [{ id: 14788 }];
      jest.spyOn(dealerService, 'query').mockReturnValue(of(new HttpResponse({ body: dealerCollection })));
      const additionalDealers = [dealer];
      const expectedCollection: IDealer[] = [...additionalDealers, ...dealerCollection];
      jest.spyOn(dealerService, 'addDealerToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ prepaymentAccount });
      comp.ngOnInit();

      expect(dealerService.query).toHaveBeenCalled();
      expect(dealerService.addDealerToCollectionIfMissing).toHaveBeenCalledWith(
        dealerCollection,
        ...additionalDealers.map(expect.objectContaining)
      );
      expect(comp.dealersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call TransactionAccount query and add missing value', () => {
      const prepaymentAccount: IPrepaymentAccount = { id: 456 };
      const debitAccount: ITransactionAccount = { id: 95760 };
      prepaymentAccount.debitAccount = debitAccount;
      const transferAccount: ITransactionAccount = { id: 17577 };
      prepaymentAccount.transferAccount = transferAccount;

      const transactionAccountCollection: ITransactionAccount[] = [{ id: 39013 }];
      jest.spyOn(transactionAccountService, 'query').mockReturnValue(of(new HttpResponse({ body: transactionAccountCollection })));
      const additionalTransactionAccounts = [debitAccount, transferAccount];
      const expectedCollection: ITransactionAccount[] = [...additionalTransactionAccounts, ...transactionAccountCollection];
      jest.spyOn(transactionAccountService, 'addTransactionAccountToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ prepaymentAccount });
      comp.ngOnInit();

      expect(transactionAccountService.query).toHaveBeenCalled();
      expect(transactionAccountService.addTransactionAccountToCollectionIfMissing).toHaveBeenCalledWith(
        transactionAccountCollection,
        ...additionalTransactionAccounts.map(expect.objectContaining)
      );
      expect(comp.transactionAccountsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Placeholder query and add missing value', () => {
      const prepaymentAccount: IPrepaymentAccount = { id: 456 };
      const placeholders: IPlaceholder[] = [{ id: 20901 }];
      prepaymentAccount.placeholders = placeholders;

      const placeholderCollection: IPlaceholder[] = [{ id: 81553 }];
      jest.spyOn(placeholderService, 'query').mockReturnValue(of(new HttpResponse({ body: placeholderCollection })));
      const additionalPlaceholders = [...placeholders];
      const expectedCollection: IPlaceholder[] = [...additionalPlaceholders, ...placeholderCollection];
      jest.spyOn(placeholderService, 'addPlaceholderToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ prepaymentAccount });
      comp.ngOnInit();

      expect(placeholderService.query).toHaveBeenCalled();
      expect(placeholderService.addPlaceholderToCollectionIfMissing).toHaveBeenCalledWith(
        placeholderCollection,
        ...additionalPlaceholders.map(expect.objectContaining)
      );
      expect(comp.placeholdersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call UniversallyUniqueMapping query and add missing value', () => {
      const prepaymentAccount: IPrepaymentAccount = { id: 456 };
      const generalParameters: IUniversallyUniqueMapping[] = [{ id: 44009 }];
      prepaymentAccount.generalParameters = generalParameters;

      const universallyUniqueMappingCollection: IUniversallyUniqueMapping[] = [{ id: 28246 }];
      jest
        .spyOn(universallyUniqueMappingService, 'query')
        .mockReturnValue(of(new HttpResponse({ body: universallyUniqueMappingCollection })));
      const additionalUniversallyUniqueMappings = [...generalParameters];
      const expectedCollection: IUniversallyUniqueMapping[] = [
        ...additionalUniversallyUniqueMappings,
        ...universallyUniqueMappingCollection,
      ];
      jest.spyOn(universallyUniqueMappingService, 'addUniversallyUniqueMappingToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ prepaymentAccount });
      comp.ngOnInit();

      expect(universallyUniqueMappingService.query).toHaveBeenCalled();
      expect(universallyUniqueMappingService.addUniversallyUniqueMappingToCollectionIfMissing).toHaveBeenCalledWith(
        universallyUniqueMappingCollection,
        ...additionalUniversallyUniqueMappings.map(expect.objectContaining)
      );
      expect(comp.universallyUniqueMappingsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call PrepaymentMapping query and add missing value', () => {
      const prepaymentAccount: IPrepaymentAccount = { id: 456 };
      const prepaymentParameters: IPrepaymentMapping[] = [{ id: 25518 }];
      prepaymentAccount.prepaymentParameters = prepaymentParameters;

      const prepaymentMappingCollection: IPrepaymentMapping[] = [{ id: 67453 }];
      jest.spyOn(prepaymentMappingService, 'query').mockReturnValue(of(new HttpResponse({ body: prepaymentMappingCollection })));
      const additionalPrepaymentMappings = [...prepaymentParameters];
      const expectedCollection: IPrepaymentMapping[] = [...additionalPrepaymentMappings, ...prepaymentMappingCollection];
      jest.spyOn(prepaymentMappingService, 'addPrepaymentMappingToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ prepaymentAccount });
      comp.ngOnInit();

      expect(prepaymentMappingService.query).toHaveBeenCalled();
      expect(prepaymentMappingService.addPrepaymentMappingToCollectionIfMissing).toHaveBeenCalledWith(
        prepaymentMappingCollection,
        ...additionalPrepaymentMappings.map(expect.objectContaining)
      );
      expect(comp.prepaymentMappingsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call BusinessDocument query and add missing value', () => {
      const prepaymentAccount: IPrepaymentAccount = { id: 456 };
      const businessDocuments: IBusinessDocument[] = [{ id: 68500 }];
      prepaymentAccount.businessDocuments = businessDocuments;

      const businessDocumentCollection: IBusinessDocument[] = [{ id: 85472 }];
      jest.spyOn(businessDocumentService, 'query').mockReturnValue(of(new HttpResponse({ body: businessDocumentCollection })));
      const additionalBusinessDocuments = [...businessDocuments];
      const expectedCollection: IBusinessDocument[] = [...additionalBusinessDocuments, ...businessDocumentCollection];
      jest.spyOn(businessDocumentService, 'addBusinessDocumentToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ prepaymentAccount });
      comp.ngOnInit();

      expect(businessDocumentService.query).toHaveBeenCalled();
      expect(businessDocumentService.addBusinessDocumentToCollectionIfMissing).toHaveBeenCalledWith(
        businessDocumentCollection,
        ...additionalBusinessDocuments.map(expect.objectContaining)
      );
      expect(comp.businessDocumentsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const prepaymentAccount: IPrepaymentAccount = { id: 456 };
      const settlementCurrency: ISettlementCurrency = { id: 83958 };
      prepaymentAccount.settlementCurrency = settlementCurrency;
      const prepaymentTransaction: ISettlement = { id: 34708 };
      prepaymentAccount.prepaymentTransaction = prepaymentTransaction;
      const serviceOutlet: IServiceOutlet = { id: 1841 };
      prepaymentAccount.serviceOutlet = serviceOutlet;
      const dealer: IDealer = { id: 51117 };
      prepaymentAccount.dealer = dealer;
      const debitAccount: ITransactionAccount = { id: 2986 };
      prepaymentAccount.debitAccount = debitAccount;
      const transferAccount: ITransactionAccount = { id: 8579 };
      prepaymentAccount.transferAccount = transferAccount;
      const placeholder: IPlaceholder = { id: 55956 };
      prepaymentAccount.placeholders = [placeholder];
      const generalParameters: IUniversallyUniqueMapping = { id: 53339 };
      prepaymentAccount.generalParameters = [generalParameters];
      const prepaymentParameters: IPrepaymentMapping = { id: 91756 };
      prepaymentAccount.prepaymentParameters = [prepaymentParameters];
      const businessDocument: IBusinessDocument = { id: 22127 };
      prepaymentAccount.businessDocuments = [businessDocument];

      activatedRoute.data = of({ prepaymentAccount });
      comp.ngOnInit();

      expect(comp.settlementCurrenciesSharedCollection).toContain(settlementCurrency);
      expect(comp.settlementsSharedCollection).toContain(prepaymentTransaction);
      expect(comp.serviceOutletsSharedCollection).toContain(serviceOutlet);
      expect(comp.dealersSharedCollection).toContain(dealer);
      expect(comp.transactionAccountsSharedCollection).toContain(debitAccount);
      expect(comp.transactionAccountsSharedCollection).toContain(transferAccount);
      expect(comp.placeholdersSharedCollection).toContain(placeholder);
      expect(comp.universallyUniqueMappingsSharedCollection).toContain(generalParameters);
      expect(comp.prepaymentMappingsSharedCollection).toContain(prepaymentParameters);
      expect(comp.businessDocumentsSharedCollection).toContain(businessDocument);
      expect(comp.prepaymentAccount).toEqual(prepaymentAccount);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPrepaymentAccount>>();
      const prepaymentAccount = { id: 123 };
      jest.spyOn(prepaymentAccountFormService, 'getPrepaymentAccount').mockReturnValue(prepaymentAccount);
      jest.spyOn(prepaymentAccountService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ prepaymentAccount });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: prepaymentAccount }));
      saveSubject.complete();

      // THEN
      expect(prepaymentAccountFormService.getPrepaymentAccount).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(prepaymentAccountService.update).toHaveBeenCalledWith(expect.objectContaining(prepaymentAccount));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPrepaymentAccount>>();
      const prepaymentAccount = { id: 123 };
      jest.spyOn(prepaymentAccountFormService, 'getPrepaymentAccount').mockReturnValue({ id: null });
      jest.spyOn(prepaymentAccountService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ prepaymentAccount: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: prepaymentAccount }));
      saveSubject.complete();

      // THEN
      expect(prepaymentAccountFormService.getPrepaymentAccount).toHaveBeenCalled();
      expect(prepaymentAccountService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPrepaymentAccount>>();
      const prepaymentAccount = { id: 123 };
      jest.spyOn(prepaymentAccountService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ prepaymentAccount });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(prepaymentAccountService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareSettlementCurrency', () => {
      it('Should forward to settlementCurrencyService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(settlementCurrencyService, 'compareSettlementCurrency');
        comp.compareSettlementCurrency(entity, entity2);
        expect(settlementCurrencyService.compareSettlementCurrency).toHaveBeenCalledWith(entity, entity2);
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

    describe('compareServiceOutlet', () => {
      it('Should forward to serviceOutletService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(serviceOutletService, 'compareServiceOutlet');
        comp.compareServiceOutlet(entity, entity2);
        expect(serviceOutletService.compareServiceOutlet).toHaveBeenCalledWith(entity, entity2);
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

    describe('compareTransactionAccount', () => {
      it('Should forward to transactionAccountService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(transactionAccountService, 'compareTransactionAccount');
        comp.compareTransactionAccount(entity, entity2);
        expect(transactionAccountService.compareTransactionAccount).toHaveBeenCalledWith(entity, entity2);
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

    describe('compareUniversallyUniqueMapping', () => {
      it('Should forward to universallyUniqueMappingService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(universallyUniqueMappingService, 'compareUniversallyUniqueMapping');
        comp.compareUniversallyUniqueMapping(entity, entity2);
        expect(universallyUniqueMappingService.compareUniversallyUniqueMapping).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('comparePrepaymentMapping', () => {
      it('Should forward to prepaymentMappingService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(prepaymentMappingService, 'comparePrepaymentMapping');
        comp.comparePrepaymentMapping(entity, entity2);
        expect(prepaymentMappingService.comparePrepaymentMapping).toHaveBeenCalledWith(entity, entity2);
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
