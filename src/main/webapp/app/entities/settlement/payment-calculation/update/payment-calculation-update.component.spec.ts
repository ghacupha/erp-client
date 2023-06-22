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

import { PaymentCalculationFormService } from './payment-calculation-form.service';
import { PaymentCalculationService } from '../service/payment-calculation.service';
import { IPaymentCalculation } from '../payment-calculation.model';
import { IPaymentLabel } from 'app/entities/settlement/payment-label/payment-label.model';
import { PaymentLabelService } from 'app/entities/settlement/payment-label/service/payment-label.service';
import { IPaymentCategory } from 'app/entities/settlement/payment-category/payment-category.model';
import { PaymentCategoryService } from 'app/entities/settlement/payment-category/service/payment-category.service';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/system/placeholder/service/placeholder.service';

import { PaymentCalculationUpdateComponent } from './payment-calculation-update.component';

describe('PaymentCalculation Management Update Component', () => {
  let comp: PaymentCalculationUpdateComponent;
  let fixture: ComponentFixture<PaymentCalculationUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let paymentCalculationFormService: PaymentCalculationFormService;
  let paymentCalculationService: PaymentCalculationService;
  let paymentLabelService: PaymentLabelService;
  let paymentCategoryService: PaymentCategoryService;
  let placeholderService: PlaceholderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [PaymentCalculationUpdateComponent],
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
      .overrideTemplate(PaymentCalculationUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PaymentCalculationUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    paymentCalculationFormService = TestBed.inject(PaymentCalculationFormService);
    paymentCalculationService = TestBed.inject(PaymentCalculationService);
    paymentLabelService = TestBed.inject(PaymentLabelService);
    paymentCategoryService = TestBed.inject(PaymentCategoryService);
    placeholderService = TestBed.inject(PlaceholderService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call PaymentLabel query and add missing value', () => {
      const paymentCalculation: IPaymentCalculation = { id: 456 };
      const paymentLabels: IPaymentLabel[] = [{ id: 20967 }];
      paymentCalculation.paymentLabels = paymentLabels;

      const paymentLabelCollection: IPaymentLabel[] = [{ id: 11344 }];
      jest.spyOn(paymentLabelService, 'query').mockReturnValue(of(new HttpResponse({ body: paymentLabelCollection })));
      const additionalPaymentLabels = [...paymentLabels];
      const expectedCollection: IPaymentLabel[] = [...additionalPaymentLabels, ...paymentLabelCollection];
      jest.spyOn(paymentLabelService, 'addPaymentLabelToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ paymentCalculation });
      comp.ngOnInit();

      expect(paymentLabelService.query).toHaveBeenCalled();
      expect(paymentLabelService.addPaymentLabelToCollectionIfMissing).toHaveBeenCalledWith(
        paymentLabelCollection,
        ...additionalPaymentLabels.map(expect.objectContaining)
      );
      expect(comp.paymentLabelsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call PaymentCategory query and add missing value', () => {
      const paymentCalculation: IPaymentCalculation = { id: 456 };
      const paymentCategory: IPaymentCategory = { id: 26408 };
      paymentCalculation.paymentCategory = paymentCategory;

      const paymentCategoryCollection: IPaymentCategory[] = [{ id: 15897 }];
      jest.spyOn(paymentCategoryService, 'query').mockReturnValue(of(new HttpResponse({ body: paymentCategoryCollection })));
      const additionalPaymentCategories = [paymentCategory];
      const expectedCollection: IPaymentCategory[] = [...additionalPaymentCategories, ...paymentCategoryCollection];
      jest.spyOn(paymentCategoryService, 'addPaymentCategoryToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ paymentCalculation });
      comp.ngOnInit();

      expect(paymentCategoryService.query).toHaveBeenCalled();
      expect(paymentCategoryService.addPaymentCategoryToCollectionIfMissing).toHaveBeenCalledWith(
        paymentCategoryCollection,
        ...additionalPaymentCategories.map(expect.objectContaining)
      );
      expect(comp.paymentCategoriesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Placeholder query and add missing value', () => {
      const paymentCalculation: IPaymentCalculation = { id: 456 };
      const placeholders: IPlaceholder[] = [{ id: 22873 }];
      paymentCalculation.placeholders = placeholders;

      const placeholderCollection: IPlaceholder[] = [{ id: 18381 }];
      jest.spyOn(placeholderService, 'query').mockReturnValue(of(new HttpResponse({ body: placeholderCollection })));
      const additionalPlaceholders = [...placeholders];
      const expectedCollection: IPlaceholder[] = [...additionalPlaceholders, ...placeholderCollection];
      jest.spyOn(placeholderService, 'addPlaceholderToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ paymentCalculation });
      comp.ngOnInit();

      expect(placeholderService.query).toHaveBeenCalled();
      expect(placeholderService.addPlaceholderToCollectionIfMissing).toHaveBeenCalledWith(
        placeholderCollection,
        ...additionalPlaceholders.map(expect.objectContaining)
      );
      expect(comp.placeholdersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const paymentCalculation: IPaymentCalculation = { id: 456 };
      const paymentLabel: IPaymentLabel = { id: 25998 };
      paymentCalculation.paymentLabels = [paymentLabel];
      const paymentCategory: IPaymentCategory = { id: 94444 };
      paymentCalculation.paymentCategory = paymentCategory;
      const placeholder: IPlaceholder = { id: 58503 };
      paymentCalculation.placeholders = [placeholder];

      activatedRoute.data = of({ paymentCalculation });
      comp.ngOnInit();

      expect(comp.paymentLabelsSharedCollection).toContain(paymentLabel);
      expect(comp.paymentCategoriesSharedCollection).toContain(paymentCategory);
      expect(comp.placeholdersSharedCollection).toContain(placeholder);
      expect(comp.paymentCalculation).toEqual(paymentCalculation);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPaymentCalculation>>();
      const paymentCalculation = { id: 123 };
      jest.spyOn(paymentCalculationFormService, 'getPaymentCalculation').mockReturnValue(paymentCalculation);
      jest.spyOn(paymentCalculationService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ paymentCalculation });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: paymentCalculation }));
      saveSubject.complete();

      // THEN
      expect(paymentCalculationFormService.getPaymentCalculation).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(paymentCalculationService.update).toHaveBeenCalledWith(expect.objectContaining(paymentCalculation));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPaymentCalculation>>();
      const paymentCalculation = { id: 123 };
      jest.spyOn(paymentCalculationFormService, 'getPaymentCalculation').mockReturnValue({ id: null });
      jest.spyOn(paymentCalculationService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ paymentCalculation: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: paymentCalculation }));
      saveSubject.complete();

      // THEN
      expect(paymentCalculationFormService.getPaymentCalculation).toHaveBeenCalled();
      expect(paymentCalculationService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPaymentCalculation>>();
      const paymentCalculation = { id: 123 };
      jest.spyOn(paymentCalculationService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ paymentCalculation });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(paymentCalculationService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
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
