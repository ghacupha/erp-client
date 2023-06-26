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

import { ReportDesignFormService } from './report-design-form.service';
import { ReportDesignService } from '../service/report-design.service';
import { IReportDesign } from '../report-design.model';
import { IUniversallyUniqueMapping } from 'app/entities/system/universally-unique-mapping/universally-unique-mapping.model';
import { UniversallyUniqueMappingService } from 'app/entities/system/universally-unique-mapping/service/universally-unique-mapping.service';
import { ISecurityClearance } from 'app/entities/people/security-clearance/security-clearance.model';
import { SecurityClearanceService } from 'app/entities/people/security-clearance/service/security-clearance.service';
import { IApplicationUser } from 'app/entities/people/application-user/application-user.model';
import { ApplicationUserService } from 'app/entities/people/application-user/service/application-user.service';
import { IDealer } from 'app/entities/people/dealer/dealer.model';
import { DealerService } from 'app/entities/people/dealer/service/dealer.service';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/system/placeholder/service/placeholder.service';
import { ISystemModule } from 'app/entities/system/system-module/system-module.model';
import { SystemModuleService } from 'app/entities/system/system-module/service/system-module.service';
import { IAlgorithm } from 'app/entities/system/algorithm/algorithm.model';
import { AlgorithmService } from 'app/entities/system/algorithm/service/algorithm.service';

import { ReportDesignUpdateComponent } from './report-design-update.component';

