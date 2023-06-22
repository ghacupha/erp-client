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

import { AssetWarrantyFormService } from './asset-warranty-form.service';
import { AssetWarrantyService } from '../service/asset-warranty.service';
import { IAssetWarranty } from '../asset-warranty.model';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/system/placeholder/service/placeholder.service';
import { IUniversallyUniqueMapping } from 'app/entities/system/universally-unique-mapping/universally-unique-mapping.model';
import { UniversallyUniqueMappingService } from 'app/entities/system/universally-unique-mapping/service/universally-unique-mapping.service';
import { IDealer } from 'app/entities/people/dealer/dealer.model';
import { DealerService } from 'app/entities/people/dealer/service/dealer.service';
import { IBusinessDocument } from 'app/entities/documentation/business-document/business-document.model';
import { BusinessDocumentService } from 'app/entities/documentation/business-document/service/business-document.service';

import { AssetWarrantyUpdateComponent } from './asset-warranty-update.component';

describe('AssetWarranty Management Update Component', () => {
  let comp: AssetWarrantyUpdateComponent;
  let fixture: ComponentFixture<AssetWarrantyUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let assetWarrantyFormService: AssetWarrantyFormService;
  let assetWarrantyService: AssetWarrantyService;
  let placeholderService: PlaceholderService;
  let universallyUniqueMappingService: UniversallyUniqueMappingService;
  let dealerService: DealerService;
  let businessDocumentService: BusinessDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [AssetWarrantyUpdateComponent],
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
      .overrideTemplate(AssetWarrantyUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AssetWarrantyUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    assetWarrantyFormService = TestBed.inject(AssetWarrantyFormService);
    assetWarrantyService = TestBed.inject(AssetWarrantyService);
    placeholderService = TestBed.inject(PlaceholderService);
    universallyUniqueMappingService = TestBed.inject(UniversallyUniqueMappingService);
    dealerService = TestBed.inject(DealerService);
    businessDocumentService = TestBed.inject(BusinessDocumentService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Placeholder query and add missing value', () => {
      const assetWarranty: IAssetWarranty = { id: 456 };
      const placeholders: IPlaceholder[] = [{ id: 15356 }];
      assetWarranty.placeholders = placeholders;

      const placeholderCollection: IPlaceholder[] = [{ id: 12842 }];
      jest.spyOn(placeholderService, 'query').mockReturnValue(of(new HttpResponse({ body: placeholderCollection })));
      const additionalPlaceholders = [...placeholders];
      const expectedCollection: IPlaceholder[] = [...additionalPlaceholders, ...placeholderCollection];
      jest.spyOn(placeholderService, 'addPlaceholderToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ assetWarranty });
      comp.ngOnInit();

      expect(placeholderService.query).toHaveBeenCalled();
      expect(placeholderService.addPlaceholderToCollectionIfMissing).toHaveBeenCalledWith(
        placeholderCollection,
        ...additionalPlaceholders.map(expect.objectContaining)
      );
      expect(comp.placeholdersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call UniversallyUniqueMapping query and add missing value', () => {
      const assetWarranty: IAssetWarranty = { id: 456 };
      const universallyUniqueMappings: IUniversallyUniqueMapping[] = [{ id: 76602 }];
      assetWarranty.universallyUniqueMappings = universallyUniqueMappings;

      const universallyUniqueMappingCollection: IUniversallyUniqueMapping[] = [{ id: 8333 }];
      jest
        .spyOn(universallyUniqueMappingService, 'query')
        .mockReturnValue(of(new HttpResponse({ body: universallyUniqueMappingCollection })));
      const additionalUniversallyUniqueMappings = [...universallyUniqueMappings];
      const expectedCollection: IUniversallyUniqueMapping[] = [
        ...additionalUniversallyUniqueMappings,
        ...universallyUniqueMappingCollection,
      ];
      jest.spyOn(universallyUniqueMappingService, 'addUniversallyUniqueMappingToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ assetWarranty });
      comp.ngOnInit();

      expect(universallyUniqueMappingService.query).toHaveBeenCalled();
      expect(universallyUniqueMappingService.addUniversallyUniqueMappingToCollectionIfMissing).toHaveBeenCalledWith(
        universallyUniqueMappingCollection,
        ...additionalUniversallyUniqueMappings.map(expect.objectContaining)
      );
      expect(comp.universallyUniqueMappingsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Dealer query and add missing value', () => {
      const assetWarranty: IAssetWarranty = { id: 456 };
      const dealer: IDealer = { id: 51186 };
      assetWarranty.dealer = dealer;

      const dealerCollection: IDealer[] = [{ id: 48295 }];
      jest.spyOn(dealerService, 'query').mockReturnValue(of(new HttpResponse({ body: dealerCollection })));
      const additionalDealers = [dealer];
      const expectedCollection: IDealer[] = [...additionalDealers, ...dealerCollection];
      jest.spyOn(dealerService, 'addDealerToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ assetWarranty });
      comp.ngOnInit();

      expect(dealerService.query).toHaveBeenCalled();
      expect(dealerService.addDealerToCollectionIfMissing).toHaveBeenCalledWith(
        dealerCollection,
        ...additionalDealers.map(expect.objectContaining)
      );
      expect(comp.dealersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call BusinessDocument query and add missing value', () => {
      const assetWarranty: IAssetWarranty = { id: 456 };
      const warrantyAttachments: IBusinessDocument[] = [{ id: 68235 }];
      assetWarranty.warrantyAttachments = warrantyAttachments;

      const businessDocumentCollection: IBusinessDocument[] = [{ id: 5079 }];
      jest.spyOn(businessDocumentService, 'query').mockReturnValue(of(new HttpResponse({ body: businessDocumentCollection })));
      const additionalBusinessDocuments = [...warrantyAttachments];
      const expectedCollection: IBusinessDocument[] = [...additionalBusinessDocuments, ...businessDocumentCollection];
      jest.spyOn(businessDocumentService, 'addBusinessDocumentToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ assetWarranty });
      comp.ngOnInit();

      expect(businessDocumentService.query).toHaveBeenCalled();
      expect(businessDocumentService.addBusinessDocumentToCollectionIfMissing).toHaveBeenCalledWith(
        businessDocumentCollection,
        ...additionalBusinessDocuments.map(expect.objectContaining)
      );
      expect(comp.businessDocumentsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const assetWarranty: IAssetWarranty = { id: 456 };
      const placeholder: IPlaceholder = { id: 25675 };
      assetWarranty.placeholders = [placeholder];
      const universallyUniqueMapping: IUniversallyUniqueMapping = { id: 25792 };
      assetWarranty.universallyUniqueMappings = [universallyUniqueMapping];
      const dealer: IDealer = { id: 4636 };
      assetWarranty.dealer = dealer;
      const warrantyAttachment: IBusinessDocument = { id: 59075 };
      assetWarranty.warrantyAttachments = [warrantyAttachment];

      activatedRoute.data = of({ assetWarranty });
      comp.ngOnInit();

      expect(comp.placeholdersSharedCollection).toContain(placeholder);
      expect(comp.universallyUniqueMappingsSharedCollection).toContain(universallyUniqueMapping);
      expect(comp.dealersSharedCollection).toContain(dealer);
      expect(comp.businessDocumentsSharedCollection).toContain(warrantyAttachment);
      expect(comp.assetWarranty).toEqual(assetWarranty);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAssetWarranty>>();
      const assetWarranty = { id: 123 };
      jest.spyOn(assetWarrantyFormService, 'getAssetWarranty').mockReturnValue(assetWarranty);
      jest.spyOn(assetWarrantyService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ assetWarranty });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: assetWarranty }));
      saveSubject.complete();

      // THEN
      expect(assetWarrantyFormService.getAssetWarranty).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(assetWarrantyService.update).toHaveBeenCalledWith(expect.objectContaining(assetWarranty));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAssetWarranty>>();
      const assetWarranty = { id: 123 };
      jest.spyOn(assetWarrantyFormService, 'getAssetWarranty').mockReturnValue({ id: null });
      jest.spyOn(assetWarrantyService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ assetWarranty: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: assetWarranty }));
      saveSubject.complete();

      // THEN
      expect(assetWarrantyFormService.getAssetWarranty).toHaveBeenCalled();
      expect(assetWarrantyService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAssetWarranty>>();
      const assetWarranty = { id: 123 };
      jest.spyOn(assetWarrantyService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ assetWarranty });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(assetWarrantyService.update).toHaveBeenCalled();
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

    describe('compareUniversallyUniqueMapping', () => {
      it('Should forward to universallyUniqueMappingService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(universallyUniqueMappingService, 'compareUniversallyUniqueMapping');
        comp.compareUniversallyUniqueMapping(entity, entity2);
        expect(universallyUniqueMappingService.compareUniversallyUniqueMapping).toHaveBeenCalledWith(entity, entity2);
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
