///
/// Erp System - Mark X No 6 (Jehoiada Series) Client 1.7.4
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

import { RouDepreciationPostingReportService } from '../service/rou-depreciation-posting-report.service';
import { IRouDepreciationPostingReport, RouDepreciationPostingReport } from '../rou-depreciation-posting-report.model';
import { IFiscalMonth } from 'app/entities/system/fiscal-month/fiscal-month.model';
import { FiscalMonthService } from 'app/entities/system/fiscal-month/service/fiscal-month.service';
import { IApplicationUser } from 'app/entities/people/application-user/application-user.model';
import { ApplicationUserService } from 'app/entities/people/application-user/service/application-user.service';

import { RouDepreciationPostingReportUpdateComponent } from './rou-depreciation-posting-report-update.component';

describe('RouDepreciationPostingReport Management Update Component', () => {
  let comp: RouDepreciationPostingReportUpdateComponent;
  let fixture: ComponentFixture<RouDepreciationPostingReportUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let rouDepreciationPostingReportService: RouDepreciationPostingReportService;
  let fiscalMonthService: FiscalMonthService;
  let applicationUserService: ApplicationUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [RouDepreciationPostingReportUpdateComponent],
      providers: [FormBuilder, ActivatedRoute],
    })
      .overrideTemplate(RouDepreciationPostingReportUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(RouDepreciationPostingReportUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    rouDepreciationPostingReportService = TestBed.inject(RouDepreciationPostingReportService);
    fiscalMonthService = TestBed.inject(FiscalMonthService);
    applicationUserService = TestBed.inject(ApplicationUserService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call FiscalMonth query and add missing value', () => {
      const rouDepreciationPostingReport: IRouDepreciationPostingReport = { id: 456 };
      const fiscalMonth: IFiscalMonth = { id: 18637 };
      rouDepreciationPostingReport.fiscalMonth = fiscalMonth;

      const fiscalMonthCollection: IFiscalMonth[] = [{ id: 41193 }];
      jest.spyOn(fiscalMonthService, 'query').mockReturnValue(of(new HttpResponse({ body: fiscalMonthCollection })));
      const additionalFiscalMonths = [fiscalMonth];
      const expectedCollection: IFiscalMonth[] = [...additionalFiscalMonths, ...fiscalMonthCollection];
      jest.spyOn(fiscalMonthService, 'addFiscalMonthToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ rouDepreciationPostingReport });
      comp.ngOnInit();

      expect(fiscalMonthService.query).toHaveBeenCalled();
      expect(fiscalMonthService.addFiscalMonthToCollectionIfMissing).toHaveBeenCalledWith(fiscalMonthCollection, ...additionalFiscalMonths);
      expect(comp.fiscalMonthsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call ApplicationUser query and add missing value', () => {
      const rouDepreciationPostingReport: IRouDepreciationPostingReport = { id: 456 };
      const requestedBy: IApplicationUser = { id: 83256 };
      rouDepreciationPostingReport.requestedBy = requestedBy;

      const applicationUserCollection: IApplicationUser[] = [{ id: 52253 }];
      jest.spyOn(applicationUserService, 'query').mockReturnValue(of(new HttpResponse({ body: applicationUserCollection })));
      const additionalApplicationUsers = [requestedBy];
      const expectedCollection: IApplicationUser[] = [...additionalApplicationUsers, ...applicationUserCollection];
      jest.spyOn(applicationUserService, 'addApplicationUserToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ rouDepreciationPostingReport });
      comp.ngOnInit();

      expect(applicationUserService.query).toHaveBeenCalled();
      expect(applicationUserService.addApplicationUserToCollectionIfMissing).toHaveBeenCalledWith(
        applicationUserCollection,
        ...additionalApplicationUsers
      );
      expect(comp.applicationUsersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const rouDepreciationPostingReport: IRouDepreciationPostingReport = { id: 456 };
      const fiscalMonth: IFiscalMonth = { id: 97129 };
      rouDepreciationPostingReport.fiscalMonth = fiscalMonth;
      const requestedBy: IApplicationUser = { id: 61651 };
      rouDepreciationPostingReport.requestedBy = requestedBy;

      activatedRoute.data = of({ rouDepreciationPostingReport });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(rouDepreciationPostingReport));
      expect(comp.fiscalMonthsSharedCollection).toContain(fiscalMonth);
      expect(comp.applicationUsersSharedCollection).toContain(requestedBy);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<RouDepreciationPostingReport>>();
      const rouDepreciationPostingReport = { id: 123 };
      jest.spyOn(rouDepreciationPostingReportService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ rouDepreciationPostingReport });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: rouDepreciationPostingReport }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(rouDepreciationPostingReportService.update).toHaveBeenCalledWith(rouDepreciationPostingReport);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<RouDepreciationPostingReport>>();
      const rouDepreciationPostingReport = new RouDepreciationPostingReport();
      jest.spyOn(rouDepreciationPostingReportService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ rouDepreciationPostingReport });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: rouDepreciationPostingReport }));
      saveSubject.complete();

      // THEN
      expect(rouDepreciationPostingReportService.create).toHaveBeenCalledWith(rouDepreciationPostingReport);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<RouDepreciationPostingReport>>();
      const rouDepreciationPostingReport = { id: 123 };
      jest.spyOn(rouDepreciationPostingReportService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ rouDepreciationPostingReport });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(rouDepreciationPostingReportService.update).toHaveBeenCalledWith(rouDepreciationPostingReport);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackFiscalMonthById', () => {
      it('Should return tracked FiscalMonth primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackFiscalMonthById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackApplicationUserById', () => {
      it('Should return tracked ApplicationUser primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackApplicationUserById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
