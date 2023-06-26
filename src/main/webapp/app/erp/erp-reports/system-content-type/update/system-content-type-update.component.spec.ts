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

import { SystemContentTypeFormService } from './system-content-type-form.service';
import { SystemContentTypeService } from '../service/system-content-type.service';
import { ISystemContentType } from '../system-content-type.model';

import { SystemContentTypeUpdateComponent } from './system-content-type-update.component';
import { PlaceholderService } from '../../../erp-pages/placeholder/service/placeholder.service';
import { IPlaceholder } from '../../../erp-pages/placeholder/placeholder.model';
import { UniversallyUniqueMappingService } from '../../../erp-pages/universally-unique-mapping/service/universally-unique-mapping.service';
import { IUniversallyUniqueMapping } from '../../../erp-pages/universally-unique-mapping/universally-unique-mapping.model';

describe('SystemContentType Management Update Component', () => {
  let comp: SystemContentTypeUpdateComponent;
  let fixture: ComponentFixture<SystemContentTypeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let systemContentTypeFormService: SystemContentTypeFormService;
  let systemContentTypeService: SystemContentTypeService;
  let placeholderService: PlaceholderService;
  let universallyUniqueMappingService: UniversallyUniqueMappingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [SystemContentTypeUpdateComponent],
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
      .overrideTemplate(SystemContentTypeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SystemContentTypeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    systemContentTypeFormService = TestBed.inject(SystemContentTypeFormService);
    systemContentTypeService = TestBed.inject(SystemContentTypeService);
    placeholderService = TestBed.inject(PlaceholderService);
    universallyUniqueMappingService = TestBed.inject(UniversallyUniqueMappingService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Placeholder query and add missing value', () => {
      const systemContentType: ISystemContentType = { id: 456 };
      const placeholders: IPlaceholder[] = [{ id: 23209 }];
      systemContentType.placeholders = placeholders;

      const placeholderCollection: IPlaceholder[] = [{ id: 67289 }];
      jest.spyOn(placeholderService, 'query').mockReturnValue(of(new HttpResponse({ body: placeholderCollection })));
      const additionalPlaceholders = [...placeholders];
      const expectedCollection: IPlaceholder[] = [...additionalPlaceholders, ...placeholderCollection];
      jest.spyOn(placeholderService, 'addPlaceholderToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ systemContentType });
      comp.ngOnInit();

      expect(placeholderService.query).toHaveBeenCalled();
      expect(placeholderService.addPlaceholderToCollectionIfMissing).toHaveBeenCalledWith(
        placeholderCollection,
        ...additionalPlaceholders.map(expect.objectContaining)
      );
      expect(comp.placeholdersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call UniversallyUniqueMapping query and add missing value', () => {
      const systemContentType: ISystemContentType = { id: 456 };
      const sysMaps: IUniversallyUniqueMapping[] = [{ id: 30246 }];
      systemContentType.sysMaps = sysMaps;

      const universallyUniqueMappingCollection: IUniversallyUniqueMapping[] = [{ id: 28234 }];
      jest
        .spyOn(universallyUniqueMappingService, 'query')
        .mockReturnValue(of(new HttpResponse({ body: universallyUniqueMappingCollection })));
      const additionalUniversallyUniqueMappings = [...sysMaps];
      const expectedCollection: IUniversallyUniqueMapping[] = [
        ...additionalUniversallyUniqueMappings,
        ...universallyUniqueMappingCollection,
      ];
      jest.spyOn(universallyUniqueMappingService, 'addUniversallyUniqueMappingToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ systemContentType });
      comp.ngOnInit();

      expect(universallyUniqueMappingService.query).toHaveBeenCalled();
      expect(universallyUniqueMappingService.addUniversallyUniqueMappingToCollectionIfMissing).toHaveBeenCalledWith(
        universallyUniqueMappingCollection,
        ...additionalUniversallyUniqueMappings.map(expect.objectContaining)
      );
      expect(comp.universallyUniqueMappingsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const systemContentType: ISystemContentType = { id: 456 };
      const placeholders: IPlaceholder = { id: 96056 };
      systemContentType.placeholders = [placeholders];
      const sysMaps: IUniversallyUniqueMapping = { id: 52270 };
      systemContentType.sysMaps = [sysMaps];

      activatedRoute.data = of({ systemContentType });
      comp.ngOnInit();

      expect(comp.placeholdersSharedCollection).toContain(placeholders);
      expect(comp.universallyUniqueMappingsSharedCollection).toContain(sysMaps);
      expect(comp.systemContentType).toEqual(systemContentType);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISystemContentType>>();
      const systemContentType = { id: 123 };
      jest.spyOn(systemContentTypeFormService, 'getSystemContentType').mockReturnValue(systemContentType);
      jest.spyOn(systemContentTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ systemContentType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: systemContentType }));
      saveSubject.complete();

      // THEN
      expect(systemContentTypeFormService.getSystemContentType).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(systemContentTypeService.update).toHaveBeenCalledWith(expect.objectContaining(systemContentType));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISystemContentType>>();
      const systemContentType = { id: 123 };
      jest.spyOn(systemContentTypeFormService, 'getSystemContentType').mockReturnValue({ id: null });
      jest.spyOn(systemContentTypeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ systemContentType: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: systemContentType }));
      saveSubject.complete();

      // THEN
      expect(systemContentTypeFormService.getSystemContentType).toHaveBeenCalled();
      expect(systemContentTypeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISystemContentType>>();
      const systemContentType = { id: 123 };
      jest.spyOn(systemContentTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ systemContentType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(systemContentTypeService.update).toHaveBeenCalled();
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
  });
});
