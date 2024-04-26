///
/// Erp System - Mark X No 7 (Jehoiada Series) Client 1.7.5
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

import { RouDepreciationEntryReportService } from '../service/rou-depreciation-entry-report.service';
import { IRouDepreciationEntryReport, RouDepreciationEntryReport } from '../rou-depreciation-entry-report.model';
import { IApplicationUser } from 'app/entities/people/application-user/application-user.model';
import { ApplicationUserService } from 'app/entities/people/application-user/service/application-user.service';

import { RouDepreciationEntryReportUpdateComponent } from './rou-depreciation-entry-report-update.component';

describe('RouDepreciationEntryReport Management Update Component', () => {
  let comp: RouDepreciationEntryReportUpdateComponent;
  let fixture: ComponentFixture<RouDepreciationEntryReportUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let rouDepreciationEntryReportService: RouDepreciationEntryReportService;
  let applicationUserService: ApplicationUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [RouDepreciationEntryReportUpdateComponent],
      providers: [FormBuilder, ActivatedRoute],
    })
      .overrideTemplate(RouDepreciationEntryReportUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(RouDepreciationEntryReportUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    rouDepreciationEntryReportService = TestBed.inject(RouDepreciationEntryReportService);
    applicationUserService = TestBed.inject(ApplicationUserService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call ApplicationUser query and add missing value', () => {
      const rouDepreciationEntryReport: IRouDepreciationEntryReport = { id: 456 };
      const requestedBy: IApplicationUser = { id: 43323 };
      rouDepreciationEntryReport.requestedBy = requestedBy;

      const applicationUserCollection: IApplicationUser[] = [{ id: 56195 }];
      jest.spyOn(applicationUserService, 'query').mockReturnValue(of(new HttpResponse({ body: applicationUserCollection })));
      const additionalApplicationUsers = [requestedBy];
      const expectedCollection: IApplicationUser[] = [...additionalApplicationUsers, ...applicationUserCollection];
      jest.spyOn(applicationUserService, 'addApplicationUserToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ rouDepreciationEntryReport });
      comp.ngOnInit();

      expect(applicationUserService.query).toHaveBeenCalled();
      expect(applicationUserService.addApplicationUserToCollectionIfMissing).toHaveBeenCalledWith(
        applicationUserCollection,
        ...additionalApplicationUsers
      );
      expect(comp.applicationUsersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const rouDepreciationEntryReport: IRouDepreciationEntryReport = { id: 456 };
      const requestedBy: IApplicationUser = { id: 88794 };
      rouDepreciationEntryReport.requestedBy = requestedBy;

      activatedRoute.data = of({ rouDepreciationEntryReport });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(rouDepreciationEntryReport));
      expect(comp.applicationUsersSharedCollection).toContain(requestedBy);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<RouDepreciationEntryReport>>();
      const rouDepreciationEntryReport = { id: 123 };
      jest.spyOn(rouDepreciationEntryReportService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ rouDepreciationEntryReport });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: rouDepreciationEntryReport }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(rouDepreciationEntryReportService.update).toHaveBeenCalledWith(rouDepreciationEntryReport);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<RouDepreciationEntryReport>>();
      const rouDepreciationEntryReport = new RouDepreciationEntryReport();
      jest.spyOn(rouDepreciationEntryReportService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ rouDepreciationEntryReport });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: rouDepreciationEntryReport }));
      saveSubject.complete();

      // THEN
      expect(rouDepreciationEntryReportService.create).toHaveBeenCalledWith(rouDepreciationEntryReport);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<RouDepreciationEntryReport>>();
      const rouDepreciationEntryReport = { id: 123 };
      jest.spyOn(rouDepreciationEntryReportService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ rouDepreciationEntryReport });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(rouDepreciationEntryReportService.update).toHaveBeenCalledWith(rouDepreciationEntryReport);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackApplicationUserById', () => {
      it('Should return tracked ApplicationUser primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackApplicationUserById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});