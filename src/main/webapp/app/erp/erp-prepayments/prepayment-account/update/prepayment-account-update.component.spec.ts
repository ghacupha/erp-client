///
/// Erp System - Mark II No 11 (Artaxerxes Series)
/// Copyright © 2021 Edwin Njeru (mailnjeru@gmail.com)
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

jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { PrepaymentAccountService } from '../service/prepayment-account.service';
import { IPrepaymentAccount, PrepaymentAccount } from '../prepayment-account.model';
import { ISettlementCurrency } from 'app/entities/settlement-currency/settlement-currency.model';
import { SettlementCurrencyService } from 'app/entities/settlement-currency/service/settlement-currency.service';
import { ISettlement } from 'app/entities/settlement/settlement.model';
import { SettlementService } from 'app/entities/settlement/service/settlement.service';
import { IServiceOutlet } from 'app/entities/service-outlet/service-outlet.model';
import { ServiceOutletService } from 'app/entities/service-outlet/service/service-outlet.service';
import { IDealer } from 'app/entities/dealers/dealer/dealer.model';
import { DealerService } from 'app/entities/dealers/dealer/service/dealer.service';
import { IPlaceholder } from 'app/entities/erpService/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/erpService/placeholder/service/placeholder.service';
import { ITransactionAccount } from 'app/entities/transaction-account/transaction-account.model';
import { TransactionAccountService } from 'app/entities/transaction-account/service/transaction-account.service';

import { PrepaymentAccountUpdateComponent } from './prepayment-account-update.component';

describe('PrepaymentAccount Management Update Component', () => {
  let comp: PrepaymentAccountUpdateComponent;
  let fixture: ComponentFixture<PrepaymentAccountUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let prepaymentAccountService: PrepaymentAccountService;
  let settlementCurrencyService: SettlementCurrencyService;
  let settlementService: SettlementService;
  let serviceOutletService: ServiceOutletService;
  let dealerService: DealerService;
  let placeholderService: PlaceholderService;
  let transactionAccountService: TransactionAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [PrepaymentAccountUpdateComponent],
      providers: [FormBuilder, ActivatedRoute],
    })
      .overrideTemplate(PrepaymentAccountUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PrepaymentAccountUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    prepaymentAccountService = TestBed.inject(PrepaymentAccountService);
    settlementCurrencyService = TestBed.inject(SettlementCurrencyService);
    settlementService = TestBed.inject(SettlementService);
    serviceOutletService = TestBed.inject(ServiceOutletService);
    dealerService = TestBed.inject(DealerService);
    placeholderService = TestBed.inject(PlaceholderService);
    transactionAccountService = TestBed.inject(TransactionAccountService);

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
        ...additionalSettlementCurrencies
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
      expect(settlementService.addSettlementToCollectionIfMissing).toHaveBeenCalledWith(settlementCollection, ...additionalSettlements);
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
        ...additionalServiceOutlets
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
      expect(dealerService.addDealerToCollectionIfMissing).toHaveBeenCalledWith(dealerCollection, ...additionalDealers);
      expect(comp.dealersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Placeholder query and add missing value', () => {
      const prepaymentAccount: IPrepaymentAccount = { id: 456 };
      const placeholder: IPlaceholder = { id: 20901 };
      prepaymentAccount.placeholder = placeholder;

      const placeholderCollection: IPlaceholder[] = [{ id: 81553 }];
      jest.spyOn(placeholderService, 'query').mockReturnValue(of(new HttpResponse({ body: placeholderCollection })));
      const additionalPlaceholders = [placeholder];
      const expectedCollection: IPlaceholder[] = [...additionalPlaceholders, ...placeholderCollection];
      jest.spyOn(placeholderService, 'addPlaceholderToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ prepaymentAccount });
      comp.ngOnInit();

      expect(placeholderService.query).toHaveBeenCalled();
      expect(placeholderService.addPlaceholderToCollectionIfMissing).toHaveBeenCalledWith(placeholderCollection, ...additionalPlaceholders);
      expect(comp.placeholdersSharedCollection).toEqual(expectedCollection);
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
        ...additionalTransactionAccounts
      );
      expect(comp.transactionAccountsSharedCollection).toEqual(expectedCollection);
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
      const placeholder: IPlaceholder = { id: 55956 };
      prepaymentAccount.placeholder = placeholder;
      const debitAccount: ITransactionAccount = { id: 2986 };
      prepaymentAccount.debitAccount = debitAccount;
      const transferAccount: ITransactionAccount = { id: 8579 };
      prepaymentAccount.transferAccount = transferAccount;

      activatedRoute.data = of({ prepaymentAccount });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(prepaymentAccount));
      expect(comp.settlementCurrenciesSharedCollection).toContain(settlementCurrency);
      expect(comp.settlementsSharedCollection).toContain(prepaymentTransaction);
      expect(comp.serviceOutletsSharedCollection).toContain(serviceOutlet);
      expect(comp.dealersSharedCollection).toContain(dealer);
      expect(comp.placeholdersSharedCollection).toContain(placeholder);
      expect(comp.transactionAccountsSharedCollection).toContain(debitAccount);
      expect(comp.transactionAccountsSharedCollection).toContain(transferAccount);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<PrepaymentAccount>>();
      const prepaymentAccount = { id: 123 };
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
      expect(comp.previousState).toHaveBeenCalled();
      expect(prepaymentAccountService.update).toHaveBeenCalledWith(prepaymentAccount);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<PrepaymentAccount>>();
      const prepaymentAccount = new PrepaymentAccount();
      jest.spyOn(prepaymentAccountService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ prepaymentAccount });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: prepaymentAccount }));
      saveSubject.complete();

      // THEN
      expect(prepaymentAccountService.create).toHaveBeenCalledWith(prepaymentAccount);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<PrepaymentAccount>>();
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
      expect(prepaymentAccountService.update).toHaveBeenCalledWith(prepaymentAccount);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackSettlementCurrencyById', () => {
      it('Should return tracked SettlementCurrency primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackSettlementCurrencyById(0, entity);
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

    describe('trackServiceOutletById', () => {
      it('Should return tracked ServiceOutlet primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackServiceOutletById(0, entity);
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

    describe('trackPlaceholderById', () => {
      it('Should return tracked Placeholder primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackPlaceholderById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackTransactionAccountById', () => {
      it('Should return tracked TransactionAccount primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackTransactionAccountById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
