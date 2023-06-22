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

import { FixedAssetDepreciationFormService } from './fixed-asset-depreciation-form.service';
import { FixedAssetDepreciationService } from '../service/fixed-asset-depreciation.service';
import { IFixedAssetDepreciation } from '../fixed-asset-depreciation.model';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/system/placeholder/service/placeholder.service';

import { FixedAssetDepreciationUpdateComponent } from './fixed-asset-depreciation-update.component';

describe('FixedAssetDepreciation Management Update Component', () => {
  let comp: FixedAssetDepreciationUpdateComponent;
  let fixture: ComponentFixture<FixedAssetDepreciationUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let fixedAssetDepreciationFormService: FixedAssetDepreciationFormService;
  let fixedAssetDepreciationService: FixedAssetDepreciationService;
  let placeholderService: PlaceholderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [FixedAssetDepreciationUpdateComponent],
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
      .overrideTemplate(FixedAssetDepreciationUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(FixedAssetDepreciationUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fixedAssetDepreciationFormService = TestBed.inject(FixedAssetDepreciationFormService);
    fixedAssetDepreciationService = TestBed.inject(FixedAssetDepreciationService);
    placeholderService = TestBed.inject(PlaceholderService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Placeholder query and add missing value', () => {
      const fixedAssetDepreciation: IFixedAssetDepreciation = { id: 456 };
      const placeholders: IPlaceholder[] = [{ id: 53532 }];
      fixedAssetDepreciation.placeholders = placeholders;

      const placeholderCollection: IPlaceholder[] = [{ id: 70109 }];
      jest.spyOn(placeholderService, 'query').mockReturnValue(of(new HttpResponse({ body: placeholderCollection })));
      const additionalPlaceholders = [...placeholders];
      const expectedCollection: IPlaceholder[] = [...additionalPlaceholders, ...placeholderCollection];
      jest.spyOn(placeholderService, 'addPlaceholderToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ fixedAssetDepreciation });
      comp.ngOnInit();

      expect(placeholderService.query).toHaveBeenCalled();
      expect(placeholderService.addPlaceholderToCollectionIfMissing).toHaveBeenCalledWith(
        placeholderCollection,
        ...additionalPlaceholders.map(expect.objectContaining)
      );
      expect(comp.placeholdersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const fixedAssetDepreciation: IFixedAssetDepreciation = { id: 456 };
      const placeholder: IPlaceholder = { id: 4056 };
      fixedAssetDepreciation.placeholders = [placeholder];

      activatedRoute.data = of({ fixedAssetDepreciation });
      comp.ngOnInit();

      expect(comp.placeholdersSharedCollection).toContain(placeholder);
      expect(comp.fixedAssetDepreciation).toEqual(fixedAssetDepreciation);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFixedAssetDepreciation>>();
      const fixedAssetDepreciation = { id: 123 };
      jest.spyOn(fixedAssetDepreciationFormService, 'getFixedAssetDepreciation').mockReturnValue(fixedAssetDepreciation);
      jest.spyOn(fixedAssetDepreciationService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ fixedAssetDepreciation });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: fixedAssetDepreciation }));
      saveSubject.complete();

      // THEN
      expect(fixedAssetDepreciationFormService.getFixedAssetDepreciation).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(fixedAssetDepreciationService.update).toHaveBeenCalledWith(expect.objectContaining(fixedAssetDepreciation));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFixedAssetDepreciation>>();
      const fixedAssetDepreciation = { id: 123 };
      jest.spyOn(fixedAssetDepreciationFormService, 'getFixedAssetDepreciation').mockReturnValue({ id: null });
      jest.spyOn(fixedAssetDepreciationService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ fixedAssetDepreciation: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: fixedAssetDepreciation }));
      saveSubject.complete();

      // THEN
      expect(fixedAssetDepreciationFormService.getFixedAssetDepreciation).toHaveBeenCalled();
      expect(fixedAssetDepreciationService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFixedAssetDepreciation>>();
      const fixedAssetDepreciation = { id: 123 };
      jest.spyOn(fixedAssetDepreciationService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ fixedAssetDepreciation });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(fixedAssetDepreciationService.update).toHaveBeenCalled();
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
  });
});
