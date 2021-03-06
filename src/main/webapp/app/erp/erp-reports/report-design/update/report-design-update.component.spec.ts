jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { ReportDesignService } from '../service/report-design.service';
import { IReportDesign, ReportDesign } from '../report-design.model';
import { IUniversallyUniqueMapping } from 'app/entities/universally-unique-mapping/universally-unique-mapping.model';
import { UniversallyUniqueMappingService } from 'app/entities/universally-unique-mapping/service/universally-unique-mapping.service';
import { ISecurityClearance } from 'app/entities/security-clearance/security-clearance.model';
import { SecurityClearanceService } from 'app/entities/security-clearance/service/security-clearance.service';
import { IApplicationUser } from 'app/entities/application-user/application-user.model';
import { ApplicationUserService } from 'app/entities/application-user/service/application-user.service';
import { IDealer } from 'app/entities/dealers/dealer/dealer.model';
import { DealerService } from 'app/entities/dealers/dealer/service/dealer.service';
import { IPlaceholder } from 'app/entities/erpService/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/erpService/placeholder/service/placeholder.service';
import { ISystemModule } from 'app/entities/system-module/system-module.model';
import { SystemModuleService } from 'app/entities/system-module/service/system-module.service';
import { IAlgorithm } from 'app/entities/algorithm/algorithm.model';
import { AlgorithmService } from 'app/entities/algorithm/service/algorithm.service';

import { ReportDesignUpdateComponent } from './report-design-update.component';

describe('ReportDesign Management Update Component', () => {
  let comp: ReportDesignUpdateComponent;
  let fixture: ComponentFixture<ReportDesignUpdateComponent>;
  let activatedRoute: ActivatedRoute;
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
      imports: [HttpClientTestingModule],
      declarations: [ReportDesignUpdateComponent],
      providers: [FormBuilder, ActivatedRoute],
    })
      .overrideTemplate(ReportDesignUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ReportDesignUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
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

      // TODO expect(universallyUniqueMappingService.query).toHaveBeenCalled();
      // expect(universallyUniqueMappingService.addUniversallyUniqueMappingToCollectionIfMissing).toHaveBeenCalledWith(
      //   universallyUniqueMappingCollection,
      //   ...additionalUniversallyUniqueMappings
      // );
      // TODO expect(comp.universallyUniqueMappingsSharedCollection).toEqual(expectedCollection);
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

      // TODO expect(securityClearanceService.query).toHaveBeenCalled();
      // expect(securityClearanceService.addSecurityClearanceToCollectionIfMissing).toHaveBeenCalledWith(
      //   securityClearanceCollection,
      //   ...additionalSecurityClearances
      // );
      // TODO expect(comp.securityClearancesSharedCollection).toEqual(expectedCollection);
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

      // TODO expect(applicationUserService.query).toHaveBeenCalled();
      // expect(applicationUserService.addApplicationUserToCollectionIfMissing).toHaveBeenCalledWith(
      //   applicationUserCollection,
      //   ...additionalApplicationUsers
      // );
      // TODO expect(comp.applicationUsersSharedCollection).toEqual(expectedCollection);
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

      // TODO expect(dealerService.query).toHaveBeenCalled();
      // TODO expect(dealerService.addDealerToCollectionIfMissing).toHaveBeenCalledWith(dealerCollection, ...additionalDealers);
      // TODO expect(comp.dealersSharedCollection).toEqual(expectedCollection);
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

      // TODO expect(placeholderService.query).toHaveBeenCalled();
      // TODO expect(placeholderService.addPlaceholderToCollectionIfMissing).toHaveBeenCalledWith(placeholderCollection, ...additionalPlaceholders);
      // TODO expect(comp.placeholdersSharedCollection).toEqual(expectedCollection);
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

      // TODO expect(systemModuleService.query).toHaveBeenCalled();
      // expect(systemModuleService.addSystemModuleToCollectionIfMissing).toHaveBeenCalledWith(
      //   systemModuleCollection,
      //   ...additionalSystemModules
      // );
      // TODO expect(comp.systemModulesSharedCollection).toEqual(expectedCollection);
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

      // TODO expect(algorithmService.query).toHaveBeenCalled();
      // TODO expect(algorithmService.addAlgorithmToCollectionIfMissing).toHaveBeenCalledWith(algorithmCollection, ...additionalAlgorithms);
      // TODO expect(comp.algorithmsSharedCollection).toEqual(expectedCollection);
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
      const placeholders: IPlaceholder = { id: 27572 };
      reportDesign.placeholders = [placeholders];
      const systemModule: ISystemModule = { id: 97044 };
      reportDesign.systemModule = systemModule;
      const fileCheckSumAlgorithm: IAlgorithm = { id: 96305 };
      reportDesign.fileCheckSumAlgorithm = fileCheckSumAlgorithm;

      activatedRoute.data = of({ reportDesign });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(reportDesign));
      expect(comp.universallyUniqueMappingsSharedCollection).toContain(parameters);
      expect(comp.securityClearancesSharedCollection).toContain(securityClearance);
      expect(comp.applicationUsersSharedCollection).toContain(reportDesigner);
      expect(comp.dealersSharedCollection).toContain(organization);
      expect(comp.dealersSharedCollection).toContain(department);
      expect(comp.placeholdersSharedCollection).toContain(placeholders);
      expect(comp.systemModulesSharedCollection).toContain(systemModule);
      expect(comp.algorithmsSharedCollection).toContain(fileCheckSumAlgorithm);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ReportDesign>>();
      const reportDesign = { id: 123 };
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
      // TODO expect(comp.previousState).toHaveBeenCalled();
      // TODO expect(reportDesignService.update).toHaveBeenCalledWith(reportDesign);
      // TODO expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ReportDesign>>();
      const reportDesign = new ReportDesign();
      jest.spyOn(reportDesignService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ reportDesign });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: reportDesign }));
      saveSubject.complete();

      // THEN
      // TODO expect(reportDesignService.create).toHaveBeenCalledWith(reportDesign);
      // TODO expect(comp.isSaving).toEqual(false);
      // TODO expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ReportDesign>>();
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
      // TODO expect(reportDesignService.update).toHaveBeenCalledWith(reportDesign);
      // TODO expect(comp.isSaving).toEqual(false);
      // TODO expect(comp.previousState).not.toHaveBeenCalled();
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

    describe('trackSecurityClearanceById', () => {
      it('Should return tracked SecurityClearance primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackSecurityClearanceById(0, entity);
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

    describe('trackDealerById', () => {
      it('Should return tracked Dealer primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackDealerById(0, entity);
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

    describe('trackSystemModuleById', () => {
      it('Should return tracked SystemModule primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackSystemModuleById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackAlgorithmById', () => {
      it('Should return tracked Algorithm primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackAlgorithmById(0, entity);
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
