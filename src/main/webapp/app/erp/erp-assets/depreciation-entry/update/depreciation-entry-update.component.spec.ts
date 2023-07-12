///
/// Erp System - Mark V No 1 (Ehud Series) Client 1.5.1
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

jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { DepreciationEntryService } from '../service/depreciation-entry.service';
import { IDepreciationEntry, DepreciationEntry } from '../depreciation-entry.model';
import { IServiceOutlet } from 'app/entities/data/service-outlet/service-outlet.model';
import { ServiceOutletService } from 'app/entities/data/service-outlet/service/service-outlet.service';
import { IAssetCategory } from 'app/entities/assets/asset-category/asset-category.model';
import { AssetCategoryService } from 'app/entities/assets/asset-category/service/asset-category.service';
import { IDepreciationMethod } from 'app/entities/assets/depreciation-method/depreciation-method.model';
import { DepreciationMethodService } from 'app/entities/assets/depreciation-method/service/depreciation-method.service';
import { IAssetRegistration } from 'app/entities/assets/asset-registration/asset-registration.model';
import { AssetRegistrationService } from 'app/entities/assets/asset-registration/service/asset-registration.service';
import { IDepreciationPeriod } from 'app/entities/assets/depreciation-period/depreciation-period.model';
import { DepreciationPeriodService } from 'app/entities/assets/depreciation-period/service/depreciation-period.service';

import { DepreciationEntryUpdateComponent } from './depreciation-entry-update.component';

