///
/// Erp System - Mark III No 3 (Caleb Series) Client 0.2.0-SNAPSHOT
/// Copyright © 2021 - 2022 Edwin Njeru (mailnjeru@gmail.com)
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

import { PlaceholderService } from '../../../erp-pages/placeholder/service/placeholder.service';

jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { AssetRegistrationService } from '../service/asset-registration.service';
import { IAssetRegistration, AssetRegistration } from '../asset-registration.model';

import { AssetRegistrationUpdateComponent } from './asset-registration-update.component';
import { IAssetCategory } from '../../asset-category/asset-category.model';
import { IJobSheet } from '../../../erp-settlements/job-sheet/job-sheet.model';
import { SettlementService } from '../../../erp-settlements/settlement/service/settlement.service';
import { IDeliveryNote } from '../../../erp-settlements/delivery-note/delivery-note.model';
import { PurchaseOrderService } from '../../../erp-settlements/purchase-order/service/purchase-order.service';
import { IServiceOutlet } from '../../../erp-granular/service-outlet/service-outlet.model';
import { JobSheetService } from '../../../erp-settlements/job-sheet/service/job-sheet.service';
import { IDealer } from '../../../erp-pages/dealers/dealer/dealer.model';
import { ServiceOutletService } from '../../../erp-granular/service-outlet/service/service-outlet.service';
import { IPlaceholder } from '../../../erp-pages/placeholder/placeholder.model';
import { DeliveryNoteService } from '../../../erp-settlements/delivery-note/service/delivery-note.service';
import { AssetCategoryService } from '../../asset-category/service/asset-category.service';
import { DealerService } from '../../../erp-pages/dealers/dealer/service/dealer.service';
import { PaymentInvoiceService } from '../../../erp-settlements/payment-invoice/service/payment-invoice.service';
import { IPaymentInvoice } from '../../../erp-settlements/payment-invoice/payment-invoice.model';
import { ISettlement } from '../../../erp-settlements/settlement/settlement.model';
import { IPurchaseOrder } from '../../../erp-settlements/purchase-order/purchase-order.model';
import { ErpCommonModule } from '../../../erp-common/erp-common.module';

