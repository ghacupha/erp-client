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

import { PaymentCategoryFormService } from './payment-category-form.service';
import { PaymentCategoryService } from '../service/payment-category.service';
import { IPaymentCategory } from '../payment-category.model';

import { PaymentCategoryUpdateComponent } from './payment-category-update.component';
import { PaymentLabelService } from '../../../../erp-pages/payment-label/service/payment-label.service';
import { IPlaceholder } from '../../../../erp-pages/placeholder/placeholder.model';
import { IPaymentLabel } from '../../../../erp-pages/payment-label/payment-label.model';
import { PlaceholderService } from '../../../../erp-pages/placeholder/service/placeholder.service';

describe('PaymentCategory Management Update Component', () => {
  let comp: PaymentCategoryUpdateComponent;
  let fixture: ComponentFixture<PaymentCategoryUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let paymentCategoryFormService: PaymentCategoryFormService;
  let paymentCategoryService: PaymentCategoryService;
  let paymentLabelService: PaymentLabelService;
  let placeholderService: PlaceholderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [PaymentCategoryUpdateComponent],
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
      .overrideTemplate(PaymentCategoryUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PaymentCategoryUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    paymentCategoryFormService = TestBed.inject(PaymentCategoryFormService);
    paymentCategoryService = TestBed.inject(PaymentCategoryService);
    paymentLabelService = TestBed.inject(PaymentLabelService);
    placeholderService = TestBed.inject(PlaceholderService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call PaymentLabel query and add missing value', () => {
      const paymentCategory: IPaymentCategory = { id: 456 };
      const paymentLabels: IPaymentLabel[] = [{ id: 53046 }];
      paymentCategory.paymentLabels = paymentLabels;

      const paymentLabelCollection: IPaymentLabel[] = [{ id: 98183 }];
      jest.spyOn(paymentLabelService, 'query').mockReturnValue(of(new HttpResponse({ body: paymentLabelCollection })));
      const additionalPaymentLabels = [...paymentLabels];
      const expectedCollection: IPaymentLabel[] = [...additionalPaymentLabels, ...paymentLabelCollection];
      jest.spyOn(paymentLabelService, 'addPaymentLabelToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ paymentCategory });
      comp.ngOnInit();

      expect(paymentLabelService.query).toHaveBeenCalled();
      expect(paymentLabelService.addPaymentLabelToCollectionIfMissing).toHaveBeenCalledWith(
        paymentLabelCollection,
        ...additionalPaymentLabels.map(expect.objectContaining)
      );
      expect(comp.paymentLabelsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Placeholder query and add missing value', () => {
      const paymentCategory: IPaymentCategory = { id: 456 };
      const placeholders: IPlaceholder[] = [{ id: 53772 }];
      paymentCategory.placeholders = placeholders;

      const placeholderCollection: IPlaceholder[] = [{ id: 12931 }];
      jest.spyOn(placeholderService, 'query').mockReturnValue(of(new HttpResponse({ body: placeholderCollection })));
      const additionalPlaceholders = [...placeholders];
      const expectedCollection: IPlaceholder[] = [...additionalPlaceholders, ...placeholderCollection];
      jest.spyOn(placeholderService, 'addPlaceholderToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ paymentCategory });
      comp.ngOnInit();

      expect(placeholderService.query).toHaveBeenCalled();
      expect(placeholderService.addPlaceholderToCollectionIfMissing).toHaveBeenCalledWith(
        placeholderCollection,
        ...additionalPlaceholders.map(expect.objectContaining)
      );
      expect(comp.placeholdersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const paymentCategory: IPaymentCategory = { id: 456 };
      const paymentLabel: IPaymentLabel = { id: 6150 };
      paymentCategory.paymentLabels = [paymentLabel];
      const placeholder: IPlaceholder = { id: 45103 };
      paymentCategory.placeholders = [placeholder];

      activatedRoute.data = of({ paymentCategory });
      comp.ngOnInit();

      expect(comp.paymentLabelsSharedCollection).toContain(paymentLabel);
      expect(comp.placeholdersSharedCollection).toContain(placeholder);
      expect(comp.paymentCategory).toEqual(paymentCategory);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPaymentCategory>>();
      const paymentCategory = { id: 123 };
      jest.spyOn(paymentCategoryFormService, 'getPaymentCategory').mockReturnValue(paymentCategory);
      jest.spyOn(paymentCategoryService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ paymentCategory });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: paymentCategory }));
      saveSubject.complete();

      // THEN
      expect(paymentCategoryFormService.getPaymentCategory).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(paymentCategoryService.update).toHaveBeenCalledWith(expect.objectContaining(paymentCategory));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPaymentCategory>>();
      const paymentCategory = { id: 123 };
      jest.spyOn(paymentCategoryFormService, 'getPaymentCategory').mockReturnValue({ id: null });
      jest.spyOn(paymentCategoryService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ paymentCategory: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: paymentCategory }));
      saveSubject.complete();

      // THEN
      expect(paymentCategoryFormService.getPaymentCategory).toHaveBeenCalled();
      expect(paymentCategoryService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPaymentCategory>>();
      const paymentCategory = { id: 123 };
      jest.spyOn(paymentCategoryService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ paymentCategory });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(paymentCategoryService.update).toHaveBeenCalled();
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