describe('ReportDesign Management Update Component', () => {
  let comp: ReportDesignUpdateComponent;
  let fixture: ComponentFixture<ReportDesignUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let reportDesignFormService: ReportDesignFormService;
  let reportDesignService: ReportDesignService;
  let universallyUniqueMappingService: UniversallyUniqueMappingService;
  let securityClearanceService: SecurityClearanceService;
  let applicationUserService: ApplicationUserService;
  let dealerService: DealerService;
  let placeholderService: PlaceholderService;
  let systemModuleService: SystemModuleService;
  let algorithmService: AlgorithmService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ReportDesignUpdateComponent],
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
      .overrideTemplate(ReportDesignUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ReportDesignUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    reportDesignFormService = TestBed.inject(ReportDesignFormService);
    reportDesignService = TestBed.inject(ReportDesignService);
    universallyUniqueMappingService = TestBed.inject(UniversallyUniqueMappingService);
    securityClearanceService = TestBed.inject(SecurityClearanceService);
    applicationUserService = TestBed.inject(ApplicationUserService);
    dealerService = TestBed.inject(DealerService);
    placeholderService = TestBed.inject(PlaceholderService);
    systemModuleService = TestBed.inject(SystemModuleService);
    algorithmService = TestBed.inject(AlgorithmService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call UniversallyUniqueMapping query and add missing value', () => {
      const reportDesign: IReportDesign = { id: 456 };
      const parameters: IUniversallyUniqueMapping[] = [{ id: 70076 }];
      reportDesign.parameters = parameters;

      const universallyUniqueMappingCollection: IUniversallyUniqueMapping[] = [{ id: 58257 }];
      jest
        .spyOn(universallyUniqueMappingService, 'query')
        .mockReturnValue(of(new HttpResponse({ body: universallyUniqueMappingCollection })));
      const additionalUniversallyUniqueMappings = [...parameters];
      const expectedCollection: IUniversallyUniqueMapping[] = [
        ...additionalUniversallyUniqueMappings,
        ...universallyUniqueMappingCollection,
      ];
      jest.spyOn(universallyUniqueMappingService, 'addUniversallyUniqueMappingToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ reportDesign });
      comp.ngOnInit();

      expect(universallyUniqueMappingService.query).toHaveBeenCalled();
      expect(universallyUniqueMappingService.addUniversallyUniqueMappingToCollectionIfMissing).toHaveBeenCalledWith(
        universallyUniqueMappingCollection,
        ...additionalUniversallyUniqueMappings.map(expect.objectContaining)
      );
      expect(comp.universallyUniqueMappingsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call SecurityClearance query and add missing value', () => {
      const reportDesign: IReportDesign = { id: 456 };
      const securityClearance: ISecurityClearance = { id: 70762 };
      reportDesign.securityClearance = securityClearance;

      const securityClearanceCollection: ISecurityClearance[] = [{ id: 40082 }];
      jest.spyOn(securityClearanceService, 'query').mockReturnValue(of(new HttpResponse({ body: securityClearanceCollection })));
      const additionalSecurityClearances = [securityClearance];
      const expectedCollection: ISecurityClearance[] = [...additionalSecurityClearances, ...securityClearanceCollection];
      jest.spyOn(securityClearanceService, 'addSecurityClearanceToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ reportDesign });
      comp.ngOnInit();

      expect(securityClearanceService.query).toHaveBeenCalled();
      expect(securityClearanceService.addSecurityClearanceToCollectionIfMissing).toHaveBeenCalledWith(
        securityClearanceCollection,
        ...additionalSecurityClearances.map(expect.objectContaining)
      );
      expect(comp.securityClearancesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call ApplicationUser query and add missing value', () => {
      const reportDesign: IReportDesign = { id: 456 };
      const reportDesigner: IApplicationUser = { id: 59146 };
      reportDesign.reportDesigner = reportDesigner;

      const applicationUserCollection: IApplicationUser[] = [{ id: 55234 }];
      jest.spyOn(applicationUserService, 'query').mockReturnValue(of(new HttpResponse({ body: applicationUserCollection })));
      const additionalApplicationUsers = [reportDesigner];
      const expectedCollection: IApplicationUser[] = [...additionalApplicationUsers, ...applicationUserCollection];
      jest.spyOn(applicationUserService, 'addApplicationUserToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ reportDesign });
      comp.ngOnInit();

      expect(applicationUserService.query).toHaveBeenCalled();
      expect(applicationUserService.addApplicationUserToCollectionIfMissing).toHaveBeenCalledWith(
        applicationUserCollection,
        ...additionalApplicationUsers.map(expect.objectContaining)
      );
      expect(comp.applicationUsersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Dealer query and add missing value', () => {
      const reportDesign: IReportDesign = { id: 456 };
      const organization: IDealer = { id: 97302 };
      reportDesign.organization = organization;
      const department: IDealer = { id: 50670 };
      reportDesign.department = department;

      const dealerCollection: IDealer[] = [{ id: 68684 }];
      jest.spyOn(dealerService, 'query').mockReturnValue(of(new HttpResponse({ body: dealerCollection })));
      const additionalDealers = [organization, department];
      const expectedCollection: IDealer[] = [...additionalDealers, ...dealerCollection];
      jest.spyOn(dealerService, 'addDealerToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ reportDesign });
      comp.ngOnInit();

      expect(dealerService.query).toHaveBeenCalled();
      expect(dealerService.addDealerToCollectionIfMissing).toHaveBeenCalledWith(
        dealerCollection,
        ...additionalDealers.map(expect.objectContaining)
      );
      expect(comp.dealersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Placeholder query and add missing value', () => {
      const reportDesign: IReportDesign = { id: 456 };
      const placeholders: IPlaceholder[] = [{ id: 38136 }];
      reportDesign.placeholders = placeholders;

      const placeholderCollection: IPlaceholder[] = [{ id: 85828 }];
      jest.spyOn(placeholderService, 'query').mockReturnValue(of(new HttpResponse({ body: placeholderCollection })));
      const additionalPlaceholders = [...placeholders];
      const expectedCollection: IPlaceholder[] = [...additionalPlaceholders, ...placeholderCollection];
      jest.spyOn(placeholderService, 'addPlaceholderToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ reportDesign });
      comp.ngOnInit();

      expect(placeholderService.query).toHaveBeenCalled();
      expect(placeholderService.addPlaceholderToCollectionIfMissing).toHaveBeenCalledWith(
        placeholderCollection,
        ...additionalPlaceholders.map(expect.objectContaining)
      );
      expect(comp.placeholdersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call SystemModule query and add missing value', () => {
      const reportDesign: IReportDesign = { id: 456 };
      const systemModule: ISystemModule = { id: 91620 };
      reportDesign.systemModule = systemModule;

      const systemModuleCollection: ISystemModule[] = [{ id: 92035 }];
      jest.spyOn(systemModuleService, 'query').mockReturnValue(of(new HttpResponse({ body: systemModuleCollection })));
      const additionalSystemModules = [systemModule];
      const expectedCollection: ISystemModule[] = [...additionalSystemModules, ...systemModuleCollection];
      jest.spyOn(systemModuleService, 'addSystemModuleToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ reportDesign });
      comp.ngOnInit();

      expect(systemModuleService.query).toHaveBeenCalled();
      expect(systemModuleService.addSystemModuleToCollectionIfMissing).toHaveBeenCalledWith(
        systemModuleCollection,
        ...additionalSystemModules.map(expect.objectContaining)
      );
      expect(comp.systemModulesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Algorithm query and add missing value', () => {
      const reportDesign: IReportDesign = { id: 456 };
      const fileCheckSumAlgorithm: IAlgorithm = { id: 73099 };
      reportDesign.fileCheckSumAlgorithm = fileCheckSumAlgorithm;

      const algorithmCollection: IAlgorithm[] = [{ id: 75364 }];
      jest.spyOn(algorithmService, 'query').mockReturnValue(of(new HttpResponse({ body: algorithmCollection })));
      const additionalAlgorithms = [fileCheckSumAlgorithm];
      const expectedCollection: IAlgorithm[] = [...additionalAlgorithms, ...algorithmCollection];
      jest.spyOn(algorithmService, 'addAlgorithmToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ reportDesign });
      comp.ngOnInit();

      expect(algorithmService.query).toHaveBeenCalled();
      expect(algorithmService.addAlgorithmToCollectionIfMissing).toHaveBeenCalledWith(
        algorithmCollection,
        ...additionalAlgorithms.map(expect.objectContaining)
      );
      expect(comp.algorithmsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const reportDesign: IReportDesign = { id: 456 };
      const parameters: IUniversallyUniqueMapping = { id: 35505 };
      reportDesign.parameters = [parameters];
      const securityClearance: ISecurityClearance = { id: 96364 };
      reportDesign.securityClearance = securityClearance;
      const reportDesigner: IApplicationUser = { id: 72238 };
      reportDesign.reportDesigner = reportDesigner;
      const organization: IDealer = { id: 56094 };
      reportDesign.organization = organization;
      const department: IDealer = { id: 88590 };
      reportDesign.department = department;
      const placeholder: IPlaceholder = { id: 27572 };
      reportDesign.placeholders = [placeholder];
      const systemModule: ISystemModule = { id: 97044 };
      reportDesign.systemModule = systemModule;
      const fileCheckSumAlgorithm: IAlgorithm = { id: 96305 };
      reportDesign.fileCheckSumAlgorithm = fileCheckSumAlgorithm;

      activatedRoute.data = of({ reportDesign });
      comp.ngOnInit();

      expect(comp.universallyUniqueMappingsSharedCollection).toContain(parameters);
      expect(comp.securityClearancesSharedCollection).toContain(securityClearance);
      expect(comp.applicationUsersSharedCollection).toContain(reportDesigner);
      expect(comp.dealersSharedCollection).toContain(organization);
      expect(comp.dealersSharedCollection).toContain(department);
      expect(comp.placeholdersSharedCollection).toContain(placeholder);
      expect(comp.systemModulesSharedCollection).toContain(systemModule);
      expect(comp.algorithmsSharedCollection).toContain(fileCheckSumAlgorithm);
      expect(comp.reportDesign).toEqual(reportDesign);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IReportDesign>>();
      const reportDesign = { id: 123 };
      jest.spyOn(reportDesignFormService, 'getReportDesign').mockReturnValue(reportDesign);
      jest.spyOn(reportDesignService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ reportDesign });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: reportDesign }));
      saveSubject.complete();

      // THEN
      expect(reportDesignFormService.getReportDesign).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(reportDesignService.update).toHaveBeenCalledWith(expect.objectContaining(reportDesign));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IReportDesign>>();
      const reportDesign = { id: 123 };
      jest.spyOn(reportDesignFormService, 'getReportDesign').mockReturnValue({ id: null });
      jest.spyOn(reportDesignService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ reportDesign: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: reportDesign }));
      saveSubject.complete();

      // THEN
      expect(reportDesignFormService.getReportDesign).toHaveBeenCalled();
      expect(reportDesignService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IReportDesign>>();
      const reportDesign = { id: 123 };
      jest.spyOn(reportDesignService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ reportDesign });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(reportDesignService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareUniversallyUniqueMapping', () => {
      it('Should forward to universallyUniqueMappingService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(universallyUniqueMappingService, 'compareUniversallyUniqueMapping');
        comp.compareUniversallyUniqueMapping(entity, entity2);
        expect(universallyUniqueMappingService.compareUniversallyUniqueMapping).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareSecurityClearance', () => {
      it('Should forward to securityClearanceService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(securityClearanceService, 'compareSecurityClearance');
        comp.compareSecurityClearance(entity, entity2);
        expect(securityClearanceService.compareSecurityClearance).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareApplicationUser', () => {
      it('Should forward to applicationUserService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(applicationUserService, 'compareApplicationUser');
        comp.compareApplicationUser(entity, entity2);
        expect(applicationUserService.compareApplicationUser).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareDealer', () => {
      it('Should forward to dealerService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(dealerService, 'compareDealer');
        comp.compareDealer(entity, entity2);
        expect(dealerService.compareDealer).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('comparePlaceholder', () => {
      it('Should forward to placeholderService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(placeholderService, 'comparePlaceholder');
        comp.comparePlaceholder(entity, entity2);
        expect(placeholderService.comparePlaceholder).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareSystemModule', () => {
      it('Should forward to systemModuleService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(systemModuleService, 'compareSystemModule');
        comp.compareSystemModule(entity, entity2);
        expect(systemModuleService.compareSystemModule).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareAlgorithm', () => {
      it('Should forward to algorithmService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(algorithmService, 'compareAlgorithm');
        comp.compareAlgorithm(entity, entity2);
        expect(algorithmService.compareAlgorithm).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
