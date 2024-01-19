///
/// Erp System - Mark X No 2 (Jehoiada Series) Client 1.7.2
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

import { SourcesOfFundsTypeCodeService } from '../service/sources-of-funds-type-code.service';
import { ISourcesOfFundsTypeCode, SourcesOfFundsTypeCode } from '../sources-of-funds-type-code.model';

import { SourcesOfFundsTypeCodeUpdateComponent } from './sources-of-funds-type-code-update.component';

describe('SourcesOfFundsTypeCode Management Update Component', () => {
  let comp: SourcesOfFundsTypeCodeUpdateComponent;
  let fixture: ComponentFixture<SourcesOfFundsTypeCodeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let sourcesOfFundsTypeCodeService: SourcesOfFundsTypeCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [SourcesOfFundsTypeCodeUpdateComponent],
      providers: [FormBuilder, ActivatedRoute],
    })
      .overrideTemplate(SourcesOfFundsTypeCodeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SourcesOfFundsTypeCodeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    sourcesOfFundsTypeCodeService = TestBed.inject(SourcesOfFundsTypeCodeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const sourcesOfFundsTypeCode: ISourcesOfFundsTypeCode = { id: 456 };

      activatedRoute.data = of({ sourcesOfFundsTypeCode });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(sourcesOfFundsTypeCode));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<SourcesOfFundsTypeCode>>();
      const sourcesOfFundsTypeCode = { id: 123 };
      jest.spyOn(sourcesOfFundsTypeCodeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ sourcesOfFundsTypeCode });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: sourcesOfFundsTypeCode }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(sourcesOfFundsTypeCodeService.update).toHaveBeenCalledWith(sourcesOfFundsTypeCode);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<SourcesOfFundsTypeCode>>();
      const sourcesOfFundsTypeCode = new SourcesOfFundsTypeCode();
      jest.spyOn(sourcesOfFundsTypeCodeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ sourcesOfFundsTypeCode });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: sourcesOfFundsTypeCode }));
      saveSubject.complete();

      // THEN
      expect(sourcesOfFundsTypeCodeService.create).toHaveBeenCalledWith(sourcesOfFundsTypeCode);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<SourcesOfFundsTypeCode>>();
      const sourcesOfFundsTypeCode = { id: 123 };
      jest.spyOn(sourcesOfFundsTypeCodeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ sourcesOfFundsTypeCode });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(sourcesOfFundsTypeCodeService.update).toHaveBeenCalledWith(sourcesOfFundsTypeCode);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
