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

import { PrepaymentMappingFormService } from './prepayment-mapping-form.service';
import { PrepaymentMappingService } from '../service/prepayment-mapping.service';
import { IPrepaymentMapping } from '../prepayment-mapping.model';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/system/placeholder/service/placeholder.service';

import { PrepaymentMappingUpdateComponent } from './prepayment-mapping-update.component';

describe('PrepaymentMapping Management Update Component', () => {
  let comp: PrepaymentMappingUpdateComponent;
  let fixture: ComponentFixture<PrepaymentMappingUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let prepaymentMappingFormService: PrepaymentMappingFormService;
  let prepaymentMappingService: PrepaymentMappingService;
  let placeholderService: PlaceholderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [PrepaymentMappingUpdateComponent],
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
      .overrideTemplate(PrepaymentMappingUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PrepaymentMappingUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    prepaymentMappingFormService = TestBed.inject(PrepaymentMappingFormService);
    prepaymentMappingService = TestBed.inject(PrepaymentMappingService);
    placeholderService = TestBed.inject(PlaceholderService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Placeholder query and add missing value', () => {
      const prepaymentMapping: IPrepaymentMapping = { id: 456 };
      const placeholders: IPlaceholder[] = [{ id: 38740 }];
      prepaymentMapping.placeholders = placeholders;

      const placeholderCollection: IPlaceholder[] = [{ id: 62872 }];
      jest.spyOn(placeholderService, 'query').mockReturnValue(of(new HttpResponse({ body: placeholderCollection })));
      const additionalPlaceholders = [...placeholders];
      const expectedCollection: IPlaceholder[] = [...additionalPlaceholders, ...placeholderCollection];
      jest.spyOn(placeholderService, 'addPlaceholderToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ prepaymentMapping });
      comp.ngOnInit();

      expect(placeholderService.query).toHaveBeenCalled();
      expect(placeholderService.addPlaceholderToCollectionIfMissing).toHaveBeenCalledWith(
        placeholderCollection,
        ...additionalPlaceholders.map(expect.objectContaining)
      );
      expect(comp.placeholdersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const prepaymentMapping: IPrepaymentMapping = { id: 456 };
      const placeholder: IPlaceholder = { id: 80576 };
      prepaymentMapping.placeholders = [placeholder];

      activatedRoute.data = of({ prepaymentMapping });
      comp.ngOnInit();

      expect(comp.placeholdersSharedCollection).toContain(placeholder);
      expect(comp.prepaymentMapping).toEqual(prepaymentMapping);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPrepaymentMapping>>();
      const prepaymentMapping = { id: 123 };
      jest.spyOn(prepaymentMappingFormService, 'getPrepaymentMapping').mockReturnValue(prepaymentMapping);
      jest.spyOn(prepaymentMappingService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ prepaymentMapping });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: prepaymentMapping }));
      saveSubject.complete();

      // THEN
      expect(prepaymentMappingFormService.getPrepaymentMapping).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(prepaymentMappingService.update).toHaveBeenCalledWith(expect.objectContaining(prepaymentMapping));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPrepaymentMapping>>();
      const prepaymentMapping = { id: 123 };
      jest.spyOn(prepaymentMappingFormService, 'getPrepaymentMapping').mockReturnValue({ id: null });
      jest.spyOn(prepaymentMappingService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ prepaymentMapping: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: prepaymentMapping }));
      saveSubject.complete();

      // THEN
      expect(prepaymentMappingFormService.getPrepaymentMapping).toHaveBeenCalled();
      expect(prepaymentMappingService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPrepaymentMapping>>();
      const prepaymentMapping = { id: 123 };
      jest.spyOn(prepaymentMappingService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ prepaymentMapping });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(prepaymentMappingService.update).toHaveBeenCalled();
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
