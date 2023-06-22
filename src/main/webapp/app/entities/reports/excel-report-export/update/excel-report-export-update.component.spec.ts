import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ExcelReportExportFormService } from './excel-report-export-form.service';
import { ExcelReportExportService } from '../service/excel-report-export.service';
import { IExcelReportExport } from '../excel-report-export.model';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/system/placeholder/service/placeholder.service';
import { IUniversallyUniqueMapping } from 'app/entities/system/universally-unique-mapping/universally-unique-mapping.model';
import { UniversallyUniqueMappingService } from 'app/entities/system/universally-unique-mapping/service/universally-unique-mapping.service';
import { IReportStatus } from 'app/entities/reports/report-status/report-status.model';
import { ReportStatusService } from 'app/entities/reports/report-status/service/report-status.service';
import { ISecurityClearance } from 'app/entities/people/security-clearance/security-clearance.model';
import { SecurityClearanceService } from 'app/entities/people/security-clearance/service/security-clearance.service';
import { IApplicationUser } from 'app/entities/people/application-user/application-user.model';
import { ApplicationUserService } from 'app/entities/people/application-user/service/application-user.service';
import { IDealer } from 'app/entities/people/dealer/dealer.model';
import { DealerService } from 'app/entities/people/dealer/service/dealer.service';
import { ISystemModule } from 'app/entities/system/system-module/system-module.model';
import { SystemModuleService } from 'app/entities/system/system-module/service/system-module.service';
import { IReportDesign } from 'app/entities/reports/report-design/report-design.model';
import { ReportDesignService } from 'app/entities/reports/report-design/service/report-design.service';
import { IAlgorithm } from 'app/entities/system/algorithm/algorithm.model';
import { AlgorithmService } from 'app/entities/system/algorithm/service/algorithm.service';

import { ExcelReportExportUpdateComponent } from './excel-report-export-update.component';

