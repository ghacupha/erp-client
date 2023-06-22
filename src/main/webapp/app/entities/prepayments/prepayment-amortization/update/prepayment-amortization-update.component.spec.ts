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

import { PrepaymentAmortizationFormService } from './prepayment-amortization-form.service';
import { PrepaymentAmortizationService } from '../service/prepayment-amortization.service';
import { IPrepaymentAmortization } from '../prepayment-amortization.model';
import { IPrepaymentAccount } from 'app/entities/prepayments/prepayment-account/prepayment-account.model';
import { PrepaymentAccountService } from 'app/entities/prepayments/prepayment-account/service/prepayment-account.service';
import { ISettlementCurrency } from 'app/entities/settlement/settlement-currency/settlement-currency.model';
import { SettlementCurrencyService } from 'app/entities/settlement/settlement-currency/service/settlement-currency.service';
import { ITransactionAccount } from 'app/entities/accounting/transaction-account/transaction-account.model';
import { TransactionAccountService } from 'app/entities/accounting/transaction-account/service/transaction-account.service';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/system/placeholder/service/placeholder.service';

import { PrepaymentAmortizationUpdateComponent } from './prepayment-amortization-update.component';

describe('PrepaymentAmortization Management Update Component', () => {
  let comp: PrepaymentAmortizationUpdateComponent;
  let fixture: ComponentFixture<PrepaymentAmortizationUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let prepaymentAmortizationFormService: PrepaymentAmortizationFormService;
  let prepaymentAmortizationService: PrepaymentAmortizationService;
  let prepaymentAccountService: PrepaymentAccountService;
  let settlementCurrencyService: SettlementCurrencyService;
  let transactionAccountService: TransactionAccountService;
  let placeholderService: PlaceholderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [PrepaymentAmortizationUpdateComponent],
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
      .overrideTemplate(PrepaymentAmortizationUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PrepaymentAmortizationUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    prepaymentAmortizationFormService = TestBed.inject(PrepaymentAmortizationFormService);
    prepaymentAmortizationService = TestBed.inject(PrepaymentAmortizationService);
    prepaymentAccountService = TestBed.inject(PrepaymentAccountService);
    settlementCurrencyService = TestBed.inject(SettlementCurrencyService);
    transactionAccountService = TestBed.inject(TransactionAccountService);
    placeholderService = TestBed.inject(PlaceholderService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call PrepaymentAccount query and add missing value', () => {
      const prepaymentAmortization: IPrepaymentAmortization = { id: 456 };
      const prepaymentAccount: IPrepaymentAccount = { id: 99710 };
      prepaymentAmortization.prepaymentAccount = prepaymentAccount;

      const prepaymentAccountCollection: IPrepaymentAccount[] = [{ id: 44525 }];
      jest.spyOn(prepaymentAccountService, 'query').mockReturnValue(of(new HttpResponse({ body: prepaymentAccountCollection })));
      const additionalPrepaymentAccounts = [prepaymentAccount];
      const expectedCollection: IPrepaymentAccount[] = [...additionalPrepaymentAccounts, ...prepaymentAccountCollection];
      jest.spyOn(prepaymentAccountService, 'addPrepaymentAccountToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ prepaymentAmortization });
      comp.ngOnInit();

      expect(prepaymentAccountService.query).toHaveBeenCalled();
      expect(prepaymentAccountService.addPrepaymentAccountToCollectionIfMissing).toHaveBeenCalledWith(
        prepaymentAccountCollection,
        ...additionalPrepaymentAccounts.map(expect.objectContaining)
      );
      expect(comp.prepaymentAccountsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call SettlementCurrency query and add missing value', () => {
      const prepaymentAmortization: IPrepaymentAmortization = { id: 456 };
      const settlementCurrency: ISettlementCurrency = { id: 58816 };
      prepaymentAmortization.settlementCurrency = settlementCurrency;

      const settlementCurrencyCollection: ISettlementCurrency[] = [{ id: 45808 }];
      jest.spyOn(settlementCurrencyService, 'query').mockReturnValue(of(new HttpResponse({ body: settlementCurrencyCollection })));
      const additionalSettlementCurrencies = [settlementCurrency];
      const expectedCollection: ISettlementCurrency[] = [...additionalSettlementCurrencies, ...settlementCurrencyCollection];
      jest.spyOn(settlementCurrencyService, 'addSettlementCurrencyToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ prepaymentAmortization });
      comp.ngOnInit();

      expect(settlementCurrencyService.query).toHaveBeenCalled();
      expect(settlementCurrencyService.addSettlementCurrencyToCollectionIfMissing).toHaveBeenCalledWith(
        settlementCurrencyCollection,
        ...additionalSettlementCurrencies.map(expect.objectContaining)
      );
      expect(comp.settlementCurrenciesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call TransactionAccount query and add missing value', () => {
      const prepaymentAmortization: IPrepaymentAmortization = { id: 456 };
      const debitAccount: ITransactionAccount = { id: 44106 };
      prepaymentAmortization.debitAccount = debitAccount;
      const creditAccount: ITransactionAccount = { id: 61881 };
      prepaymentAmortization.creditAccount = creditAccount;

      const transactionAccountCollection: ITransactionAccount[] = [{ id: 99394 }];
      jest.spyOn(transactionAccountService, 'query').mockReturnValue(of(new HttpResponse({ body: transactionAccountCollection })));
      const additionalTransactionAccounts = [debitAccount, creditAccount];
      const expectedCollection: ITransactionAccount[] = [...additionalTransactionAccounts, ...transactionAccountCollection];
      jest.spyOn(transactionAccountService, 'addTransactionAccountToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ prepaymentAmortization });
      comp.ngOnInit();

      expect(transactionAccountService.query).toHaveBeenCalled();
      expect(transactionAccountService.addTransactionAccountToCollectionIfMissing).toHaveBeenCalledWith(
        transactionAccountCollection,
        ...additionalTransactionAccounts.map(expect.objectContaining)
      );
      expect(comp.transactionAccountsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Placeholder query and add missing value', () => {
      const prepaymentAmortization: IPrepaymentAmortization = { id: 456 };
      const placeholders: IPlaceholder[] = [{ id: 50427 }];
      prepaymentAmortization.placeholders = placeholders;

      const placeholderCollection: IPlaceholder[] = [{ id: 26795 }];
      jest.spyOn(placeholderService, 'query').mockReturnValue(of(new HttpResponse({ body: placeholderCollection })));
      const additionalPlaceholders = [...placeholders];
      const expectedCollection: IPlaceholder[] = [...additionalPlaceholders, ...placeholderCollection];
      jest.spyOn(placeholderService, 'addPlaceholderToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ prepaymentAmortization });
      comp.ngOnInit();

      expect(placeholderService.query).toHaveBeenCalled();
      expect(placeholderService.addPlaceholderToCollectionIfMissing).toHaveBeenCalledWith(
        placeholderCollection,
        ...additionalPlaceholders.map(expect.objectContaining)
      );
      expect(comp.placeholdersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const prepaymentAmortization: IPrepaymentAmortization = { id: 456 };
      const prepaymentAccount: IPrepaymentAccount = { id: 29845 };
      prepaymentAmortization.prepaymentAccount = prepaymentAccount;
      const settlementCurrency: ISettlementCurrency = { id: 68197 };
      prepaymentAmortization.settlementCurrency = settlementCurrency;
      const debitAccount: ITransactionAccount = { id: 3438 };
      prepaymentAmortization.debitAccount = debitAccount;
      const creditAccount: ITransactionAccount = { id: 39156 };
      prepaymentAmortization.creditAccount = creditAccount;
      const placeholder: IPlaceholder = { id: 68088 };
      prepaymentAmortization.placeholders = [placeholder];

      activatedRoute.data = of({ prepaymentAmortization });
      comp.ngOnInit();

      expect(comp.prepaymentAccountsSharedCollection).toContain(prepaymentAccount);
      expect(comp.settlementCurrenciesSharedCollection).toContain(settlementCurrency);
      expect(comp.transactionAccountsSharedCollection).toContain(debitAccount);
      expect(comp.transactionAccountsSharedCollection).toContain(creditAccount);
      expect(comp.placeholdersSharedCollection).toContain(placeholder);
      expect(comp.prepaymentAmortization).toEqual(prepaymentAmortization);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPrepaymentAmortization>>();
      const prepaymentAmortization = { id: 123 };
      jest.spyOn(prepaymentAmortizationFormService, 'getPrepaymentAmortization').mockReturnValue(prepaymentAmortization);
      jest.spyOn(prepaymentAmortizationService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ prepaymentAmortization });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: prepaymentAmortization }));
      saveSubject.complete();

      // THEN
      expect(prepaymentAmortizationFormService.getPrepaymentAmortization).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(prepaymentAmortizationService.update).toHaveBeenCalledWith(expect.objectContaining(prepaymentAmortization));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPrepaymentAmortization>>();
      const prepaymentAmortization = { id: 123 };
      jest.spyOn(prepaymentAmortizationFormService, 'getPrepaymentAmortization').mockReturnValue({ id: null });
      jest.spyOn(prepaymentAmortizationService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ prepaymentAmortization: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: prepaymentAmortization }));
      saveSubject.complete();

      // THEN
      expect(prepaymentAmortizationFormService.getPrepaymentAmortization).toHaveBeenCalled();
      expect(prepaymentAmortizationService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPrepaymentAmortization>>();
      const prepaymentAmortization = { id: 123 };
      jest.spyOn(prepaymentAmortizationService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ prepaymentAmortization });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(prepaymentAmortizationService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('comparePrepaymentAccount', () => {
      it('Should forward to prepaymentAccountService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(prepaymentAccountService, 'comparePrepaymentAccount');
        comp.comparePrepaymentAccount(entity, entity2);
        expect(prepaymentAccountService.comparePrepaymentAccount).toHaveBeenCalledWith(entity, entity2);
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
  });
});