describe('AssetRegistration Management Update Component', () => {
  let comp: AssetRegistrationUpdateComponent;
  let fixture: ComponentFixture<AssetRegistrationUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let assetRegistrationService: AssetRegistrationService;
  let placeholderService: PlaceholderService;
  let paymentInvoiceService: PaymentInvoiceService;
  let serviceOutletService: ServiceOutletService;
  let settlementService: SettlementService;
  let assetCategoryService: AssetCategoryService;
  let purchaseOrderService: PurchaseOrderService;
  let deliveryNoteService: DeliveryNoteService;
  let jobSheetService: JobSheetService;
  let dealerService: DealerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ErpCommonModule],
      declarations: [AssetRegistrationUpdateComponent],
      providers: [FormBuilder, ActivatedRoute],
    })
      .overrideTemplate(AssetRegistrationUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AssetRegistrationUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    assetRegistrationService = TestBed.inject(AssetRegistrationService);
    placeholderService = TestBed.inject(PlaceholderService);
    paymentInvoiceService = TestBed.inject(PaymentInvoiceService);
    serviceOutletService = TestBed.inject(ServiceOutletService);
    settlementService = TestBed.inject(SettlementService);
    assetCategoryService = TestBed.inject(AssetCategoryService);
    purchaseOrderService = TestBed.inject(PurchaseOrderService);
    deliveryNoteService = TestBed.inject(DeliveryNoteService);
    jobSheetService = TestBed.inject(JobSheetService);
    dealerService = TestBed.inject(DealerService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Placeholder query and add missing value', () => {
      const assetRegistration: IAssetRegistration = { id: 456 };
      const placeholders: IPlaceholder[] = [{ id: 25051 }];
      assetRegistration.placeholders = placeholders;

      const placeholderCollection: IPlaceholder[] = [{ id: 84381 }];
      jest.spyOn(placeholderService, 'query').mockReturnValue(of(new HttpResponse({ body: placeholderCollection })));
      const additionalPlaceholders = [...placeholders];
      const expectedCollection: IPlaceholder[] = [...additionalPlaceholders, ...placeholderCollection];
      jest.spyOn(placeholderService, 'addPlaceholderToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ assetRegistration });
      comp.ngOnInit();

      expect(placeholderService.query).toHaveBeenCalled();
      expect(placeholderService.addPlaceholderToCollectionIfMissing).toHaveBeenCalledWith(placeholderCollection, ...additionalPlaceholders);
      expect(comp.placeholdersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call PaymentInvoice query and add missing value', () => {
      const assetRegistration: IAssetRegistration = { id: 456 };
      const paymentInvoices: IPaymentInvoice[] = [{ id: 45457 }];
      assetRegistration.paymentInvoices = paymentInvoices;

      const paymentInvoiceCollection: IPaymentInvoice[] = [{ id: 30575 }];
      jest.spyOn(paymentInvoiceService, 'query').mockReturnValue(of(new HttpResponse({ body: paymentInvoiceCollection })));
      const additionalPaymentInvoices = [...paymentInvoices];
      const expectedCollection: IPaymentInvoice[] = [...additionalPaymentInvoices, ...paymentInvoiceCollection];
      jest.spyOn(paymentInvoiceService, 'addPaymentInvoiceToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ assetRegistration });
      comp.ngOnInit();

      expect(paymentInvoiceService.query).toHaveBeenCalled();
      expect(paymentInvoiceService.addPaymentInvoiceToCollectionIfMissing).toHaveBeenCalledWith(
        paymentInvoiceCollection,
        ...additionalPaymentInvoices
      );
      expect(comp.paymentInvoicesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call ServiceOutlet query and add missing value', () => {
      const assetRegistration: IAssetRegistration = { id: 456 };
      const serviceOutlets: IServiceOutlet[] = [{ id: 10495 }];
      assetRegistration.serviceOutlets = serviceOutlets;

      const serviceOutletCollection: IServiceOutlet[] = [{ id: 12055 }];
      jest.spyOn(serviceOutletService, 'query').mockReturnValue(of(new HttpResponse({ body: serviceOutletCollection })));
      const additionalServiceOutlets = [...serviceOutlets];
      const expectedCollection: IServiceOutlet[] = [...additionalServiceOutlets, ...serviceOutletCollection];
      jest.spyOn(serviceOutletService, 'addServiceOutletToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ assetRegistration });
      comp.ngOnInit();

      expect(serviceOutletService.query).toHaveBeenCalled();
      expect(serviceOutletService.addServiceOutletToCollectionIfMissing).toHaveBeenCalledWith(
        serviceOutletCollection,
        ...additionalServiceOutlets
      );
      expect(comp.serviceOutletsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Settlement query and add missing value', () => {
      const assetRegistration: IAssetRegistration = { id: 456 };
      const settlements: ISettlement[] = [{ id: 6062 }];
      assetRegistration.settlements = settlements;

      const settlementCollection: ISettlement[] = [{ id: 63020 }];
      jest.spyOn(settlementService, 'query').mockReturnValue(of(new HttpResponse({ body: settlementCollection })));
      const additionalSettlements = [...settlements];
      const expectedCollection: ISettlement[] = [...additionalSettlements, ...settlementCollection];
      jest.spyOn(settlementService, 'addSettlementToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ assetRegistration });
      comp.ngOnInit();

      expect(settlementService.query).toHaveBeenCalled();
      expect(settlementService.addSettlementToCollectionIfMissing).toHaveBeenCalledWith(settlementCollection, ...additionalSettlements);
      expect(comp.settlementsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call AssetCategory query and add missing value', () => {
      const assetRegistration: IAssetRegistration = { id: 456 };
      const assetCategory: IAssetCategory = { id: 21835 };
      assetRegistration.assetCategory = assetCategory;

      const assetCategoryCollection: IAssetCategory[] = [{ id: 71839 }];
      jest.spyOn(assetCategoryService, 'query').mockReturnValue(of(new HttpResponse({ body: assetCategoryCollection })));
      const additionalAssetCategories = [assetCategory];
      const expectedCollection: IAssetCategory[] = [...additionalAssetCategories, ...assetCategoryCollection];
      jest.spyOn(assetCategoryService, 'addAssetCategoryToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ assetRegistration });
      comp.ngOnInit();

      expect(assetCategoryService.query).toHaveBeenCalled();
      expect(assetCategoryService.addAssetCategoryToCollectionIfMissing).toHaveBeenCalledWith(
        assetCategoryCollection,
        ...additionalAssetCategories
      );
      expect(comp.assetCategoriesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call PurchaseOrder query and add missing value', () => {
      const assetRegistration: IAssetRegistration = { id: 456 };
      const purchaseOrders: IPurchaseOrder[] = [{ id: 49980 }];
      assetRegistration.purchaseOrders = purchaseOrders;

      const purchaseOrderCollection: IPurchaseOrder[] = [{ id: 73732 }];
      jest.spyOn(purchaseOrderService, 'query').mockReturnValue(of(new HttpResponse({ body: purchaseOrderCollection })));
      const additionalPurchaseOrders = [...purchaseOrders];
      const expectedCollection: IPurchaseOrder[] = [...additionalPurchaseOrders, ...purchaseOrderCollection];
      jest.spyOn(purchaseOrderService, 'addPurchaseOrderToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ assetRegistration });
      comp.ngOnInit();

      expect(purchaseOrderService.query).toHaveBeenCalled();
      expect(purchaseOrderService.addPurchaseOrderToCollectionIfMissing).toHaveBeenCalledWith(
        purchaseOrderCollection,
        ...additionalPurchaseOrders
      );
      expect(comp.purchaseOrdersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call DeliveryNote query and add missing value', () => {
      const assetRegistration: IAssetRegistration = { id: 456 };
      const deliveryNotes: IDeliveryNote[] = [{ id: 10951 }];
      assetRegistration.deliveryNotes = deliveryNotes;

      const deliveryNoteCollection: IDeliveryNote[] = [{ id: 66367 }];
      jest.spyOn(deliveryNoteService, 'query').mockReturnValue(of(new HttpResponse({ body: deliveryNoteCollection })));
      const additionalDeliveryNotes = [...deliveryNotes];
      const expectedCollection: IDeliveryNote[] = [...additionalDeliveryNotes, ...deliveryNoteCollection];
      jest.spyOn(deliveryNoteService, 'addDeliveryNoteToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ assetRegistration });
      comp.ngOnInit();

      expect(deliveryNoteService.query).toHaveBeenCalled();
      expect(deliveryNoteService.addDeliveryNoteToCollectionIfMissing).toHaveBeenCalledWith(
        deliveryNoteCollection,
        ...additionalDeliveryNotes
      );
      expect(comp.deliveryNotesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call JobSheet query and add missing value', () => {
      const assetRegistration: IAssetRegistration = { id: 456 };
      const jobSheets: IJobSheet[] = [{ id: 55109 }];
      assetRegistration.jobSheets = jobSheets;

      const jobSheetCollection: IJobSheet[] = [{ id: 87250 }];
      jest.spyOn(jobSheetService, 'query').mockReturnValue(of(new HttpResponse({ body: jobSheetCollection })));
      const additionalJobSheets = [...jobSheets];
      const expectedCollection: IJobSheet[] = [...additionalJobSheets, ...jobSheetCollection];
      jest.spyOn(jobSheetService, 'addJobSheetToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ assetRegistration });
      comp.ngOnInit();

      expect(jobSheetService.query).toHaveBeenCalled();
      expect(jobSheetService.addJobSheetToCollectionIfMissing).toHaveBeenCalledWith(jobSheetCollection, ...additionalJobSheets);
      expect(comp.jobSheetsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Dealer query and add missing value', () => {
      const assetRegistration: IAssetRegistration = { id: 456 };
      const dealer: IDealer = { id: 96972 };
      assetRegistration.dealer = dealer;
      const designatedUsers: IDealer[] = [{ id: 8695 }];
      assetRegistration.designatedUsers = designatedUsers;

      const dealerCollection: IDealer[] = [{ id: 6655 }];
      jest.spyOn(dealerService, 'query').mockReturnValue(of(new HttpResponse({ body: dealerCollection })));
      const additionalDealers = [dealer, ...designatedUsers];
      const expectedCollection: IDealer[] = [...additionalDealers, ...dealerCollection];
      jest.spyOn(dealerService, 'addDealerToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ assetRegistration });
      comp.ngOnInit();

      expect(dealerService.query).toHaveBeenCalled();
      expect(dealerService.addDealerToCollectionIfMissing).toHaveBeenCalledWith(dealerCollection, ...additionalDealers);
      expect(comp.dealersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const assetRegistration: IAssetRegistration = { id: 456 };
      const placeholders: IPlaceholder = { id: 78776 };
      assetRegistration.placeholders = [placeholders];
      const paymentInvoices: IPaymentInvoice = { id: 92454 };
      assetRegistration.paymentInvoices = [paymentInvoices];
      const serviceOutlets: IServiceOutlet = { id: 40506 };
      assetRegistration.serviceOutlets = [serviceOutlets];
      const settlements: ISettlement = { id: 26803 };
      assetRegistration.settlements = [settlements];
      const assetCategory: IAssetCategory = { id: 64108 };
      assetRegistration.assetCategory = assetCategory;
      const purchaseOrders: IPurchaseOrder = { id: 76982 };
      assetRegistration.purchaseOrders = [purchaseOrders];
      const deliveryNotes: IDeliveryNote = { id: 16266 };
      assetRegistration.deliveryNotes = [deliveryNotes];
      const jobSheets: IJobSheet = { id: 76060 };
      assetRegistration.jobSheets = [jobSheets];
      const dealer: IDealer = { id: 59931 };
      assetRegistration.dealer = dealer;
      const designatedUsers: IDealer = { id: 28507 };
      assetRegistration.designatedUsers = [designatedUsers];

      activatedRoute.data = of({ assetRegistration });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(assetRegistration));
      expect(comp.placeholdersSharedCollection).toContain(placeholders);
      expect(comp.paymentInvoicesSharedCollection).toContain(paymentInvoices);
      expect(comp.serviceOutletsSharedCollection).toContain(serviceOutlets);
      expect(comp.settlementsSharedCollection).toContain(settlements);
      expect(comp.assetCategoriesSharedCollection).toContain(assetCategory);
      expect(comp.purchaseOrdersSharedCollection).toContain(purchaseOrders);
      expect(comp.deliveryNotesSharedCollection).toContain(deliveryNotes);
      expect(comp.jobSheetsSharedCollection).toContain(jobSheets);
      expect(comp.dealersSharedCollection).toContain(dealer);
      expect(comp.dealersSharedCollection).toContain(designatedUsers);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<AssetRegistration>>();
      const assetRegistration = { id: 123 };
      jest.spyOn(assetRegistrationService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ assetRegistration });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: assetRegistration }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(assetRegistrationService.update).toHaveBeenCalledWith(assetRegistration);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<AssetRegistration>>();
      const assetRegistration = new AssetRegistration();
      jest.spyOn(assetRegistrationService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ assetRegistration });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: assetRegistration }));
      saveSubject.complete();

      // THEN
      expect(assetRegistrationService.create).toHaveBeenCalledWith(assetRegistration);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<AssetRegistration>>();
      const assetRegistration = { id: 123 };
      jest.spyOn(assetRegistrationService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ assetRegistration });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(assetRegistrationService.update).toHaveBeenCalledWith(assetRegistration);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackPlaceholderById', () => {
      it('Should return tracked Placeholder primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackPlaceholderById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackPaymentInvoiceById', () => {
      it('Should return tracked PaymentInvoice primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackPaymentInvoiceById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackServiceOutletById', () => {
      it('Should return tracked ServiceOutlet primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackServiceOutletById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackSettlementById', () => {
      it('Should return tracked Settlement primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackSettlementById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackAssetCategoryById', () => {
      it('Should return tracked AssetCategory primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackAssetCategoryById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackPurchaseOrderById', () => {
      it('Should return tracked PurchaseOrder primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackPurchaseOrderById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackDeliveryNoteById', () => {
      it('Should return tracked DeliveryNote primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackDeliveryNoteById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackJobSheetById', () => {
      it('Should return tracked JobSheet primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackJobSheetById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackDealerById', () => {
      it('Should return tracked Dealer primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackDealerById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });

  describe('Getting selected relationships', () => {
    describe('getSelectedPlaceholder', () => {
      it('Should return option if no Placeholder is selected', () => {
        const option = { id: 123 };
        const result = comp.getSelectedPlaceholder(option);
        expect(result === option).toEqual(true);
      });

      it('Should return selected Placeholder for according option', () => {
        const option = { id: 123 };
        const selected = { id: 123 };
        const selected2 = { id: 456 };
        const result = comp.getSelectedPlaceholder(option, [selected2, selected]);
        expect(result === selected).toEqual(true);
        expect(result === selected2).toEqual(false);
        expect(result === option).toEqual(false);
      });

      it('Should return option if this Placeholder is not selected', () => {
        const option = { id: 123 };
        const selected = { id: 456 };
        const result = comp.getSelectedPlaceholder(option, [selected]);
        expect(result === option).toEqual(true);
        expect(result === selected).toEqual(false);
      });
    });

    describe('getSelectedPaymentInvoice', () => {
      it('Should return option if no PaymentInvoice is selected', () => {
        const option = { id: 123 };
        const result = comp.getSelectedPaymentInvoice(option);
        expect(result === option).toEqual(true);
      });

      it('Should return selected PaymentInvoice for according option', () => {
        const option = { id: 123 };
        const selected = { id: 123 };
        const selected2 = { id: 456 };
        const result = comp.getSelectedPaymentInvoice(option, [selected2, selected]);
        expect(result === selected).toEqual(true);
        expect(result === selected2).toEqual(false);
        expect(result === option).toEqual(false);
      });

      it('Should return option if this PaymentInvoice is not selected', () => {
        const option = { id: 123 };
        const selected = { id: 456 };
        const result = comp.getSelectedPaymentInvoice(option, [selected]);
        expect(result === option).toEqual(true);
        expect(result === selected).toEqual(false);
      });
    });

    describe('getSelectedServiceOutlet', () => {
      it('Should return option if no ServiceOutlet is selected', () => {
        const option = { id: 123 };
        const result = comp.getSelectedServiceOutlet(option);
        expect(result === option).toEqual(true);
      });

      it('Should return selected ServiceOutlet for according option', () => {
        const option = { id: 123 };
        const selected = { id: 123 };
        const selected2 = { id: 456 };
        const result = comp.getSelectedServiceOutlet(option, [selected2, selected]);
        expect(result === selected).toEqual(true);
        expect(result === selected2).toEqual(false);
        expect(result === option).toEqual(false);
      });

      it('Should return option if this ServiceOutlet is not selected', () => {
        const option = { id: 123 };
        const selected = { id: 456 };
        const result = comp.getSelectedServiceOutlet(option, [selected]);
        expect(result === option).toEqual(true);
        expect(result === selected).toEqual(false);
      });
    });

    describe('getSelectedSettlement', () => {
      it('Should return option if no Settlement is selected', () => {
        const option = { id: 123 };
        const result = comp.getSelectedSettlement(option);
        expect(result === option).toEqual(true);
      });

      it('Should return selected Settlement for according option', () => {
        const option = { id: 123 };
        const selected = { id: 123 };
        const selected2 = { id: 456 };
        const result = comp.getSelectedSettlement(option, [selected2, selected]);
        expect(result === selected).toEqual(true);
        expect(result === selected2).toEqual(false);
        expect(result === option).toEqual(false);
      });

      it('Should return option if this Settlement is not selected', () => {
        const option = { id: 123 };
        const selected = { id: 456 };
        const result = comp.getSelectedSettlement(option, [selected]);
        expect(result === option).toEqual(true);
        expect(result === selected).toEqual(false);
      });
    });

    describe('getSelectedPurchaseOrder', () => {
      it('Should return option if no PurchaseOrder is selected', () => {
        const option = { id: 123 };
        const result = comp.getSelectedPurchaseOrder(option);
        expect(result === option).toEqual(true);
      });

      it('Should return selected PurchaseOrder for according option', () => {
        const option = { id: 123 };
        const selected = { id: 123 };
        const selected2 = { id: 456 };
        const result = comp.getSelectedPurchaseOrder(option, [selected2, selected]);
        expect(result === selected).toEqual(true);
        expect(result === selected2).toEqual(false);
        expect(result === option).toEqual(false);
      });

      it('Should return option if this PurchaseOrder is not selected', () => {
        const option = { id: 123 };
        const selected = { id: 456 };
        const result = comp.getSelectedPurchaseOrder(option, [selected]);
        expect(result === option).toEqual(true);
        expect(result === selected).toEqual(false);
      });
    });

    describe('getSelectedDeliveryNote', () => {
      it('Should return option if no DeliveryNote is selected', () => {
        const option = { id: 123 };
        const result = comp.getSelectedDeliveryNote(option);
        expect(result === option).toEqual(true);
      });

      it('Should return selected DeliveryNote for according option', () => {
        const option = { id: 123 };
        const selected = { id: 123 };
        const selected2 = { id: 456 };
        const result = comp.getSelectedDeliveryNote(option, [selected2, selected]);
        expect(result === selected).toEqual(true);
        expect(result === selected2).toEqual(false);
        expect(result === option).toEqual(false);
      });

      it('Should return option if this DeliveryNote is not selected', () => {
        const option = { id: 123 };
        const selected = { id: 456 };
        const result = comp.getSelectedDeliveryNote(option, [selected]);
        expect(result === option).toEqual(true);
        expect(result === selected).toEqual(false);
      });
    });

    describe('getSelectedJobSheet', () => {
      it('Should return option if no JobSheet is selected', () => {
        const option = { id: 123 };
        const result = comp.getSelectedJobSheet(option);
        expect(result === option).toEqual(true);
      });

      it('Should return selected JobSheet for according option', () => {
        const option = { id: 123 };
        const selected = { id: 123 };
        const selected2 = { id: 456 };
        const result = comp.getSelectedJobSheet(option, [selected2, selected]);
        expect(result === selected).toEqual(true);
        expect(result === selected2).toEqual(false);
        expect(result === option).toEqual(false);
      });

      it('Should return option if this JobSheet is not selected', () => {
        const option = { id: 123 };
        const selected = { id: 456 };
        const result = comp.getSelectedJobSheet(option, [selected]);
        expect(result === option).toEqual(true);
        expect(result === selected).toEqual(false);
      });
    });

    describe('getSelectedDealer', () => {
      it('Should return option if no Dealer is selected', () => {
        const option = { id: 123 };
        const result = comp.getSelectedDealer(option);
        expect(result === option).toEqual(true);
      });

      it('Should return selected Dealer for according option', () => {
        const option = { id: 123 };
        const selected = { id: 123 };
        const selected2 = { id: 456 };
        const result = comp.getSelectedDealer(option, [selected2, selected]);
        expect(result === selected).toEqual(true);
        expect(result === selected2).toEqual(false);
        expect(result === option).toEqual(false);
      });

      it('Should return option if this Dealer is not selected', () => {
        const option = { id: 123 };
        const selected = { id: 456 };
        const result = comp.getSelectedDealer(option, [selected]);
        expect(result === option).toEqual(true);
        expect(result === selected).toEqual(false);
      });
    });
  });
});
