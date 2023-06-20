import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { JobSheetFormService } from './job-sheet-form.service';
import { JobSheetService } from '../service/job-sheet.service';
import { IJobSheet } from '../job-sheet.model';
import { IDealer } from 'app/entities/dealers/dealer/dealer.model';
import { DealerService } from 'app/entities/dealers/dealer/service/dealer.service';
import { IBusinessStamp } from 'app/entities/business-stamp/business-stamp.model';
import { BusinessStampService } from 'app/entities/business-stamp/service/business-stamp.service';
import { IPlaceholder } from 'app/entities/erpService/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/erpService/placeholder/service/placeholder.service';
import { IPaymentLabel } from 'app/entities/payment-label/payment-label.model';
import { PaymentLabelService } from 'app/entities/payment-label/service/payment-label.service';
import { IBusinessDocument } from 'app/entities/business-document/business-document.model';
import { BusinessDocumentService } from 'app/entities/business-document/service/business-document.service';

import { JobSheetUpdateComponent } from './job-sheet-update.component';

describe('JobSheet Management Update Component', () => {
  let comp: JobSheetUpdateComponent;
  let fixture: ComponentFixture<JobSheetUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let jobSheetFormService: JobSheetFormService;
  let jobSheetService: JobSheetService;
  let dealerService: DealerService;
  let businessStampService: BusinessStampService;
  let placeholderService: PlaceholderService;
  let paymentLabelService: PaymentLabelService;
  let businessDocumentService: BusinessDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [JobSheetUpdateComponent],
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
      .overrideTemplate(JobSheetUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(JobSheetUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    jobSheetFormService = TestBed.inject(JobSheetFormService);
    jobSheetService = TestBed.inject(JobSheetService);
    dealerService = TestBed.inject(DealerService);
    businessStampService = TestBed.inject(BusinessStampService);
    placeholderService = TestBed.inject(PlaceholderService);
    paymentLabelService = TestBed.inject(PaymentLabelService);
    businessDocumentService = TestBed.inject(BusinessDocumentService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Dealer query and add missing value', () => {
      const jobSheet: IJobSheet = { id: 456 };
      const biller: IDealer = { id: 78496 };
      jobSheet.biller = biller;
      const signatories: IDealer[] = [{ id: 35673 }];
      jobSheet.signatories = signatories;
      const contactPerson: IDealer = { id: 74999 };
      jobSheet.contactPerson = contactPerson;

      const dealerCollection: IDealer[] = [{ id: 86194 }];
      jest.spyOn(dealerService, 'query').mockReturnValue(of(new HttpResponse({ body: dealerCollection })));
      const additionalDealers = [biller, ...signatories, contactPerson];
      const expectedCollection: IDealer[] = [...additionalDealers, ...dealerCollection];
      jest.spyOn(dealerService, 'addDealerToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ jobSheet });
      comp.ngOnInit();

      expect(dealerService.query).toHaveBeenCalled();
      expect(dealerService.addDealerToCollectionIfMissing).toHaveBeenCalledWith(
        dealerCollection,
        ...additionalDealers.map(expect.objectContaining)
      );
      expect(comp.dealersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call BusinessStamp query and add missing value', () => {
      const jobSheet: IJobSheet = { id: 456 };
      const businessStamps: IBusinessStamp[] = [{ id: 10260 }];
      jobSheet.businessStamps = businessStamps;

      const businessStampCollection: IBusinessStamp[] = [{ id: 50045 }];
      jest.spyOn(businessStampService, 'query').mockReturnValue(of(new HttpResponse({ body: businessStampCollection })));
      const additionalBusinessStamps = [...businessStamps];
      const expectedCollection: IBusinessStamp[] = [...additionalBusinessStamps, ...businessStampCollection];
      jest.spyOn(businessStampService, 'addBusinessStampToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ jobSheet });
      comp.ngOnInit();

      expect(businessStampService.query).toHaveBeenCalled();
      expect(businessStampService.addBusinessStampToCollectionIfMissing).toHaveBeenCalledWith(
        businessStampCollection,
        ...additionalBusinessStamps.map(expect.objectContaining)
      );
      expect(comp.businessStampsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Placeholder query and add missing value', () => {
      const jobSheet: IJobSheet = { id: 456 };
      const placeholders: IPlaceholder[] = [{ id: 61982 }];
      jobSheet.placeholders = placeholders;

      const placeholderCollection: IPlaceholder[] = [{ id: 26922 }];
      jest.spyOn(placeholderService, 'query').mockReturnValue(of(new HttpResponse({ body: placeholderCollection })));
      const additionalPlaceholders = [...placeholders];
      const expectedCollection: IPlaceholder[] = [...additionalPlaceholders, ...placeholderCollection];
      jest.spyOn(placeholderService, 'addPlaceholderToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ jobSheet });
      comp.ngOnInit();

      expect(placeholderService.query).toHaveBeenCalled();
      expect(placeholderService.addPlaceholderToCollectionIfMissing).toHaveBeenCalledWith(
        placeholderCollection,
        ...additionalPlaceholders.map(expect.objectContaining)
      );
      expect(comp.placeholdersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call PaymentLabel query and add missing value', () => {
      const jobSheet: IJobSheet = { id: 456 };
      const paymentLabels: IPaymentLabel[] = [{ id: 94561 }];
      jobSheet.paymentLabels = paymentLabels;

      const paymentLabelCollection: IPaymentLabel[] = [{ id: 93546 }];
      jest.spyOn(paymentLabelService, 'query').mockReturnValue(of(new HttpResponse({ body: paymentLabelCollection })));
      const additionalPaymentLabels = [...paymentLabels];
      const expectedCollection: IPaymentLabel[] = [...additionalPaymentLabels, ...paymentLabelCollection];
      jest.spyOn(paymentLabelService, 'addPaymentLabelToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ jobSheet });
      comp.ngOnInit();

      expect(paymentLabelService.query).toHaveBeenCalled();
      expect(paymentLabelService.addPaymentLabelToCollectionIfMissing).toHaveBeenCalledWith(
        paymentLabelCollection,
        ...additionalPaymentLabels.map(expect.objectContaining)
      );
      expect(comp.paymentLabelsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call BusinessDocument query and add missing value', () => {
      const jobSheet: IJobSheet = { id: 456 };
      const businessDocuments: IBusinessDocument[] = [{ id: 18576 }];
      jobSheet.businessDocuments = businessDocuments;

      const businessDocumentCollection: IBusinessDocument[] = [{ id: 18709 }];
      jest.spyOn(businessDocumentService, 'query').mockReturnValue(of(new HttpResponse({ body: businessDocumentCollection })));
      const additionalBusinessDocuments = [...businessDocuments];
      const expectedCollection: IBusinessDocument[] = [...additionalBusinessDocuments, ...businessDocumentCollection];
      jest.spyOn(businessDocumentService, 'addBusinessDocumentToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ jobSheet });
      comp.ngOnInit();

      expect(businessDocumentService.query).toHaveBeenCalled();
      expect(businessDocumentService.addBusinessDocumentToCollectionIfMissing).toHaveBeenCalledWith(
        businessDocumentCollection,
        ...additionalBusinessDocuments.map(expect.objectContaining)
      );
      expect(comp.businessDocumentsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const jobSheet: IJobSheet = { id: 456 };
      const biller: IDealer = { id: 98308 };
      jobSheet.biller = biller;
      const signatories: IDealer = { id: 34363 };
      jobSheet.signatories = [signatories];
      const contactPerson: IDealer = { id: 87909 };
      jobSheet.contactPerson = contactPerson;
      const businessStamps: IBusinessStamp = { id: 48412 };
      jobSheet.businessStamps = [businessStamps];
      const placeholder: IPlaceholder = { id: 93404 };
      jobSheet.placeholders = [placeholder];
      const paymentLabel: IPaymentLabel = { id: 11910 };
      jobSheet.paymentLabels = [paymentLabel];
      const businessDocument: IBusinessDocument = { id: 54522 };
      jobSheet.businessDocuments = [businessDocument];

      activatedRoute.data = of({ jobSheet });
      comp.ngOnInit();

      expect(comp.dealersSharedCollection).toContain(biller);
      expect(comp.dealersSharedCollection).toContain(signatories);
      expect(comp.dealersSharedCollection).toContain(contactPerson);
      expect(comp.businessStampsSharedCollection).toContain(businessStamps);
      expect(comp.placeholdersSharedCollection).toContain(placeholder);
      expect(comp.paymentLabelsSharedCollection).toContain(paymentLabel);
      expect(comp.businessDocumentsSharedCollection).toContain(businessDocument);
      expect(comp.jobSheet).toEqual(jobSheet);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IJobSheet>>();
      const jobSheet = { id: 123 };
      jest.spyOn(jobSheetFormService, 'getJobSheet').mockReturnValue(jobSheet);
      jest.spyOn(jobSheetService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ jobSheet });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: jobSheet }));
      saveSubject.complete();

      // THEN
      expect(jobSheetFormService.getJobSheet).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(jobSheetService.update).toHaveBeenCalledWith(expect.objectContaining(jobSheet));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IJobSheet>>();
      const jobSheet = { id: 123 };
      jest.spyOn(jobSheetFormService, 'getJobSheet').mockReturnValue({ id: null });
      jest.spyOn(jobSheetService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ jobSheet: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: jobSheet }));
      saveSubject.complete();

      // THEN
      expect(jobSheetFormService.getJobSheet).toHaveBeenCalled();
      expect(jobSheetService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IJobSheet>>();
      const jobSheet = { id: 123 };
      jest.spyOn(jobSheetService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ jobSheet });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(jobSheetService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareDealer', () => {
      it('Should forward to dealerService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(dealerService, 'compareDealer');
        comp.compareDealer(entity, entity2);
        expect(dealerService.compareDealer).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareBusinessStamp', () => {
      it('Should forward to businessStampService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(businessStampService, 'compareBusinessStamp');
        comp.compareBusinessStamp(entity, entity2);
        expect(businessStampService.compareBusinessStamp).toHaveBeenCalledWith(entity, entity2);
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

    describe('comparePaymentLabel', () => {
      it('Should forward to paymentLabelService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(paymentLabelService, 'comparePaymentLabel');
        comp.comparePaymentLabel(entity, entity2);
        expect(paymentLabelService.comparePaymentLabel).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareBusinessDocument', () => {
      it('Should forward to businessDocumentService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(businessDocumentService, 'compareBusinessDocument');
        comp.compareBusinessDocument(entity, entity2);
        expect(businessDocumentService.compareBusinessDocument).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
