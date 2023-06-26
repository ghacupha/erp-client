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

import { SettlementRequisitionFormService } from './settlement-requisition-form.service';
import { SettlementRequisitionService } from '../service/settlement-requisition.service';
import { ISettlementRequisition } from '../settlement-requisition.model';

import { SettlementRequisitionUpdateComponent } from './settlement-requisition-update.component';
import { SettlementCurrencyService } from '../../settlement-currency/service/settlement-currency.service';
import { ISettlementCurrency } from '../../settlement-currency/settlement-currency.model';
import { IJobSheet } from '../../job-sheet/job-sheet.model';
import { SettlementService } from '../../settlement/service/settlement.service';
import { IDeliveryNote } from '../../delivery-note/delivery-note.model';
import { IPaymentInvoice } from '../../payment-invoice/payment-invoice.model';
import { IApplicationUser } from '../../../erp-pages/application-user/application-user.model';
import { ApplicationUserService } from '../../../erp-pages/application-user/service/application-user.service';
import { PaymentInvoiceService } from '../../payment-invoice/service/payment-invoice.service';
import { JobSheetService } from '../../job-sheet/service/job-sheet.service';
import { PlaceholderService } from '../../../erp-pages/placeholder/service/placeholder.service';
import { IDealer } from '../../../erp-pages/dealers/dealer/dealer.model';
import { IBusinessDocument } from '../../../erp-pages/business-document/business-document.model';
import { IPlaceholder } from '../../../erp-pages/placeholder/placeholder.model';
import { DeliveryNoteService } from '../../delivery-note/service/delivery-note.service';
import { DealerService } from '../../../erp-pages/dealers/dealer/service/dealer.service';
import { UniversallyUniqueMappingService } from '../../../erp-pages/universally-unique-mapping/service/universally-unique-mapping.service';
import { BusinessDocumentService } from '../../../erp-pages/business-document/service/business-document.service';
import { IUniversallyUniqueMapping } from '../../../erp-pages/universally-unique-mapping/universally-unique-mapping.model';
import { ISettlement } from '../../settlement/settlement.model';

