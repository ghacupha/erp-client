///
/// Erp System - Mark IX No 2 (Iddo Series) Client 1.6.3
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

import { AutonomousReportService } from '../service/autonomous-report.service';
import { IAutonomousReport, AutonomousReport } from '../autonomous-report.model';
import { IUniversallyUniqueMapping } from 'app/entities/gdi/universally-unique-mapping/universally-unique-mapping.model';
import { UniversallyUniqueMappingService } from 'app/entities/gdi/universally-unique-mapping/service/universally-unique-mapping.service';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/system/placeholder/service/placeholder.service';
import { IApplicationUser } from 'app/entities/people/application-user/application-user.model';
import { ApplicationUserService } from 'app/entities/people/application-user/service/application-user.service';

import { AutonomousReportUpdateComponent } from './autonomous-report-update.component';

describe('AutonomousReport Management Update Component', () => {
  let comp: AutonomousReportUpdateComponent;
  let fixture: ComponentFixture<AutonomousReportUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let autonomousReportService: AutonomousReportService;
  let universallyUniqueMappingService: UniversallyUniqueMappingService;
  let placeholderService: PlaceholderService;
  let applicationUserService: ApplicationUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [AutonomousReportUpdateComponent],
      providers: [FormBuilder, ActivatedRoute],
    })
      .overrideTemplate(AutonomousReportUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AutonomousReportUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    autonomousReportService = TestBed.inject(AutonomousReportService);
    universallyUniqueMappingService = TestBed.inject(UniversallyUniqueMappingService);
    placeholderService = TestBed.inject(PlaceholderService);
    applicationUserService = TestBed.inject(ApplicationUserService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call UniversallyUniqueMapping query and add missing value', () => {
      const autonomousReport: IAutonomousReport = { id: 456 };
      const reportMappings: IUniversallyUniqueMapping[] = [{ id: 96318 }];
      autonomousReport.reportMappings = reportMappings;

      const universallyUniqueMappingCollection: IUniversallyUniqueMapping[] = [{ id: 32277 }];
      jest
        .spyOn(universallyUniqueMappingService, 'query')
        .mockReturnValue(of(new HttpResponse({ body: universallyUniqueMappingCollection })));
      const additionalUniversallyUniqueMappings = [...reportMappings];
      const expectedCollection: IUniversallyUniqueMapping[] = [
        ...additionalUniversallyUniqueMappings,
        ...universallyUniqueMappingCollection,
      ];
      jest.spyOn(universallyUniqueMappingService, 'addUniversallyUniqueMappingToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ autonomousReport });
      comp.ngOnInit();

      expect(universallyUniqueMappingService.query).toHaveBeenCalled();
      expect(universallyUniqueMappingService.addUniversallyUniqueMappingToCollectionIfMissing).toHaveBeenCalledWith(
        universallyUniqueMappingCollection,
        ...additionalUniversallyUniqueMappings
      );
      expect(comp.universallyUniqueMappingsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Placeholder query and add missing value', () => {
      const autonomousReport: IAutonomousReport = { id: 456 };
      const placeholders: IPlaceholder[] = [{ id: 52354 }];
      autonomousReport.placeholders = placeholders;

      const placeholderCollection: IPlaceholder[] = [{ id: 73784 }];
      jest.spyOn(placeholderService, 'query').mockReturnValue(of(new HttpResponse({ body: placeholderCollection })));
      const additionalPlaceholders = [...placeholders];
      const expectedCollection: IPlaceholder[] = [...additionalPlaceholders, ...placeholderCollection];
      jest.spyOn(placeholderService, 'addPlaceholderToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ autonomousReport });
      comp.ngOnInit();

      expect(placeholderService.query).toHaveBeenCalled();
      expect(placeholderService.addPlaceholderToCollectionIfMissing).toHaveBeenCalledWith(placeholderCollection, ...additionalPlaceholders);
      expect(comp.placeholdersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call ApplicationUser query and add missing value', () => {
      const autonomousReport: IAutonomousReport = { id: 456 };
      const createdBy: IApplicationUser = { id: 21367 };
      autonomousReport.createdBy = createdBy;

      const applicationUserCollection: IApplicationUser[] = [{ id: 80314 }];
      jest.spyOn(applicationUserService, 'query').mockReturnValue(of(new HttpResponse({ body: applicationUserCollection })));
      const additionalApplicationUsers = [createdBy];
      const expectedCollection: IApplicationUser[] = [...additionalApplicationUsers, ...applicationUserCollection];
      jest.spyOn(applicationUserService, 'addApplicationUserToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ autonomousReport });
      comp.ngOnInit();

      expect(applicationUserService.query).toHaveBeenCalled();
      expect(applicationUserService.addApplicationUserToCollectionIfMissing).toHaveBeenCalledWith(
        applicationUserCollection,
        ...additionalApplicationUsers
      );
      expect(comp.applicationUsersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const autonomousReport: IAutonomousReport = { id: 456 };
      const reportMappings: IUniversallyUniqueMapping = { id: 49339 };
      autonomousReport.reportMappings = [reportMappings];
      const placeholders: IPlaceholder = { id: 36201 };
      autonomousReport.placeholders = [placeholders];
      const createdBy: IApplicationUser = { id: 98986 };
      autonomousReport.createdBy = createdBy;

      activatedRoute.data = of({ autonomousReport });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(autonomousReport));
      expect(comp.universallyUniqueMappingsSharedCollection).toContain(reportMappings);
      expect(comp.placeholdersSharedCollection).toContain(placeholders);
      expect(comp.applicationUsersSharedCollection).toContain(createdBy);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<AutonomousReport>>();
      const autonomousReport = { id: 123 };
      jest.spyOn(autonomousReportService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ autonomousReport });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: autonomousReport }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(autonomousReportService.update).toHaveBeenCalledWith(autonomousReport);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<AutonomousReport>>();
      const autonomousReport = new AutonomousReport();
      jest.spyOn(autonomousReportService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ autonomousReport });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: autonomousReport }));
      saveSubject.complete();

      // THEN
      expect(autonomousReportService.create).toHaveBeenCalledWith(autonomousReport);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<AutonomousReport>>();
      const autonomousReport = { id: 123 };
      jest.spyOn(autonomousReportService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ autonomousReport });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(autonomousReportService.update).toHaveBeenCalledWith(autonomousReport);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackUniversallyUniqueMappingById', () => {
      it('Should return tracked UniversallyUniqueMapping primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackUniversallyUniqueMappingById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackPlaceholderById', () => {
      it('Should return tracked Placeholder primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackPlaceholderById(0, entity);
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

  describe('Getting selected relationships', () => {
    describe('getSelectedUniversallyUniqueMapping', () => {
      it('Should return option if no UniversallyUniqueMapping is selected', () => {
        const option = { id: 123 };
        const result = comp.getSelectedUniversallyUniqueMapping(option);
        expect(result === option).toEqual(true);
      });

      it('Should return selected UniversallyUniqueMapping for according option', () => {
        const option = { id: 123 };
        const selected = { id: 123 };
        const selected2 = { id: 456 };
        const result = comp.getSelectedUniversallyUniqueMapping(option, [selected2, selected]);
        expect(result === selected).toEqual(true);
        expect(result === selected2).toEqual(false);
        expect(result === option).toEqual(false);
      });

      it('Should return option if this UniversallyUniqueMapping is not selected', () => {
        const option = { id: 123 };
        const selected = { id: 456 };
        const result = comp.getSelectedUniversallyUniqueMapping(option, [selected]);
        expect(result === option).toEqual(true);
        expect(result === selected).toEqual(false);
      });
    });

    describe('getSelectedPlaceholder', () => {
      it('Should return option if no Placeholder is selected', () => {
        const option = { id: 123 };
        const result = comp.getSelectedPlaceholder(option);
        expect(result === option).toEqual(true);
      });

      it('Should return selected Placeholder for according option', () => {
        const option = { id: 123 };
        const selected = { id: 123 };
        const selected2 = { id: 456 };
        const result = comp.getSelectedPlaceholder(option, [selected2, selected]);
        expect(result === selected).toEqual(true);
        expect(result === selected2).toEqual(false);
        expect(result === option).toEqual(false);
      });

      it('Should return option if this Placeholder is not selected', () => {
        const option = { id: 123 };
        const selected = { id: 456 };
        const result = comp.getSelectedPlaceholder(option, [selected]);
        expect(result === option).toEqual(true);
        expect(result === selected).toEqual(false);
      });
    });
  });
});
