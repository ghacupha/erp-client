import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { PaymentRequisitionFormService } from './payment-requisition-form.service';
import { PaymentRequisitionService } from '../service/payment-requisition.service';
import { IPaymentRequisition } from '../payment-requisition.model';
import { IPaymentLabel } from 'app/entities/settlement/payment-label/payment-label.model';
import { PaymentLabelService } from 'app/entities/settlement/payment-label/service/payment-label.service';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/system/placeholder/service/placeholder.service';

import { PaymentRequisitionUpdateComponent } from './payment-requisition-update.component';

describe('PaymentRequisition Management Update Component', () => {
  let comp: PaymentRequisitionUpdateComponent;
  let fixture: ComponentFixture<PaymentRequisitionUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let paymentRequisitionFormService: PaymentRequisitionFormService;
  let paymentRequisitionService: PaymentRequisitionService;
  let paymentLabelService: PaymentLabelService;
  let placeholderService: PlaceholderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [PaymentRequisitionUpdateComponent],
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
      .overrideTemplate(PaymentRequisitionUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PaymentRequisitionUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    paymentRequisitionFormService = TestBed.inject(PaymentRequisitionFormService);
    paymentRequisitionService = TestBed.inject(PaymentRequisitionService);
    paymentLabelService = TestBed.inject(PaymentLabelService);
    placeholderService = TestBed.inject(PlaceholderService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call PaymentLabel query and add missing value', () => {
      const paymentRequisition: IPaymentRequisition = { id: 456 };
      const paymentLabels: IPaymentLabel[] = [{ id: 32074 }];
      paymentRequisition.paymentLabels = paymentLabels;

      const paymentLabelCollection: IPaymentLabel[] = [{ id: 24191 }];
      jest.spyOn(paymentLabelService, 'query').mockReturnValue(of(new HttpResponse({ body: paymentLabelCollection })));
      const additionalPaymentLabels = [...paymentLabels];
      const expectedCollection: IPaymentLabel[] = [...additionalPaymentLabels, ...paymentLabelCollection];
      jest.spyOn(paymentLabelService, 'addPaymentLabelToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ paymentRequisition });
      comp.ngOnInit();

      expect(paymentLabelService.query).toHaveBeenCalled();
      expect(paymentLabelService.addPaymentLabelToCollectionIfMissing).toHaveBeenCalledWith(
        paymentLabelCollection,
        ...additionalPaymentLabels.map(expect.objectContaining)
      );
      expect(comp.paymentLabelsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Placeholder query and add missing value', () => {
      const paymentRequisition: IPaymentRequisition = { id: 456 };
      const placeholders: IPlaceholder[] = [{ id: 52864 }];
      paymentRequisition.placeholders = placeholders;

      const placeholderCollection: IPlaceholder[] = [{ id: 38640 }];
      jest.spyOn(placeholderService, 'query').mockReturnValue(of(new HttpResponse({ body: placeholderCollection })));
      const additionalPlaceholders = [...placeholders];
      const expectedCollection: IPlaceholder[] = [...additionalPlaceholders, ...placeholderCollection];
      jest.spyOn(placeholderService, 'addPlaceholderToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ paymentRequisition });
      comp.ngOnInit();

      expect(placeholderService.query).toHaveBeenCalled();
      expect(placeholderService.addPlaceholderToCollectionIfMissing).toHaveBeenCalledWith(
        placeholderCollection,
        ...additionalPlaceholders.map(expect.objectContaining)
      );
      expect(comp.placeholdersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const paymentRequisition: IPaymentRequisition = { id: 456 };
      const paymentLabel: IPaymentLabel = { id: 7525 };
      paymentRequisition.paymentLabels = [paymentLabel];
      const placeholder: IPlaceholder = { id: 85634 };
      paymentRequisition.placeholders = [placeholder];

      activatedRoute.data = of({ paymentRequisition });
      comp.ngOnInit();

      expect(comp.paymentLabelsSharedCollection).toContain(paymentLabel);
      expect(comp.placeholdersSharedCollection).toContain(placeholder);
      expect(comp.paymentRequisition).toEqual(paymentRequisition);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPaymentRequisition>>();
      const paymentRequisition = { id: 123 };
      jest.spyOn(paymentRequisitionFormService, 'getPaymentRequisition').mockReturnValue(paymentRequisition);
      jest.spyOn(paymentRequisitionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ paymentRequisition });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: paymentRequisition }));
      saveSubject.complete();

      // THEN
      expect(paymentRequisitionFormService.getPaymentRequisition).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(paymentRequisitionService.update).toHaveBeenCalledWith(expect.objectContaining(paymentRequisition));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPaymentRequisition>>();
      const paymentRequisition = { id: 123 };
      jest.spyOn(paymentRequisitionFormService, 'getPaymentRequisition').mockReturnValue({ id: null });
      jest.spyOn(paymentRequisitionService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ paymentRequisition: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: paymentRequisition }));
      saveSubject.complete();

      // THEN
      expect(paymentRequisitionFormService.getPaymentRequisition).toHaveBeenCalled();
      expect(paymentRequisitionService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPaymentRequisition>>();
      const paymentRequisition = { id: 123 };
      jest.spyOn(paymentRequisitionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ paymentRequisition });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(paymentRequisitionService.update).toHaveBeenCalled();
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
