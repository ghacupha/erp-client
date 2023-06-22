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

import { PlaceholderFormService } from './placeholder-form.service';
import { PlaceholderService } from '../service/placeholder.service';
import { IPlaceholder } from '../placeholder.model';

import { PlaceholderUpdateComponent } from './placeholder-update.component';

describe('Placeholder Management Update Component', () => {
  let comp: PlaceholderUpdateComponent;
  let fixture: ComponentFixture<PlaceholderUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let placeholderFormService: PlaceholderFormService;
  let placeholderService: PlaceholderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [PlaceholderUpdateComponent],
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
      .overrideTemplate(PlaceholderUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PlaceholderUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    placeholderFormService = TestBed.inject(PlaceholderFormService);
    placeholderService = TestBed.inject(PlaceholderService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Placeholder query and add missing value', () => {
      const placeholder: IPlaceholder = { id: 456 };
      const containingPlaceholder: IPlaceholder = { id: 63180 };
      placeholder.containingPlaceholder = containingPlaceholder;

      const placeholderCollection: IPlaceholder[] = [{ id: 24098 }];
      jest.spyOn(placeholderService, 'query').mockReturnValue(of(new HttpResponse({ body: placeholderCollection })));
      const additionalPlaceholders = [containingPlaceholder];
      const expectedCollection: IPlaceholder[] = [...additionalPlaceholders, ...placeholderCollection];
      jest.spyOn(placeholderService, 'addPlaceholderToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ placeholder });
      comp.ngOnInit();

      expect(placeholderService.query).toHaveBeenCalled();
      expect(placeholderService.addPlaceholderToCollectionIfMissing).toHaveBeenCalledWith(
        placeholderCollection,
        ...additionalPlaceholders.map(expect.objectContaining)
      );
      expect(comp.placeholdersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const placeholder: IPlaceholder = { id: 456 };
      const containingPlaceholder: IPlaceholder = { id: 2871 };
      placeholder.containingPlaceholder = containingPlaceholder;

      activatedRoute.data = of({ placeholder });
      comp.ngOnInit();

      expect(comp.placeholdersSharedCollection).toContain(containingPlaceholder);
      expect(comp.placeholder).toEqual(placeholder);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPlaceholder>>();
      const placeholder = { id: 123 };
      jest.spyOn(placeholderFormService, 'getPlaceholder').mockReturnValue(placeholder);
      jest.spyOn(placeholderService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ placeholder });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: placeholder }));
      saveSubject.complete();

      // THEN
      expect(placeholderFormService.getPlaceholder).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(placeholderService.update).toHaveBeenCalledWith(expect.objectContaining(placeholder));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPlaceholder>>();
      const placeholder = { id: 123 };
      jest.spyOn(placeholderFormService, 'getPlaceholder').mockReturnValue({ id: null });
      jest.spyOn(placeholderService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ placeholder: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: placeholder }));
      saveSubject.complete();

      // THEN
      expect(placeholderFormService.getPlaceholder).toHaveBeenCalled();
      expect(placeholderService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPlaceholder>>();
      const placeholder = { id: 123 };
      jest.spyOn(placeholderService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ placeholder });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(placeholderService.update).toHaveBeenCalled();
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
