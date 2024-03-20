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

import { FiscalMonthService } from '../../../erp-pages/fiscal-month/service/fiscal-month.service';

jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { RouAssetNBVReportService } from '../service/rou-asset-nbv-report.service';
import { IRouAssetNBVReport, RouAssetNBVReport } from '../rou-asset-nbv-report.model';

import { RouAssetNBVReportUpdateComponent } from './rou-asset-nbv-report-update.component';
import { IFiscalMonth } from '../../../erp-pages/fiscal-month/fiscal-month.model';
import { IApplicationUser } from '../../../erp-pages/application-user/application-user.model';
import { ApplicationUserService } from '../../../erp-pages/application-user/service/application-user.service';

describe('RouAssetNBVReport Management Update Component', () => {
  let comp: RouAssetNBVReportUpdateComponent;
  let fixture: ComponentFixture<RouAssetNBVReportUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let rouAssetNBVReportService: RouAssetNBVReportService;
  let fiscalMonthService: FiscalMonthService;
  let applicationUserService: ApplicationUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [RouAssetNBVReportUpdateComponent],
      providers: [FormBuilder, ActivatedRoute],
    })
      .overrideTemplate(RouAssetNBVReportUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(RouAssetNBVReportUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    rouAssetNBVReportService = TestBed.inject(RouAssetNBVReportService);
    fiscalMonthService = TestBed.inject(FiscalMonthService);
    applicationUserService = TestBed.inject(ApplicationUserService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call FiscalMonth query and add missing value', () => {
      const rouAssetNBVReport: IRouAssetNBVReport = { id: 456 };
      const fiscalReportingMonth: IFiscalMonth = { id: 25337 };
      rouAssetNBVReport.fiscalReportingMonth = fiscalReportingMonth;

      const fiscalMonthCollection: IFiscalMonth[] = [{ id: 51804 }];
      jest.spyOn(fiscalMonthService, 'query').mockReturnValue(of(new HttpResponse({ body: fiscalMonthCollection })));
      const additionalFiscalMonths = [fiscalReportingMonth];
      const expectedCollection: IFiscalMonth[] = [...additionalFiscalMonths, ...fiscalMonthCollection];
      jest.spyOn(fiscalMonthService, 'addFiscalMonthToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ rouAssetNBVReport });
      comp.ngOnInit();

      expect(fiscalMonthService.query).toHaveBeenCalled();
      expect(fiscalMonthService.addFiscalMonthToCollectionIfMissing).toHaveBeenCalledWith(fiscalMonthCollection, ...additionalFiscalMonths);
      expect(comp.fiscalMonthsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call ApplicationUser query and add missing value', () => {
      const rouAssetNBVReport: IRouAssetNBVReport = { id: 456 };
      const requestedBy: IApplicationUser = { id: 65132 };
      rouAssetNBVReport.requestedBy = requestedBy;

      const applicationUserCollection: IApplicationUser[] = [{ id: 57109 }];
      jest.spyOn(applicationUserService, 'query').mockReturnValue(of(new HttpResponse({ body: applicationUserCollection })));
      const additionalApplicationUsers = [requestedBy];
      const expectedCollection: IApplicationUser[] = [...additionalApplicationUsers, ...applicationUserCollection];
      jest.spyOn(applicationUserService, 'addApplicationUserToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ rouAssetNBVReport });
      comp.ngOnInit();

      expect(applicationUserService.query).toHaveBeenCalled();
      expect(applicationUserService.addApplicationUserToCollectionIfMissing).toHaveBeenCalledWith(
        applicationUserCollection,
        ...additionalApplicationUsers
      );
      expect(comp.applicationUsersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const rouAssetNBVReport: IRouAssetNBVReport = { id: 456 };
      const fiscalReportingMonth: IFiscalMonth = { id: 63636 };
      rouAssetNBVReport.fiscalReportingMonth = fiscalReportingMonth;
      const requestedBy: IApplicationUser = { id: 64913 };
      rouAssetNBVReport.requestedBy = requestedBy;

      activatedRoute.data = of({ rouAssetNBVReport });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(rouAssetNBVReport));
      expect(comp.fiscalMonthsSharedCollection).toContain(fiscalReportingMonth);
      expect(comp.applicationUsersSharedCollection).toContain(requestedBy);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<RouAssetNBVReport>>();
      const rouAssetNBVReport = { id: 123 };
      jest.spyOn(rouAssetNBVReportService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ rouAssetNBVReport });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: rouAssetNBVReport }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(rouAssetNBVReportService.update).toHaveBeenCalledWith(rouAssetNBVReport);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<RouAssetNBVReport>>();
      const rouAssetNBVReport = new RouAssetNBVReport();
      jest.spyOn(rouAssetNBVReportService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ rouAssetNBVReport });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: rouAssetNBVReport }));
      saveSubject.complete();

      // THEN
      expect(rouAssetNBVReportService.create).toHaveBeenCalledWith(rouAssetNBVReport);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<RouAssetNBVReport>>();
      const rouAssetNBVReport = { id: 123 };
      jest.spyOn(rouAssetNBVReportService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ rouAssetNBVReport });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(rouAssetNBVReportService.update).toHaveBeenCalledWith(rouAssetNBVReport);
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
