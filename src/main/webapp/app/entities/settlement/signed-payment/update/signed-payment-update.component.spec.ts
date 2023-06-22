import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { SignedPaymentFormService } from './signed-payment-form.service';
import { SignedPaymentService } from '../service/signed-payment.service';
import { ISignedPayment } from '../signed-payment.model';
import { IPaymentLabel } from 'app/entities/settlement/payment-label/payment-label.model';
import { PaymentLabelService } from 'app/entities/settlement/payment-label/service/payment-label.service';
import { IPaymentCategory } from 'app/entities/settlement/payment-category/payment-category.model';
import { PaymentCategoryService } from 'app/entities/settlement/payment-category/service/payment-category.service';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/system/placeholder/service/placeholder.service';

import { SignedPaymentUpdateComponent } from './signed-payment-update.component';

describe('SignedPayment Management Update Component', () => {
  let comp: SignedPaymentUpdateComponent;
  let fixture: ComponentFixture<SignedPaymentUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let signedPaymentFormService: SignedPaymentFormService;
  let signedPaymentService: SignedPaymentService;
  let paymentLabelService: PaymentLabelService;
  let paymentCategoryService: PaymentCategoryService;
  let placeholderService: PlaceholderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [SignedPaymentUpdateComponent],
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
      .overrideTemplate(SignedPaymentUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SignedPaymentUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    signedPaymentFormService = TestBed.inject(SignedPaymentFormService);
    signedPaymentService = TestBed.inject(SignedPaymentService);
    paymentLabelService = TestBed.inject(PaymentLabelService);
    paymentCategoryService = TestBed.inject(PaymentCategoryService);
    placeholderService = TestBed.inject(PlaceholderService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call PaymentLabel query and add missing value', () => {
      const signedPayment: ISignedPayment = { id: 456 };
      const paymentLabels: IPaymentLabel[] = [{ id: 60214 }];
      signedPayment.paymentLabels = paymentLabels;

      const paymentLabelCollection: IPaymentLabel[] = [{ id: 40943 }];
      jest.spyOn(paymentLabelService, 'query').mockReturnValue(of(new HttpResponse({ body: paymentLabelCollection })));
      const additionalPaymentLabels = [...paymentLabels];
      const expectedCollection: IPaymentLabel[] = [...additionalPaymentLabels, ...paymentLabelCollection];
      jest.spyOn(paymentLabelService, 'addPaymentLabelToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ signedPayment });
      comp.ngOnInit();

      expect(paymentLabelService.query).toHaveBeenCalled();
      expect(paymentLabelService.addPaymentLabelToCollectionIfMissing).toHaveBeenCalledWith(
        paymentLabelCollection,
        ...additionalPaymentLabels.map(expect.objectContaining)
      );
      expect(comp.paymentLabelsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call PaymentCategory query and add missing value', () => {
      const signedPayment: ISignedPayment = { id: 456 };
      const paymentCategory: IPaymentCategory = { id: 19158 };
      signedPayment.paymentCategory = paymentCategory;

      const paymentCategoryCollection: IPaymentCategory[] = [{ id: 56755 }];
      jest.spyOn(paymentCategoryService, 'query').mockReturnValue(of(new HttpResponse({ body: paymentCategoryCollection })));
      const additionalPaymentCategories = [paymentCategory];
      const expectedCollection: IPaymentCategory[] = [...additionalPaymentCategories, ...paymentCategoryCollection];
      jest.spyOn(paymentCategoryService, 'addPaymentCategoryToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ signedPayment });
      comp.ngOnInit();

      expect(paymentCategoryService.query).toHaveBeenCalled();
      expect(paymentCategoryService.addPaymentCategoryToCollectionIfMissing).toHaveBeenCalledWith(
        paymentCategoryCollection,
        ...additionalPaymentCategories.map(expect.objectContaining)
      );
      expect(comp.paymentCategoriesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Placeholder query and add missing value', () => {
      const signedPayment: ISignedPayment = { id: 456 };
      const placeholders: IPlaceholder[] = [{ id: 75417 }];
      signedPayment.placeholders = placeholders;

      const placeholderCollection: IPlaceholder[] = [{ id: 2425 }];
      jest.spyOn(placeholderService, 'query').mockReturnValue(of(new HttpResponse({ body: placeholderCollection })));
      const additionalPlaceholders = [...placeholders];
      const expectedCollection: IPlaceholder[] = [...additionalPlaceholders, ...placeholderCollection];
      jest.spyOn(placeholderService, 'addPlaceholderToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ signedPayment });
      comp.ngOnInit();

      expect(placeholderService.query).toHaveBeenCalled();
      expect(placeholderService.addPlaceholderToCollectionIfMissing).toHaveBeenCalledWith(
        placeholderCollection,
        ...additionalPlaceholders.map(expect.objectContaining)
      );
      expect(comp.placeholdersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call SignedPayment query and add missing value', () => {
      const signedPayment: ISignedPayment = { id: 456 };
      const signedPaymentGroup: ISignedPayment = { id: 96038 };
      signedPayment.signedPaymentGroup = signedPaymentGroup;

      const signedPaymentCollection: ISignedPayment[] = [{ id: 53605 }];
      jest.spyOn(signedPaymentService, 'query').mockReturnValue(of(new HttpResponse({ body: signedPaymentCollection })));
      const additionalSignedPayments = [signedPaymentGroup];
      const expectedCollection: ISignedPayment[] = [...additionalSignedPayments, ...signedPaymentCollection];
      jest.spyOn(signedPaymentService, 'addSignedPaymentToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ signedPayment });
      comp.ngOnInit();

      expect(signedPaymentService.query).toHaveBeenCalled();
      expect(signedPaymentService.addSignedPaymentToCollectionIfMissing).toHaveBeenCalledWith(
        signedPaymentCollection,
        ...additionalSignedPayments.map(expect.objectContaining)
      );
      expect(comp.signedPaymentsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const signedPayment: ISignedPayment = { id: 456 };
      const paymentLabel: IPaymentLabel = { id: 61040 };
      signedPayment.paymentLabels = [paymentLabel];
      const paymentCategory: IPaymentCategory = { id: 84241 };
      signedPayment.paymentCategory = paymentCategory;
      const placeholder: IPlaceholder = { id: 24907 };
      signedPayment.placeholders = [placeholder];
      const signedPaymentGroup: ISignedPayment = { id: 84795 };
      signedPayment.signedPaymentGroup = signedPaymentGroup;

      activatedRoute.data = of({ signedPayment });
      comp.ngOnInit();

      expect(comp.paymentLabelsSharedCollection).toContain(paymentLabel);
      expect(comp.paymentCategoriesSharedCollection).toContain(paymentCategory);
      expect(comp.placeholdersSharedCollection).toContain(placeholder);
      expect(comp.signedPaymentsSharedCollection).toContain(signedPaymentGroup);
      expect(comp.signedPayment).toEqual(signedPayment);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISignedPayment>>();
      const signedPayment = { id: 123 };
      jest.spyOn(signedPaymentFormService, 'getSignedPayment').mockReturnValue(signedPayment);
      jest.spyOn(signedPaymentService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ signedPayment });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: signedPayment }));
      saveSubject.complete();

      // THEN
      expect(signedPaymentFormService.getSignedPayment).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(signedPaymentService.update).toHaveBeenCalledWith(expect.objectContaining(signedPayment));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISignedPayment>>();
      const signedPayment = { id: 123 };
      jest.spyOn(signedPaymentFormService, 'getSignedPayment').mockReturnValue({ id: null });
      jest.spyOn(signedPaymentService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ signedPayment: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: signedPayment }));
      saveSubject.complete();

      // THEN
      expect(signedPaymentFormService.getSignedPayment).toHaveBeenCalled();
      expect(signedPaymentService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISignedPayment>>();
      const signedPayment = { id: 123 };
      jest.spyOn(signedPaymentService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ signedPayment });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(signedPaymentService.update).toHaveBeenCalled();
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

    describe('compareSignedPayment', () => {
      it('Should forward to signedPaymentService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(signedPaymentService, 'compareSignedPayment');
        comp.compareSignedPayment(entity, entity2);
        expect(signedPaymentService.compareSignedPayment).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