describe('ExcelReportExport Management Update Component', () => {
  let comp: ExcelReportExportUpdateComponent;
  let fixture: ComponentFixture<ExcelReportExportUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let excelReportExportFormService: ExcelReportExportFormService;
  let excelReportExportService: ExcelReportExportService;
  let placeholderService: PlaceholderService;
  let universallyUniqueMappingService: UniversallyUniqueMappingService;
  let reportStatusService: ReportStatusService;
  let securityClearanceService: SecurityClearanceService;
  let applicationUserService: ApplicationUserService;
  let dealerService: DealerService;
  let systemModuleService: SystemModuleService;
  let reportDesignService: ReportDesignService;
  let algorithmService: AlgorithmService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ExcelReportExportUpdateComponent],
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
      .overrideTemplate(ExcelReportExportUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ExcelReportExportUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    excelReportExportFormService = TestBed.inject(ExcelReportExportFormService);
    excelReportExportService = TestBed.inject(ExcelReportExportService);
    placeholderService = TestBed.inject(PlaceholderService);
    universallyUniqueMappingService = TestBed.inject(UniversallyUniqueMappingService);
    reportStatusService = TestBed.inject(ReportStatusService);
    securityClearanceService = TestBed.inject(SecurityClearanceService);
    applicationUserService = TestBed.inject(ApplicationUserService);
    dealerService = TestBed.inject(DealerService);
    systemModuleService = TestBed.inject(SystemModuleService);
    reportDesignService = TestBed.inject(ReportDesignService);
    algorithmService = TestBed.inject(AlgorithmService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Placeholder query and add missing value', () => {
      const excelReportExport: IExcelReportExport = { id: 456 };
      const placeholders: IPlaceholder[] = [{ id: 73341 }];
      excelReportExport.placeholders = placeholders;

      const placeholderCollection: IPlaceholder[] = [{ id: 51262 }];
      jest.spyOn(placeholderService, 'query').mockReturnValue(of(new HttpResponse({ body: placeholderCollection })));
      const additionalPlaceholders = [...placeholders];
      const expectedCollection: IPlaceholder[] = [...additionalPlaceholders, ...placeholderCollection];
      jest.spyOn(placeholderService, 'addPlaceholderToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ excelReportExport });
      comp.ngOnInit();

      expect(placeholderService.query).toHaveBeenCalled();
      expect(placeholderService.addPlaceholderToCollectionIfMissing).toHaveBeenCalledWith(
        placeholderCollection,
        ...additionalPlaceholders.map(expect.objectContaining)
      );
      expect(comp.placeholdersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call UniversallyUniqueMapping query and add missing value', () => {
      const excelReportExport: IExcelReportExport = { id: 456 };
      const parameters: IUniversallyUniqueMapping[] = [{ id: 51925 }];
      excelReportExport.parameters = parameters;

      const universallyUniqueMappingCollection: IUniversallyUniqueMapping[] = [{ id: 3089 }];
      jest
        .spyOn(universallyUniqueMappingService, 'query')
        .mockReturnValue(of(new HttpResponse({ body: universallyUniqueMappingCollection })));
      const additionalUniversallyUniqueMappings = [...parameters];
      const expectedCollection: IUniversallyUniqueMapping[] = [
        ...additionalUniversallyUniqueMappings,
        ...universallyUniqueMappingCollection,
      ];
      jest.spyOn(universallyUniqueMappingService, 'addUniversallyUniqueMappingToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ excelReportExport });
      comp.ngOnInit();

      expect(universallyUniqueMappingService.query).toHaveBeenCalled();
      expect(universallyUniqueMappingService.addUniversallyUniqueMappingToCollectionIfMissing).toHaveBeenCalledWith(
        universallyUniqueMappingCollection,
        ...additionalUniversallyUniqueMappings.map(expect.objectContaining)
      );
      expect(comp.universallyUniqueMappingsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call ReportStatus query and add missing value', () => {
      const excelReportExport: IExcelReportExport = { id: 456 };
      const reportStatus: IReportStatus = { id: 61354 };
      excelReportExport.reportStatus = reportStatus;

      const reportStatusCollection: IReportStatus[] = [{ id: 6765 }];
      jest.spyOn(reportStatusService, 'query').mockReturnValue(of(new HttpResponse({ body: reportStatusCollection })));
      const additionalReportStatuses = [reportStatus];
      const expectedCollection: IReportStatus[] = [...additionalReportStatuses, ...reportStatusCollection];
      jest.spyOn(reportStatusService, 'addReportStatusToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ excelReportExport });
      comp.ngOnInit();

      expect(reportStatusService.query).toHaveBeenCalled();
      expect(reportStatusService.addReportStatusToCollectionIfMissing).toHaveBeenCalledWith(
        reportStatusCollection,
        ...additionalReportStatuses.map(expect.objectContaining)
      );
      expect(comp.reportStatusesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call SecurityClearance query and add missing value', () => {
      const excelReportExport: IExcelReportExport = { id: 456 };
      const securityClearance: ISecurityClearance = { id: 52475 };
      excelReportExport.securityClearance = securityClearance;

      const securityClearanceCollection: ISecurityClearance[] = [{ id: 382 }];
      jest.spyOn(securityClearanceService, 'query').mockReturnValue(of(new HttpResponse({ body: securityClearanceCollection })));
      const additionalSecurityClearances = [securityClearance];
      const expectedCollection: ISecurityClearance[] = [...additionalSecurityClearances, ...securityClearanceCollection];
      jest.spyOn(securityClearanceService, 'addSecurityClearanceToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ excelReportExport });
      comp.ngOnInit();

      expect(securityClearanceService.query).toHaveBeenCalled();
      expect(securityClearanceService.addSecurityClearanceToCollectionIfMissing).toHaveBeenCalledWith(
        securityClearanceCollection,
        ...additionalSecurityClearances.map(expect.objectContaining)
      );
      expect(comp.securityClearancesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call ApplicationUser query and add missing value', () => {
      const excelReportExport: IExcelReportExport = { id: 456 };
      const reportCreator: IApplicationUser = { id: 5034 };
      excelReportExport.reportCreator = reportCreator;

      const applicationUserCollection: IApplicationUser[] = [{ id: 19283 }];
      jest.spyOn(applicationUserService, 'query').mockReturnValue(of(new HttpResponse({ body: applicationUserCollection })));
      const additionalApplicationUsers = [reportCreator];
      const expectedCollection: IApplicationUser[] = [...additionalApplicationUsers, ...applicationUserCollection];
      jest.spyOn(applicationUserService, 'addApplicationUserToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ excelReportExport });
      comp.ngOnInit();

      expect(applicationUserService.query).toHaveBeenCalled();
      expect(applicationUserService.addApplicationUserToCollectionIfMissing).toHaveBeenCalledWith(
        applicationUserCollection,
        ...additionalApplicationUsers.map(expect.objectContaining)
      );
      expect(comp.applicationUsersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Dealer query and add missing value', () => {
      const excelReportExport: IExcelReportExport = { id: 456 };
      const organization: IDealer = { id: 9639 };
      excelReportExport.organization = organization;
      const department: IDealer = { id: 82115 };
      excelReportExport.department = department;

      const dealerCollection: IDealer[] = [{ id: 89717 }];
      jest.spyOn(dealerService, 'query').mockReturnValue(of(new HttpResponse({ body: dealerCollection })));
      const additionalDealers = [organization, department];
      const expectedCollection: IDealer[] = [...additionalDealers, ...dealerCollection];
      jest.spyOn(dealerService, 'addDealerToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ excelReportExport });
      comp.ngOnInit();

      expect(dealerService.query).toHaveBeenCalled();
      expect(dealerService.addDealerToCollectionIfMissing).toHaveBeenCalledWith(
        dealerCollection,
        ...additionalDealers.map(expect.objectContaining)
      );
      expect(comp.dealersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call SystemModule query and add missing value', () => {
      const excelReportExport: IExcelReportExport = { id: 456 };
      const systemModule: ISystemModule = { id: 72868 };
      excelReportExport.systemModule = systemModule;

      const systemModuleCollection: ISystemModule[] = [{ id: 1485 }];
      jest.spyOn(systemModuleService, 'query').mockReturnValue(of(new HttpResponse({ body: systemModuleCollection })));
      const additionalSystemModules = [systemModule];
      const expectedCollection: ISystemModule[] = [...additionalSystemModules, ...systemModuleCollection];
      jest.spyOn(systemModuleService, 'addSystemModuleToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ excelReportExport });
      comp.ngOnInit();

      expect(systemModuleService.query).toHaveBeenCalled();
      expect(systemModuleService.addSystemModuleToCollectionIfMissing).toHaveBeenCalledWith(
        systemModuleCollection,
        ...additionalSystemModules.map(expect.objectContaining)
      );
      expect(comp.systemModulesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call ReportDesign query and add missing value', () => {
      const excelReportExport: IExcelReportExport = { id: 456 };
      const reportDesign: IReportDesign = { id: 31984 };
      excelReportExport.reportDesign = reportDesign;

      const reportDesignCollection: IReportDesign[] = [{ id: 76401 }];
      jest.spyOn(reportDesignService, 'query').mockReturnValue(of(new HttpResponse({ body: reportDesignCollection })));
      const additionalReportDesigns = [reportDesign];
      const expectedCollection: IReportDesign[] = [...additionalReportDesigns, ...reportDesignCollection];
      jest.spyOn(reportDesignService, 'addReportDesignToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ excelReportExport });
      comp.ngOnInit();

      expect(reportDesignService.query).toHaveBeenCalled();
      expect(reportDesignService.addReportDesignToCollectionIfMissing).toHaveBeenCalledWith(
        reportDesignCollection,
        ...additionalReportDesigns.map(expect.objectContaining)
      );
      expect(comp.reportDesignsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Algorithm query and add missing value', () => {
      const excelReportExport: IExcelReportExport = { id: 456 };
      const fileCheckSumAlgorithm: IAlgorithm = { id: 41361 };
      excelReportExport.fileCheckSumAlgorithm = fileCheckSumAlgorithm;

      const algorithmCollection: IAlgorithm[] = [{ id: 64678 }];
      jest.spyOn(algorithmService, 'query').mockReturnValue(of(new HttpResponse({ body: algorithmCollection })));
      const additionalAlgorithms = [fileCheckSumAlgorithm];
      const expectedCollection: IAlgorithm[] = [...additionalAlgorithms, ...algorithmCollection];
      jest.spyOn(algorithmService, 'addAlgorithmToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ excelReportExport });
      comp.ngOnInit();

      expect(algorithmService.query).toHaveBeenCalled();
      expect(algorithmService.addAlgorithmToCollectionIfMissing).toHaveBeenCalledWith(
        algorithmCollection,
        ...additionalAlgorithms.map(expect.objectContaining)
      );
      expect(comp.algorithmsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const excelReportExport: IExcelReportExport = { id: 456 };
      const placeholder: IPlaceholder = { id: 16521 };
      excelReportExport.placeholders = [placeholder];
      const parameters: IUniversallyUniqueMapping = { id: 16337 };
      excelReportExport.parameters = [parameters];
      const reportStatus: IReportStatus = { id: 68315 };
      excelReportExport.reportStatus = reportStatus;
      const securityClearance: ISecurityClearance = { id: 274 };
      excelReportExport.securityClearance = securityClearance;
      const reportCreator: IApplicationUser = { id: 76382 };
      excelReportExport.reportCreator = reportCreator;
      const organization: IDealer = { id: 67866 };
      excelReportExport.organization = organization;
      const department: IDealer = { id: 28898 };
      excelReportExport.department = department;
      const systemModule: ISystemModule = { id: 31652 };
      excelReportExport.systemModule = systemModule;
      const reportDesign: IReportDesign = { id: 58994 };
      excelReportExport.reportDesign = reportDesign;
      const fileCheckSumAlgorithm: IAlgorithm = { id: 58896 };
      excelReportExport.fileCheckSumAlgorithm = fileCheckSumAlgorithm;

      activatedRoute.data = of({ excelReportExport });
      comp.ngOnInit();

      expect(comp.placeholdersSharedCollection).toContain(placeholder);
      expect(comp.universallyUniqueMappingsSharedCollection).toContain(parameters);
      expect(comp.reportStatusesSharedCollection).toContain(reportStatus);
      expect(comp.securityClearancesSharedCollection).toContain(securityClearance);
      expect(comp.applicationUsersSharedCollection).toContain(reportCreator);
      expect(comp.dealersSharedCollection).toContain(organization);
      expect(comp.dealersSharedCollection).toContain(department);
      expect(comp.systemModulesSharedCollection).toContain(systemModule);
      expect(comp.reportDesignsSharedCollection).toContain(reportDesign);
      expect(comp.algorithmsSharedCollection).toContain(fileCheckSumAlgorithm);
      expect(comp.excelReportExport).toEqual(excelReportExport);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IExcelReportExport>>();
      const excelReportExport = { id: 123 };
      jest.spyOn(excelReportExportFormService, 'getExcelReportExport').mockReturnValue(excelReportExport);
      jest.spyOn(excelReportExportService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ excelReportExport });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: excelReportExport }));
      saveSubject.complete();

      // THEN
      expect(excelReportExportFormService.getExcelReportExport).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(excelReportExportService.update).toHaveBeenCalledWith(expect.objectContaining(excelReportExport));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IExcelReportExport>>();
      const excelReportExport = { id: 123 };
      jest.spyOn(excelReportExportFormService, 'getExcelReportExport').mockReturnValue({ id: null });
      jest.spyOn(excelReportExportService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ excelReportExport: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: excelReportExport }));
      saveSubject.complete();

      // THEN
      expect(excelReportExportFormService.getExcelReportExport).toHaveBeenCalled();
      expect(excelReportExportService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IExcelReportExport>>();
      const excelReportExport = { id: 123 };
      jest.spyOn(excelReportExportService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ excelReportExport });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(excelReportExportService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('comparePlaceholder', () => {
      it('Should forward to placeholderService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(placeholderService, 'comparePlaceholder');
        comp.comparePlaceholder(entity, entity2);
        expect(placeholderService.comparePlaceholder).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareUniversallyUniqueMapping', () => {
      it('Should forward to universallyUniqueMappingService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(universallyUniqueMappingService, 'compareUniversallyUniqueMapping');
        comp.compareUniversallyUniqueMapping(entity, entity2);
        expect(universallyUniqueMappingService.compareUniversallyUniqueMapping).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareReportStatus', () => {
      it('Should forward to reportStatusService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(reportStatusService, 'compareReportStatus');
        comp.compareReportStatus(entity, entity2);
        expect(reportStatusService.compareReportStatus).toHaveBeenCalledWith(entity, entity2);
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

    describe('compareSystemModule', () => {
      it('Should forward to systemModuleService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(systemModuleService, 'compareSystemModule');
        comp.compareSystemModule(entity, entity2);
        expect(systemModuleService.compareSystemModule).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareReportDesign', () => {
      it('Should forward to reportDesignService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(reportDesignService, 'compareReportDesign');
        comp.compareReportDesign(entity, entity2);
        expect(reportDesignService.compareReportDesign).toHaveBeenCalledWith(entity, entity2);
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
