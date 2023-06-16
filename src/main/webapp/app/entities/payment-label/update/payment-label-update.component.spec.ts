import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { PaymentLabelFormService } from './payment-label-form.service';
import { PaymentLabelService } from '../service/payment-label.service';
import { IPaymentLabel } from '../payment-label.model';
import { IPlaceholder } from 'app/entities/erpService/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/erpService/placeholder/service/placeholder.service';

import { PaymentLabelUpdateComponent } from './payment-label-update.component';

describe('PaymentLabel Management Update Component', () => {
  let comp: PaymentLabelUpdateComponent;
  let fixture: ComponentFixture<PaymentLabelUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let paymentLabelFormService: PaymentLabelFormService;
  let paymentLabelService: PaymentLabelService;
  let placeholderService: PlaceholderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [PaymentLabelUpdateComponent],
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
      .overrideTemplate(PaymentLabelUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PaymentLabelUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    paymentLabelFormService = TestBed.inject(PaymentLabelFormService);
    paymentLabelService = TestBed.inject(PaymentLabelService);
    placeholderService = TestBed.inject(PlaceholderService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call PaymentLabel query and add missing value', () => {
      const paymentLabel: IPaymentLabel = { id: 456 };
      const containingPaymentLabel: IPaymentLabel = { id: 9251 };
      paymentLabel.containingPaymentLabel = containingPaymentLabel;

      const paymentLabelCollection: IPaymentLabel[] = [{ id: 89587 }];
      jest.spyOn(paymentLabelService, 'query').mockReturnValue(of(new HttpResponse({ body: paymentLabelCollection })));
      const additionalPaymentLabels = [containingPaymentLabel];
      const expectedCollection: IPaymentLabel[] = [...additionalPaymentLabels, ...paymentLabelCollection];
      jest.spyOn(paymentLabelService, 'addPaymentLabelToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ paymentLabel });
      comp.ngOnInit();

      expect(paymentLabelService.query).toHaveBeenCalled();
      expect(paymentLabelService.addPaymentLabelToCollectionIfMissing).toHaveBeenCalledWith(
        paymentLabelCollection,
        ...additionalPaymentLabels.map(expect.objectContaining)
      );
      expect(comp.paymentLabelsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Placeholder query and add missing value', () => {
      const paymentLabel: IPaymentLabel = { id: 456 };
      const placeholders: IPlaceholder[] = [{ id: 14078 }];
      paymentLabel.placeholders = placeholders;

      const placeholderCollection: IPlaceholder[] = [{ id: 52254 }];
      jest.spyOn(placeholderService, 'query').mockReturnValue(of(new HttpResponse({ body: placeholderCollection })));
      const additionalPlaceholders = [...placeholders];
      const expectedCollection: IPlaceholder[] = [...additionalPlaceholders, ...placeholderCollection];
      jest.spyOn(placeholderService, 'addPlaceholderToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ paymentLabel });
      comp.ngOnInit();

      expect(placeholderService.query).toHaveBeenCalled();
      expect(placeholderService.addPlaceholderToCollectionIfMissing).toHaveBeenCalledWith(
        placeholderCollection,
        ...additionalPlaceholders.map(expect.objectContaining)
      );
      expect(comp.placeholdersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const paymentLabel: IPaymentLabel = { id: 456 };
      const containingPaymentLabel: IPaymentLabel = { id: 4866 };
      paymentLabel.containingPaymentLabel = containingPaymentLabel;
      const placeholder: IPlaceholder = { id: 88585 };
      paymentLabel.placeholders = [placeholder];

      activatedRoute.data = of({ paymentLabel });
      comp.ngOnInit();

      expect(comp.paymentLabelsSharedCollection).toContain(containingPaymentLabel);
      expect(comp.placeholdersSharedCollection).toContain(placeholder);
      expect(comp.paymentLabel).toEqual(paymentLabel);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPaymentLabel>>();
      const paymentLabel = { id: 123 };
      jest.spyOn(paymentLabelFormService, 'getPaymentLabel').mockReturnValue(paymentLabel);
      jest.spyOn(paymentLabelService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ paymentLabel });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: paymentLabel }));
      saveSubject.complete();

      // THEN
      expect(paymentLabelFormService.getPaymentLabel).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(paymentLabelService.update).toHaveBeenCalledWith(expect.objectContaining(paymentLabel));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPaymentLabel>>();
      const paymentLabel = { id: 123 };
      jest.spyOn(paymentLabelFormService, 'getPaymentLabel').mockReturnValue({ id: null });
      jest.spyOn(paymentLabelService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ paymentLabel: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: paymentLabel }));
      saveSubject.complete();

      // THEN
      expect(paymentLabelFormService.getPaymentLabel).toHaveBeenCalled();
      expect(paymentLabelService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPaymentLabel>>();
      const paymentLabel = { id: 123 };
      jest.spyOn(paymentLabelService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ paymentLabel });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(paymentLabelService.update).toHaveBeenCalled();
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
