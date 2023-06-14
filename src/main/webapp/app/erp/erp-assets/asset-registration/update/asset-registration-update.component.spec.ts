///
/// Erp System - Mark III No 16 (Caleb Series) Client 1.3.8
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
import { ISettlementCurrency } from '../../../erp-settlements/settlement-currency/settlement-currency.model';
import { AssetAccessoryService } from '../../asset-accessory/service/asset-accessory.service';
import { SettlementCurrencyService } from '../../../erp-settlements/settlement-currency/service/settlement-currency.service';
import { BusinessDocumentService } from '../../../erp-pages/business-document/service/business-document.service';
import { AssetWarrantyService } from '../../asset-warranty/service/asset-warranty.service';
import { IBusinessDocument } from '../../../erp-pages/business-document/business-document.model';
import { UniversallyUniqueMappingService } from '../../../erp-pages/universally-unique-mapping/service/universally-unique-mapping.service';
import { IAssetAccessory } from '../../asset-accessory/asset-accessory.model';
import { IAssetWarranty } from '../../asset-warranty/asset-warranty.model';
import { IUniversallyUniqueMapping } from '../../../erp-pages/universally-unique-mapping/universally-unique-mapping.model';

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
  let settlementCurrencyService: SettlementCurrencyService;
  let businessDocumentService: BusinessDocumentService;
  let assetWarrantyService: AssetWarrantyService;
  let universallyUniqueMappingService: UniversallyUniqueMappingService;
  let assetAccessoryService: AssetAccessoryService;

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
    settlementCurrencyService = TestBed.inject(SettlementCurrencyService);
    businessDocumentService = TestBed.inject(BusinessDocumentService);
    assetWarrantyService = TestBed.inject(AssetWarrantyService);
    universallyUniqueMappingService = TestBed.inject(UniversallyUniqueMappingService);
    assetAccessoryService = TestBed.inject(AssetAccessoryService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {

    it('Should update editForm', () => {
      const assetRegistration: IAssetRegistration = { id: 456 };
      const placeholders: IPlaceholder = { id: 78776 };
      assetRegistration.placeholders = [placeholders];
      const paymentInvoices: IPaymentInvoice = { id: 92454 };
      assetRegistration.paymentInvoices = [paymentInvoices];
      const serviceOutlet: IServiceOutlet = { id: 40506 };
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
      const settlementCurrency: ISettlementCurrency = { id: 34313 };
      assetRegistration.settlementCurrency = settlementCurrency;
      const businessDocuments: IBusinessDocument = { id: 72895 };
      assetRegistration.businessDocuments = [businessDocuments];
      const assetWarranties: IAssetWarranty = { id: 40730 };
      assetRegistration.assetWarranties = [assetWarranties];
      const universallyUniqueMappings: IUniversallyUniqueMapping = { id: 7146 };
      assetRegistration.universallyUniqueMappings = [universallyUniqueMappings];
      const assetAccessories: IAssetAccessory = { id: 45463 };
      assetRegistration.assetAccessories = [assetAccessories];

      activatedRoute.data = of({ assetRegistration });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(assetRegistration));
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
});
