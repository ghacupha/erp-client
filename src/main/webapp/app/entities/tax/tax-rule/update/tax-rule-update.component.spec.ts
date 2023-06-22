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

import { TaxRuleFormService } from './tax-rule-form.service';
import { TaxRuleService } from '../service/tax-rule.service';
import { ITaxRule } from '../tax-rule.model';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/system/placeholder/service/placeholder.service';

import { TaxRuleUpdateComponent } from './tax-rule-update.component';

describe('TaxRule Management Update Component', () => {
  let comp: TaxRuleUpdateComponent;
  let fixture: ComponentFixture<TaxRuleUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let taxRuleFormService: TaxRuleFormService;
  let taxRuleService: TaxRuleService;
  let placeholderService: PlaceholderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [TaxRuleUpdateComponent],
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
      .overrideTemplate(TaxRuleUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TaxRuleUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    taxRuleFormService = TestBed.inject(TaxRuleFormService);
    taxRuleService = TestBed.inject(TaxRuleService);
    placeholderService = TestBed.inject(PlaceholderService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Placeholder query and add missing value', () => {
      const taxRule: ITaxRule = { id: 456 };
      const placeholders: IPlaceholder[] = [{ id: 50977 }];
      taxRule.placeholders = placeholders;

      const placeholderCollection: IPlaceholder[] = [{ id: 39797 }];
      jest.spyOn(placeholderService, 'query').mockReturnValue(of(new HttpResponse({ body: placeholderCollection })));
      const additionalPlaceholders = [...placeholders];
      const expectedCollection: IPlaceholder[] = [...additionalPlaceholders, ...placeholderCollection];
      jest.spyOn(placeholderService, 'addPlaceholderToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ taxRule });
      comp.ngOnInit();

      expect(placeholderService.query).toHaveBeenCalled();
      expect(placeholderService.addPlaceholderToCollectionIfMissing).toHaveBeenCalledWith(
        placeholderCollection,
        ...additionalPlaceholders.map(expect.objectContaining)
      );
      expect(comp.placeholdersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const taxRule: ITaxRule = { id: 456 };
      const placeholder: IPlaceholder = { id: 48965 };
      taxRule.placeholders = [placeholder];

      activatedRoute.data = of({ taxRule });
      comp.ngOnInit();

      expect(comp.placeholdersSharedCollection).toContain(placeholder);
      expect(comp.taxRule).toEqual(taxRule);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITaxRule>>();
      const taxRule = { id: 123 };
      jest.spyOn(taxRuleFormService, 'getTaxRule').mockReturnValue(taxRule);
      jest.spyOn(taxRuleService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ taxRule });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: taxRule }));
      saveSubject.complete();

      // THEN
      expect(taxRuleFormService.getTaxRule).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(taxRuleService.update).toHaveBeenCalledWith(expect.objectContaining(taxRule));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITaxRule>>();
      const taxRule = { id: 123 };
      jest.spyOn(taxRuleFormService, 'getTaxRule').mockReturnValue({ id: null });
      jest.spyOn(taxRuleService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ taxRule: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: taxRule }));
      saveSubject.complete();

      // THEN
      expect(taxRuleFormService.getTaxRule).toHaveBeenCalled();
      expect(taxRuleService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITaxRule>>();
      const taxRule = { id: 123 };
      jest.spyOn(taxRuleService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ taxRule });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(taxRuleService.update).toHaveBeenCalled();
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
