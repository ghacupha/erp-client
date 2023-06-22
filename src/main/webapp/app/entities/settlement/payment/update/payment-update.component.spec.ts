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

import { PaymentFormService } from './payment-form.service';
import { PaymentService } from '../service/payment.service';
import { IPayment } from '../payment.model';
import { IPaymentLabel } from 'app/entities/settlement/payment-label/payment-label.model';
import { PaymentLabelService } from 'app/entities/settlement/payment-label/service/payment-label.service';
import { IPaymentCategory } from 'app/entities/settlement/payment-category/payment-category.model';
import { PaymentCategoryService } from 'app/entities/settlement/payment-category/service/payment-category.service';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/system/placeholder/service/placeholder.service';

import { PaymentUpdateComponent } from './payment-update.component';

describe('Payment Management Update Component', () => {
  let comp: PaymentUpdateComponent;
  let fixture: ComponentFixture<PaymentUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let paymentFormService: PaymentFormService;
  let paymentService: PaymentService;
  let paymentLabelService: PaymentLabelService;
  let paymentCategoryService: PaymentCategoryService;
  let placeholderService: PlaceholderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [PaymentUpdateComponent],
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
      .overrideTemplate(PaymentUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PaymentUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    paymentFormService = TestBed.inject(PaymentFormService);
    paymentService = TestBed.inject(PaymentService);
    paymentLabelService = TestBed.inject(PaymentLabelService);
    paymentCategoryService = TestBed.inject(PaymentCategoryService);
    placeholderService = TestBed.inject(PlaceholderService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call PaymentLabel query and add missing value', () => {
      const payment: IPayment = { id: 456 };
      const paymentLabels: IPaymentLabel[] = [{ id: 58999 }];
      payment.paymentLabels = paymentLabels;

      const paymentLabelCollection: IPaymentLabel[] = [{ id: 50464 }];
      jest.spyOn(paymentLabelService, 'query').mockReturnValue(of(new HttpResponse({ body: paymentLabelCollection })));
      const additionalPaymentLabels = [...paymentLabels];
      const expectedCollection: IPaymentLabel[] = [...additionalPaymentLabels, ...paymentLabelCollection];
      jest.spyOn(paymentLabelService, 'addPaymentLabelToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ payment });
      comp.ngOnInit();

      expect(paymentLabelService.query).toHaveBeenCalled();
      expect(paymentLabelService.addPaymentLabelToCollectionIfMissing).toHaveBeenCalledWith(
        paymentLabelCollection,
        ...additionalPaymentLabels.map(expect.objectContaining)
      );
      expect(comp.paymentLabelsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call PaymentCategory query and add missing value', () => {
      const payment: IPayment = { id: 456 };
      const paymentCategory: IPaymentCategory = { id: 30270 };
      payment.paymentCategory = paymentCategory;

      const paymentCategoryCollection: IPaymentCategory[] = [{ id: 97857 }];
      jest.spyOn(paymentCategoryService, 'query').mockReturnValue(of(new HttpResponse({ body: paymentCategoryCollection })));
      const additionalPaymentCategories = [paymentCategory];
      const expectedCollection: IPaymentCategory[] = [...additionalPaymentCategories, ...paymentCategoryCollection];
      jest.spyOn(paymentCategoryService, 'addPaymentCategoryToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ payment });
      comp.ngOnInit();

      expect(paymentCategoryService.query).toHaveBeenCalled();
      expect(paymentCategoryService.addPaymentCategoryToCollectionIfMissing).toHaveBeenCalledWith(
        paymentCategoryCollection,
        ...additionalPaymentCategories.map(expect.objectContaining)
      );
      expect(comp.paymentCategoriesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Placeholder query and add missing value', () => {
      const payment: IPayment = { id: 456 };
      const placeholders: IPlaceholder[] = [{ id: 68435 }];
      payment.placeholders = placeholders;

      const placeholderCollection: IPlaceholder[] = [{ id: 61478 }];
      jest.spyOn(placeholderService, 'query').mockReturnValue(of(new HttpResponse({ body: placeholderCollection })));
      const additionalPlaceholders = [...placeholders];
      const expectedCollection: IPlaceholder[] = [...additionalPlaceholders, ...placeholderCollection];
      jest.spyOn(placeholderService, 'addPlaceholderToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ payment });
      comp.ngOnInit();

      expect(placeholderService.query).toHaveBeenCalled();
      expect(placeholderService.addPlaceholderToCollectionIfMissing).toHaveBeenCalledWith(
        placeholderCollection,
        ...additionalPlaceholders.map(expect.objectContaining)
      );
      expect(comp.placeholdersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Payment query and add missing value', () => {
      const payment: IPayment = { id: 456 };
      const paymentGroup: IPayment = { id: 69844 };
      payment.paymentGroup = paymentGroup;

      const paymentCollection: IPayment[] = [{ id: 41984 }];
      jest.spyOn(paymentService, 'query').mockReturnValue(of(new HttpResponse({ body: paymentCollection })));
      const additionalPayments = [paymentGroup];
      const expectedCollection: IPayment[] = [...additionalPayments, ...paymentCollection];
      jest.spyOn(paymentService, 'addPaymentToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ payment });
      comp.ngOnInit();

      expect(paymentService.query).toHaveBeenCalled();
      expect(paymentService.addPaymentToCollectionIfMissing).toHaveBeenCalledWith(
        paymentCollection,
        ...additionalPayments.map(expect.objectContaining)
      );
      expect(comp.paymentsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const payment: IPayment = { id: 456 };
      const paymentLabel: IPaymentLabel = { id: 75140 };
      payment.paymentLabels = [paymentLabel];
      const paymentCategory: IPaymentCategory = { id: 45196 };
      payment.paymentCategory = paymentCategory;
      const placeholder: IPlaceholder = { id: 22052 };
      payment.placeholders = [placeholder];
      const paymentGroup: IPayment = { id: 39977 };
      payment.paymentGroup = paymentGroup;

      activatedRoute.data = of({ payment });
      comp.ngOnInit();

      expect(comp.paymentLabelsSharedCollection).toContain(paymentLabel);
      expect(comp.paymentCategoriesSharedCollection).toContain(paymentCategory);
      expect(comp.placeholdersSharedCollection).toContain(placeholder);
      expect(comp.paymentsSharedCollection).toContain(paymentGroup);
      expect(comp.payment).toEqual(payment);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPayment>>();
      const payment = { id: 123 };
      jest.spyOn(paymentFormService, 'getPayment').mockReturnValue(payment);
      jest.spyOn(paymentService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ payment });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: payment }));
      saveSubject.complete();

      // THEN
      expect(paymentFormService.getPayment).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(paymentService.update).toHaveBeenCalledWith(expect.objectContaining(payment));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPayment>>();
      const payment = { id: 123 };
      jest.spyOn(paymentFormService, 'getPayment').mockReturnValue({ id: null });
      jest.spyOn(paymentService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ payment: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: payment }));
      saveSubject.complete();

      // THEN
      expect(paymentFormService.getPayment).toHaveBeenCalled();
      expect(paymentService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPayment>>();
      const payment = { id: 123 };
      jest.spyOn(paymentService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ payment });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(paymentService.update).toHaveBeenCalled();
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

    describe('comparePayment', () => {
      it('Should forward to paymentService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(paymentService, 'comparePayment');
        comp.comparePayment(entity, entity2);
        expect(paymentService.comparePayment).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
