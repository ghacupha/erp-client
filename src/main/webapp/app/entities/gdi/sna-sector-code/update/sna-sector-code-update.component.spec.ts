///
/// Erp System - Mark VII No 1 (Gideon Series) Client 1.5.5
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

import { SnaSectorCodeService } from '../service/sna-sector-code.service';
import { ISnaSectorCode, SnaSectorCode } from '../sna-sector-code.model';

import { SnaSectorCodeUpdateComponent } from './sna-sector-code-update.component';

describe('SnaSectorCode Management Update Component', () => {
  let comp: SnaSectorCodeUpdateComponent;
  let fixture: ComponentFixture<SnaSectorCodeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let snaSectorCodeService: SnaSectorCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [SnaSectorCodeUpdateComponent],
      providers: [FormBuilder, ActivatedRoute],
    })
      .overrideTemplate(SnaSectorCodeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SnaSectorCodeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    snaSectorCodeService = TestBed.inject(SnaSectorCodeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const snaSectorCode: ISnaSectorCode = { id: 456 };

      activatedRoute.data = of({ snaSectorCode });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(snaSectorCode));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<SnaSectorCode>>();
      const snaSectorCode = { id: 123 };
      jest.spyOn(snaSectorCodeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ snaSectorCode });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: snaSectorCode }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(snaSectorCodeService.update).toHaveBeenCalledWith(snaSectorCode);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<SnaSectorCode>>();
      const snaSectorCode = new SnaSectorCode();
      jest.spyOn(snaSectorCodeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ snaSectorCode });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: snaSectorCode }));
      saveSubject.complete();

      // THEN
      expect(snaSectorCodeService.create).toHaveBeenCalledWith(snaSectorCode);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<SnaSectorCode>>();
      const snaSectorCode = { id: 123 };
      jest.spyOn(snaSectorCodeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ snaSectorCode });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(snaSectorCodeService.update).toHaveBeenCalledWith(snaSectorCode);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