describe('DepreciationEntry Management Update Component', () => {
  let comp: DepreciationEntryUpdateComponent;
  let fixture: ComponentFixture<DepreciationEntryUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let depreciationEntryService: DepreciationEntryService;
  let serviceOutletService: ServiceOutletService;
  let assetCategoryService: AssetCategoryService;
  let depreciationMethodService: DepreciationMethodService;
  let assetRegistrationService: AssetRegistrationService;
  let depreciationPeriodService: DepreciationPeriodService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [DepreciationEntryUpdateComponent],
      providers: [FormBuilder, ActivatedRoute],
    })
      .overrideTemplate(DepreciationEntryUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DepreciationEntryUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    depreciationEntryService = TestBed.inject(DepreciationEntryService);
    serviceOutletService = TestBed.inject(ServiceOutletService);
    assetCategoryService = TestBed.inject(AssetCategoryService);
    depreciationMethodService = TestBed.inject(DepreciationMethodService);
    assetRegistrationService = TestBed.inject(AssetRegistrationService);
    depreciationPeriodService = TestBed.inject(DepreciationPeriodService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call ServiceOutlet query and add missing value', () => {
      const depreciationEntry: IDepreciationEntry = { id: 456 };
      const serviceOutlet: IServiceOutlet = { id: 21191 };
      depreciationEntry.serviceOutlet = serviceOutlet;

      const serviceOutletCollection: IServiceOutlet[] = [{ id: 55202 }];
      jest.spyOn(serviceOutletService, 'query').mockReturnValue(of(new HttpResponse({ body: serviceOutletCollection })));
      const additionalServiceOutlets = [serviceOutlet];
      const expectedCollection: IServiceOutlet[] = [...additionalServiceOutlets, ...serviceOutletCollection];
      jest.spyOn(serviceOutletService, 'addServiceOutletToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ depreciationEntry });
      comp.ngOnInit();

      expect(serviceOutletService.query).toHaveBeenCalled();
      expect(serviceOutletService.addServiceOutletToCollectionIfMissing).toHaveBeenCalledWith(
        serviceOutletCollection,
        ...additionalServiceOutlets
      );
      expect(comp.serviceOutletsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call AssetCategory query and add missing value', () => {
      const depreciationEntry: IDepreciationEntry = { id: 456 };
      const assetCategory: IAssetCategory = { id: 51749 };
      depreciationEntry.assetCategory = assetCategory;

      const assetCategoryCollection: IAssetCategory[] = [{ id: 33276 }];
      jest.spyOn(assetCategoryService, 'query').mockReturnValue(of(new HttpResponse({ body: assetCategoryCollection })));
      const additionalAssetCategories = [assetCategory];
      const expectedCollection: IAssetCategory[] = [...additionalAssetCategories, ...assetCategoryCollection];
      jest.spyOn(assetCategoryService, 'addAssetCategoryToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ depreciationEntry });
      comp.ngOnInit();

      expect(assetCategoryService.query).toHaveBeenCalled();
      expect(assetCategoryService.addAssetCategoryToCollectionIfMissing).toHaveBeenCalledWith(
        assetCategoryCollection,
        ...additionalAssetCategories
      );
      expect(comp.assetCategoriesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call DepreciationMethod query and add missing value', () => {
      const depreciationEntry: IDepreciationEntry = { id: 456 };
      const depreciationMethod: IDepreciationMethod = { id: 44142 };
      depreciationEntry.depreciationMethod = depreciationMethod;

      const depreciationMethodCollection: IDepreciationMethod[] = [{ id: 36499 }];
      jest.spyOn(depreciationMethodService, 'query').mockReturnValue(of(new HttpResponse({ body: depreciationMethodCollection })));
      const additionalDepreciationMethods = [depreciationMethod];
      const expectedCollection: IDepreciationMethod[] = [...additionalDepreciationMethods, ...depreciationMethodCollection];
      jest.spyOn(depreciationMethodService, 'addDepreciationMethodToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ depreciationEntry });
      comp.ngOnInit();

      expect(depreciationMethodService.query).toHaveBeenCalled();
      expect(depreciationMethodService.addDepreciationMethodToCollectionIfMissing).toHaveBeenCalledWith(
        depreciationMethodCollection,
        ...additionalDepreciationMethods
      );
      expect(comp.depreciationMethodsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call AssetRegistration query and add missing value', () => {
      const depreciationEntry: IDepreciationEntry = { id: 456 };
      const assetRegistration: IAssetRegistration = { id: 63740 };
      depreciationEntry.assetRegistration = assetRegistration;

      const assetRegistrationCollection: IAssetRegistration[] = [{ id: 76323 }];
      jest.spyOn(assetRegistrationService, 'query').mockReturnValue(of(new HttpResponse({ body: assetRegistrationCollection })));
      const additionalAssetRegistrations = [assetRegistration];
      const expectedCollection: IAssetRegistration[] = [...additionalAssetRegistrations, ...assetRegistrationCollection];
      jest.spyOn(assetRegistrationService, 'addAssetRegistrationToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ depreciationEntry });
      comp.ngOnInit();

      expect(assetRegistrationService.query).toHaveBeenCalled();
      expect(assetRegistrationService.addAssetRegistrationToCollectionIfMissing).toHaveBeenCalledWith(
        assetRegistrationCollection,
        ...additionalAssetRegistrations
      );
      expect(comp.assetRegistrationsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call DepreciationPeriod query and add missing value', () => {
      const depreciationEntry: IDepreciationEntry = { id: 456 };
      const depreciationPeriod: IDepreciationPeriod = { id: 90040 };
      depreciationEntry.depreciationPeriod = depreciationPeriod;

      const depreciationPeriodCollection: IDepreciationPeriod[] = [{ id: 44998 }];
      jest.spyOn(depreciationPeriodService, 'query').mockReturnValue(of(new HttpResponse({ body: depreciationPeriodCollection })));
      const additionalDepreciationPeriods = [depreciationPeriod];
      const expectedCollection: IDepreciationPeriod[] = [...additionalDepreciationPeriods, ...depreciationPeriodCollection];
      jest.spyOn(depreciationPeriodService, 'addDepreciationPeriodToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ depreciationEntry });
      comp.ngOnInit();

      expect(depreciationPeriodService.query).toHaveBeenCalled();
      expect(depreciationPeriodService.addDepreciationPeriodToCollectionIfMissing).toHaveBeenCalledWith(
        depreciationPeriodCollection,
        ...additionalDepreciationPeriods
      );
      expect(comp.depreciationPeriodsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const depreciationEntry: IDepreciationEntry = { id: 456 };
      const serviceOutlet: IServiceOutlet = { id: 27372 };
      depreciationEntry.serviceOutlet = serviceOutlet;
      const assetCategory: IAssetCategory = { id: 71584 };
      depreciationEntry.assetCategory = assetCategory;
      const depreciationMethod: IDepreciationMethod = { id: 97895 };
      depreciationEntry.depreciationMethod = depreciationMethod;
      const assetRegistration: IAssetRegistration = { id: 77189 };
      depreciationEntry.assetRegistration = assetRegistration;
      const depreciationPeriod: IDepreciationPeriod = { id: 21186 };
      depreciationEntry.depreciationPeriod = depreciationPeriod;

      activatedRoute.data = of({ depreciationEntry });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(depreciationEntry));
      expect(comp.serviceOutletsSharedCollection).toContain(serviceOutlet);
      expect(comp.assetCategoriesSharedCollection).toContain(assetCategory);
      expect(comp.depreciationMethodsSharedCollection).toContain(depreciationMethod);
      expect(comp.assetRegistrationsSharedCollection).toContain(assetRegistration);
      expect(comp.depreciationPeriodsSharedCollection).toContain(depreciationPeriod);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<DepreciationEntry>>();
      const depreciationEntry = { id: 123 };
      jest.spyOn(depreciationEntryService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ depreciationEntry });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: depreciationEntry }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(depreciationEntryService.update).toHaveBeenCalledWith(depreciationEntry);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<DepreciationEntry>>();
      const depreciationEntry = new DepreciationEntry();
      jest.spyOn(depreciationEntryService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ depreciationEntry });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: depreciationEntry }));
      saveSubject.complete();

      // THEN
      expect(depreciationEntryService.create).toHaveBeenCalledWith(depreciationEntry);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<DepreciationEntry>>();
      const depreciationEntry = { id: 123 };
      jest.spyOn(depreciationEntryService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ depreciationEntry });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(depreciationEntryService.update).toHaveBeenCalledWith(depreciationEntry);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackServiceOutletById', () => {
      it('Should return tracked ServiceOutlet primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackServiceOutletById(0, entity);
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

    describe('trackDepreciationMethodById', () => {
      it('Should return tracked DepreciationMethod primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackDepreciationMethodById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackAssetRegistrationById', () => {
      it('Should return tracked AssetRegistration primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackAssetRegistrationById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackDepreciationPeriodById', () => {
      it('Should return tracked DepreciationPeriod primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackDepreciationPeriodById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
