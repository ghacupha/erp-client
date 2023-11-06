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

import { TerminalFunctionsService } from '../service/terminal-functions.service';
import { ITerminalFunctions, TerminalFunctions } from '../terminal-functions.model';

import { TerminalFunctionsUpdateComponent } from './terminal-functions-update.component';

describe('TerminalFunctions Management Update Component', () => {
  let comp: TerminalFunctionsUpdateComponent;
  let fixture: ComponentFixture<TerminalFunctionsUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let terminalFunctionsService: TerminalFunctionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [TerminalFunctionsUpdateComponent],
      providers: [FormBuilder, ActivatedRoute],
    })
      .overrideTemplate(TerminalFunctionsUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TerminalFunctionsUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    terminalFunctionsService = TestBed.inject(TerminalFunctionsService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const terminalFunctions: ITerminalFunctions = { id: 456 };

      activatedRoute.data = of({ terminalFunctions });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(terminalFunctions));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<TerminalFunctions>>();
      const terminalFunctions = { id: 123 };
      jest.spyOn(terminalFunctionsService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ terminalFunctions });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: terminalFunctions }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(terminalFunctionsService.update).toHaveBeenCalledWith(terminalFunctions);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<TerminalFunctions>>();
      const terminalFunctions = new TerminalFunctions();
      jest.spyOn(terminalFunctionsService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ terminalFunctions });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: terminalFunctions }));
      saveSubject.complete();

      // THEN
      expect(terminalFunctionsService.create).toHaveBeenCalledWith(terminalFunctions);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<TerminalFunctions>>();
      const terminalFunctions = { id: 123 };
      jest.spyOn(terminalFunctionsService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ terminalFunctions });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(terminalFunctionsService.update).toHaveBeenCalledWith(terminalFunctions);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
