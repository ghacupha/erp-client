import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { BankBranchCodeFormService } from './bank-branch-code-form.service';
import { BankBranchCodeService } from '../service/bank-branch-code.service';
import { IBankBranchCode } from '../bank-branch-code.model';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/system/placeholder/service/placeholder.service';

import { BankBranchCodeUpdateComponent } from './bank-branch-code-update.component';

describe('BankBranchCode Management Update Component', () => {
  let comp: BankBranchCodeUpdateComponent;
  let fixture: ComponentFixture<BankBranchCodeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let bankBranchCodeFormService: BankBranchCodeFormService;
  let bankBranchCodeService: BankBranchCodeService;
  let placeholderService: PlaceholderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [BankBranchCodeUpdateComponent],
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
      .overrideTemplate(BankBranchCodeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(BankBranchCodeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    bankBranchCodeFormService = TestBed.inject(BankBranchCodeFormService);
    bankBranchCodeService = TestBed.inject(BankBranchCodeService);
    placeholderService = TestBed.inject(PlaceholderService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Placeholder query and add missing value', () => {
      const bankBranchCode: IBankBranchCode = { id: 456 };
      const placeholders: IPlaceholder[] = [{ id: 1047 }];
      bankBranchCode.placeholders = placeholders;

      const placeholderCollection: IPlaceholder[] = [{ id: 97721 }];
      jest.spyOn(placeholderService, 'query').mockReturnValue(of(new HttpResponse({ body: placeholderCollection })));
      const additionalPlaceholders = [...placeholders];
      const expectedCollection: IPlaceholder[] = [...additionalPlaceholders, ...placeholderCollection];
      jest.spyOn(placeholderService, 'addPlaceholderToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ bankBranchCode });
      comp.ngOnInit();

      expect(placeholderService.query).toHaveBeenCalled();
      expect(placeholderService.addPlaceholderToCollectionIfMissing).toHaveBeenCalledWith(
        placeholderCollection,
        ...additionalPlaceholders.map(expect.objectContaining)
      );
      expect(comp.placeholdersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const bankBranchCode: IBankBranchCode = { id: 456 };
      const placeholder: IPlaceholder = { id: 65138 };
      bankBranchCode.placeholders = [placeholder];

      activatedRoute.data = of({ bankBranchCode });
      comp.ngOnInit();

      expect(comp.placeholdersSharedCollection).toContain(placeholder);
      expect(comp.bankBranchCode).toEqual(bankBranchCode);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IBankBranchCode>>();
      const bankBranchCode = { id: 123 };
      jest.spyOn(bankBranchCodeFormService, 'getBankBranchCode').mockReturnValue(bankBranchCode);
      jest.spyOn(bankBranchCodeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ bankBranchCode });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: bankBranchCode }));
      saveSubject.complete();

      // THEN
      expect(bankBranchCodeFormService.getBankBranchCode).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(bankBranchCodeService.update).toHaveBeenCalledWith(expect.objectContaining(bankBranchCode));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IBankBranchCode>>();
      const bankBranchCode = { id: 123 };
      jest.spyOn(bankBranchCodeFormService, 'getBankBranchCode').mockReturnValue({ id: null });
      jest.spyOn(bankBranchCodeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ bankBranchCode: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: bankBranchCode }));
      saveSubject.complete();

      // THEN
      expect(bankBranchCodeFormService.getBankBranchCode).toHaveBeenCalled();
      expect(bankBranchCodeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IBankBranchCode>>();
      const bankBranchCode = { id: 123 };
      jest.spyOn(bankBranchCodeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ bankBranchCode });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(bankBranchCodeService.update).toHaveBeenCalled();
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
  });
});
