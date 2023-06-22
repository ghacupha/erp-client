import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { DeliveryNoteFormService } from './delivery-note-form.service';
import { DeliveryNoteService } from '../service/delivery-note.service';
import { IDeliveryNote } from '../delivery-note.model';

import { DeliveryNoteUpdateComponent } from './delivery-note-update.component';
import { IPlaceholder } from '../../../erp-pages/placeholder/placeholder.model';
import { IBusinessDocument } from '../../../erp-pages/business-document/business-document.model';
import { DealerService } from '../../../erp-pages/dealers/dealer/service/dealer.service';
import { PurchaseOrderService } from '../../purchase-order/service/purchase-order.service';
import { BusinessDocumentService } from '../../../erp-pages/business-document/service/business-document.service';
import { IPurchaseOrder } from '../../purchase-order/purchase-order.model';
import { IBusinessStamp } from '../../business-stamp/business-stamp.model';
import { BusinessStampService } from '../../business-stamp/service/business-stamp.service';
import { PlaceholderService } from '../../../erp-pages/placeholder/service/placeholder.service';
import { IDealer } from '../../../erp-pages/dealers/dealer/dealer.model';

describe('DeliveryNote Management Update Component', () => {
  let comp: DeliveryNoteUpdateComponent;
  let fixture: ComponentFixture<DeliveryNoteUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let deliveryNoteFormService: DeliveryNoteFormService;
  let deliveryNoteService: DeliveryNoteService;
  let placeholderService: PlaceholderService;
  let dealerService: DealerService;
  let businessStampService: BusinessStampService;
  let purchaseOrderService: PurchaseOrderService;
  let businessDocumentService: BusinessDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [DeliveryNoteUpdateComponent],
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
      .overrideTemplate(DeliveryNoteUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DeliveryNoteUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    deliveryNoteFormService = TestBed.inject(DeliveryNoteFormService);
    deliveryNoteService = TestBed.inject(DeliveryNoteService);
    placeholderService = TestBed.inject(PlaceholderService);
    dealerService = TestBed.inject(DealerService);
    businessStampService = TestBed.inject(BusinessStampService);
    purchaseOrderService = TestBed.inject(PurchaseOrderService);
    businessDocumentService = TestBed.inject(BusinessDocumentService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Placeholder query and add missing value', () => {
      const deliveryNote: IDeliveryNote = { id: 456 };
      const placeholders: IPlaceholder[] = [{ id: 91349 }];
      deliveryNote.placeholders = placeholders;

      const placeholderCollection: IPlaceholder[] = [{ id: 66272 }];
      jest.spyOn(placeholderService, 'query').mockReturnValue(of(new HttpResponse({ body: placeholderCollection })));
      const additionalPlaceholders = [...placeholders];
      const expectedCollection: IPlaceholder[] = [...additionalPlaceholders, ...placeholderCollection];
      jest.spyOn(placeholderService, 'addPlaceholderToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ deliveryNote });
      comp.ngOnInit();

      expect(placeholderService.query).toHaveBeenCalled();
      expect(placeholderService.addPlaceholderToCollectionIfMissing).toHaveBeenCalledWith(
        placeholderCollection,
        ...additionalPlaceholders.map(expect.objectContaining)
      );
      expect(comp.placeholdersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Dealer query and add missing value', () => {
      const deliveryNote: IDeliveryNote = { id: 456 };
      const receivedBy: IDealer = { id: 9901 };
      deliveryNote.receivedBy = receivedBy;
      const supplier: IDealer = { id: 67619 };
      deliveryNote.supplier = supplier;
      const signatories: IDealer[] = [{ id: 71897 }];
      deliveryNote.signatories = signatories;

      const dealerCollection: IDealer[] = [{ id: 72860 }];
      jest.spyOn(dealerService, 'query').mockReturnValue(of(new HttpResponse({ body: dealerCollection })));
      const additionalDealers = [receivedBy, supplier, ...signatories];
      const expectedCollection: IDealer[] = [...additionalDealers, ...dealerCollection];
      jest.spyOn(dealerService, 'addDealerToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ deliveryNote });
      comp.ngOnInit();

      expect(dealerService.query).toHaveBeenCalled();
      expect(dealerService.addDealerToCollectionIfMissing).toHaveBeenCalledWith(
        dealerCollection,
        ...additionalDealers.map(expect.objectContaining)
      );
      expect(comp.dealersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call BusinessStamp query and add missing value', () => {
      const deliveryNote: IDeliveryNote = { id: 456 };
      const deliveryStamps: IBusinessStamp[] = [{ id: 74765 }];
      deliveryNote.deliveryStamps = deliveryStamps;

      const businessStampCollection: IBusinessStamp[] = [{ id: 323 }];
      jest.spyOn(businessStampService, 'query').mockReturnValue(of(new HttpResponse({ body: businessStampCollection })));
      const additionalBusinessStamps = [...deliveryStamps];
      const expectedCollection: IBusinessStamp[] = [...additionalBusinessStamps, ...businessStampCollection];
      jest.spyOn(businessStampService, 'addBusinessStampToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ deliveryNote });
      comp.ngOnInit();

      expect(businessStampService.query).toHaveBeenCalled();
      expect(businessStampService.addBusinessStampToCollectionIfMissing).toHaveBeenCalledWith(
        businessStampCollection,
        ...additionalBusinessStamps.map(expect.objectContaining)
      );
      expect(comp.businessStampsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call PurchaseOrder query and add missing value', () => {
      const deliveryNote: IDeliveryNote = { id: 456 };
      const purchaseOrder: IPurchaseOrder = { id: 90254 };
      deliveryNote.purchaseOrder = purchaseOrder;
      const otherPurchaseOrders: IPurchaseOrder[] = [{ id: 5273 }];
      deliveryNote.otherPurchaseOrders = otherPurchaseOrders;

      const purchaseOrderCollection: IPurchaseOrder[] = [{ id: 36372 }];
      jest.spyOn(purchaseOrderService, 'query').mockReturnValue(of(new HttpResponse({ body: purchaseOrderCollection })));
      const additionalPurchaseOrders = [purchaseOrder, ...otherPurchaseOrders];
      const expectedCollection: IPurchaseOrder[] = [...additionalPurchaseOrders, ...purchaseOrderCollection];
      jest.spyOn(purchaseOrderService, 'addPurchaseOrderToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ deliveryNote });
      comp.ngOnInit();

      expect(purchaseOrderService.query).toHaveBeenCalled();
      expect(purchaseOrderService.addPurchaseOrderToCollectionIfMissing).toHaveBeenCalledWith(
        purchaseOrderCollection,
        ...additionalPurchaseOrders.map(expect.objectContaining)
      );
      expect(comp.purchaseOrdersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call BusinessDocument query and add missing value', () => {
      const deliveryNote: IDeliveryNote = { id: 456 };
      const businessDocuments: IBusinessDocument[] = [{ id: 86935 }];
      deliveryNote.businessDocuments = businessDocuments;

      const businessDocumentCollection: IBusinessDocument[] = [{ id: 7176 }];
      jest.spyOn(businessDocumentService, 'query').mockReturnValue(of(new HttpResponse({ body: businessDocumentCollection })));
      const additionalBusinessDocuments = [...businessDocuments];
      const expectedCollection: IBusinessDocument[] = [...additionalBusinessDocuments, ...businessDocumentCollection];
      jest.spyOn(businessDocumentService, 'addBusinessDocumentToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ deliveryNote });
      comp.ngOnInit();

      expect(businessDocumentService.query).toHaveBeenCalled();
      expect(businessDocumentService.addBusinessDocumentToCollectionIfMissing).toHaveBeenCalledWith(
        businessDocumentCollection,
        ...additionalBusinessDocuments.map(expect.objectContaining)
      );
      expect(comp.businessDocumentsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const deliveryNote: IDeliveryNote = { id: 456 };
      const placeholder: IPlaceholder = { id: 62945 };
      deliveryNote.placeholders = [placeholder];
      const receivedBy: IDealer = { id: 16865 };
      deliveryNote.receivedBy = receivedBy;
      const supplier: IDealer = { id: 80242 };
      deliveryNote.supplier = supplier;
      const signatories: IDealer = { id: 39827 };
      deliveryNote.signatories = [signatories];
      const deliveryStamps: IBusinessStamp = { id: 81629 };
      deliveryNote.deliveryStamps = [deliveryStamps];
      const purchaseOrder: IPurchaseOrder = { id: 84059 };
      deliveryNote.purchaseOrder = purchaseOrder;
      const otherPurchaseOrders: IPurchaseOrder = { id: 64784 };
      deliveryNote.otherPurchaseOrders = [otherPurchaseOrders];
      const businessDocument: IBusinessDocument = { id: 59570 };
      deliveryNote.businessDocuments = [businessDocument];

      activatedRoute.data = of({ deliveryNote });
      comp.ngOnInit();

      expect(comp.placeholdersSharedCollection).toContain(placeholder);
      expect(comp.dealersSharedCollection).toContain(receivedBy);
      expect(comp.dealersSharedCollection).toContain(supplier);
      expect(comp.dealersSharedCollection).toContain(signatories);
      expect(comp.businessStampsSharedCollection).toContain(deliveryStamps);
      expect(comp.purchaseOrdersSharedCollection).toContain(purchaseOrder);
      expect(comp.purchaseOrdersSharedCollection).toContain(otherPurchaseOrders);
      expect(comp.businessDocumentsSharedCollection).toContain(businessDocument);
      expect(comp.deliveryNote).toEqual(deliveryNote);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDeliveryNote>>();
      const deliveryNote = { id: 123 };
      jest.spyOn(deliveryNoteFormService, 'getDeliveryNote').mockReturnValue(deliveryNote);
      jest.spyOn(deliveryNoteService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ deliveryNote });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: deliveryNote }));
      saveSubject.complete();

      // THEN
      expect(deliveryNoteFormService.getDeliveryNote).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(deliveryNoteService.update).toHaveBeenCalledWith(expect.objectContaining(deliveryNote));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDeliveryNote>>();
      const deliveryNote = { id: 123 };
      jest.spyOn(deliveryNoteFormService, 'getDeliveryNote').mockReturnValue({ id: null });
      jest.spyOn(deliveryNoteService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ deliveryNote: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: deliveryNote }));
      saveSubject.complete();

      // THEN
      expect(deliveryNoteFormService.getDeliveryNote).toHaveBeenCalled();
      expect(deliveryNoteService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDeliveryNote>>();
      const deliveryNote = { id: 123 };
      jest.spyOn(deliveryNoteService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ deliveryNote });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(deliveryNoteService.update).toHaveBeenCalled();
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

    describe('comparePurchaseOrder', () => {
      it('Should forward to purchaseOrderService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(purchaseOrderService, 'comparePurchaseOrder');
        comp.comparePurchaseOrder(entity, entity2);
        expect(purchaseOrderService.comparePurchaseOrder).toHaveBeenCalledWith(entity, entity2);
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
