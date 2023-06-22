import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { TransactionAccountFormService } from './transaction-account-form.service';
import { TransactionAccountService } from '../service/transaction-account.service';
import { ITransactionAccount } from '../transaction-account.model';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/system/placeholder/service/placeholder.service';

import { TransactionAccountUpdateComponent } from './transaction-account-update.component';

describe('TransactionAccount Management Update Component', () => {
  let comp: TransactionAccountUpdateComponent;
  let fixture: ComponentFixture<TransactionAccountUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let transactionAccountFormService: TransactionAccountFormService;
  let transactionAccountService: TransactionAccountService;
  let placeholderService: PlaceholderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [TransactionAccountUpdateComponent],
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
      .overrideTemplate(TransactionAccountUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TransactionAccountUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    transactionAccountFormService = TestBed.inject(TransactionAccountFormService);
    transactionAccountService = TestBed.inject(TransactionAccountService);
    placeholderService = TestBed.inject(PlaceholderService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call TransactionAccount query and add missing value', () => {
      const transactionAccount: ITransactionAccount = { id: 456 };
      const parentAccount: ITransactionAccount = { id: 77148 };
      transactionAccount.parentAccount = parentAccount;

      const transactionAccountCollection: ITransactionAccount[] = [{ id: 6368 }];
      jest.spyOn(transactionAccountService, 'query').mockReturnValue(of(new HttpResponse({ body: transactionAccountCollection })));
      const additionalTransactionAccounts = [parentAccount];
      const expectedCollection: ITransactionAccount[] = [...additionalTransactionAccounts, ...transactionAccountCollection];
      jest.spyOn(transactionAccountService, 'addTransactionAccountToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ transactionAccount });
      comp.ngOnInit();

      expect(transactionAccountService.query).toHaveBeenCalled();
      expect(transactionAccountService.addTransactionAccountToCollectionIfMissing).toHaveBeenCalledWith(
        transactionAccountCollection,
        ...additionalTransactionAccounts.map(expect.objectContaining)
      );
      expect(comp.transactionAccountsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Placeholder query and add missing value', () => {
      const transactionAccount: ITransactionAccount = { id: 456 };
      const placeholders: IPlaceholder[] = [{ id: 9276 }];
      transactionAccount.placeholders = placeholders;

      const placeholderCollection: IPlaceholder[] = [{ id: 18792 }];
      jest.spyOn(placeholderService, 'query').mockReturnValue(of(new HttpResponse({ body: placeholderCollection })));
      const additionalPlaceholders = [...placeholders];
      const expectedCollection: IPlaceholder[] = [...additionalPlaceholders, ...placeholderCollection];
      jest.spyOn(placeholderService, 'addPlaceholderToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ transactionAccount });
      comp.ngOnInit();

      expect(placeholderService.query).toHaveBeenCalled();
      expect(placeholderService.addPlaceholderToCollectionIfMissing).toHaveBeenCalledWith(
        placeholderCollection,
        ...additionalPlaceholders.map(expect.objectContaining)
      );
      expect(comp.placeholdersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const transactionAccount: ITransactionAccount = { id: 456 };
      const parentAccount: ITransactionAccount = { id: 32695 };
      transactionAccount.parentAccount = parentAccount;
      const placeholder: IPlaceholder = { id: 58708 };
      transactionAccount.placeholders = [placeholder];

      activatedRoute.data = of({ transactionAccount });
      comp.ngOnInit();

      expect(comp.transactionAccountsSharedCollection).toContain(parentAccount);
      expect(comp.placeholdersSharedCollection).toContain(placeholder);
      expect(comp.transactionAccount).toEqual(transactionAccount);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITransactionAccount>>();
      const transactionAccount = { id: 123 };
      jest.spyOn(transactionAccountFormService, 'getTransactionAccount').mockReturnValue(transactionAccount);
      jest.spyOn(transactionAccountService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ transactionAccount });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: transactionAccount }));
      saveSubject.complete();

      // THEN
      expect(transactionAccountFormService.getTransactionAccount).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(transactionAccountService.update).toHaveBeenCalledWith(expect.objectContaining(transactionAccount));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITransactionAccount>>();
      const transactionAccount = { id: 123 };
      jest.spyOn(transactionAccountFormService, 'getTransactionAccount').mockReturnValue({ id: null });
      jest.spyOn(transactionAccountService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ transactionAccount: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: transactionAccount }));
      saveSubject.complete();

      // THEN
      expect(transactionAccountFormService.getTransactionAccount).toHaveBeenCalled();
      expect(transactionAccountService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITransactionAccount>>();
      const transactionAccount = { id: 123 };
      jest.spyOn(transactionAccountService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ transactionAccount });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(transactionAccountService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
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
