///
/// Erp System - Mark X No 9 (Jehoiada Series) Client 1.7.7
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

import { ManagementMemberTypeService } from '../service/management-member-type.service';
import { IManagementMemberType, ManagementMemberType } from '../management-member-type.model';

import { ManagementMemberTypeUpdateComponent } from './management-member-type-update.component';

describe('ManagementMemberType Management Update Component', () => {
  let comp: ManagementMemberTypeUpdateComponent;
  let fixture: ComponentFixture<ManagementMemberTypeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let managementMemberTypeService: ManagementMemberTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ManagementMemberTypeUpdateComponent],
      providers: [FormBuilder, ActivatedRoute],
    })
      .overrideTemplate(ManagementMemberTypeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ManagementMemberTypeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    managementMemberTypeService = TestBed.inject(ManagementMemberTypeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const managementMemberType: IManagementMemberType = { id: 456 };

      activatedRoute.data = of({ managementMemberType });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(managementMemberType));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ManagementMemberType>>();
      const managementMemberType = { id: 123 };
      jest.spyOn(managementMemberTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ managementMemberType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: managementMemberType }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(managementMemberTypeService.update).toHaveBeenCalledWith(managementMemberType);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ManagementMemberType>>();
      const managementMemberType = new ManagementMemberType();
      jest.spyOn(managementMemberTypeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ managementMemberType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: managementMemberType }));
      saveSubject.complete();

      // THEN
      expect(managementMemberTypeService.create).toHaveBeenCalledWith(managementMemberType);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ManagementMemberType>>();
      const managementMemberType = { id: 123 };
      jest.spyOn(managementMemberTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ managementMemberType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(managementMemberTypeService.update).toHaveBeenCalledWith(managementMemberType);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
