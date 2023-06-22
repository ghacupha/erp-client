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

import { DealerFormService } from './dealer-form.service';
import { DealerService } from '../service/dealer.service';
import { IDealer } from '../dealer.model';
import { IPaymentLabel } from 'app/entities/settlement/payment-label/payment-label.model';
import { PaymentLabelService } from 'app/entities/settlement/payment-label/service/payment-label.service';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/system/placeholder/service/placeholder.service';

import { DealerUpdateComponent } from './dealer-update.component';

describe('Dealer Management Update Component', () => {
  let comp: DealerUpdateComponent;
  let fixture: ComponentFixture<DealerUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let dealerFormService: DealerFormService;
  let dealerService: DealerService;
  let paymentLabelService: PaymentLabelService;
  let placeholderService: PlaceholderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [DealerUpdateComponent],
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
      .overrideTemplate(DealerUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DealerUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    dealerFormService = TestBed.inject(DealerFormService);
    dealerService = TestBed.inject(DealerService);
    paymentLabelService = TestBed.inject(PaymentLabelService);
    placeholderService = TestBed.inject(PlaceholderService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call PaymentLabel query and add missing value', () => {
      const dealer: IDealer = { id: 456 };
      const paymentLabels: IPaymentLabel[] = [{ id: 15656 }];
      dealer.paymentLabels = paymentLabels;

      const paymentLabelCollection: IPaymentLabel[] = [{ id: 99173 }];
      jest.spyOn(paymentLabelService, 'query').mockReturnValue(of(new HttpResponse({ body: paymentLabelCollection })));
      const additionalPaymentLabels = [...paymentLabels];
      const expectedCollection: IPaymentLabel[] = [...additionalPaymentLabels, ...paymentLabelCollection];
      jest.spyOn(paymentLabelService, 'addPaymentLabelToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ dealer });
      comp.ngOnInit();

      expect(paymentLabelService.query).toHaveBeenCalled();
      expect(paymentLabelService.addPaymentLabelToCollectionIfMissing).toHaveBeenCalledWith(
        paymentLabelCollection,
        ...additionalPaymentLabels.map(expect.objectContaining)
      );
      expect(comp.paymentLabelsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Dealer query and add missing value', () => {
      const dealer: IDealer = { id: 456 };
      const dealerGroup: IDealer = { id: 83539 };
      dealer.dealerGroup = dealerGroup;

      const dealerCollection: IDealer[] = [{ id: 17699 }];
      jest.spyOn(dealerService, 'query').mockReturnValue(of(new HttpResponse({ body: dealerCollection })));
      const additionalDealers = [dealerGroup];
      const expectedCollection: IDealer[] = [...additionalDealers, ...dealerCollection];
      jest.spyOn(dealerService, 'addDealerToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ dealer });
      comp.ngOnInit();

      expect(dealerService.query).toHaveBeenCalled();
      expect(dealerService.addDealerToCollectionIfMissing).toHaveBeenCalledWith(
        dealerCollection,
        ...additionalDealers.map(expect.objectContaining)
      );
      expect(comp.dealersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Placeholder query and add missing value', () => {
      const dealer: IDealer = { id: 456 };
      const placeholders: IPlaceholder[] = [{ id: 24910 }];
      dealer.placeholders = placeholders;

      const placeholderCollection: IPlaceholder[] = [{ id: 65936 }];
      jest.spyOn(placeholderService, 'query').mockReturnValue(of(new HttpResponse({ body: placeholderCollection })));
      const additionalPlaceholders = [...placeholders];
      const expectedCollection: IPlaceholder[] = [...additionalPlaceholders, ...placeholderCollection];
      jest.spyOn(placeholderService, 'addPlaceholderToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ dealer });
      comp.ngOnInit();

      expect(placeholderService.query).toHaveBeenCalled();
      expect(placeholderService.addPlaceholderToCollectionIfMissing).toHaveBeenCalledWith(
        placeholderCollection,
        ...additionalPlaceholders.map(expect.objectContaining)
      );
      expect(comp.placeholdersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const dealer: IDealer = { id: 456 };
      const paymentLabel: IPaymentLabel = { id: 87715 };
      dealer.paymentLabels = [paymentLabel];
      const dealerGroup: IDealer = { id: 20298 };
      dealer.dealerGroup = dealerGroup;
      const placeholder: IPlaceholder = { id: 94264 };
      dealer.placeholders = [placeholder];

      activatedRoute.data = of({ dealer });
      comp.ngOnInit();

      expect(comp.paymentLabelsSharedCollection).toContain(paymentLabel);
      expect(comp.dealersSharedCollection).toContain(dealerGroup);
      expect(comp.placeholdersSharedCollection).toContain(placeholder);
      expect(comp.dealer).toEqual(dealer);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDealer>>();
      const dealer = { id: 123 };
      jest.spyOn(dealerFormService, 'getDealer').mockReturnValue(dealer);
      jest.spyOn(dealerService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ dealer });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: dealer }));
      saveSubject.complete();

      // THEN
      expect(dealerFormService.getDealer).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(dealerService.update).toHaveBeenCalledWith(expect.objectContaining(dealer));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDealer>>();
      const dealer = { id: 123 };
      jest.spyOn(dealerFormService, 'getDealer').mockReturnValue({ id: null });
      jest.spyOn(dealerService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ dealer: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: dealer }));
      saveSubject.complete();

      // THEN
      expect(dealerFormService.getDealer).toHaveBeenCalled();
      expect(dealerService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDealer>>();
      const dealer = { id: 123 };
      jest.spyOn(dealerService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ dealer });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(dealerService.update).toHaveBeenCalled();
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

    describe('compareDealer', () => {
      it('Should forward to dealerService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(dealerService, 'compareDealer');
        comp.compareDealer(entity, entity2);
        expect(dealerService.compareDealer).toHaveBeenCalledWith(entity, entity2);
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
