import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { SettlementCurrencyFormService } from './settlement-currency-form.service';
import { SettlementCurrencyService } from '../service/settlement-currency.service';
import { ISettlementCurrency } from '../settlement-currency.model';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/system/placeholder/service/placeholder.service';

import { SettlementCurrencyUpdateComponent } from './settlement-currency-update.component';

describe('SettlementCurrency Management Update Component', () => {
  let comp: SettlementCurrencyUpdateComponent;
  let fixture: ComponentFixture<SettlementCurrencyUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let settlementCurrencyFormService: SettlementCurrencyFormService;
  let settlementCurrencyService: SettlementCurrencyService;
  let placeholderService: PlaceholderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [SettlementCurrencyUpdateComponent],
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
      .overrideTemplate(SettlementCurrencyUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SettlementCurrencyUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    settlementCurrencyFormService = TestBed.inject(SettlementCurrencyFormService);
    settlementCurrencyService = TestBed.inject(SettlementCurrencyService);
    placeholderService = TestBed.inject(PlaceholderService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Placeholder query and add missing value', () => {
      const settlementCurrency: ISettlementCurrency = { id: 456 };
      const placeholders: IPlaceholder[] = [{ id: 72355 }];
      settlementCurrency.placeholders = placeholders;

      const placeholderCollection: IPlaceholder[] = [{ id: 8525 }];
      jest.spyOn(placeholderService, 'query').mockReturnValue(of(new HttpResponse({ body: placeholderCollection })));
      const additionalPlaceholders = [...placeholders];
      const expectedCollection: IPlaceholder[] = [...additionalPlaceholders, ...placeholderCollection];
      jest.spyOn(placeholderService, 'addPlaceholderToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ settlementCurrency });
      comp.ngOnInit();

      expect(placeholderService.query).toHaveBeenCalled();
      expect(placeholderService.addPlaceholderToCollectionIfMissing).toHaveBeenCalledWith(
        placeholderCollection,
        ...additionalPlaceholders.map(expect.objectContaining)
      );
      expect(comp.placeholdersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const settlementCurrency: ISettlementCurrency = { id: 456 };
      const placeholder: IPlaceholder = { id: 22600 };
      settlementCurrency.placeholders = [placeholder];

      activatedRoute.data = of({ settlementCurrency });
      comp.ngOnInit();

      expect(comp.placeholdersSharedCollection).toContain(placeholder);
      expect(comp.settlementCurrency).toEqual(settlementCurrency);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISettlementCurrency>>();
      const settlementCurrency = { id: 123 };
      jest.spyOn(settlementCurrencyFormService, 'getSettlementCurrency').mockReturnValue(settlementCurrency);
      jest.spyOn(settlementCurrencyService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ settlementCurrency });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: settlementCurrency }));
      saveSubject.complete();

      // THEN
      expect(settlementCurrencyFormService.getSettlementCurrency).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(settlementCurrencyService.update).toHaveBeenCalledWith(expect.objectContaining(settlementCurrency));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISettlementCurrency>>();
      const settlementCurrency = { id: 123 };
      jest.spyOn(settlementCurrencyFormService, 'getSettlementCurrency').mockReturnValue({ id: null });
      jest.spyOn(settlementCurrencyService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ settlementCurrency: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: settlementCurrency }));
      saveSubject.complete();

      // THEN
      expect(settlementCurrencyFormService.getSettlementCurrency).toHaveBeenCalled();
      expect(settlementCurrencyService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISettlementCurrency>>();
      const settlementCurrency = { id: 123 };
      jest.spyOn(settlementCurrencyService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ settlementCurrency });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(settlementCurrencyService.update).toHaveBeenCalled();
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