describe('SettlementRequisition Management Update Component', () => {
  let comp: SettlementRequisitionUpdateComponent;
  let fixture: ComponentFixture<SettlementRequisitionUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let settlementRequisitionFormService: SettlementRequisitionFormService;
  let settlementRequisitionService: SettlementRequisitionService;
  let settlementCurrencyService: SettlementCurrencyService;
  let applicationUserService: ApplicationUserService;
  let dealerService: DealerService;
  let paymentInvoiceService: PaymentInvoiceService;
  let deliveryNoteService: DeliveryNoteService;
  let jobSheetService: JobSheetService;
  let businessDocumentService: BusinessDocumentService;
  let universallyUniqueMappingService: UniversallyUniqueMappingService;
  let placeholderService: PlaceholderService;
  let settlementService: SettlementService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [SettlementRequisitionUpdateComponent],
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
      .overrideTemplate(SettlementRequisitionUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SettlementRequisitionUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    settlementRequisitionFormService = TestBed.inject(SettlementRequisitionFormService);
    settlementRequisitionService = TestBed.inject(SettlementRequisitionService);
    settlementCurrencyService = TestBed.inject(SettlementCurrencyService);
    applicationUserService = TestBed.inject(ApplicationUserService);
    dealerService = TestBed.inject(DealerService);
    paymentInvoiceService = TestBed.inject(PaymentInvoiceService);
    deliveryNoteService = TestBed.inject(DeliveryNoteService);
    jobSheetService = TestBed.inject(JobSheetService);
    businessDocumentService = TestBed.inject(BusinessDocumentService);
    universallyUniqueMappingService = TestBed.inject(UniversallyUniqueMappingService);
    placeholderService = TestBed.inject(PlaceholderService);
    settlementService = TestBed.inject(SettlementService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call SettlementCurrency query and add missing value', () => {
      const settlementRequisition: ISettlementRequisition = { id: 456 };
      const settlementCurrency: ISettlementCurrency = { id: 49575 };
      settlementRequisition.settlementCurrency = settlementCurrency;

      const settlementCurrencyCollection: ISettlementCurrency[] = [{ id: 2417 }];
      jest.spyOn(settlementCurrencyService, 'query').mockReturnValue(of(new HttpResponse({ body: settlementCurrencyCollection })));
      const additionalSettlementCurrencies = [settlementCurrency];
      const expectedCollection: ISettlementCurrency[] = [...additionalSettlementCurrencies, ...settlementCurrencyCollection];
      jest.spyOn(settlementCurrencyService, 'addSettlementCurrencyToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ settlementRequisition });
      comp.ngOnInit();

      expect(settlementCurrencyService.query).toHaveBeenCalled();
      expect(settlementCurrencyService.addSettlementCurrencyToCollectionIfMissing).toHaveBeenCalledWith(
        settlementCurrencyCollection,
        ...additionalSettlementCurrencies.map(expect.objectContaining)
      );
      expect(comp.settlementCurrenciesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call ApplicationUser query and add missing value', () => {
      const settlementRequisition: ISettlementRequisition = { id: 456 };
      const currentOwner: IApplicationUser = { id: 81078 };
      settlementRequisition.currentOwner = currentOwner;
      const nativeOwner: IApplicationUser = { id: 11852 };
      settlementRequisition.nativeOwner = nativeOwner;

      const applicationUserCollection: IApplicationUser[] = [{ id: 29141 }];
      jest.spyOn(applicationUserService, 'query').mockReturnValue(of(new HttpResponse({ body: applicationUserCollection })));
      const additionalApplicationUsers = [currentOwner, nativeOwner];
      const expectedCollection: IApplicationUser[] = [...additionalApplicationUsers, ...applicationUserCollection];
      jest.spyOn(applicationUserService, 'addApplicationUserToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ settlementRequisition });
      comp.ngOnInit();

      expect(applicationUserService.query).toHaveBeenCalled();
      expect(applicationUserService.addApplicationUserToCollectionIfMissing).toHaveBeenCalledWith(
        applicationUserCollection,
        ...additionalApplicationUsers.map(expect.objectContaining)
      );
      expect(comp.applicationUsersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Dealer query and add missing value', () => {
      const settlementRequisition: ISettlementRequisition = { id: 456 };
      const nativeDepartment: IDealer = { id: 82155 };
      settlementRequisition.nativeDepartment = nativeDepartment;
      const biller: IDealer = { id: 6309 };
      settlementRequisition.biller = biller;
      const signatures: IDealer[] = [{ id: 37940 }];
      settlementRequisition.signatures = signatures;

      const dealerCollection: IDealer[] = [{ id: 20961 }];
      jest.spyOn(dealerService, 'query').mockReturnValue(of(new HttpResponse({ body: dealerCollection })));
      const additionalDealers = [nativeDepartment, biller, ...signatures];
      const expectedCollection: IDealer[] = [...additionalDealers, ...dealerCollection];
      jest.spyOn(dealerService, 'addDealerToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ settlementRequisition });
      comp.ngOnInit();

      expect(dealerService.query).toHaveBeenCalled();
      expect(dealerService.addDealerToCollectionIfMissing).toHaveBeenCalledWith(
        dealerCollection,
        ...additionalDealers.map(expect.objectContaining)
      );
      expect(comp.dealersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call PaymentInvoice query and add missing value', () => {
      const settlementRequisition: ISettlementRequisition = { id: 456 };
      const paymentInvoices: IPaymentInvoice[] = [{ id: 61205 }];
      settlementRequisition.paymentInvoices = paymentInvoices;

      const paymentInvoiceCollection: IPaymentInvoice[] = [{ id: 74609 }];
      jest.spyOn(paymentInvoiceService, 'query').mockReturnValue(of(new HttpResponse({ body: paymentInvoiceCollection })));
      const additionalPaymentInvoices = [...paymentInvoices];
      const expectedCollection: IPaymentInvoice[] = [...additionalPaymentInvoices, ...paymentInvoiceCollection];
      jest.spyOn(paymentInvoiceService, 'addPaymentInvoiceToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ settlementRequisition });
      comp.ngOnInit();

      expect(paymentInvoiceService.query).toHaveBeenCalled();
      expect(paymentInvoiceService.addPaymentInvoiceToCollectionIfMissing).toHaveBeenCalledWith(
        paymentInvoiceCollection,
        ...additionalPaymentInvoices.map(expect.objectContaining)
      );
      expect(comp.paymentInvoicesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call DeliveryNote query and add missing value', () => {
      const settlementRequisition: ISettlementRequisition = { id: 456 };
      const deliveryNotes: IDeliveryNote[] = [{ id: 81720 }];
      settlementRequisition.deliveryNotes = deliveryNotes;

      const deliveryNoteCollection: IDeliveryNote[] = [{ id: 65137 }];
      jest.spyOn(deliveryNoteService, 'query').mockReturnValue(of(new HttpResponse({ body: deliveryNoteCollection })));
      const additionalDeliveryNotes = [...deliveryNotes];
      const expectedCollection: IDeliveryNote[] = [...additionalDeliveryNotes, ...deliveryNoteCollection];
      jest.spyOn(deliveryNoteService, 'addDeliveryNoteToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ settlementRequisition });
      comp.ngOnInit();

      expect(deliveryNoteService.query).toHaveBeenCalled();
      expect(deliveryNoteService.addDeliveryNoteToCollectionIfMissing).toHaveBeenCalledWith(
        deliveryNoteCollection,
        ...additionalDeliveryNotes.map(expect.objectContaining)
      );
      expect(comp.deliveryNotesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call JobSheet query and add missing value', () => {
      const settlementRequisition: ISettlementRequisition = { id: 456 };
      const jobSheets: IJobSheet[] = [{ id: 29156 }];
      settlementRequisition.jobSheets = jobSheets;

      const jobSheetCollection: IJobSheet[] = [{ id: 42851 }];
      jest.spyOn(jobSheetService, 'query').mockReturnValue(of(new HttpResponse({ body: jobSheetCollection })));
      const additionalJobSheets = [...jobSheets];
      const expectedCollection: IJobSheet[] = [...additionalJobSheets, ...jobSheetCollection];
      jest.spyOn(jobSheetService, 'addJobSheetToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ settlementRequisition });
      comp.ngOnInit();

      expect(jobSheetService.query).toHaveBeenCalled();
      expect(jobSheetService.addJobSheetToCollectionIfMissing).toHaveBeenCalledWith(
        jobSheetCollection,
        ...additionalJobSheets.map(expect.objectContaining)
      );
      expect(comp.jobSheetsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call BusinessDocument query and add missing value', () => {
      const settlementRequisition: ISettlementRequisition = { id: 456 };
      const businessDocuments: IBusinessDocument[] = [{ id: 39417 }];
      settlementRequisition.businessDocuments = businessDocuments;

      const businessDocumentCollection: IBusinessDocument[] = [{ id: 13780 }];
      jest.spyOn(businessDocumentService, 'query').mockReturnValue(of(new HttpResponse({ body: businessDocumentCollection })));
      const additionalBusinessDocuments = [...businessDocuments];
      const expectedCollection: IBusinessDocument[] = [...additionalBusinessDocuments, ...businessDocumentCollection];
      jest.spyOn(businessDocumentService, 'addBusinessDocumentToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ settlementRequisition });
      comp.ngOnInit();

      expect(businessDocumentService.query).toHaveBeenCalled();
      expect(businessDocumentService.addBusinessDocumentToCollectionIfMissing).toHaveBeenCalledWith(
        businessDocumentCollection,
        ...additionalBusinessDocuments.map(expect.objectContaining)
      );
      expect(comp.businessDocumentsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call UniversallyUniqueMapping query and add missing value', () => {
      const settlementRequisition: ISettlementRequisition = { id: 456 };
      const applicationMappings: IUniversallyUniqueMapping[] = [{ id: 87011 }];
      settlementRequisition.applicationMappings = applicationMappings;

      const universallyUniqueMappingCollection: IUniversallyUniqueMapping[] = [{ id: 37714 }];
      jest
        .spyOn(universallyUniqueMappingService, 'query')
        .mockReturnValue(of(new HttpResponse({ body: universallyUniqueMappingCollection })));
      const additionalUniversallyUniqueMappings = [...applicationMappings];
      const expectedCollection: IUniversallyUniqueMapping[] = [
        ...additionalUniversallyUniqueMappings,
        ...universallyUniqueMappingCollection,
      ];
      jest.spyOn(universallyUniqueMappingService, 'addUniversallyUniqueMappingToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ settlementRequisition });
      comp.ngOnInit();

      expect(universallyUniqueMappingService.query).toHaveBeenCalled();
      expect(universallyUniqueMappingService.addUniversallyUniqueMappingToCollectionIfMissing).toHaveBeenCalledWith(
        universallyUniqueMappingCollection,
        ...additionalUniversallyUniqueMappings.map(expect.objectContaining)
      );
      expect(comp.universallyUniqueMappingsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Placeholder query and add missing value', () => {
      const settlementRequisition: ISettlementRequisition = { id: 456 };
      const placeholders: IPlaceholder[] = [{ id: 38490 }];
      settlementRequisition.placeholders = placeholders;

      const placeholderCollection: IPlaceholder[] = [{ id: 83159 }];
      jest.spyOn(placeholderService, 'query').mockReturnValue(of(new HttpResponse({ body: placeholderCollection })));
      const additionalPlaceholders = [...placeholders];
      const expectedCollection: IPlaceholder[] = [...additionalPlaceholders, ...placeholderCollection];
      jest.spyOn(placeholderService, 'addPlaceholderToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ settlementRequisition });
      comp.ngOnInit();

      expect(placeholderService.query).toHaveBeenCalled();
      expect(placeholderService.addPlaceholderToCollectionIfMissing).toHaveBeenCalledWith(
        placeholderCollection,
        ...additionalPlaceholders.map(expect.objectContaining)
      );
      expect(comp.placeholdersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Settlement query and add missing value', () => {
      const settlementRequisition: ISettlementRequisition = { id: 456 };
      const settlements: ISettlement[] = [{ id: 35776 }];
      settlementRequisition.settlements = settlements;

      const settlementCollection: ISettlement[] = [{ id: 60099 }];
      jest.spyOn(settlementService, 'query').mockReturnValue(of(new HttpResponse({ body: settlementCollection })));
      const additionalSettlements = [...settlements];
      const expectedCollection: ISettlement[] = [...additionalSettlements, ...settlementCollection];
      jest.spyOn(settlementService, 'addSettlementToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ settlementRequisition });
      comp.ngOnInit();

      expect(settlementService.query).toHaveBeenCalled();
      expect(settlementService.addSettlementToCollectionIfMissing).toHaveBeenCalledWith(
        settlementCollection,
        ...additionalSettlements.map(expect.objectContaining)
      );
      expect(comp.settlementsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const settlementRequisition: ISettlementRequisition = { id: 456 };
      const settlementCurrency: ISettlementCurrency = { id: 18727 };
      settlementRequisition.settlementCurrency = settlementCurrency;
      const currentOwner: IApplicationUser = { id: 87953 };
      settlementRequisition.currentOwner = currentOwner;
      const nativeOwner: IApplicationUser = { id: 30908 };
      settlementRequisition.nativeOwner = nativeOwner;
      const nativeDepartment: IDealer = { id: 2651 };
      settlementRequisition.nativeDepartment = nativeDepartment;
      const biller: IDealer = { id: 86745 };
      settlementRequisition.biller = biller;
      const signatures: IDealer = { id: 51317 };
      settlementRequisition.signatures = [signatures];
      const paymentInvoice: IPaymentInvoice = { id: 8640 };
      settlementRequisition.paymentInvoices = [paymentInvoice];
      const deliveryNote: IDeliveryNote = { id: 2187 };
      settlementRequisition.deliveryNotes = [deliveryNote];
      const jobSheet: IJobSheet = { id: 11047 };
      settlementRequisition.jobSheets = [jobSheet];
      const businessDocument: IBusinessDocument = { id: 68418 };
      settlementRequisition.businessDocuments = [businessDocument];
      const applicationMapping: IUniversallyUniqueMapping = { id: 34613 };
      settlementRequisition.applicationMappings = [applicationMapping];
      const placeholder: IPlaceholder = { id: 9021 };
      settlementRequisition.placeholders = [placeholder];
      const settlement: ISettlement = { id: 89183 };
      settlementRequisition.settlements = [settlement];

      activatedRoute.data = of({ settlementRequisition });
      comp.ngOnInit();

      expect(comp.settlementCurrenciesSharedCollection).toContain(settlementCurrency);
      expect(comp.applicationUsersSharedCollection).toContain(currentOwner);
      expect(comp.applicationUsersSharedCollection).toContain(nativeOwner);
      expect(comp.dealersSharedCollection).toContain(nativeDepartment);
      expect(comp.dealersSharedCollection).toContain(biller);
      expect(comp.dealersSharedCollection).toContain(signatures);
      expect(comp.paymentInvoicesSharedCollection).toContain(paymentInvoice);
      expect(comp.deliveryNotesSharedCollection).toContain(deliveryNote);
      expect(comp.jobSheetsSharedCollection).toContain(jobSheet);
      expect(comp.businessDocumentsSharedCollection).toContain(businessDocument);
      expect(comp.universallyUniqueMappingsSharedCollection).toContain(applicationMapping);
      expect(comp.placeholdersSharedCollection).toContain(placeholder);
      expect(comp.settlementsSharedCollection).toContain(settlement);
      expect(comp.settlementRequisition).toEqual(settlementRequisition);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISettlementRequisition>>();
      const settlementRequisition = { id: 123 };
      jest.spyOn(settlementRequisitionFormService, 'getSettlementRequisition').mockReturnValue(settlementRequisition);
      jest.spyOn(settlementRequisitionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ settlementRequisition });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: settlementRequisition }));
      saveSubject.complete();

      // THEN
      expect(settlementRequisitionFormService.getSettlementRequisition).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(settlementRequisitionService.update).toHaveBeenCalledWith(expect.objectContaining(settlementRequisition));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISettlementRequisition>>();
      const settlementRequisition = { id: 123 };
      jest.spyOn(settlementRequisitionFormService, 'getSettlementRequisition').mockReturnValue({ id: null });
      jest.spyOn(settlementRequisitionService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ settlementRequisition: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: settlementRequisition }));
      saveSubject.complete();

      // THEN
      expect(settlementRequisitionFormService.getSettlementRequisition).toHaveBeenCalled();
      expect(settlementRequisitionService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISettlementRequisition>>();
      const settlementRequisition = { id: 123 };
      jest.spyOn(settlementRequisitionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ settlementRequisition });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(settlementRequisitionService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareSettlementCurrency', () => {
      it('Should forward to settlementCurrencyService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(settlementCurrencyService, 'compareSettlementCurrency');
        comp.compareSettlementCurrency(entity, entity2);
        expect(settlementCurrencyService.compareSettlementCurrency).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareApplicationUser', () => {
      it('Should forward to applicationUserService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(applicationUserService, 'compareApplicationUser');
        comp.compareApplicationUser(entity, entity2);
        expect(applicationUserService.compareApplicationUser).toHaveBeenCalledWith(entity, entity2);
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

    describe('comparePaymentInvoice', () => {
      it('Should forward to paymentInvoiceService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(paymentInvoiceService, 'comparePaymentInvoice');
        comp.comparePaymentInvoice(entity, entity2);
        expect(paymentInvoiceService.comparePaymentInvoice).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareDeliveryNote', () => {
      it('Should forward to deliveryNoteService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(deliveryNoteService, 'compareDeliveryNote');
        comp.compareDeliveryNote(entity, entity2);
        expect(deliveryNoteService.compareDeliveryNote).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareJobSheet', () => {
      it('Should forward to jobSheetService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(jobSheetService, 'compareJobSheet');
        comp.compareJobSheet(entity, entity2);
        expect(jobSheetService.compareJobSheet).toHaveBeenCalledWith(entity, entity2);
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

    describe('compareUniversallyUniqueMapping', () => {
      it('Should forward to universallyUniqueMappingService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(universallyUniqueMappingService, 'compareUniversallyUniqueMapping');
        comp.compareUniversallyUniqueMapping(entity, entity2);
        expect(universallyUniqueMappingService.compareUniversallyUniqueMapping).toHaveBeenCalledWith(entity, entity2);
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

    describe('compareSettlement', () => {
      it('Should forward to settlementService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(settlementService, 'compareSettlement');
        comp.compareSettlement(entity, entity2);
        expect(settlementService.compareSettlement).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
