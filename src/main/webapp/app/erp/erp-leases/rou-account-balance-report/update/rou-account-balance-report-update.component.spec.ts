///
/// Erp System - Mark X No 5 (Jehoiada Series) Client 1.7.3
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

import { IFiscalMonth } from '../../../erp-pages/fiscal-month/fiscal-month.model';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { RouAccountBalanceReportService } from '../service/rou-account-balance-report.service';
import { IRouAccountBalanceReport, RouAccountBalanceReport } from '../rou-account-balance-report.model';

import { RouAccountBalanceReportUpdateComponent } from './rou-account-balance-report-update.component';
import { FiscalMonthService } from '../../../erp-pages/fiscal-month/service/fiscal-month.service';
import { IApplicationUser } from '../../../erp-pages/application-user/application-user.model';
import { ApplicationUserService } from '../../../erp-pages/application-user/service/application-user.service';

jest.mock('@angular/router');

describe('RouAccountBalanceReport Management Update Component', () => {
  let comp: RouAccountBalanceReportUpdateComponent;
  let fixture: ComponentFixture<RouAccountBalanceReportUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let rouAccountBalanceReportService: RouAccountBalanceReportService;
  let applicationUserService: ApplicationUserService;
  let fiscalMonthService: FiscalMonthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [RouAccountBalanceReportUpdateComponent],
      providers: [FormBuilder, ActivatedRoute],
    })
      .overrideTemplate(RouAccountBalanceReportUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(RouAccountBalanceReportUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    rouAccountBalanceReportService = TestBed.inject(RouAccountBalanceReportService);
    applicationUserService = TestBed.inject(ApplicationUserService);
    fiscalMonthService = TestBed.inject(FiscalMonthService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call ApplicationUser query and add missing value', () => {
      const rouAccountBalanceReport: IRouAccountBalanceReport = { id: 456 };
      const requestedBy: IApplicationUser = { id: 35202 };
      rouAccountBalanceReport.requestedBy = requestedBy;

      const applicationUserCollection: IApplicationUser[] = [{ id: 60001 }];
      jest.spyOn(applicationUserService, 'query').mockReturnValue(of(new HttpResponse({ body: applicationUserCollection })));
      const additionalApplicationUsers = [requestedBy];
      const expectedCollection: IApplicationUser[] = [...additionalApplicationUsers, ...applicationUserCollection];
      jest.spyOn(applicationUserService, 'addApplicationUserToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ rouAccountBalanceReport });
      comp.ngOnInit();

      expect(applicationUserService.query).toHaveBeenCalled();
      expect(applicationUserService.addApplicationUserToCollectionIfMissing).toHaveBeenCalledWith(
        applicationUserCollection,
        ...additionalApplicationUsers
      );
      expect(comp.applicationUsersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call FiscalMonth query and add missing value', () => {
      const rouAccountBalanceReport: IRouAccountBalanceReport = { id: 456 };
      const reportingMonth: IFiscalMonth = { id: 45703 };
      rouAccountBalanceReport.reportingMonth = reportingMonth;

      const fiscalMonthCollection: IFiscalMonth[] = [{ id: 98952 }];
      jest.spyOn(fiscalMonthService, 'query').mockReturnValue(of(new HttpResponse({ body: fiscalMonthCollection })));
      const additionalFiscalMonths = [reportingMonth];
      const expectedCollection: IFiscalMonth[] = [...additionalFiscalMonths, ...fiscalMonthCollection];
      jest.spyOn(fiscalMonthService, 'addFiscalMonthToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ rouAccountBalanceReport });
      comp.ngOnInit();

      expect(fiscalMonthService.query).toHaveBeenCalled();
      expect(fiscalMonthService.addFiscalMonthToCollectionIfMissing).toHaveBeenCalledWith(fiscalMonthCollection, ...additionalFiscalMonths);
      expect(comp.fiscalMonthsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const rouAccountBalanceReport: IRouAccountBalanceReport = { id: 456 };
      const requestedBy: IApplicationUser = { id: 10321 };
      rouAccountBalanceReport.requestedBy = requestedBy;
      const reportingMonth: IFiscalMonth = { id: 93035 };
      rouAccountBalanceReport.reportingMonth = reportingMonth;

      activatedRoute.data = of({ rouAccountBalanceReport });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(rouAccountBalanceReport));
      expect(comp.applicationUsersSharedCollection).toContain(requestedBy);
      expect(comp.fiscalMonthsSharedCollection).toContain(reportingMonth);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<RouAccountBalanceReport>>();
      const rouAccountBalanceReport = { id: 123 };
      jest.spyOn(rouAccountBalanceReportService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ rouAccountBalanceReport });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: rouAccountBalanceReport }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(rouAccountBalanceReportService.update).toHaveBeenCalledWith(rouAccountBalanceReport);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<RouAccountBalanceReport>>();
      const rouAccountBalanceReport = new RouAccountBalanceReport();
      jest.spyOn(rouAccountBalanceReportService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ rouAccountBalanceReport });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: rouAccountBalanceReport }));
      saveSubject.complete();

      // THEN
      expect(rouAccountBalanceReportService.create).toHaveBeenCalledWith(rouAccountBalanceReport);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<RouAccountBalanceReport>>();
      const rouAccountBalanceReport = { id: 123 };
      jest.spyOn(rouAccountBalanceReportService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ rouAccountBalanceReport });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(rouAccountBalanceReportService.update).toHaveBeenCalledWith(rouAccountBalanceReport);
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

    describe('trackFiscalMonthById', () => {
      it('Should return tracked FiscalMonth primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackFiscalMonthById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
