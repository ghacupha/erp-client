import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ReportRequisitionFormService } from './report-requisition-form.service';
import { ReportRequisitionService } from '../service/report-requisition.service';
import { IReportRequisition } from '../report-requisition.model';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { PlaceholderService } from 'app/entities/system/placeholder/service/placeholder.service';
import { IUniversallyUniqueMapping } from 'app/entities/system/universally-unique-mapping/universally-unique-mapping.model';
import { UniversallyUniqueMappingService } from 'app/entities/system/universally-unique-mapping/service/universally-unique-mapping.service';
import { IReportTemplate } from 'app/entities/reports/report-template/report-template.model';
import { ReportTemplateService } from 'app/entities/reports/report-template/service/report-template.service';
import { IReportContentType } from 'app/entities/reports/report-content-type/report-content-type.model';
import { ReportContentTypeService } from 'app/entities/reports/report-content-type/service/report-content-type.service';

import { ReportRequisitionUpdateComponent } from './report-requisition-update.component';

describe('ReportRequisition Management Update Component', () => {
  let comp: ReportRequisitionUpdateComponent;
  let fixture: ComponentFixture<ReportRequisitionUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let reportRequisitionFormService: ReportRequisitionFormService;
  let reportRequisitionService: ReportRequisitionService;
  let placeholderService: PlaceholderService;
  let universallyUniqueMappingService: UniversallyUniqueMappingService;
  let reportTemplateService: ReportTemplateService;
  let reportContentTypeService: ReportContentTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ReportRequisitionUpdateComponent],
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
      .overrideTemplate(ReportRequisitionUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ReportRequisitionUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    reportRequisitionFormService = TestBed.inject(ReportRequisitionFormService);
    reportRequisitionService = TestBed.inject(ReportRequisitionService);
    placeholderService = TestBed.inject(PlaceholderService);
    universallyUniqueMappingService = TestBed.inject(UniversallyUniqueMappingService);
    reportTemplateService = TestBed.inject(ReportTemplateService);
    reportContentTypeService = TestBed.inject(ReportContentTypeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Placeholder query and add missing value', () => {
      const reportRequisition: IReportRequisition = { id: 456 };
      const placeholders: IPlaceholder[] = [{ id: 52719 }];
      reportRequisition.placeholders = placeholders;

      const placeholderCollection: IPlaceholder[] = [{ id: 54364 }];
      jest.spyOn(placeholderService, 'query').mockReturnValue(of(new HttpResponse({ body: placeholderCollection })));
      const additionalPlaceholders = [...placeholders];
      const expectedCollection: IPlaceholder[] = [...additionalPlaceholders, ...placeholderCollection];
      jest.spyOn(placeholderService, 'addPlaceholderToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ reportRequisition });
      comp.ngOnInit();

      expect(placeholderService.query).toHaveBeenCalled();
      expect(placeholderService.addPlaceholderToCollectionIfMissing).toHaveBeenCalledWith(
        placeholderCollection,
        ...additionalPlaceholders.map(expect.objectContaining)
      );
      expect(comp.placeholdersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call UniversallyUniqueMapping query and add missing value', () => {
      const reportRequisition: IReportRequisition = { id: 456 };
      const parameters: IUniversallyUniqueMapping[] = [{ id: 57316 }];
      reportRequisition.parameters = parameters;

      const universallyUniqueMappingCollection: IUniversallyUniqueMapping[] = [{ id: 26345 }];
      jest
        .spyOn(universallyUniqueMappingService, 'query')
        .mockReturnValue(of(new HttpResponse({ body: universallyUniqueMappingCollection })));
      const additionalUniversallyUniqueMappings = [...parameters];
      const expectedCollection: IUniversallyUniqueMapping[] = [
        ...additionalUniversallyUniqueMappings,
        ...universallyUniqueMappingCollection,
      ];
      jest.spyOn(universallyUniqueMappingService, 'addUniversallyUniqueMappingToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ reportRequisition });
      comp.ngOnInit();

      expect(universallyUniqueMappingService.query).toHaveBeenCalled();
      expect(universallyUniqueMappingService.addUniversallyUniqueMappingToCollectionIfMissing).toHaveBeenCalledWith(
        universallyUniqueMappingCollection,
        ...additionalUniversallyUniqueMappings.map(expect.objectContaining)
      );
      expect(comp.universallyUniqueMappingsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call ReportTemplate query and add missing value', () => {
      const reportRequisition: IReportRequisition = { id: 456 };
      const reportTemplate: IReportTemplate = { id: 98779 };
      reportRequisition.reportTemplate = reportTemplate;

      const reportTemplateCollection: IReportTemplate[] = [{ id: 77360 }];
      jest.spyOn(reportTemplateService, 'query').mockReturnValue(of(new HttpResponse({ body: reportTemplateCollection })));
      const additionalReportTemplates = [reportTemplate];
      const expectedCollection: IReportTemplate[] = [...additionalReportTemplates, ...reportTemplateCollection];
      jest.spyOn(reportTemplateService, 'addReportTemplateToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ reportRequisition });
      comp.ngOnInit();

      expect(reportTemplateService.query).toHaveBeenCalled();
      expect(reportTemplateService.addReportTemplateToCollectionIfMissing).toHaveBeenCalledWith(
        reportTemplateCollection,
        ...additionalReportTemplates.map(expect.objectContaining)
      );
      expect(comp.reportTemplatesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call ReportContentType query and add missing value', () => {
      const reportRequisition: IReportRequisition = { id: 456 };
      const reportContentType: IReportContentType = { id: 48187 };
      reportRequisition.reportContentType = reportContentType;

      const reportContentTypeCollection: IReportContentType[] = [{ id: 4986 }];
      jest.spyOn(reportContentTypeService, 'query').mockReturnValue(of(new HttpResponse({ body: reportContentTypeCollection })));
      const additionalReportContentTypes = [reportContentType];
      const expectedCollection: IReportContentType[] = [...additionalReportContentTypes, ...reportContentTypeCollection];
      jest.spyOn(reportContentTypeService, 'addReportContentTypeToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ reportRequisition });
      comp.ngOnInit();

      expect(reportContentTypeService.query).toHaveBeenCalled();
      expect(reportContentTypeService.addReportContentTypeToCollectionIfMissing).toHaveBeenCalledWith(
        reportContentTypeCollection,
        ...additionalReportContentTypes.map(expect.objectContaining)
      );
      expect(comp.reportContentTypesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const reportRequisition: IReportRequisition = { id: 456 };
      const placeholders: IPlaceholder = { id: 33255 };
      reportRequisition.placeholders = [placeholders];
      const parameters: IUniversallyUniqueMapping = { id: 99069 };
      reportRequisition.parameters = [parameters];
      const reportTemplate: IReportTemplate = { id: 5925 };
      reportRequisition.reportTemplate = reportTemplate;
      const reportContentType: IReportContentType = { id: 29644 };
      reportRequisition.reportContentType = reportContentType;

      activatedRoute.data = of({ reportRequisition });
      comp.ngOnInit();

      expect(comp.placeholdersSharedCollection).toContain(placeholders);
      expect(comp.universallyUniqueMappingsSharedCollection).toContain(parameters);
      expect(comp.reportTemplatesSharedCollection).toContain(reportTemplate);
      expect(comp.reportContentTypesSharedCollection).toContain(reportContentType);
      expect(comp.reportRequisition).toEqual(reportRequisition);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IReportRequisition>>();
      const reportRequisition = { id: 123 };
      jest.spyOn(reportRequisitionFormService, 'getReportRequisition').mockReturnValue(reportRequisition);
      jest.spyOn(reportRequisitionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ reportRequisition });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: reportRequisition }));
      saveSubject.complete();

      // THEN
      expect(reportRequisitionFormService.getReportRequisition).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(reportRequisitionService.update).toHaveBeenCalledWith(expect.objectContaining(reportRequisition));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IReportRequisition>>();
      const reportRequisition = { id: 123 };
      jest.spyOn(reportRequisitionFormService, 'getReportRequisition').mockReturnValue({ id: null });
      jest.spyOn(reportRequisitionService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ reportRequisition: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: reportRequisition }));
      saveSubject.complete();

      // THEN
      expect(reportRequisitionFormService.getReportRequisition).toHaveBeenCalled();
      expect(reportRequisitionService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IReportRequisition>>();
      const reportRequisition = { id: 123 };
      jest.spyOn(reportRequisitionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ reportRequisition });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(reportRequisitionService.update).toHaveBeenCalled();
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

    describe('compareReportTemplate', () => {
      it('Should forward to reportTemplateService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(reportTemplateService, 'compareReportTemplate');
        comp.compareReportTemplate(entity, entity2);
        expect(reportTemplateService.compareReportTemplate).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareReportContentType', () => {
      it('Should forward to reportContentTypeService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(reportContentTypeService, 'compareReportContentType');
        comp.compareReportContentType(entity, entity2);
        expect(reportContentTypeService.compareReportContentType).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
